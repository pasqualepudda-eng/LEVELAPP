import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { integrations } from '../data/content'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Icon from '../components/ui/Icon'
import { EASE } from '../lib/motion'
import { useMediaQuery, usePrefersReducedMotion } from '../lib/useMediaQuery'

/**
 * Ecosistema come un centralino vivo: il software su misura al centro, i
 * sistemi che usi già in orbita attorno, e lungo i cavi viaggiano i dati.
 *
 * - ogni pacchetto è un evento vero (ordine, fattura, ticket…): quando arriva
 *   a destinazione il nodo pulsa e l'evento compare nel registro accanto
 * - passando sopra (o toccando) un sistema, gli altri si spengono e il suo
 *   canale si fa fitto: si vede cosa scambia e in che verso
 * - il ciclo gira solo quando la sezione è a schermo; con
 *   `prefers-reduced-motion` restano i cavi e un registro fermo
 *
 * I pacchetti non passano da React: la posizione si scrive direttamente sui
 * cerchi SVG a ogni frame, lo stato si aggiorna solo quando un evento arriva.
 */

/* Cosa scambia ogni sistema: verso (in = entra nel gestionale) e nome evento. */
const EVENTI = {
  SAP: [['in', 'ordine.importato'], ['out', 'commessa.creata']],
  Shopify: [['in', 'ordine.creato'], ['out', 'giacenza.aggiornata']],
  HubSpot: [['in', 'lead.qualificato'], ['out', 'opportunita.vinta']],
  Stripe: [['in', 'pagamento.riuscito'], ['in', 'rimborso.emesso']],
  Slack: [['out', 'avviso.inviato'], ['out', 'approvazione.richiesta']],
  Zucchetti: [['in', 'presenze.sincronizzate'], ['out', 'cedolino.pronto']],
  'Google Workspace': [['out', 'evento.calendario'], ['in', 'documento.condiviso']],
  'Microsoft 365': [['out', 'mail.inviata'], ['in', 'utente.creato']],
  'Fatture in Cloud': [['out', 'fattura.emessa'], ['in', 'fattura.pagata']],
  Salesforce: [['in', 'account.aggiornato'], ['out', 'contratto.firmato']],
  Notion: [['out', 'pagina.creata'], ['in', 'task.completato']],
  'WhatsApp Business': [['out', 'conferma.inviata'], ['in', 'messaggio.ricevuto']],
}

/* Geometria in unità di viewBox: una per schermi larghi, una per il telefono.
   Il contenitore ha lo stesso rapporto del viewBox, così le etichette HTML
   (posizionate in percentuale) cadono esattamente sui capi dei cavi. */
const LAYOUT = {
  largo: { w: 1000, h: 560, interno: [260, 150], esterno: [410, 235], rotazione: 0.3 },
  // Sul telefono nessun nodo dell'anello interno cade in orizzontale: lì c'è il nucleo.
  stretto: { w: 400, h: 580, interno: [105, 150], esterno: [126, 255], rotazione: 0 },
}

const MAX_PACCHETTI = 14
const DURATA_MS = 1500

function geometria({ w, h, interno, esterno, rotazione }) {
  const cx = w / 2
  const cy = h / 2
  const meta = Math.ceil(integrations.length / 2)

  return integrations.map((nome, i) => {
    const suInterno = i % 2 === 0
    const k = Math.floor(i / 2)
    const [rx, ry] = suInterno ? interno : esterno
    // I due anelli sono sfalsati di mezzo passo: nessuna etichetta ne copre un'altra.
    const angolo = ((k + (suInterno ? 0 : 0.5)) / meta) * Math.PI * 2 - Math.PI / 2 + rotazione
    const x = cx + Math.cos(angolo) * rx
    const y = cy + Math.sin(angolo) * ry

    // Cavo curvo: il punto di controllo esce di lato rispetto alla retta.
    const mx = (cx + x) / 2
    const my = (cy + y) / 2
    const dx = x - cx
    const dy = y - cy
    const piega = i % 4 < 2 ? 0.22 : -0.22
    const qx = mx - dy * piega
    const qy = my + dx * piega

    return {
      nome,
      x,
      y,
      d: `M ${cx} ${cy} Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`,
    }
  })
}

function ora() {
  return new Date().toLocaleTimeString('it-IT', { hour12: false })
}

