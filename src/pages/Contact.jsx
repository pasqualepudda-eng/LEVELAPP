import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  company,
  contactReasons,
  daQuando,
  operatori,
  tipiRichiesta,
  urgenze,
} from '../data/content'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import { EASE } from '../lib/motion'
import { usePrefersReducedMotion } from '../lib/useMediaQuery'

/**
 * Contatti come conversazione guidata: una domanda alla volta, e il percorso
 * si biforca alla prima risposta — chi non è ancora cliente racconta il
 * progetto, chi lo è apre un ticket.
 *
 * È anche una dimostrazione: le esperienze guidate sono una delle cose che
 * costruiamo, e questa pagina ne è una.
 *
 * Non si apre nessun client di posta: le domande finiscono in un riepilogo
 * rileggibile e poi la richiesta parte verso `ENDPOINT` (vedi sotto).
 */

const campo =
  'w-full bg-transparent text-2xl text-fg outline-none placeholder:text-fg-subtle sm:text-3xl'

/* ------------------------------------------------------------------
   Le domande, in ordine. `scelte` avanza da sola al clic; gli altri
   tipi aspettano invio o il pulsante.
   ------------------------------------------------------------------ */

const PARTENZA = {
  id: 'chi',
  domanda: 'Ci conosciamo già?',
  aiuto: 'La risposta cambia le domande che seguono.',
  tipo: 'scelte',
  scelte: [
    { valore: 'nuovo', etichetta: 'No, non siamo ancora clienti', icona: 'lightbulb' },
    { valore: 'cliente', etichetta: 'Sì, siamo già clienti', icona: 'tools' },
  ],
}

const NUOVO = [
  {
    id: 'progetto',
    domanda: 'Di cosa hai bisogno?',
    tipo: 'scelte',
    scelte: [
      ...contactReasons.map((r) => ({ valore: r.label, etichetta: r.label })),
      { valore: 'Solo informazioni', etichetta: 'Solo informazioni, per ora' },
    ],
  },
  {
    id: 'messaggio',
    domanda: 'Cosa succede oggi in azienda?',
    aiuto: 'Il processo che ti fa perdere più tempo, o l’idea che hai in testa.',
    tipo: 'testo-lungo',
    obbligatorio: true,
  },
  {
    id: 'quando',
    domanda: 'Quando vorresti partire?',
    tipo: 'scelte',
    scelte: [
      { valore: 'Il prima possibile', etichetta: 'Il prima possibile' },
      { valore: 'Entro un mese', etichetta: 'Entro un mese' },
      { valore: 'Entro tre mesi', etichetta: 'Entro tre mesi' },
      { valore: 'Sto valutando', etichetta: 'Sto ancora valutando' },
    ],
  },
]

const CLIENTE = [
  {
    id: 'azienda',
    domanda: 'Per quale azienda scrivi?',
    tipo: 'testo',
    obbligatorio: true,
    segnaposto: 'Nome dell’azienda',
  },
  {
    id: 'progetto',
    domanda: 'Su quale software?',
    aiuto: 'Il nome con cui lo chiamate voi.',
    tipo: 'testo',
    obbligatorio: true,
    segnaposto: 'Es. gestionale commesse',
  },
  {
    id: 'tipo',
    domanda: 'Che tipo di richiesta è?',
    tipo: 'scelte',
    scelte: tipiRichiesta.map((t) => ({ valore: t.label, etichetta: t.label })),
  },
  {
    id: 'urgenza',
    domanda: 'Quanto è urgente, davvero?',
    aiuto: 'Scegli in base a cosa succede adesso in azienda, non a quanto ti dà fastidio.',
    tipo: 'urgenza',
  },
  {
    id: 'descrizione',
    domanda: 'Cosa succede?',
    aiuto: 'Cosa ti aspettavi, cosa succede invece, e come si riproduce.',
    tipo: 'testo-lungo',
    obbligatorio: true,
  },
  {
    id: 'daQuando',
    domanda: 'Da quando succede?',
    tipo: 'scelte',
    scelte: daQuando.map((q) => ({ valore: q, etichetta: q })),
  },
  {
    id: 'operatore',
    domanda: 'Chi vi segue?',
    tipo: 'scelte',
    scelte: operatori.map((o) => ({ valore: o, etichetta: o })),
  },
]

