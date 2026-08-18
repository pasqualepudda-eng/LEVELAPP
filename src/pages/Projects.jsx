import { motion } from 'motion/react'
import { altriProgetti, cases, stats } from '../data/content'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'
import CtaBand from '../components/CtaBand'
import Counter from '../components/ui/Counter'
import Icon from '../components/ui/Icon'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

const sectors = [
  { label: 'Metalmeccanica', count: 41 },
  { label: 'Costruzioni e impianti', count: 28 },
  { label: 'Distribuzione e retail', count: 33 },
  { label: 'Servizi professionali', count: 25 },
  { label: 'Food & beverage', count: 19 },
  { label: 'Sanità e benessere', count: 14 },
]

/* La matrice: 200 caselle, e i sette progetti raccontati sparsi dentro. */
const TOTALE = 200
const RACCONTATI = new Map(
  cases.map((c, i) => [17 + i * 27, c]),
)

export default function Projects() {
  return (
    <>
      {/* Testata: i 200 progetti disegnati uno per uno. Sette sono accesi —
          quelli raccontati per intero — e portano alla loro scheda. Il titolo
          dice un numero; qui quel numero si vede. */}
      <header className="relative overflow-hidden border-b border-line-muted">
        <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />

        <div className="shell relative grid gap-12 pt-10 pb-16 md:pt-14 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <Reveal as="nav" className="flex items-center gap-2 text-sm text-fg-muted">
              <Link to="/" className="hover:text-fg">
                Home
              </Link>
              <Icon name="chevronRight" size={12} className="text-fg-subtle" />
              <span className="text-fg">Progetti</span>
            </Reveal>

            <Reveal as="p" delay={0.04} className="mt-10 flex items-center gap-2 text-sm font-semibold text-purple">
              <span className="inline-block h-px w-8 bg-purple" />
              Progetti
            </Reveal>

            <Reveal as="h1" delay={0.08} className="display display-hero-split mt-5 leading-[1.04]">
              Oltre 200 progetti attivi.
              <br />
              <span className="text-purple">Sette</span> raccontati per intero.
            </Reveal>

            <Reveal as="p" delay={0.14} className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
              Non una gallery di screenshot: il problema di partenza, le scelte tecniche e cosa è
              cambiato davvero. Ci sono i lavori più recenti e i software che portiamo avanti come
              prodotti nostri.
            </Reveal>
          </div>

          {/* La matrice */}
          <Reveal delay={0.18}>
            <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5">
              {Array.from({ length: TOTALE }).map((_, i) => {
                const caso = RACCONTATI.get(i)

                if (!caso) {
                  return (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="aspect-square rounded-[3px] bg-line-muted opacity-0"
                      style={{
                        animation: 'matrice-in 0.5s var(--ease-out-quint) forwards',
                        animationDelay: `${0.2 + (i % 20) * 0.012 + Math.floor(i / 20) * 0.03}s`,
                      }}
                    />
                  )
                }

                return (
                  <Link
                    key={i}
                    to={`/progetti/${caso.id}`}
                    title={`${caso.client} — ${caso.title}`}
                    className="group relative aspect-square rounded-[3px] opacity-0 transition-transform duration-300 hover:scale-[1.6]"
                    style={{
                      backgroundColor: caso.accent,
                      animation: 'matrice-in 0.5s var(--ease-out-quint) forwards',
                      animationDelay: `${0.2 + (i % 20) * 0.012 + Math.floor(i / 20) * 0.03}s`,
                    }}
                  >
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 rounded-md border border-line bg-canvas-overlay px-2 py-1 text-[11px] whitespace-nowrap text-fg shadow-overlay group-hover:block">
                      {caso.client}
                    </span>
                  </Link>
                )
              })}
            </div>

            <p className="mt-5 flex items-center gap-2 font-mono text-[11px] text-fg-subtle">
              <span className="inline-block size-2 rounded-[2px] bg-line-muted" />
              progetti rilasciati
              <span className="ml-3 inline-block size-2 rounded-[2px] bg-purple" />
              raccontati qui — passaci sopra
            </p>
          </Reveal>
        </div>
      </header>

      {/* Numeri */}
      <section className="border-b border-line-muted bg-canvas-inset py-12">
        <RevealGroup className="shell grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="text-center">
              <p className="display text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-fg-muted">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Case study */}
      {/* I progetti su una linea temporale: a sinistra l'anno, a destra il
          lavoro. Si legge in ordine, come una storia, invece che come una
          bacheca di riquadri tutti uguali. */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <div className="relative border-l border-line-muted pl-8 md:pl-14">
            {cases.map((item, i) => {
              const anno = String(item.year).split(' ')[0]
              const nuovoAnno = i === 0 || String(cases[i - 1].year).split(' ')[0] !== anno

              return (
                <Reveal key={item.id} className="relative pb-14 last:pb-0">
                  {/* Marcatore dell'anno, solo quando cambia */}
                  {nuovoAnno && (
                    <span className="absolute -left-8 hidden font-mono text-sm text-fg-subtle md:-left-14 md:block">
                      {anno}
                    </span>
                  )}

                  {/* Nodo sulla linea */}
                  <span
                    className="absolute top-2 -left-[2.05rem] size-2.5 rounded-full ring-4 md:-left-[3.55rem]"
                    style={{
                      backgroundColor: item.accent,
                      // L'anello nasconde la linea sotto il nodo
                      '--tw-ring-color': 'var(--color-canvas)',
                    }}
                  />

                  <Link
                    to={`/progetti/${item.id}`}
                    className="group block"
                    style={{ '--accent': item.accent }}
                  >
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span
                        className="text-[11px] font-semibold tracking-wide uppercase"
                        style={{ color: item.accent }}
                      >
                        {item.type}
                      </span>
                      <span className="text-sm text-fg-muted">
                        {item.client} · {item.sector}
                      </span>
                    </p>

                    <h3 className="display mt-3 max-w-3xl text-2xl leading-snug transition-colors group-hover:text-[var(--accent)] md:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
                      {item.body}
                    </p>

                    <span className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3">
                      {item.metrics.slice(0, 3).map((m) => (
                        <span key={m.label} className="block">
                          <span className="display block text-xl" style={{ color: item.accent }}>
                            {m.value}
                            {m.suffix}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-fg-muted">{m.label}</span>
                        </span>
                      ))}

                      <span className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-fg">
                        Leggi
                        <Icon
                          name="arrowRight"
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>


      {/* Settori */}
      {/* I settori come una barra unica proporzionale: le quote si confrontano
          davvero, invece di essere sei barrette identiche. */}
      <section className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Settori"
            title="Dove lavoriamo più spesso"
            subtitle="Aziende con processi specifici e reparti che devono parlarsi. Le quote sono sui progetti degli ultimi tre anni."
            accent="var(--color-purple)"
          />

          <Reveal className="mt-12">
            <div className="flex h-16 w-full overflow-hidden rounded-xl border border-line">
              {sectors.map((sector, i) => (
                <motion.span
                  key={sector.label}
                  initial={{ flexGrow: 0 }}
                  whileInView={{ flexGrow: sector.count }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                  className="group relative block border-r border-line last:border-r-0"
                  style={{
                    backgroundColor: `color-mix(in oklab, var(--color-purple) ${14 + i * 9}%, transparent)`,
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] text-fg opacity-0 transition-opacity group-hover:opacity-100">
                    {sector.count}
                  </span>
                </motion.span>
              ))}
            </div>

            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((sector, i) => (
                <li
                  key={sector.label}
                  className="flex items-center gap-2.5 border-b border-line-muted pb-3 text-sm"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: `color-mix(in oklab, var(--color-purple) ${14 + i * 9}%, transparent)`,
                    }}
                  />
                  <span className="flex-1 text-fg">{sector.label}</span>
                  <span className="font-mono text-fg-muted">{sector.count}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>


      {/* Il grosso del lavoro non ha una scheda dedicata */}
      <section className="border-b border-line-muted py-16">
        <Reveal className="shell">
          <div className="card flex flex-col items-center gap-4 p-8 text-center md:flex-row md:text-left">
            <span className="display text-6xl text-accent">{altriProgetti.quanti}</span>
            <p className="max-w-2xl text-[17px] leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">altri progetti rilasciati.</span>{' '}
              {altriProgetti.testo}
            </p>
          </div>
        </Reveal>
      </section>

      <CtaBand
        title="Il tuo progetto potrebbe essere il prossimo"
        subtitle="Raccontaci il processo che oggi vive su fogli di calcolo e telefonate: ti diciamo se e come conviene metterlo a sistema."
      />
    </>
  )
}
