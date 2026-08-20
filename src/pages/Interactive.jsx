import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { cases, faqs, services } from '../data/content'
import FinestraGioco from '../components/interactive/FinestraGioco'
import Icon from '../components/ui/Icon'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Pagina interattiva come terminale: si scrivono comandi e le cose si aprono
 * dentro la finestra, sotto la riga digitata.
 *
 * Non è un vezzo grafico: è il modo in cui lavoriamo davvero, ed è l'unico
 * punto del sito dove chi guarda può fare qualcosa invece di leggere. I tre
 * giochi restano quelli — cambia il modo in cui ci si arriva.
 *
 * Niente resta salvato: ricaricando, il terminale riparte pulito.
 */

const PROMPT = 'ospite@levelapp'

/* I comandi riconosciuti. `apre` monta un componente sotto la riga. */
const COMANDI = [
  { nome: 'aiuto', descrizione: 'elenca i comandi disponibili' },
  { nome: 'servizi', descrizione: 'le sei aree con i tempi di rilascio' },
  { nome: 'progetti', descrizione: 'i case study, con cliente e anno' },
  { nome: 'cerca', descrizione: 'cerca nel sito — es. "cerca rust"', argomento: '<parola>' },
  { nome: 'apri', descrizione: 'apre una pagina — es. "apri gestionale"', argomento: '<pagina>' },
  { nome: 'bug', descrizione: 'trova il bug in sei frammenti di Rust', apre: 'bug' },
  { nome: 'memory', descrizione: 'accoppia le tecnologie che usiamo', apre: 'memory' },
  { nome: 'latenza', descrizione: 'misura il tuo tempo di reazione', apre: 'latenza' },
  { nome: 'chi-siamo', descrizione: 'due righe su LevelApp' },
  { nome: 'contatti', descrizione: 'parliamo del tuo progetto' },
  { nome: 'pulisci', descrizione: 'svuota il terminale' },
]

const BENVENUTO = [
  { tipo: 'sistema', valore: 'LevelApp — terminale pubblico · nessun dato viene salvato' },
  { tipo: 'testo', valore: 'Scrivi un comando e premi invio. Puoi consultare il sito da qui: prova con “servizi”, “cerca rust” o “aiuto”.' },
]