const RECAPITI = [
  { id: 'nome', domanda: 'Come ti chiami?', tipo: 'testo', obbligatorio: true, segnaposto: 'Nome e cognome' },
  { id: 'email', domanda: 'A che indirizzo ti rispondiamo?', tipo: 'email', obbligatorio: true, segnaposto: 'nome@azienda.it' },
  { id: 'telefono', domanda: 'Un telefono, se vuoi.', aiuto: 'Serve solo se la cosa è urgente.', tipo: 'testo', segnaposto: 'Facoltativo' },
]

/* Dove finiscono le richieste. Vuoto = non collegato: vedi `invia`. */
const ENDPOINT = ''

export default function Contact() {
  const ridotto = usePrefersReducedMotion()
  const [risposte, setRisposte] = useState({})
  const [passo, setPasso] = useState(0)
  // domande → riepilogo → invio → esito
  const [stato, setStato] = useState('domande')
  const [bozza, setBozza] = useState('')

  /* L'elenco dipende dalle risposte date: la prima biforca il percorso.
     Va ricalcolato sui dati aggiornati, altrimenti la prima domanda risulta
     anche l'ultima e si salta dritti al riepilogo. */
  const elenco = (dati) => [
    PARTENZA,
    ...(dati.chi === 'cliente' ? CLIENTE : dati.chi === 'nuovo' ? NUOVO : []),
    ...(dati.chi ? RECAPITI : []),
  ]

  const percorso = risposte.chi
  const domande = elenco(risposte)
  const corrente = domande[passo]
  const ultima = passo >= domande.length - 1

  function rispondi(valore) {
    const aggiornate = { ...risposte, [corrente.id]: valore }
    setRisposte(aggiornate)
    setBozza('')

    // Finite le domande si passa al riepilogo, non all'invio diretto:
    // rileggere quello che si è scritto è parte della conversazione.
    if (passo + 1 >= elenco(aggiornate).length) return setStato('riepilogo')
    setPasso(passo + 1)
  }

  function ricomincia() {
    setRisposte({})
    setPasso(0)
    setBozza('')
    setStato('domande')
  }

  function indietro() {
    if (passo === 0) return
    setBozza('')
    setPasso(passo - 1)
  }

  /** Le risposte in chiaro, nell'ordine in cui sono state date. */
  function riepilogo(dati) {
    const cliente = dati.chi === 'cliente'
    const livello = urgenze.find((u) => u.value === dati.urgenza)

    const righe = cliente
      ? [
          ['Azienda', dati.azienda],
          ['Software', dati.progetto],
          ['Tipo di richiesta', dati.tipo],
          ['Urgenza', livello ? `${livello.label} — ${livello.sla}` : '—'],
          ['Cosa succede', dati.descrizione],
          ['Da quando', dati.daQuando],
          ['Chi vi segue', dati.operatore],
        ]
      : [
          ['Di cosa ha bisogno', dati.progetto],
          ['Situazione attuale', dati.messaggio],
          ['Quando partire', dati.quando],
        ]

    return [
      ...righe,
      ['Nome', dati.nome],
      ['Email', dati.email],
      ['Telefono', dati.telefono || '—'],
    ].filter(([, valore]) => valore)
  }

  /**
   * Invio della richiesta.
   *
   * TODO: `ENDPOINT` è il solo punto da collegare — un tuo servizio, Formspree,
   * Resend o direttamente il gestionale dei ticket. Finché è vuoto la
   * conversazione arriva in fondo ma avvisa che la richiesta non è partita, e
   * mostra i recapiti diretti: meglio dirlo che far credere di aver inviato.
   */
  async function invia(dati) {
    setStato('invio')

    if (!ENDPOINT) {
      setStato('scollegato')
      return
    }

    try {
      const risposta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: dati.chi === 'cliente' ? 'ticket' : 'richiesta',
          ...dati,
        }),
      })
      setStato(risposta.ok ? 'inviato' : 'errore')
    } catch {
      setStato('errore')
    }
  }

  const avanzamento = domande.length > 1 ? (passo / (domande.length - 1)) * 100 : 0

  return (
    <section className="on-dark relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div aria-hidden="true" className="aurora">
        <span />
        <span />
        <span />
      </div>
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-25" />

      {/* Avanzamento della conversazione */}
      <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-line-muted">
        <motion.span
          className="block h-full origin-left bg-success"
          animate={{ scaleX: avanzamento / 100 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ width: '100%' }}
        />
      </div>

      <div className="shell relative flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20">
        {stato !== 'domande' ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="max-w-3xl"
          >
            {stato === 'riepilogo' ? (
              <>
                <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
                  ultimo passo
                </p>
                <h1 className="display display-hero-split mt-6 leading-[1.08]">
                  Ecco cosa ci hai detto.
                </h1>
                <p className="mt-5 text-lg text-fg-muted">
                  Rileggi: se qualcosa non torna puoi tornare indietro e correggerlo.
                </p>

                <dl className="mt-10 border-t border-line-muted">
                  {riepilogo(risposte).map(([etichetta, valore]) => (
                    <div
                      key={etichetta}
                      className="grid gap-1 border-b border-line-muted py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <dt className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
                        {etichetta}
                      </dt>
                      <dd className="text-[15px] leading-relaxed text-fg">{valore}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    trailingIcon="arrowRight"
                    onClick={() => invia(risposte)}
                  >
                    {risposte.chi === 'cliente' ? 'Apri il ticket' : 'Invia la richiesta'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setStato('domande')}
                    className="text-sm text-fg-muted hover:text-fg"
                  >
                    torna alle domande
                  </button>
                </div>
              </>
            ) : stato === 'invio' ? (
              <>
                <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
                  invio in corso
                </p>
                <h1 className="display display-hero-split mt-6">Un attimo…</h1>
              </>
            ) : stato === 'inviato' ? (
              <>
                <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-canvas text-success">
                  <Icon name="check" size={22} />
                </span>
                <h1 className="display display-hero-split mt-7">
                  {risposte.chi === 'cliente' ? 'Ticket aperto.' : 'Richiesta ricevuta.'}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
                  {risposte.chi === 'cliente'
                    ? 'È in coda con l’urgenza che hai dichiarato. Ti scriviamo appena qualcuno la prende in carico.'
                    : 'La legge chi seguirà il progetto, non un centralino. Rispondiamo entro un giorno lavorativo.'}
                </p>
                <Button variant="default" size="md" icon="play" className="mt-8" onClick={ricomincia}>
                  Manda un’altra richiesta
                </Button>
              </>
            ) : (
              <>
                <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-canvas text-attention">
                  <Icon name="issue" size={22} />
                </span>
                <h1 className="display display-hero-split mt-7">Non è partita.</h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
                  Preferiamo dirtelo invece di far finta di niente. Scrivici direttamente: le tue
                  risposte sono ancora qui sopra, basta un copia e incolla.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button href={`mailto:${company.email}`} variant="primary" size="lg" icon="mail">
                    {company.email}
                  </Button>
                  <a href={company.phoneHref} className="text-sm text-fg-muted hover:text-fg">
                    {company.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => setStato('riepilogo')}
                    className="text-sm text-fg-muted hover:text-fg"
                  >
                    riprova
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <>
            <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
              contatti · domanda {passo + 1}
              {percorso ? ` di ${domande.length}` : ''}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={corrente.id + passo}
                initial={ridotto ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={ridotto ? { opacity: 0 } : { opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-6 max-w-3xl"
              >
                <h1 className="display display-hero-split leading-[1.08]">{corrente.domanda}</h1>
                {corrente.aiuto && (
                  <p className="mt-4 text-[17px] text-fg-muted">{corrente.aiuto}</p>
                )}

                <div className="mt-10">
                  {/* Scelte: un clic e si va avanti */}
                  {corrente.tipo === 'scelte' && (
                    <div className="flex flex-wrap gap-2.5">
                      {corrente.scelte.map((s) => (
                        <button
                          key={s.valore}
                          type="button"
                          onClick={() => rispondi(s.valore)}
                          className="group flex items-center gap-2.5 rounded-full border border-line px-5 py-3 text-left text-[15px] text-fg transition-colors hover:border-success hover:bg-success-subtle"
                        >
                          {s.icona && <Icon name={s.icona} size={16} className="text-success" />}
                          {s.etichetta}
                          <Icon
                            name="arrowRight"
                            size={14}
                            className="text-fg-subtle transition-transform group-hover:translate-x-0.5"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Urgenza: le quattro fasce con la loro definizione */}
                  {corrente.tipo === 'urgenza' && (
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {urgenze.map((u) => (
                        <button
                          key={u.value}
                          type="button"
                          onClick={() => rispondi(u.value)}
                          className="rounded-xl border p-4 text-left transition-colors"
                          style={{ borderColor: 'var(--color-line)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = u.tono)}
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = 'var(--color-line)')
                          }
                        >
                          <span className="block font-semibold" style={{ color: u.tono }}>
                            {u.label}
                          </span>
                          <span className="mt-1 block text-[13px] leading-snug text-fg-muted">
                            {u.desc}
                          </span>
                          <span className="mt-2 block font-mono text-[11px] text-fg-subtle">
                            {u.sla}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Testo: si scrive e si conferma */}
                  {['testo', 'email', 'testo-lungo'].includes(corrente.tipo) && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (corrente.obbligatorio && !bozza.trim()) return
                        rispondi(bozza.trim())
                      }}
                    >
                      {corrente.tipo === 'testo-lungo' ? (
                        <textarea
                          autoFocus
                          rows={3}
                          value={bozza}
                          onChange={(e) => setBozza(e.target.value)}
                          placeholder="Scrivi qui…"
                          className={`${campo} resize-none border-b border-line pb-3`}
                        />
                      ) : (
                        <input
                          autoFocus
                          type={corrente.tipo === 'email' ? 'email' : 'text'}
                          value={bozza}
                          onChange={(e) => setBozza(e.target.value)}
                          placeholder={corrente.segnaposto}
                          className={`${campo} border-b border-line pb-3`}
                        />
                      )}

                      <div className="mt-7 flex items-center gap-4">
                        <Button type="submit" variant="primary" size="lg" trailingIcon="arrowRight">
                          {ultima ? 'Invia' : 'Avanti'}
                        </Button>
                        {!corrente.obbligatorio && (
                          <button
                            type="button"
                            onClick={() => rispondi('')}
                            className="text-sm text-fg-muted hover:text-fg"
                          >
                            salta
                          </button>
                        )}
                        <span className="hidden font-mono text-[11px] text-fg-subtle sm:inline">
                          invio ↵
                        </span>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Piede: indietro e recapiti diretti */}
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3">
              {passo > 0 && (
                <button
                  type="button"
                  onClick={indietro}
                  className="group flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
                >
                  <Icon
                    name="arrowRight"
                    size={14}
                    className="transition-transform group-hover:-translate-x-0.5"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  indietro
                </button>
              )}

              <a
                href={`mailto:${company.email}`}
                className="font-mono text-[11px] text-fg-subtle hover:text-fg"
              >
                {company.email}
              </a>
              <a
                href={company.phoneHref}
                className="font-mono text-[11px] text-fg-subtle hover:text-fg"
              >
                {company.phone}
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
