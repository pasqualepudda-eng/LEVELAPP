import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Icon from './ui/Icon'

/**
 * Il prima e il dopo raccontati da un pannello che resta fermo mentre il testo
 * scorre: gli strumenti sparsi — fogli, email, messaggi, il gestionale vecchio
 * — partono disordinati e inclinati, poi si allineano e collassano dentro un
 * unico sistema, che compare quando si arriva alla parte della soluzione.
 *
 * Tutto è guidato dallo scorrimento: nessun pulsante, nessuna animazione che
 * parte da sola. Chi legge vede la trasformazione mentre la legge.
 */

const SPARSI = [
  { testo: 'Excel', icon: 'file', x: -110, y: -120, r: -9 },
  { testo: 'Email', icon: 'mail', x: 95, y: -95, r: 7 },
  { testo: 'WhatsApp', icon: 'comment', x: -130, y: 10, r: 5 },
  { testo: 'Carta', icon: 'book', x: 120, y: 40, r: -6 },
  { testo: 'Gestionale storico', icon: 'database', x: -70, y: 130, r: 8 },
  { testo: 'Fogli firma', icon: 'users', x: 80, y: 150, r: -4 },
]

/** Un singolo strumento sparso: ha i suoi valori animati, quindi è un
    componente a sé — gli hook non possono stare dentro un ciclo. */
function Sparso({ dato, indice, raccolta, svanisce }) {
  const x = useTransform(raccolta, [0, 1], [0, dato.x])
  const y = useTransform(raccolta, [0, 1], [indice * 4 - 10, dato.y])
  const rotate = useTransform(raccolta, [0, 1], [0, dato.r])

  return (
    <motion.span
      aria-hidden="true"
      style={{ x, y, rotate, opacity: svanisce }}
      className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg border border-line bg-canvas px-3 py-2 text-xs whitespace-nowrap text-fg-muted shadow-card"
    >
      <Icon name={dato.icon} size={13} className="text-fg-subtle" />
      {dato.testo}
    </motion.span>
  )
}

export default function PrimaDopo({ item }) {
  const traccia = useRef(null)

  const { scrollYProgress } = useScroll({
    target: traccia,
    offset: ['start 65%', 'end 75%'],
  })

  // Prima metà: il disordine si compone. Seconda: appare il sistema unico.
  const raccolta = useTransform(scrollYProgress, [0.05, 0.55], [1, 0])
  const sistema = useTransform(scrollYProgress, [0.5, 0.8], [0, 1])
  const alzata = useTransform(scrollYProgress, [0.5, 0.8], [24, 0])
  const svanisce = useTransform(scrollYProgress, [0.45, 0.7], [1, 0])

  return (
    <div ref={traccia} className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      {/* Il racconto, che scorre normalmente */}
      <div className="space-y-14">
        <div>
          <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
            <span className="inline-block h-6 w-1 rounded-full bg-danger" />
            Com’era prima
          </h2>
          {item.challenge.map((p) => (
            <p key={p} className="mt-4 text-[17px] leading-relaxed text-fg-muted">
              {p}
            </p>
          ))}
        </div>

        <div>
          <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
            <span
              className="inline-block h-6 w-1 rounded-full"
              style={{ backgroundColor: item.accent }}
            />
            Cosa abbiamo costruito
          </h2>
          {item.solution.map((p) => (
            <p key={p} className="mt-4 text-[17px] leading-relaxed text-fg-muted">
              {p}
            </p>
          ))}

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-line-muted pt-6">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <p className="display text-3xl" style={{ color: item.accent }}>
                  {m.value}
                  {m.suffix}
                </p>
                <p className="mt-1 text-xs text-fg-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Il pannello che resta fermo e si trasforma */}
      <div className="hidden lg:block">
        <div className="sticky top-28 h-[26rem]">
          <div className="relative h-full overflow-hidden rounded-xl border border-line bg-canvas-subtle">
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

            {/* Gli strumenti sparsi che si raccolgono */}
            {SPARSI.map((s, i) => (
              <Sparso key={s.testo} dato={s} indice={i} raccolta={raccolta} svanisce={svanisce} />
            ))}

            {/* Il sistema unico che prende il loro posto */}
            <motion.div
              style={{ opacity: sistema, y: alzata }}
              className="absolute inset-6 flex flex-col overflow-hidden rounded-lg border bg-canvas"
              // Il bordo prende il colore del progetto
              initial={false}
              animate={{ borderColor: item.accent }}
            >
              <div className="flex items-center gap-2 border-b border-line bg-canvas-subtle px-3 py-2">
                <Icon name="check" size={13} style={{ color: item.accent }} />
                <span className="text-xs font-semibold text-fg">{item.client}</span>
                <span className="ml-auto font-mono text-[10px] text-fg-subtle">un solo sistema</span>
              </div>

              <ul className="flex-1 divide-y divide-line-muted">
                {item.results.map((r) => (
                  <li key={r} className="flex items-start gap-2 px-3 py-2.5 text-[12.5px] text-fg">
                    <Icon
                      name="check"
                      size={12}
                      className="mt-0.5 shrink-0"
                      style={{ color: item.accent }}
                    />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="border-t border-line bg-canvas-subtle px-3 py-2 font-mono text-[10px] text-fg-subtle">
                {item.stack.slice(0, 4).join(' · ')}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