export default function Integrations() {
  const largo = useMediaQuery('(min-width: 640px)')
  const ridotto = usePrefersReducedMotion()
  const layout = largo ? LAYOUT.largo : LAYOUT.stretto
  const nodi = useMemo(() => geometria(layout), [layout])

  const scena = useRef(null)
  const inVista = useInView(scena, { amount: 0.2 })

  const cavi = useRef([]) // <path> per nodo
  const cerchi = useRef([]) // <circle> del pool
  const etichette = useRef([]) // chip HTML per nodo
  const centro = useRef(null)
  const volo = useRef([]) // pacchetti in viaggio: { slot, nodo, verso, t0, lunghezza }

  const [scelto, setScelto] = useState(null)
  const sceltoRef = useRef(null)
  sceltoRef.current = scelto

  const [registro, setRegistro] = useState(() =>
    nodi.slice(0, 5).map((n, i) => {
      const [verso, nome] = (EVENTI[n.nome] ?? [['in', 'sync.completata']])[0]
      return { id: `iniziale-${i}`, sistema: n.nome, verso, nome, quando: '—', ms: 40 + i * 7 }
    }),
  )
  const [conteggio, setConteggio] = useState(1284)

  // Ciclo: un generatore mette in volo i pacchetti, un rAF li muove.
  useEffect(() => {
    if (!inVista || ridotto) return
    let frame = 0
    let prossimo = 0
    const pool = cerchi.current

    function pulsa(el, colore) {
      el?.animate(
        [
          { boxShadow: `0 0 0 0 ${colore}` },
          { boxShadow: '0 0 0 10px transparent' },
        ],
        { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      )
    }

    function lancia(adesso) {
      const libero = cerchi.current.findIndex(
        (c, slot) => c && !volo.current.some((p) => p.slot === slot),
      )
      if (libero < 0) return

      const fisso = sceltoRef.current
      const nodo = fisso ?? Math.floor(Math.random() * nodi.length)
      const eventi = EVENTI[nodi[nodo].nome] ?? [['in', 'sync.completata']]
      const [verso, nome] = eventi[Math.floor(Math.random() * eventi.length)]
      const path = cavi.current[nodo]
      if (!path) return

      const cerchio = cerchi.current[libero]
      cerchio.setAttribute('class', verso === 'in' ? 'fill-accent text-accent' : 'fill-purple text-purple')
      volo.current.push({ slot: libero, nodo, verso, nome, t0: adesso, lunghezza: path.getTotalLength() })
    }

    function passo(adesso) {
      if (adesso >= prossimo) {
        lancia(adesso)
        // Canale scelto: più fitto. Altrimenti un ritmo irregolare, meno meccanico.
        prossimo = adesso + (sceltoRef.current != null ? 320 : 380 + Math.random() * 520)
      }

      volo.current = volo.current.filter((p) => {
        const t = Math.min((adesso - p.t0) / DURATA_MS, 1)
        const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2 // ease-in-out
        const path = cavi.current[p.nodo]
        const cerchio = cerchi.current[p.slot]
        if (!path || !cerchio) return false

        const punto = path.getPointAtLength((p.verso === 'in' ? 1 - e : e) * p.lunghezza)
        cerchio.setAttribute('cx', punto.x)
        cerchio.setAttribute('cy', punto.y)
        cerchio.setAttribute('opacity', t < 0.08 ? t / 0.08 : t > 0.92 ? (1 - t) / 0.08 : 1)

        if (t < 1) return true

        // Arrivato: pulsa la destinazione e scrivilo nel registro.
        const colore = p.verso === 'in' ? 'var(--color-accent)' : 'var(--color-purple)'
        pulsa(p.verso === 'in' ? centro.current : etichette.current[p.nodo], colore)
        cerchio.setAttribute('opacity', 0)
        setRegistro((r) =>
          [
            {
              id: `${adesso}-${p.slot}`,
              sistema: nodi[p.nodo].nome,
              verso: p.verso,
              nome: p.nome,
              quando: ora(),
              ms: 18 + Math.round(Math.random() * 60),
            },
            ...r,
          ].slice(0, 5),
        )
        setConteggio((c) => c + 1)
        return false
      })

      frame = requestAnimationFrame(passo)
    }

    frame = requestAnimationFrame(passo)
    return () => {
      cancelAnimationFrame(frame)
      volo.current = []
      pool.forEach((c) => c?.setAttribute('opacity', 0))
    }
  }, [inVista, ridotto, nodi])

  const alterna = (i) => setScelto((v) => (v === i ? null : i))

  return (
    <section id="integrazioni" className="relative overflow-hidden border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Integrazioni"
          title="Si innesta su quello che usi già"
          subtitle="API REST, webhook e sincronizzazioni bidirezionali. Il software nuovo non sostituisce tutto: parla con il resto. Quello che vedi qui sotto è il suo traffico."
          accent="var(--color-purple)"
        />

        {/* Il centralino */}
        <Reveal y={40} className="relative mx-auto mt-10 max-w-5xl md:mt-14">
          <div
            aria-hidden="true"
            className="spot-glow pointer-events-none absolute inset-[15%] opacity-70"
          />

          <div
            ref={scena}
            className="relative w-full"
            style={{ aspectRatio: `${layout.w} / ${layout.h}` }}
            onMouseLeave={() => setScelto(null)}
          >
            <svg
              viewBox={`0 0 ${layout.w} ${layout.h}`}
              className="absolute inset-0 size-full overflow-visible"
              aria-hidden="true"
            >
              {nodi.map((n, i) => {
                const acceso = scelto === i
                const spento = scelto != null && !acceso
                return (
                  <path
                    key={n.nome}
                    ref={(el) => (cavi.current[i] = el)}
                    d={n.d}
                    fill="none"
                    strokeWidth={acceso ? 2 : 1.25}
                    strokeDasharray={acceso ? 'none' : '3 5'}
                    className="transition-[stroke,opacity] duration-300"
                    style={{
                      stroke: acceso ? 'var(--color-purple)' : 'var(--color-line)',
                      opacity: spento ? 0.25 : 1,
                    }}
                  />
                )
              })}

              {Array.from({ length: MAX_PACCHETTI }).map((_, i) => (
                <circle
                  key={i}
                  ref={(el) => (cerchi.current[i] = el)}
                  r={largo ? 4.5 : 4}
                  opacity={0}
                  style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
                />
              ))}
            </svg>

            {/* Nucleo */}
            <div
              ref={centro}
              className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl border border-accent-emphasis bg-canvas px-3 py-2.5 text-center shadow-overlay sm:px-6 sm:py-4"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-fg sm:text-base">
                <span className="relative flex size-2">
                  <span className="animate-pulse-dot absolute inset-0 rounded-full bg-success" />
                  <span className="relative size-2 rounded-full bg-success" />
                </span>
                <span className="sm:hidden">Gestionale</span>
                <span className="hidden sm:inline">Il tuo gestionale</span>
              </span>
              <span className="mt-1 hidden font-mono text-mini text-fg-subtle sm:block">
                {conteggio.toLocaleString('it-IT')} eventi oggi
              </span>
            </div>

            {/* Sistemi in orbita */}
            {nodi.map((n, i) => {
              const acceso = scelto === i
              const spento = scelto != null && !acceso
              return (
                <button
                  key={n.nome}
                  ref={(el) => (etichette.current[i] = el)}
                  type="button"
                  onMouseEnter={() => setScelto(i)}
                  onFocus={() => setScelto(i)}
                  onClick={() => alterna(i)}
                  aria-pressed={acceso}
                  className="absolute flex max-w-[6.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full border bg-canvas-subtle px-2.5 py-1 text-center text-[11px] leading-tight font-medium transition-[color,border-color,opacity,transform] duration-300 sm:max-w-none sm:px-3.5 sm:py-1.5 sm:text-sm sm:whitespace-nowrap"
                  style={{
                    left: `${(n.x / layout.w) * 100}%`,
                    top: `${(n.y / layout.h) * 100}%`,
                    borderColor: acceso ? 'var(--color-purple)' : 'var(--color-line)',
                    color: acceso ? 'var(--color-fg)' : 'var(--color-fg-muted)',
                    opacity: spento ? 0.4 : 1,
                    transform: `translate(-50%, -50%) scale(${acceso ? 1.08 : 1})`,
                  }}
                >
                  <Icon name="plug" size={12} className="hidden shrink-0 text-fg-subtle sm:block" />
                  {n.nome}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Legenda */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-mini text-fg-subtle">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-accent" /> entra nel gestionale
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-purple" /> esce verso il sistema
          </span>
          <span className="hidden sm:inline">· passa sopra un sistema per isolarne il canale</span>
        </div>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="text-2xl font-semibold">Un webhook, e i dati si muovono da soli</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
              Quando qualcosa cambia in un sistema, gli altri lo sanno subito: ordine confermato,
              fattura emessa, spedizione partita. Niente esportazioni notturne, niente file CSV
              passati a mano fra reparti.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                'Log completo di ogni scambio, consultabile senza aprire un ticket',
                'Ritentativi automatici se il sistema di destinazione non risponde',
                'Ambiente di test separato, con dati finti',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] text-fg">
                  <Icon name="check" size={15} className="mt-1 shrink-0 text-purple" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Il registro: gli stessi eventi che si vedono viaggiare sopra */}
          <Reveal delay={0.08} y={32}>
            <div className="overflow-hidden rounded-xl border border-line bg-canvas-inset font-mono text-xs">
              <div className="flex items-center justify-between border-b border-line-muted px-4 py-2.5 text-fg-subtle">
                <span className="flex items-center gap-2">
                  <Icon name="terminal" size={13} />
                  registro eventi
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-success" />
                  in diretta
                </span>
              </div>

              <ul className="h-[13.5rem] overflow-hidden px-4 py-2" aria-live="off">
                <AnimatePresence initial={false}>
                  {registro.map((r) => (
                    <motion.li
                      key={r.id}
                      layout
                      initial={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="grid grid-cols-[4.5rem_1rem_minmax(0,1fr)_2.75rem] items-center gap-2 border-b border-line-muted py-2 last:border-0"
                    >
                      <span className="text-fg-subtle">{r.quando}</span>
                      <span className={r.verso === 'in' ? 'text-accent' : 'text-purple'}>
                        {r.verso === 'in' ? '←' : '→'}
                      </span>
                      <span className="truncate">
                        <span className="text-fg">{r.nome}</span>
                        <span className="text-fg-subtle"> · {r.sistema}</span>
                      </span>
                      <span className="text-right text-success">{r.ms}ms</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <div className="border-t border-line-muted px-4 py-2.5 text-fg-subtle">
                <span className="text-success">✓</span> {conteggio.toLocaleString('it-IT')} eventi
                sincronizzati oggi · 0 in errore
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
