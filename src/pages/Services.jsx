import { useState } from 'react'
import { motion } from 'motion/react'
import { services, cases, faqs } from '../data/content'
import CtaBand from '../components/CtaBand'
import FaqList from '../components/FaqList'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import ProcessSection from '../sections/ProcessSection'
import Integrations from '../sections/Integrations'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Panoramica servizi: un quadro comparativo, non un elenco di schede.
 *
 * Le sei aree stanno una accanto all'altra in colonne affiancate e le righe
 * mettono a confronto la stessa cosa — cosa consegniamo, con che tecnologie, in
 * quanto tempo — così si sceglie guardando le differenze invece di aprire sei
 * pagine. Le etichette di riga restano ferme mentre il quadro scorre di lato.
 *
 * In alto si dichiara da dove si parte e il quadro tiene solo le colonne che
 * c'entrano: è la stessa domanda che facciamo al primo incontro.
 */

/* Da dove nasce il lavoro, area per area. `entrambi` sta in tutti e due i casi. */
const PARTENZA = {
  prodotto: 'idea',
  gestionale: 'processo',
  'web-app': 'entrambi',
  'siti-web': 'idea',
  mobile: 'entrambi',
  ai: 'processo',
}

const FILTRI = [
  { id: 'tutte', label: 'Tutte le aree' },
  { id: 'processo', label: 'Ho un processo da sistemare' },
  { id: 'idea', label: 'Ho un’idea da realizzare' },
]

