import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import SoftwareBuilder from '../components/interactive/SoftwareBuilder'
import BugHunt from '../components/interactive/BugHunt'
import StackMemory from '../components/interactive/StackMemory'
import LatencyMeter from '../components/interactive/LatencyMeter'
import Platformer from '../components/interactive/Platformer'
import Snake from '../components/interactive/Snake'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

/**
 * Pagina interattiva: si costruisce un gestionale trascinando i moduli e ci si
 * mette alla prova con tre giochi brevi.
 *
 * Nessuna delle due cose lascia traccia: tutto sta nello stato di React, quindi
 * ricaricare la pagina riporta la scrivania vuota e i punteggi a zero.
 */
export default function Interactive() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Interattivo' }]}
        eyebrow="Interattivo"
        title="Costruisci il tuo gestionale, poi mettiti alla prova"
        lead="Scegli che tipo di software ti servirebbe, trascina i moduli sulla scrivania e guarda cosa viene fuori. È una demo: niente si salva, e a pagina ricaricata si riparte da capo."
        accent="var(--color-purple)"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#costruttore" variant="primary" size="lg" trailingIcon="arrowRight">
            Inizia a costruire
          </Button>
          <Button href="#classici" variant="default" size="lg" icon="play">
            Vai ai grandi classici
          </Button>
        </div>
      </PageHeader>

      {/* Costruttore */}
      <section id="costruttore" className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <Reveal as="h2" className="display display-section max-w-3xl">
            Il tuo gestionale, un modulo alla volta
          </Reveal>
          <Reveal as="p" delay={0.06} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
            È il primo passo di ogni progetto reale, in versione veloce: si parte dal tipo di
            sistema, si scelgono le aree da coprire e si guarda cosa vedrebbe in mano chi lavora.
            Nella realtà, prima di tutto questo, ci sono due o tre giorni di analisi nei reparti.
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <SoftwareBuilder />
          </Reveal>
        </div>
      </section>

      {/* Giochi */}
      <section id="giochi" className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <Reveal as="h2" className="display display-section max-w-3xl">
            Tre prove brevi, per capire come ragioniamo
          </Reveal>
          <Reveal as="p" delay={0.06} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Un bug da trovare, le tecnologie da accoppiare e qualche millisecondo da guadagnare.
            Durano un minuto l’una e non chiedono niente in cambio.
          </Reveal>

          {/* Il gioco del bug ha bisogno di larghezza (è codice), gli altri due
              stanno comodi affiancati sotto. */}
          <Reveal delay={0.1} className="mt-10 space-y-5">
            <BugHunt />
            <div className="grid items-start gap-5 md:grid-cols-2">
              <StackMemory />
              <LatencyMeter />
            </div>
          </Reveal>

          <Reveal
            as="p"
            delay={0.14}
            className="mt-8 flex items-start gap-2 text-sm text-fg-subtle"
          >
            <Icon name="lightbulb" size={15} className="mt-0.5 shrink-0" />
            Niente cookie, niente punteggi salvati, nessun dato che parte da questa pagina: gira
            tutto nel tuo browser e sparisce quando la ricarichi.
          </Reveal>
        </div>
      </section>

      {/* I grandi classici */}
      <section id="classici" className="border-b border-line-muted py-20 md:py-24">
        <div className="shell">
          <Reveal as="h2" className="display display-section max-w-3xl">
            I grandi classici, rifatti in casa
          </Reveal>
          <Reveal as="p" delay={0.06} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Due giochi del genere che tutti conoscono, scritti da zero: livelli, personaggi e regole
            sono nostri, disegnati su canvas con qualche centinaio di righe di codice. Girano nel
            browser, senza librerie di gioco e senza salvare niente.
          </Reveal>

          <div className="mt-10 space-y-5">
            <Reveal>
              <Platformer />
            </Reveal>
            <Reveal delay={0.06}>
              <Snake />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ti è piaciuto comporlo? Il difficile viene dopo"
        subtitle="Nella realtà i moduli non si trascinano: si scelgono guardando i processi, uno alla volta, partendo da quello che ti fa perdere più tempo. Raccontaci qual è."
      />
    </>
  )
}
