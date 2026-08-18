import { services } from '../data/content'
import ServiziFisarmonica from '../components/ServiziFisarmonica'
import Reveal from '../components/ui/Reveal'

/**
 * Le sei aree in home, con la fisarmonica condivisa con il dettaglio servizio.
 */
export default function FeatureTabs() {
  return (
    <section id="cosa-facciamo" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <Reveal as="h2" className="display display-section max-w-3xl">
          Sei aree, una sola squadra di ingegneria
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
          Apri un’area per vedere cosa comprende, in quanto tempo va in produzione e che aspetto ha
          il codice che ci scriviamo dentro.
        </Reveal>

        <ServiziFisarmonica servizi={services} />
      </div>
    </section>
  )
}
