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
import FaqSection from '../sections/FaqSection'
import CtaBand from '../components/CtaBand'

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

      <FaqSection />

      <CtaBand />
    </>
  )
}
