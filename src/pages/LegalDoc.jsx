import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll } from 'motion/react'
import { aggiornamento, documenti, trovaDocumento } from '../data/legal'
import { company } from '../data/content'
import NotFound from './NotFound'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import { Link } from '../lib/router'
import { EASE } from '../lib/motion'

/**
 * Impaginazione dei documenti legali: privacy, cookie e termini.
 *
 * Sono testi che si consultano, non che si leggono di fila: quindi a sinistra
 * resta l'indice con la sezione corrente evidenziata, in cima una barra dice
 * quanto manca alla fine, e ogni sezione è numerata così è citabile ("punto
 * 04"). Le tabelle scorrono da sole quando lo schermo è stretto.
 */

/** Stima di lettura: conta le parole di tutti i blocchi del documento. */
function minutiDiLettura(doc) {
  const testo = doc.sezioni
    .flatMap((s) =>
      s.blocchi.flatMap((b) => {
        if (b.tipo === 'p') return b.testo
        if (b.tipo === 'nota') return `${b.titolo} ${b.testo}`
        if (b.tipo === 'elenco') return b.voci
        if (b.tipo === 'tabella') return b.righe.flat()
        return ''
      }),
    )
    .join(' ')
  return Math.max(1, Math.round(testo.split(/\s+/).length / 200))
}

/* ------------------------------------------------------------------ */

function Blocco({ blocco }) {
  if (blocco.tipo === 'p') {
    return <p className="text-[17px] leading-relaxed text-fg-muted">{blocco.testo}</p>
  }

  if (blocco.tipo === 'elenco') {
    return (
      <ul className="space-y-2.5">
        {blocco.voci.map((voce) => (
          <li key={voce} className="flex items-start gap-3 text-[16px] leading-relaxed text-fg-muted">
            <span className="mt-3 h-px w-4 shrink-0 bg-line" />
            {voce}
          </li>
        ))}
      </ul>
    )
  }

  if (blocco.tipo === 'nota') {
    return (
      <div className="rounded-xl border border-line bg-canvas-subtle p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-fg">
          <Icon name="lightbulb" size={14} className="text-attention" />
          {blocco.titolo}
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{blocco.testo}</p>
      </div>
    )
  }

  if (blocco.tipo === 'tabella') {
    return (
      <div className="-mx-4 overflow-x-auto px-4">
        <table className="w-full min-w-[38rem] border-collapse text-left">
          <thead>
            <tr>
              {blocco.intestazioni.map((testa) => (
                <th
                  key={testa}
                  className="border-b border-line pb-2.5 font-mono text-[11px] tracking-wider text-fg-subtle uppercase"
                >
                  {testa}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blocco.righe.map((riga) => (
              <tr key={riga.join('|')}>
                {riga.map((cella, i) => (
                  <td
                    key={cella}
                    className={`border-b border-line-muted py-3.5 pr-6 align-top text-[15px] leading-relaxed ${
                      i === 0 ? 'text-fg' : 'text-fg-muted'
                    }`}
                  >
                    {cella}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return null
}

/* ------------------------------------------------------------------ */

export default function LegalDoc({ slug }) {
  const doc = trovaDocumento(slug)
  const corpo = useRef(null)
  const [attiva, setAttiva] = useState(null)

  const { scrollYProgress } = useScroll({ target: corpo, offset: ['start start', 'end end'] })
  const lettura = useMemo(() => (doc ? minutiDiLettura(doc) : 0), [doc])

  /* Indice: la voce corrente è quella dell'ultima sezione entrata dall'alto. */
  useEffect(() => {
    if (!doc) return
    const sezioni = doc.sezioni
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)

    const osservatore = new IntersectionObserver(
      (voci) => {
        const visibili = voci.filter((v) => v.isIntersecting)
        if (visibili.length > 0) setAttiva(visibili[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    )
    sezioni.forEach((s) => osservatore.observe(s))
    return () => osservatore.disconnect()
  }, [doc])

  if (!doc) return <NotFound />

  const altri = documenti.filter((d) => d.slug !== doc.slug)

  return (
    <>
      {/* Testata del documento */}
      <section className="relative overflow-hidden border-b border-line-muted">
        <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative py-14 md:py-16">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] text-fg-subtle uppercase">
              Documento {doc.numero} / 0{documenti.length} · {doc.occhiello}
            </p>
            <h1 className="display display-section mt-5 max-w-3xl">{doc.titolo}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{doc.sommario}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-line-muted pt-6">
              {[
                ['Ultimo aggiornamento', aggiornamento],
                ['Versione', doc.versione],
                ['Lettura', `${lettura} minuti`],
                ['Sezioni', String(doc.sezioni.length)],
              ].map(([voce, valore]) => (
                <div key={voce}>
                  <dt className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
                    {voce}
                  </dt>
                  <dd className="mt-1 text-[15px] text-fg">{valore}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Corpo: indice fermo a sinistra, sezioni numerate a destra */}
      <section className="border-b border-line-muted py-12 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {/* Quanto manca alla fine */}
            <div className="h-px w-full bg-line">
              <motion.div
                className="h-full origin-left bg-accent"
                style={{ scaleX: scrollYProgress }}
              />
            </div>

            <nav aria-label="Indice del documento" className="mt-5">
              <ol className="space-y-1">
                {doc.sezioni.map((sezione, i) => {
                  const corrente = attiva === sezione.id
                  return (
                    <li key={sezione.id}>
                      <a
                        href={`#/${doc.slug}#${sezione.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById(sezione.id)?.scrollIntoView({ block: 'start' })
                        }}
                        className={`flex items-start gap-3 rounded-md px-2 py-1.5 text-[14px] leading-snug transition-colors ${
                          corrente
                            ? 'bg-canvas-subtle font-medium text-fg'
                            : 'text-fg-muted hover:text-fg'
                        }`}
                      >
                        <span
                          className={`mt-0.5 font-mono text-[11px] ${
                            corrente ? 'text-accent' : 'text-fg-subtle'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {sezione.titolo}
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>

            <p className="mt-6 border-t border-line-muted pt-4 text-xs leading-relaxed text-fg-subtle">
              Dubbi su una riga di questo documento? Scrivici a{' '}
              <a href={`mailto:${company.email}`} className="link">
                {company.email}
              </a>
              .
            </p>
          </aside>

          <div ref={corpo} className="min-w-0">
            {doc.sezioni.map((sezione, i) => (
              <motion.section
                key={sezione.id}
                id={sezione.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="scroll-mt-24 border-b border-line-muted py-9 first:pt-0 last:border-0"
              >
                <p className="font-mono text-[11px] text-fg-subtle">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-2 text-2xl leading-tight font-semibold text-fg">
                  {sezione.titolo}
                </h2>

                <div className="mt-5 space-y-5">
                  {sezione.blocchi.map((blocco, j) => (
                    <Blocco key={j} blocco={blocco} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      {/* Gli altri documenti */}
      <section className="border-b border-line-muted py-14">
        <div className="shell">
          <p className="font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
            Gli altri documenti
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {[...altri, { slug: 'mappa', numero: '—', titolo: 'Mappa del sito', occhiello: 'Tutte le pagine' }].map(
              (altro) => (
                <li key={altro.slug}>
                  <Link
                    to={`/${altro.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-line bg-canvas p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
                  >
                    <span className="font-mono text-[11px] text-fg-subtle">{altro.numero}</span>
                    <span className="mt-2 font-semibold text-fg">{altro.titolo}</span>
                    <span className="mt-1 flex-1 text-sm text-fg-muted">{altro.occhiello}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Apri
                      <Icon
                        name="arrowRight"
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
    </>
  )
}