export default function Interactive() {
  const [storia, setStoria] = useState(BENVENUTO)
  const [riga, setRiga] = useState('')
  const [cronologia, setCronologia] = useState([])
  const [indice, setIndice] = useState(-1)
  const [gioco, setGioco] = useState(null)
  const finestra = useRef(null)
  const campo = useRef(null)

  // Il terminale segue sempre l'ultima riga scritta.
  useEffect(() => {
    finestra.current?.scrollTo({ top: finestra.current.scrollHeight, behavior: 'smooth' })
  }, [storia])

  function aggiungi(...righe) {
    setStoria((precedenti) => [...precedenti, ...righe])
  }

  function esegui(testo) {
    const intero = testo.trim().toLowerCase()
    if (!intero) return

    const [comando, ...resto] = intero.split(/\s+/)
    const argomento = resto.join(' ')

    setCronologia((c) => [intero, ...c])
    setIndice(-1)
    aggiungi({ tipo: 'comando', valore: intero })

    if (comando === 'pulisci') return setStoria(BENVENUTO)

    const trovato = COMANDI.find((c) => c.nome === comando)
    if (!trovato) {
      // Piccolo aiuto invece del solo errore: il comando più simile.
      const simile = COMANDI.find((c) => c.nome.startsWith(comando.slice(0, 3)))
      aggiungi({
        tipo: 'errore',
        valore: `comando sconosciuto: ${comando}${simile ? ` — forse intendevi "${simile.nome}"` : ' — prova con "aiuto"'}`,
      })
      return
    }

    if (trovato.apre) {
      setGioco(trovato.apre)
      return aggiungi({ tipo: 'sistema', valore: `avvio di ${trovato.apre}.exe…` })
    }
    if (comando === 'aiuto') return aggiungi({ tipo: 'elenco', valore: COMANDI })

    /* --- I contenuti veri del sito --- */

    if (comando === 'servizi') {
      return aggiungi({
        tipo: 'tabella',
        valore: services.map((x) => [x.slug, x.title, x.tempi]),
        intestazione: ['slug', 'area', 'primo rilascio'],
      })
    }

    if (comando === 'progetti') {
      return aggiungi({
        tipo: 'tabella',
        valore: cases.map((x) => [x.id, x.client, `${x.type} · ${String(x.year).split(' ')[0]}`]),
        intestazione: ['id', 'cliente', 'tipo e anno'],
      })
    }

    if (comando === 'cerca') {
      if (!argomento) {
        return aggiungi({ tipo: 'errore', valore: 'cerca cosa? esempio: cerca rust' })
      }

      const q = argomento.toLowerCase()
      const esiti = [
        ...services
          .filter((x) => `${x.title} ${x.short} ${x.intro}`.toLowerCase().includes(q))
          .map((x) => ({ dove: 'servizio', testo: x.title, rotta: `/servizi/${x.slug}` })),
        ...cases
          .filter((x) => `${x.client} ${x.title} ${x.body}`.toLowerCase().includes(q))
          .map((x) => ({ dove: 'progetto', testo: x.title, rotta: `/progetti/${x.id}` })),
        ...faqs
          .filter((x) => `${x.q} ${x.a}`.toLowerCase().includes(q))
          .map((x) => ({ dove: 'domanda', testo: x.q, rotta: '/contatti' })),
      ]

      return aggiungi(
        esiti.length
          ? { tipo: 'risultati', valore: esiti.slice(0, 6), query: argomento }
          : { tipo: 'errore', valore: `nessun risultato per "${argomento}"` },
      )
    }

    if (comando === 'apri') {
      const servizio = services.find((x) => x.slug === argomento)
      const progetto = cases.find((x) => x.id === argomento)
      const pagine = { contatti: '/contatti', azienda: '/azienda', progetti: '/progetti', servizi: '/servizi' }

      const rotta = servizio
        ? `/servizi/${servizio.slug}`
        : progetto
          ? `/progetti/${progetto.id}`
          : pagine[argomento]

      return aggiungi(
        rotta
          ? { tipo: 'link', valore: rotta }
          : { tipo: 'errore', valore: `non trovo "${argomento}" — prova "servizi" o "progetti"` },
      )
    }

    if (comando === 'chi-siamo') {
      return aggiungi({
        tipo: 'testo',
        valore:
          'Software house dal 2022. Gestionali, piattaforme, siti e AI applicata: in produzione in quattro settimane, con il codice intestato a te.',
      })
    }

    aggiungi({ tipo: 'link', valore: '/contatti' })
  }

  /* Frecce su e giù per ripescare i comandi già dati, come in un terminale. */
  function onKeyDown(event) {
    if (event.key === 'Enter') {
      esegui(riga)
      setRiga('')
      return
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!cronologia.length) return
      event.preventDefault()
      const prossimo =
        event.key === 'ArrowUp'
          ? Math.min(indice + 1, cronologia.length - 1)
          : Math.max(indice - 1, -1)
      setIndice(prossimo)
      setRiga(prossimo === -1 ? '' : cronologia[prossimo])
      return
    }

    if (event.key === 'Tab') {
      // Completamento: il primo comando che inizia come quello scritto.
      const parziale = riga.trim().toLowerCase()
      const candidato = COMANDI.find((c) => parziale && c.nome.startsWith(parziale))
      if (candidato) {
        event.preventDefault()
        setRiga(candidato.nome)
      }
    }
  }

  return (
    <section className="on-dark relative min-h-[calc(100vh-4rem)] overflow-hidden py-16 md:py-20">
      <div aria-hidden="true" className="aurora">
        <span />
        <span />
        <span />
      </div>
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-25" />

      <div className="shell relative">
        <h1 className="sr-only">Interattivo — il terminale di LevelApp</h1>

        <p className="font-mono text-mini tracking-[0.2em] text-fg-subtle uppercase">
          interattivo
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">
          Questa pagina è un terminale. Scrivi <span className="text-fg">aiuto</span> e premi invio:
          quello che apri gira qui dentro, nel tuo browser, e sparisce quando ricarichi.
        </p>

        {/* La finestra */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          onClick={() => campo.current?.focus()}
          className="mt-8 overflow-hidden rounded-xl border border-line bg-canvas-inset shadow-float"
        >
          <div className="flex items-center gap-3 border-b border-line bg-canvas-subtle px-3 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-line" />
              <span className="size-3 rounded-full bg-line" />
              <span className="size-3 rounded-full bg-line" />
            </div>
            <span className="font-mono text-xs text-fg-muted">{PROMPT}: ~</span>
            <span className="ml-auto font-mono text-mini text-fg-subtle">
              {storia.filter((r) => r.tipo === 'comando').length} comandi
            </span>
          </div>

          <div
            ref={finestra}
            className="max-h-[38rem] min-h-[26rem] overflow-y-auto p-4 font-mono text-[13px] leading-7"
          >
            {storia.map((riga, i) => (
              <Riga key={i} riga={riga} />
            ))}

            {/* La riga in cui si scrive */}
            <label className="mt-2 flex items-center gap-2">
              <span className="shrink-0 text-success">{PROMPT}:~$</span>
              <input
                ref={campo}
                value={riga}
                onChange={(e) => setRiga(e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus
                spellCheck="false"
                autoComplete="off"
                aria-label="Scrivi un comando"
                className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-fg outline-none"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line bg-canvas-subtle px-3 py-2 font-mono text-mini text-fg-subtle">
            <span>invio esegue</span>
            <span>tab completa</span>
            <span>↑ ↓ ripescano</span>
            <span className="ml-auto">pulisci azzera</span>
          </div>
        </motion.div>

        {/* Scorciatoie per chi non ha voglia di digitare */}
        <div className="mt-5 flex flex-wrap gap-2">
          {COMANDI.filter((c) => c.apre).map((c) => (
            <button
              key={c.nome}
              type="button"
              onClick={() => esegui(c.nome)}
              className="flex min-h-10 items-center rounded-full border border-line px-4 py-2 font-mono text-xs text-fg-muted transition-colors hover:border-success hover:text-fg"
            >
              {c.nome}
            </button>
          ))}
        </div>
      </div>

      <FinestraGioco gioco={gioco} onChiudi={() => setGioco(null)} />
    </section>
  )
}

/** Una riga di output: testo, elenco dei comandi, gioco o collegamento. */
function Riga({ riga }) {
  if (riga.tipo === 'comando') {
    return (
      <p className="flex gap-2">
        <span className="shrink-0 text-success">{PROMPT}:~$</span>
        <span className="text-fg">{riga.valore}</span>
      </p>
    )
  }

  if (riga.tipo === 'sistema') {
    return <p className="text-fg-subtle">{riga.valore}</p>
  }

  if (riga.tipo === 'errore') {
    return <p className="text-danger">{riga.valore}</p>
  }

  if (riga.tipo === 'elenco') {
    return (
      <div className="my-2">
        {riga.valore.map((c) => (
          <p key={c.nome} className="flex gap-3">
            <span className="w-36 shrink-0 text-success">
              {c.nome}
              {c.argomento && <span className="text-fg-subtle"> {c.argomento}</span>}
            </span>
            <span className="text-fg-muted">{c.descrizione}</span>
          </p>
        ))}
      </div>
    )
  }

  if (riga.tipo === 'tabella') {
    return (
      <div className="my-2 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-fg-subtle">
              {riga.intestazione.map((c) => (
                <th key={c} className="pr-8 pb-1 font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {riga.valore.map((r) => (
              <tr key={r[0]}>
                <td className="pr-8 text-success">{r[0]}</td>
                <td className="pr-8 whitespace-nowrap text-fg">{r[1]}</td>
                <td className="whitespace-nowrap text-fg-muted">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-1 text-fg-subtle">
          {riga.valore.length} risultati · apri con “apri {riga.valore[0][0]}”
        </p>
      </div>
    )
  }

  if (riga.tipo === 'risultati') {
    return (
      <div className="my-2">
        <p className="text-fg-subtle">
          {riga.valore.length} risultati per “{riga.query}”
        </p>
        {riga.valore.map((r) => (
          <p key={r.rotta + r.testo} className="flex gap-3">
            <span className="w-20 shrink-0 text-fg-subtle">{r.dove}</span>
            <Link to={r.rotta} className="text-accent hover:underline">
              {r.testo}
            </Link>
          </p>
        ))}
      </div>
    )
  }

  if (riga.tipo === 'link') {
    return (
      <p className="my-1">
        <Link
          to={riga.valore}
          className="inline-flex items-center gap-1.5 text-accent hover:underline"
        >
          apri {riga.valore}
          <Icon name="arrowRight" size={13} />
        </Link>
      </p>
    )
  }

  return <p className="text-fg-muted">{riga.valore}</p>
}
