import { motion } from 'motion/react'
import { services, cases, company } from '../data/content'
import { documenti } from '../data/legal'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Mappa del sito: l'albero vero delle rotte, non un elenco di link.
 *
 * Il tronco è la riga verticale a sinistra; ogni ramo si stacca con un tratto
 * orizzontale e porta le sue foglie, ognuna con il proprio indirizzo scritto
 * per esteso — è la stessa cosa che leggerebbe un motore di ricerca nel file
 * sitemap.xml, linkato in fondo alla pagina.
 */

const RAMI = [
  {
    titolo: 'Servizi',
    to: '/servizi',
    icona: 'layers',
    tono: 'var(--color-accent)',
    descrizione: 'Le sei aree, una accanto all’altra',
    foglie: services.map((s) => ({ label: s.title, to: `/servizi/${s.slug}` })),
  },
  {
    titolo: 'Progetti',
    to: '/progetti',
    icona: 'briefcase',
    tono: 'var(--color-purple)',
    descrizione: 'I lavori rilasciati e ancora in esercizio',
    foglie: cases.map((c) => ({ label: c.client, to: `/progetti/${c.id}` })),
  },
  {
    titolo: 'Azienda',
    to: '/azienda',
    icona: 'users',
    tono: 'var(--color-success)',
    descrizione: 'Storia, patto di lavoro e sala macchine',
    foglie: [
      { label: 'Lavora con noi', to: '/lavora-con-noi' },
      { label: 'Contatti', to: '/contatti' },
    ],
  },
  {
    titolo: 'Interattivo',
    to: '/interattivo',
    icona: 'terminal',
    tono: 'var(--color-attention)',
    descrizione: 'Il terminale pubblico e i giochi',
    foglie: [],
  },
  {
    titolo: 'Documenti',
    to: `/${documenti[0].slug}`,
    icona: 'file',
    tono: 'var(--color-fg-muted)',
    descrizione: 'Privacy, cookie e condizioni d’uso',
    foglie: [
      ...documenti.slice(1).map((d) => ({ label: d.titolo, to: `/${d.slug}` })),
      { label: 'Mappa del sito', to: '/mappa' },
    ],
  },
]

const TOTALE = 1 + RAMI.reduce((n, r) => n + 1 + r.foglie.length, 0)

/* ------------------------------------------------------------------ */

function Foglia({ voce, tono, indice }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.35, delay: indice * 0.03, ease: EASE }}
      className="relative pl-6"
    >
      {/* Tratto che unisce la foglia al ramo */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0 h-px w-4"
        style={{ backgroundColor: 'var(--color-line)' }}
      />
      <Link
        to={voce.to}
        className="group flex min-h-11 flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b border-line-muted py-3 transition-colors hover:border-fg-subtle"
      >
        <span className="text-[15px] text-fg transition-colors group-hover:text-[var(--tono)]" style={{ '--tono': tono }}>
          {voce.label}
        </span>
        <span className="font-mono text-mini text-fg-subtle">#{voce.to}</span>
        <Icon
          name="arrowRight"
          size={13}
          className="ml-auto shrink-0 text-fg-subtle opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        />
      </Link>
    </motion.li>
  )
}

/* ------------------------------------------------------------------ */

export default function Sitemap() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line-muted">
        <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative py-14 md:py-16">
          <Reveal>
            <p className="font-mono text-mini tracking-[0.25em] text-fg-subtle uppercase">
              Mappa del sito · {TOTALE} pagine
            </p>
            <h1 className="display display-section mt-5 max-w-3xl">
              Tutto quello che c’è qui dentro, in una pagina sola
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
              L’albero completo delle pagine con il loro indirizzo. Se cerchi qualcosa e non sai
              dove sta, parti da qui — oppure chiedilo al terminale.
            </p>
          </Reveal>
        </div>
      </section>

      {/* L'albero */}
      <section className="border-b border-line-muted py-14 md:py-20">
        <div className="shell">
          <div className="relative">
            {/* Il tronco */}
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[7px] w-px bg-line md:left-[11px]"
            />

            {/* Radice */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute top-1 left-0 flex size-4 items-center justify-center rounded-full border-2 border-accent bg-canvas md:size-6" />
              <Link to="/" className="group -my-1.5 inline-flex items-baseline gap-3 py-1.5">
                <span className="text-xl font-semibold text-fg group-hover:text-accent">
                  {company.name}
                </span>
                <span className="font-mono text-mini text-fg-subtle">/</span>
              </Link>
              <p className="mt-1 text-sm text-fg-muted">
                Home — {company.payoff.toLowerCase()}
              </p>
            </div>

            {/* Rami */}
            <ol className="mt-10 space-y-10">
              {RAMI.map((ramo) => (
                <li key={ramo.titolo} className="relative pl-8 md:pl-12">
                  <span
                    aria-hidden="true"
                    className="absolute top-4 left-[7px] h-px w-4 md:left-[11px] md:w-6"
                    style={{ backgroundColor: 'var(--color-line)' }}
                  />
                  <span
                    className="absolute top-1.5 left-0 flex size-4 items-center justify-center rounded-full border-2 bg-canvas md:size-6"
                    style={{ borderColor: ramo.tono }}
                  >
                    <Icon name={ramo.icona} size={11} style={{ color: ramo.tono }} className="hidden md:block" />
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <Link
                      to={ramo.to}
                      className="-my-1.5 py-1.5 text-lg font-semibold text-fg transition-colors hover:text-[var(--tono)]"
                      style={{ '--tono': ramo.tono }}
                    >
                      {ramo.titolo}
                    </Link>
                    <span className="font-mono text-mini text-fg-subtle">#{ramo.to}</span>
                    <span className="ml-auto font-mono text-mini text-fg-subtle">
                      {ramo.foglie.length > 0
                        ? `${ramo.foglie.length + 1} pagine`
                        : '1 pagina'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-fg-muted">{ramo.descrizione}</p>

                  {ramo.foglie.length > 0 && (
                    <ul className="mt-4 max-w-3xl">
                      {ramo.foglie.map((voce, i) => (
                        <Foglia key={voce.to} voce={voce} tono={ramo.tono} indice={i} />
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Per i motori di ricerca */}
      <section className="border-b border-line-muted py-12">
        <div className="shell grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2 className="text-lg font-semibold text-fg">La stessa mappa, per i motori di ricerca</h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-fg-muted">
              Le stesse rotte sono elencate in un file XML che i crawler leggono da soli. Viene
              rigenerato dai dati del sito, quindi non resta mai indietro rispetto a questa pagina.
            </p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-line bg-canvas px-4 py-2.5 font-mono text-sm text-fg transition-colors hover:border-fg-subtle"
          >
            sitemap.xml
            <Icon name="arrowUpRight" size={14} className="text-fg-subtle" />
          </a>
        </div>
      </section>
    </>
  )
}
