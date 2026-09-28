import EmailSignup from './EmailSignup'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import ScrollWords from './ui/ScrollWords'
import { company } from '../data/content'

/**
 * Chiusura ricorrente di ogni pagina, sul modello del blocco finale di
 * github.com: titolo display, paragrafo lungo, campo email con l'azione
 * primaria e un'azione secondaria testuale. Identica su tutte le pagine,
 * perché diventi un punto di riferimento.
 *
 * Il titolo si accende parola per parola mentre sale nello schermo, e il
 * reticolo di fondo si illumina solo attorno al puntatore.
 */
/* Posizione del puntatore per la luce sul reticolo, come nella hero. */
function illumina(event) {
  const r = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - r.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - r.top}px`)
}

export default function CtaBand({
  title = 'Raccontaci il processo che ti fa perdere più tempo. O l’idea che hai in testa',
  subtitle = 'Prima call di 30 minuti, senza impegno: capiamo il contesto, guardiamo i sistemi che hai già e ti diciamo se il su misura è la risposta giusta. Se non lo è, te lo diciamo lo stesso.',
  primaryLabel = "Richiedi un'analisi",
}) {
  return (
    <section
      onPointerMove={illumina}
      className="relative overflow-hidden border-y border-line-muted bg-canvas-inset"
    >
      <div className="hero-glow pointer-events-none absolute inset-x-0 -bottom-32 h-72 opacity-60" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
      <div className="grid-lines grid-spot pointer-events-none absolute inset-0 opacity-90" />

      <div className="shell relative py-16 text-center md:py-24">
        <ScrollWords as="h2" className="display display-section mx-auto max-w-3xl">
          {title}
        </ScrollWords>

        <Reveal as="p" delay={0.06} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
          {subtitle}
        </Reveal>

        <Reveal delay={0.12} className="mt-9 flex flex-col items-center gap-4">
          <EmailSignup label={primaryLabel} />

          <a
            href={company.phoneHref}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            <Icon name="phone" size={14} />
            Oppure chiamaci: {company.phone}
          </a>
        </Reveal>

        <Reveal
          as="p"
          delay={0.18}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-fg-subtle"
        >
          {['Risposta in 1 giorno lavorativo', 'Nessun impegno', 'Perimetro per iscritto'].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Icon name="check" size={14} className="text-success" />
                {item}
              </span>
            ),
          )}
        </Reveal>
      </div>
    </section>
  )
}
