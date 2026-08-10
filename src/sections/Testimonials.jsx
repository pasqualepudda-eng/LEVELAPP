import { testimonials } from '../data/content'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/ui/Icon'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'

/**
 * Dicono di noi. Le iniziali sostituiscono le foto: nessun avatar da caricare
 * e nessun placeholder generico.
 * TODO: sostituire con recensioni verificate (nome, ruolo, azienda).
 */
export default function Testimonials() {
  return (
    <section id="recensioni" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Dicono di noi"
          title="Il giudizio che conta è quello del secondo anno"
          subtitle="Le persone che usano ogni giorno il software che abbiamo costruito."
          accent="var(--color-attention)"
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <RevealItem key={item.name}>
              <figure className="card card-hover flex h-full flex-col p-6">
                <div className="flex items-center gap-0.5 text-attention" aria-label={`${item.rating} stelle su 5`}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Icon key={i} name="star" size={14} />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg">
                  “{item.text}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-line-muted pt-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-canvas-overlay text-xs font-semibold text-fg-muted">
                    {item.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-fg">{item.name}</span>
                    <span className="block truncate text-xs text-fg-muted">
                      {item.role} · {item.when}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
