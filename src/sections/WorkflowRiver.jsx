import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cases, stats } from '../data/content'
import Counter from '../components/ui/Counter'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Il percorso da processo (o idea) fino alla produzione, disegnato come una
 * linea che si riempie mentre si scorre la pagina.
 *
 * Due ingressi diversi — un processo che costa ore, un'intuizione senza
 * software — confluiscono nello stesso binario: è esattamente ciò che dice il
 * testo, e vederlo vale più che leggerlo. La linea è legata allo scorrimento
 * (`useScroll`), quindi avanza col lettore invece di partire da sola.
 */

const proof = cases.find((c) => c.quote) ?? cases[0]
const renewal = stats.find((stat) => stat.label === 'Clienti che rinnovano') ?? stats[2]

const INGRESSI = [
  {
    icon: 'workflow',
    title: 'Un processo che ti costa ore',
    body: 'Preventivi, turni, pratiche, magazzino: qualcosa che oggi si fa a mano o su fogli sparsi.',
  },
  {
    icon: 'lightbulb',
    title: 'Un’idea senza software',
    body: 'Un servizio che nel tuo settore non esiste, o una competenza che potrebbe diventare prodotto.',
  },
]

const TAPPE = [
  {
    id: 'analisi',
    label: 'Analisi',
    tempo: '2–3 giorni',
    body: 'Guardiamo il processo com’è davvero e scriviamo il perimetro del primo rilascio.',
    icon: 'search',
  },
  {
    id: 'prototipo',
    label: 'Prototipo',
    tempo: '3–5 giorni',
    body: 'Schermate navigabili davanti a chi le userà, prima che costi cambiarle.',
    icon: 'browser',
  },
  {
    id: 'sviluppo',
    label: 'Sviluppo',
    tempo: 'sprint da 1 settimana',
    body: 'Demo il venerdì, revisione del codice e test automatici su ogni modifica.',
    icon: 'code',
  },
  {
    id: 'produzione',
    label: 'Produzione',
    tempo: 'entro la 4ª settimana',
    body: 'Migrazione provata due volte, formazione, monitoraggio e supporto con SLA.',
    icon: 'rocket',
  },
]

/** Cosa ti resta in mano alla fine: è il punto d'arrivo del binario. */
const CONSEGNA = [
  { label: 'Repository e cronologia dei commit', meta: 'git' },
  { label: 'Documentazione e manuale utente', meta: 'md' },
  { label: 'Infrastruttura e credenziali', meta: 'cloud' },
  { label: 'Proprietà intellettuale', meta: 'ip' },
]

export default function WorkflowRiver() {
  const binario = useRef(null)

  // La linea si riempie mentre la sezione attraversa lo schermo.
  const { scrollYProgress } = useScroll({
    target: binario,
    offset: ['start 80%', 'end 55%'],
  })
  const avanzamento = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="flusso" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <Reveal as="h2" className="display display-section max-w-4xl">
          Dal processo o dall’idea, fino alla produzione
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
          Che si parta da un processo che ti costa ore o da un’intuizione che nel tuo settore non ha
          ancora un software, il binario è lo stesso: un solo team segue analisi, codice e
          infrastruttura fino alla messa in produzione.
        </Reveal>

        {/* Due ingressi che confluiscono */}
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {INGRESSI.map((ingresso, i) => (
            <Reveal key={ingresso.title} delay={i * 0.08}>
              <div className="relative flex h-full items-start gap-3 rounded-xl border border-dashed border-line p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-fg-muted">
                  <Icon name={ingresso.icon} size={16} />
                </span>
                <span>
                  <span className="block font-semibold text-fg">{ingresso.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-fg-muted">
                    {ingresso.body}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Le due strade si uniscono nel binario */}
        <div className="relative mx-auto h-10 w-px">
          <span className="absolute inset-0 bg-linear-to-b from-line to-accent" />
        </div>

        {/* Binario: linea che si riempie con lo scorrimento */}
        <div ref={binario} className="relative">
          {/* Rotaia orizzontale, da 768px in su */}
          <div className="absolute inset-x-0 top-[2.35rem] hidden h-px bg-line-muted md:block">
            <motion.span
              className="block h-px origin-left bg-accent"
              style={{ scaleX: avanzamento }}
            />
          </div>
          {/* Rotaia verticale sotto i 768px */}
          <div className="absolute top-0 bottom-0 left-[1.15rem] w-px bg-line-muted md:hidden">
            <motion.span
              className="block h-full w-px origin-top bg-accent"
              style={{ scaleY: avanzamento }}
            />
          </div>

          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            {TAPPE.map((tappa, i) => (
              <motion.li
                key={tappa.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="group relative flex gap-4 pl-12 md:block md:pl-0"
              >
                {/* Nodo sul binario */}
                <span className="absolute top-4 left-0 flex size-9 items-center justify-center rounded-full border border-line bg-canvas text-fg-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent md:static md:mb-5">
                  <Icon name={tappa.icon} size={16} />
                </span>

                <div className="min-w-0 pb-2 md:pb-0">
                  <p className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                    <span className="text-lg font-semibold text-fg">{tappa.label}</span>
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-accent">{tappa.tempo}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{tappa.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Punto d'arrivo: la consegna */}
        <Reveal delay={0.1} className="mt-14">
          <div className="card card-accent grid gap-8 p-6 md:grid-cols-[1fr_22rem] md:items-center md:p-8">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-success">
                <span className="inline-block h-px w-6 bg-success" />
                Fine del binario
              </p>
              <h3 className="display display-sub mt-4">Alla fine è tuo, non nostro</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                Repository, dati, ambienti e proprietà intellettuale sono intestati alla tua azienda
                dal primo commit. Alla consegna ricevi tutto: puoi proseguire con noi, portare lo
                sviluppo in casa o affidarlo a chi vuoi.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div>
                  <p className="display text-4xl text-success">
                    <Counter value={renewal.value} suffix={renewal.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-fg-muted">{renewal.label}</p>
                </div>

                <figure className="min-w-0 max-w-sm border-l border-line-muted pl-5">
                  <blockquote className="text-sm leading-relaxed text-fg">
                    “{proof.quote}”
                  </blockquote>
                  <figcaption className="mt-2 text-xs text-fg-muted">
                    <Link to={`/progetti/${proof.id}`} className="font-semibold text-fg hover:text-accent">
                      {proof.client}
                    </Link>{' '}
                    · {proof.author}
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* La consegna, voce per voce */}
            <div
              aria-hidden="true"
              className="overflow-hidden rounded-lg border border-line bg-canvas"
            >
              <div className="flex items-center gap-2 border-b border-line bg-canvas-subtle px-3 py-2">
                <Icon name="lock" size={13} className="text-fg-subtle" />
                <span className="font-mono text-[11px] text-fg-muted">consegna-progetto</span>
                <span className="ml-auto rounded-full border border-success px-2 py-0.5 text-[10px] font-medium text-success">
                  intestato a te
                </span>
              </div>

              <ul>
                {CONSEGNA.map((riga) => (
                  <li
                    key={riga.label}
                    className="flex items-center gap-2.5 border-b border-line-muted px-3 py-2.5 text-xs last:border-0"
                  >
                    <Icon name="check" size={13} className="shrink-0 text-success" />
                    <span className="min-w-0 flex-1 truncate text-fg">{riga.label}</span>
                    <span className="font-mono text-[10px] text-fg-subtle">{riga.meta}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-line bg-canvas-subtle px-3 py-2 font-mono text-[11px] text-fg-muted">
                consegna completa · nessuna dipendenza da noi
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
