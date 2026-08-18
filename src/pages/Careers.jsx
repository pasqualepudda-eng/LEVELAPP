import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { company } from '../data/content'
import { PASSI_TEST, domandeCandidatura, fondoDomande, ruoli } from '../data/careers'
import Icon from '../components/ui/Icon'
import { Link } from '../lib/router'
import Button from '../components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { EASE } from '../lib/motion'

/**
 * "Lavora con noi" è costruita attorno a un oggetto solo: il badge.
 *
 * A sinistra c'è un tesserino vuoto che si compila mentre si va avanti — prende
 * il colore del ruolo scelto, riempie un pallino per ogni risposta e alla fine
 * si prende il timbro con il punteggio. A destra scorre il percorso: scelta del
 * ruolo, dieci domande, esito e candidatura.
 *
 * Il test è diverso ogni volta: le domande vengono pescate a caso dal fondo del
 * ruolo (specifiche più trasversali) e anche le risposte vengono mescolate,
 * quindi non gira una versione da imparare a memoria. Nessun esito viene
 * salvato: ricaricando la pagina si riparte dalla scelta del ruolo.
 */

const campo = 'field'
const etichetta = 'block font-mono text-[11px] tracking-wider text-fg-subtle uppercase'

/** Mescola una copia dell'array (Fisher-Yates). */
function mescola(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

/** Estrae le domande del test e mescola anche l'ordine delle risposte. */
function componiTest(ruoloId) {
  return mescola(fondoDomande(ruoloId))
    .slice(0, PASSI_TEST)
    .map((domanda) => {
      const ordine = mescola(domanda.opzioni.map((testo, i) => ({ testo, i })))
      return {
        ...domanda,
        opzioni: ordine.map((o) => o.testo),
        giusta: ordine.findIndex((o) => o.i === domanda.giusta),
      }
    })
}

/** Barre del codice a barre: larghezze fisse, ricavate dal numero del badge. */
function barre(seme) {
  const cifre = [...String(seme)].map(Number)
  return Array.from({ length: 34 }, (_, i) => (cifre[i % cifre.length] % 3) + 1)
}

/* ------------------------------------------------------------------ */

/** Il tesserino: cambia stato insieme al percorso. */
function Badge({ ruolo, accent, fase, fatte, totale, punteggio, matricola, nome }) {
  const idoneo = punteggio >= 8

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-canvas shadow-float">
      {/* Fascia del ruolo + gancio del cordino */}
      <div className="relative h-24" style={{ backgroundColor: accent }}>
        <span className="absolute top-4 left-1/2 h-2 w-14 -translate-x-1/2 rounded-full bg-canvas/70" />
        <span className="absolute right-4 bottom-3 font-mono text-[11px] text-white/80">
          {company.name.toUpperCase()}
        </span>
      </div>

      <div className="p-5">
        {/* Riquadro foto: resta vuoto finché non si sceglie il ruolo */}
        <div className="-mt-12 flex items-end gap-4">
          <span
            className="flex size-20 shrink-0 items-center justify-center rounded-xl border-2 border-canvas bg-canvas-subtle"
            style={{ color: accent }}
          >
            <Icon name={ruolo?.icon ?? 'users'} size={30} />
          </span>
          <span className="pb-1 font-mono text-[11px] text-fg-subtle">{matricola}</span>
        </div>

        <p className="mt-4 text-lg font-semibold text-fg">{nome || 'Candidato/a'}</p>
        <p className="text-sm" style={{ color: accent }}>
          {ruolo ? ruolo.label : 'ruolo da scegliere'}
        </p>

        {/* Avanzamento della prova, un pallino per domanda */}
        <div className="mt-5 border-t border-line-muted pt-4">
          <p className="flex items-center justify-between font-mono text-[11px] text-fg-subtle">
            <span>prova pratica</span>
            <span>
              {String(fatte).padStart(2, '0')} / {String(totale).padStart(2, '0')}
            </span>
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {Array.from({ length: totale }, (_, i) => (
              <motion.span
                key={i}
                animate={{ scale: i === fatte - 1 ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="size-2.5 rounded-full"
                style={{ backgroundColor: i < fatte ? accent : 'var(--color-line)' }}
              />
            ))}
          </div>
        </div>

        {/* Codice a barre: c'è sempre, è la parte "stampata" del tesserino */}
        <div className="mt-5 flex h-8 items-end gap-[3px]" aria-hidden="true">
          {barre(matricola).map((larghezza, i) => (
            <span
              key={i}
              className="h-full bg-fg"
              style={{ width: larghezza, opacity: i % 3 === 0 ? 0.85 : 0.45 }}
            />
          ))}
        </div>
      </div>

      {/* Timbro: arriva solo a test finito */}
      <AnimatePresence>
        {(fase === 'esito' || fase === 'inviato') && (
          <motion.div
            initial={{ opacity: 0, scale: 1.6, rotate: -22 }}
            animate={{ opacity: 1, scale: 1, rotate: -11 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="pointer-events-none absolute right-4 bottom-5 rounded-lg border-[3px] px-3 py-1"
            style={{
              borderColor: idoneo ? 'var(--color-success)' : 'var(--color-attention)',
              color: idoneo ? 'var(--color-success)' : 'var(--color-attention)',
            }}
          >
            <p data-test="punteggio" className="font-mono text-xl font-bold">
              {punteggio}/{totale}
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase">
              {idoneo ? 'da incontrare' : 'in valutazione'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export default function Careers() {
  const [ruoloId, setRuoloId] = useState(null)
  const [test, setTest] = useState([])
  const [passo, setPasso] = useState(0)
  const [risposte, setRisposte] = useState([])
  const [fase, setFase] = useState('ruolo') // ruolo | test | esito | inviato
  const [nome, setNome] = useState('')

  /* La matricola si genera una volta sola e resta la stessa per tutta la visita. */
  const [matricola] = useState(
    () => `LA-2026-${String(Math.floor(1000 + Math.random() * 8999))}`,
  )

  const ruolo = ruoli.find((r) => r.id === ruoloId) ?? null
  const accent = ruolo?.accent ?? 'var(--color-fg-subtle)'

  const punteggio = useMemo(
    () => risposte.reduce((tot, scelta, i) => tot + (scelta === test[i]?.giusta ? 1 : 0), 0),
    [risposte, test],
  )

  function iniziaTest(id) {
    setRuoloId(id)
    setTest(componiTest(id))
    setRisposte([])
    setPasso(0)
    setFase('test')
  }

  function rispondi(indice) {
    const aggiornate = [...risposte]
    aggiornate[passo] = indice
    setRisposte(aggiornate)

    if (passo + 1 >= test.length) setFase('esito')
    else setPasso(passo + 1)
  }

  function rifai() {
    setTest(componiTest(ruoloId))
    setRisposte([])
    setPasso(0)
    setFase('test')
  }

  function ricomincia() {
    setRuoloId(null)
    setFase('ruolo')
  }

  /* Durante il test si può rispondere anche da tastiera, con i numeri. */
  useEffect(() => {
    if (fase !== 'test') return
    const suTasto = (e) => {
      const n = Number(e.key)
      if (n >= 1 && n <= (test[passo]?.opzioni.length ?? 0)) rispondi(n - 1)
    }
    window.addEventListener('keydown', suTasto)
    return () => window.removeEventListener('keydown', suTasto)
  })

  /**
   * Invio: apre il client di posta con tutte le risposte già scritte.
   * TODO: per ricevere le candidature via API (e allegare il CV in automatico)
   * sostituisci `window.location.href` con una fetch verso il tuo endpoint.
   */
  function onSubmit(event) {
    event.preventDefault()
    const dati = Object.fromEntries(new FormData(event.currentTarget))

    const corpo = [
      `Ruolo: ${ruolo.label}`,
      `Matricola della prova: ${matricola}`,
      `Esito del test: ${punteggio}/${test.length}`,
      '',
      `Nome: ${dati.nome}`,
      `Email: ${dati.email}`,
      `Telefono: ${dati.telefono || '—'}`,
      ...domandeCandidatura.map((d) => `${d.label}: ${dati[d.name] || '—'}`),
      '',
      `Curriculum: ${dati.cv || '(da allegare a questa email)'}`,
      '',
      'Domande del test e risposte date:',
      ...test.map(
        (d, i) =>
          `${i + 1}. ${d.d}\n   → ${d.opzioni[risposte[i]]} ${
            risposte[i] === d.giusta ? '(corretta)' : '(errata)'
          }`,
      ),
    ].join('\n')

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      `Candidatura ${ruolo.label} — ${dati.nome}`,
    )}&body=${encodeURIComponent(corpo)}`

    setFase('inviato')
  }

  const fatte = fase === 'ruolo' ? 0 : risposte.filter((r) => r !== undefined).length
  const totale = test.length || PASSI_TEST

  return (
    <>
      {/* Testata: nessun sommario, solo le regole della prova */}
      <section className="relative overflow-hidden border-b border-line-muted">
        <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative py-14 md:py-16">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] text-fg-subtle uppercase">
              Lavora con noi · posizioni aperte
            </p>
            <h1 className="display display-section mt-5 max-w-3xl">
              Prima il lavoro vero, poi il curriculum
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {[
                ['10 domande', 'sul mestiere, non sulla teoria'],
                ['diverse ogni volta', 'pescate a caso, risposte mescolate'],
                ['niente da preparare', 'nessun esito viene salvato'],
              ].map(([titolo, sotto]) => (
                <li key={titolo} className="bg-canvas p-5">
                  <p className="font-semibold text-fg">{titolo}</p>
                  <p className="mt-1 text-sm text-fg-muted">{sotto}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="test" className="border-b border-line-muted py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-14">
          {/* Il badge resta a fianco per tutto il percorso */}
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <Badge
              ruolo={ruolo}
              accent={accent}
              fase={fase}
              fatte={fatte}
              totale={totale}
              punteggio={punteggio}
              matricola={matricola}
              nome={nome}
            />
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-fg-subtle">
              <Icon name="lightbulb" size={13} className="mt-0.5 shrink-0" />
              Il tesserino si compila da sé mentre vai avanti. È solo tuo: niente esce da questa
              pagina finché non invii la candidatura.
            </p>
          </Reveal>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {/* --- Scelta del ruolo --- */}
              {fase === 'ruolo' && (
                <motion.div
                  key="ruolo"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h2 className="display text-3xl sm:text-4xl">Che ruolo vuoi ricoprire?</h2>
                  <p className="mt-3 max-w-xl text-fg-muted">
                    La scelta cambia le domande. Cinque minuti, non si mette in pausa.
                  </p>

                  <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2">
                    {ruoli.map((r, i) => (
                      <RevealItem key={r.id}>
                        <button
                          type="button"
                          onClick={() => iniziaTest(r.id)}
                          className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-canvas p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
                        >
                          {/* Fascia del ruolo, come sul badge */}
                          <span
                            className="absolute inset-x-0 top-0 h-1.5 transition-all duration-300 group-hover:h-2.5"
                            style={{ backgroundColor: r.accent }}
                          />

                          <span className="flex items-center gap-3 pt-2">
                            <span
                              className="flex size-9 items-center justify-center rounded-lg border border-line bg-canvas-subtle"
                              style={{ color: r.accent }}
                            >
                              <Icon name={r.icon} size={17} />
                            </span>
                            <span className="font-semibold text-fg">{r.label}</span>
                            <span className="ml-auto font-mono text-[11px] text-fg-subtle">
                              0{i + 1}
                            </span>
                          </span>

                          <span className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">
                            {r.desc}
                          </span>

                          <span className="mt-4 flex flex-wrap gap-1.5">
                            {r.cerchiamo.map((c) => (
                              <span
                                key={c}
                                className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-fg-muted"
                              >
                                {c}
                              </span>
                            ))}
                          </span>

                          <span
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                            style={{ color: r.accent }}
                          >
                            Stampa il badge e inizia
                            <Icon
                              name="arrowRight"
                              size={14}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </span>
                        </button>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </motion.div>
              )}

              {/* --- Test --- */}
              {fase === 'test' && (
                <motion.div
                  key="test"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-fg-subtle">
                      domanda {passo + 1} di {test.length}
                    </span>
                    <span className="hidden items-center gap-1.5 font-mono text-[11px] text-fg-subtle sm:flex">
                      <Icon name="terminal" size={12} />
                      rispondi anche con i tasti 1–{test[passo].opzioni.length}
                    </span>
                  </div>

                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line-muted">
                    <motion.div
                      className="h-full rounded-full"
                      animate={{ width: `${(passo / test.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{ backgroundColor: accent }}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={passo}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.28, ease: EASE }}
                    >
                      <p
                        data-test="domanda"
                        className="mt-8 text-2xl leading-snug font-semibold text-balance text-fg md:text-3xl"
                      >
                        {test[passo].d}
                      </p>

                      <ul className="mt-8 space-y-2.5">
                        {test[passo].opzioni.map((opzione, i) => (
                          <li key={opzione}>
                            <button
                              type="button"
                              data-test="opzione"
                              onClick={() => rispondi(i)}
                              className="group flex w-full items-start gap-4 rounded-xl border border-line bg-canvas p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float"
                              style={{ borderLeftWidth: 3, borderLeftColor: 'var(--color-line)' }}
                              onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = accent)}
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.borderLeftColor = 'var(--color-line)')
                              }
                            >
                              <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-line font-mono text-xs text-fg-subtle transition-colors group-hover:border-fg-subtle group-hover:text-fg">
                                {i + 1}
                              </span>
                              <span className="pt-0.5 text-[15px] leading-relaxed text-fg">
                                {opzione}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>

                  <p className="mt-6 text-xs text-fg-subtle">
                    Non si torna indietro e non c’è un timer. Rispondi come faresti al lavoro.
                  </p>
                </motion.div>
              )}

              {/* --- Esito + candidatura --- */}
              {(fase === 'esito' || fase === 'inviato') && (
                <motion.div
                  key="esito"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h2 className="display text-3xl sm:text-4xl">
                    {punteggio >= 8
                      ? 'Prova superata. Ci interessa parlarti.'
                      : punteggio >= 5
                        ? 'Buona prova: ora raccontaci cosa hai costruito.'
                        : 'Il punteggio non chiude niente: contano i progetti.'}
                  </h2>
                  <p className="mt-3 max-w-xl text-fg-muted">
                    {punteggio} risposte corrette su {test.length}. Il dettaglio è qui sotto, e
                    parte insieme alla candidatura: non c’è niente da nascondere.
                  </p>

                  {fase === 'esito' && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Button variant="default" size="sm" icon="play" onClick={rifai}>
                        Rifai il test (domande nuove)
                      </Button>
                      <Button variant="invisible" size="sm" onClick={ricomincia}>
                        Cambia ruolo
                      </Button>
                    </div>
                  )}

                  {/* Correzione */}
                  <details className="mt-8 rounded-xl border border-line bg-canvas-subtle p-5">
                    <summary className="cursor-pointer text-sm font-semibold text-fg">
                      Vedi domanda per domanda
                    </summary>
                    <ol className="mt-4 space-y-4">
                      {test.map((d, i) => {
                        const giusto = risposte[i] === d.giusta
                        return (
                          <li
                            key={d.d}
                            className="border-t border-line-muted pt-3 first:border-0 first:pt-0"
                          >
                            <p className="flex items-start gap-2 text-sm font-medium text-fg">
                              <Icon
                                name={giusto ? 'check' : 'x'}
                                size={14}
                                className={`mt-1 shrink-0 ${giusto ? 'text-success' : 'text-danger'}`}
                              />
                              {d.d}
                            </p>
                            {!giusto && (
                              <p className="mt-1.5 pl-6 text-[13px] text-fg-muted">
                                Risposta corretta:{' '}
                                <span className="text-fg">{d.opzioni[d.giusta]}</span>
                              </p>
                            )}
                            <p className="mt-1.5 pl-6 text-[13px] leading-relaxed text-fg-muted">
                              {d.spiega}
                            </p>
                          </li>
                        )
                      })}
                    </ol>
                  </details>

                  {fase === 'inviato' ? (
                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-canvas p-6">
                      <Icon name="check" size={18} className="mt-0.5 shrink-0 text-success" />
                      <div>
                        <p className="font-semibold text-fg">Si è aperta la tua email</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                          Il messaggio contiene già le tue risposte, la matricola {matricola} e i
                          dati che hai inserito.{' '}
                          <strong className="text-fg">Allega il curriculum</strong> prima di
                          inviarlo: da qui non possiamo caricarlo per te. Rispondiamo entro pochi
                          giorni lavorativi.
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Modulo di candidatura: campi in fila, etichette in mono */
                    <form onSubmit={onSubmit} className="mt-8 border-t border-line pt-8">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-lg font-semibold text-fg">Completa il badge</h3>
                        <span className="font-mono text-[11px] text-fg-subtle">{matricola}</span>
                      </div>

                      <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="nome" className={etichetta}>
                            Nome e cognome *
                          </label>
                          <input
                            id="nome"
                            name="nome"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className={`mt-1.5 ${campo}`}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className={etichetta}>
                            Email *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className={`mt-1.5 ${campo}`}
                          />
                        </div>
                        <div>
                          <label htmlFor="telefono" className={etichetta}>
                            Telefono
                          </label>
                          <input id="telefono" name="telefono" className={`mt-1.5 ${campo}`} />
                        </div>

                        {domandeCandidatura.map((d) => (
                          <div key={d.name} className={d.tipo === 'textarea' ? 'sm:col-span-2' : ''}>
                            <label htmlFor={d.name} className={etichetta}>
                              {d.label}
                              {d.obbligatorio && ' *'}
                            </label>

                            {d.tipo === 'select' ? (
                              <select id={d.name} name={d.name} className={`mt-1.5 ${campo}`}>
                                {d.opzioni.map((o) => (
                                  <option key={o} value={o}>
                                    {o}
                                  </option>
                                ))}
                              </select>
                            ) : d.tipo === 'textarea' ? (
                              <textarea
                                id={d.name}
                                name={d.name}
                                rows={4}
                                required={d.obbligatorio}
                                placeholder={d.placeholder}
                                className={`mt-1.5 ${campo} resize-y`}
                              />
                            ) : (
                              <input
                                id={d.name}
                                name={d.name}
                                placeholder={d.placeholder}
                                className={`mt-1.5 ${campo}`}
                              />
                            )}
                          </div>
                        ))}

                        <div className="sm:col-span-2">
                          <label htmlFor="cv" className={etichetta}>
                            Curriculum *
                          </label>
                          <input
                            id="cv"
                            name="cv"
                            type="file"
                            required
                            accept=".pdf,.doc,.docx"
                            className={`mt-1.5 ${campo} file:mr-3 file:rounded-md file:border-0 file:bg-canvas-subtle file:px-3 file:py-1 file:text-sm file:text-fg`}
                          />
                          <p className="mt-1.5 text-xs text-fg-subtle">
                            Il file non viene caricato da qui: quando invii, si apre la tua email
                            con tutto già scritto e ti basta allegarlo.
                          </p>
                        </div>

                        <label className="flex items-start gap-2.5 text-sm text-fg-muted sm:col-span-2">
                          <input
                            type="checkbox"
                            required
                            className="mt-1 accent-[var(--color-success-emphasis)]"
                          />
                          <span>
                            Ho letto la{' '}
                            <Link to="/privacy" className="link">
                              privacy policy
                            </Link>{' '}
                            e acconsento al trattamento dei dati per la selezione. *
                          </span>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        trailingIcon="arrowRight"
                        className="mt-7"
                      >
                        Invia la candidatura
                      </Button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}
