import { Router, useHashKey, useRoute, useScrollToTop } from './lib/router'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Projects from './pages/Projects'
import CaseStudy from './pages/CaseStudy'
import About from './pages/About'
import Contact from './pages/Contact'
import Interactive from './pages/Interactive'
import NotFound from './pages/NotFound'

/**
 * Tabella delle rotte. Le pagine di dettaglio arrivano da un segmento
 * dinamico: /servizi/{slug} e /progetti/{id}.
 */
function Page() {
  const path = useRoute()
  const [first, second, ...rest] = path.split('/').filter(Boolean)

  if (rest.length > 0) return <NotFound />

  switch (first) {
    case undefined:
      return <Home />
    case 'servizi':
      return second ? <ServiceDetail slug={second} /> : <Services />
    case 'progetti':
      return second ? <CaseStudy id={second} /> : <Projects />
    case 'azienda':
      return second ? <NotFound /> : <About />
    case 'contatti':
      return second ? <NotFound /> : <Contact />
    case 'interattivo':
      return second ? <NotFound /> : <Interactive />
    default:
      return <NotFound />
  }
}

function Shell() {
  const path = useRoute()
  useScrollToTop(useHashKey())

  return (
    <>
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-md focus:bg-fg focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-canvas"
      >
        Vai al contenuto
      </a>

      <Header />

      {/* La `key` rimonta il contenuto a ogni rotta: le animazioni d'ingresso
          ripartono e nessuno stato di pagina sopravvive alla navigazione. */}
      <main id="contenuto" key={path}>
        <Page />
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  )
}
