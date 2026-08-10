import { stats } from '../data/content'
import Counter from '../components/ui/Counter'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'

/**
 * Fascia numerica fra due sezioni narrative.
 * TODO: i valori in `stats` sono plausibili ma inventati: sostituirli.
 */
export default function StatsBand() {
  return (
    <section className="border-b border-line-muted bg-canvas-inset py-14">
      <RevealGroup className="shell grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="text-center">
            <p className="display text-4xl sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-fg-muted">{stat.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
