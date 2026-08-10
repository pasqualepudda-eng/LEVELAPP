import Hero from '../sections/Hero'
import Partners from '../sections/Partners'
import FeatureTabs from '../sections/FeatureTabs'
import WorkflowRiver from '../sections/WorkflowRiver'
import Pillars from '../sections/Pillars'
import AiSection from '../sections/AiSection'
import StatsBand from '../sections/StatsBand'
import ProcessSection from '../sections/ProcessSection'
import Integrations from '../sections/Integrations'
import CasesTeaser from '../sections/CasesTeaser'
import Testimonials from '../sections/Testimonials'
import FaqList from '../components/FaqList'
import SectionHeading from '../components/ui/SectionHeading'
import CtaBand from '../components/CtaBand'
import { faqs } from '../data/content'

/**
 * Sequenza della home nello stesso ordine della home di github.com: hero,
 * clienti, funzionalità a tab, blocco "acceleriamo il flusso", sezione scura di
 * prodotto (AI), numeri, metodo, ecosistema, storie dei clienti e chiusura.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <FeatureTabs />
      <WorkflowRiver />
      <Pillars />
      <AiSection />
      <StatsBand />
      <ProcessSection />
      <Integrations />
      <CasesTeaser />
      <Testimonials />

      <section id="faq" className="border-b border-line-muted py-20 md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Domande frequenti"
            title="Le cose che ci chiedono tutti"
            subtitle="Tempi, tecnologie, proprietà del codice. Se manca qualcosa, scrivici: rispondiamo davvero."
          />
          <FaqList items={faqs} defaultOpen={0} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