/* Le righe del quadro. `cella` riceve il servizio e restituisce il contenuto. */
const RIGHE = [
  {
    id: 'sintesi',
    etichetta: 'In una riga',
    cella: (s) => <p className="text-[15px] leading-relaxed text-fg">{s.short}</p>,
  },
  {
    id: 'consegna',
    etichetta: 'Cosa consegniamo',
    cella: (s) => (
      <ul className="space-y-2">
        {s.deliverables.slice(0, 4).map((d) => (
          <li key={d} className="flex items-start gap-2 text-[14px] leading-relaxed text-fg-muted">
            <Icon name="check" size={13} className="mt-1 shrink-0" style={{ color: s.accent }} />
            {d}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'tecnologie',
    etichetta: 'Tecnologie',
    cella: (s) => (
      <div className="flex flex-wrap gap-1.5">
        {s.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-fg-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 'esempio',
    etichetta: 'Già fatto per',
    cella: (s) => {
      const caso = cases.find((c) => c.id === s.caseSlug)
      return caso ? (
        <Link
          to={`/progetti/${caso.id}`}
          className="group inline-flex items-start gap-1.5 text-[14px] font-medium text-fg hover:underline"
        >
          {caso.client}
          <Icon
            name="arrowUpRight"
            size={13}
            className="mt-0.5 shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5"
          />
        </Link>
      ) : (
        <span className="text-[14px] text-fg-subtle">—</span>
      )
    },
  },
  {
    id: 'scheda',
    etichetta: '',
    cella: (s) => (
      <Link
        to={`/servizi/${s.slug}`}
        className="group inline-flex items-center gap-1.5 text-sm font-semibold"
        style={{ color: s.accent }}
      >
        Scheda completa
        <Icon
          name="arrowRight"
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    ),
  },
]

/* Confronto secco fra prodotto pronto e software scritto per te. */
const CONFRONTO = [
  ['Adatti i processi al software', 'Il software segue i tuoi processi'],
  ['Funzioni che non userai mai', 'Solo le funzioni che servono davvero'],
  ['Personalizzazioni solo se il fornitore le prevede', 'Evolutive quando servono a te'],
  ['Aggiornamenti quando decide qualcun altro', 'Puoi far crescere il codice con chi vuoi'],
  ['Dati dentro un sistema di qualcun altro', 'Repository, dati e infrastruttura intestati a te'],
]

/* ------------------------------------------------------------------ */

export default function Services() {
  const [filtro, setFiltro] = useState('tutte')
  const [colonna, setColonna] = useState(null)

  const elenco = services.filter(
    (s) => filtro === 'tutte' || PARTENZA[s.slug] === filtro || PARTENZA[s.slug] === 'entrambi',
  )

  const griglia = { gridTemplateColumns: `8rem repeat(${elenco.length}, minmax(14rem, 1fr))` }

  /** Sfondo della cella: si accende tutta la colonna sotto il puntatore. */
  const sfondo = (i) => (colonna === i ? 'var(--color-canvas-subtle)' : 'transparent')

  return (
    <>
      {/* Testata: la domanda che facciamo al primo incontro */}
      <section className="relative overflow-hidden border-b border-line-muted">
        <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative py-14 md:py-18">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] text-fg-subtle uppercase">
              Servizi · sei aree, una squadra
            </p>
            <h1 className="display display-section mt-5 max-w-4xl">
              Tutto quello che facciamo, uno accanto all’altro
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
              Che si parta da un processo che non torna o da un’idea che non esiste ancora, il
              percorso è lo stesso: in pochi giorni un prototipo, in quattro settimane il software
              in produzione.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contatti" variant="primary" size="lg" trailingIcon="arrowRight">
                Richiedi un’analisi
              </Button>
              <Button to="/progetti" variant="default" size="lg" icon="book">
                Guarda i progetti
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-2 border-t border-line-muted pt-8">
            {FILTRI.map((f) => {
              const attivo = filtro === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFiltro(f.id)}
                  aria-pressed={attivo}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    attivo
                      ? 'border-fg bg-fg text-canvas'
                      : 'border-line bg-canvas text-fg-muted hover:border-fg-subtle hover:text-fg'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
            <span className="ml-1 font-mono text-[11px] text-fg-subtle">
              {elenco.length} di {services.length}
            </span>
          </Reveal>
        </div>
      </section>

      {/* Il quadro */}
      <section className="border-b border-line-muted py-12 md:py-16">
        <div className="shell">
          <p className="mb-4 flex items-center gap-2 font-mono text-[11px] text-fg-subtle lg:hidden">
            <Icon name="arrowRight" size={12} />
            scorri il quadro di lato
          </p>

          <div className="-mx-4 overflow-x-auto px-4 pb-2">
            <motion.div
              key={filtro}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid"
              style={griglia}
              onMouseLeave={() => setColonna(null)}
            >
              {/* Riga di testa: area, tempo di consegna */}
              <div className="sticky left-0 z-10 border-b border-line bg-canvas" />
              {elenco.map((s, i) => (
                <div
                  key={s.slug}
                  onMouseEnter={() => setColonna(i)}
                  className="relative border-b border-line px-5 pt-6 pb-5 transition-colors duration-300"
                  style={{ backgroundColor: sfondo(i) }}
                >
                  {/* Filetto dell'area, si allunga quando la colonna è attiva */}
                  <span
                    className="absolute top-0 left-0 h-1 transition-all duration-500"
                    style={{
                      backgroundColor: s.accent,
                      width: colonna === i ? '100%' : '2.5rem',
                    }}
                  />
                  <span className="flex items-center gap-2.5">
                    <Icon name={s.icon} size={18} style={{ color: s.accent }} />
                    <span className="font-mono text-[11px] text-fg-subtle">0{i + 1}</span>
                  </span>
                  <h2 className="mt-3 text-lg leading-tight font-semibold text-fg">{s.title}</h2>
                  <p className="mt-2 font-mono text-[11px]" style={{ color: s.accent }}>
                    {s.tempi}
                  </p>
                </div>
              ))}

              {/* Righe di confronto */}
              {RIGHE.map((riga) => (
                <div key={riga.id} className="contents">
                  <div className="sticky left-0 z-10 border-b border-line-muted bg-canvas py-6 pr-4">
                    <span className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
                      {riga.etichetta}
                    </span>
                  </div>
                  {elenco.map((s, i) => (
                    <div
                      key={s.slug}
                      onMouseEnter={() => setColonna(i)}
                      className="border-b border-line-muted px-5 py-6 transition-colors duration-300"
                      style={{ backgroundColor: sfondo(i) }}
                    >
                      {riga.cella(s)}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quando conviene: confronto riga per riga */}
      <section className="border-b border-line-muted py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="Quando conviene"
            title="Su misura non è sempre la risposta giusta"
            subtitle="Se un prodotto pronto copre l’80% dei tuoi processi te lo diciamo, e ti aiutiamo a sceglierlo. Il su misura serve quando il tuo modo di lavorare è un vantaggio da difendere."
            accent="var(--color-success)"
          />

          <Reveal delay={0.08} className="mx-auto mt-12 max-w-4xl">
            <div className="grid grid-cols-2 border-b border-line pb-3">
              <p className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
                Software standard
              </p>
              <p className="pl-6 font-mono text-[11px] tracking-wider uppercase text-success md:pl-10">
                Software scritto per te
              </p>
            </div>

            <ul>
              {CONFRONTO.map(([standard, nostro]) => (
                <motion.li
                  key={nostro}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="group grid grid-cols-2 items-stretch border-b border-line-muted"
                >
                  <span className="flex items-start gap-2.5 py-5 pr-6 text-[15px] leading-relaxed text-fg-subtle line-through decoration-line">
                    <Icon name="x" size={14} className="mt-1 shrink-0" />
                    {standard}
                  </span>
                  <span className="flex items-start gap-2.5 border-l border-line py-5 pl-6 text-[15px] leading-relaxed text-fg transition-colors group-hover:bg-canvas-subtle md:pl-10">
                    <Icon name="check" size={14} className="mt-1 shrink-0 text-success" />
                    {nostro}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-6 text-center text-sm text-fg-muted">
              Non sei sicuro da che parte stai?{' '}
              <a href="#/contatti" className="text-accent hover:underline">
                Mezz’ora di call e lo capiamo insieme
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <ProcessSection />
      <Integrations />

      <section className="border-b border-line-muted py-20 md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Domande frequenti"
            title="Prima di scriverci"
            subtitle="Le risposte alle domande che arrivano più spesso su tempi, tecnologie e proprietà del codice."
          />
          <FaqList items={faqs} defaultOpen={0} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
