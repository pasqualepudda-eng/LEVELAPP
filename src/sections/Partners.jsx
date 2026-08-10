import { partners } from '../data/content'
import Marquee from '../components/ui/Marquee'
import Icon from '../components/ui/Icon'

/**
 * Fascia dei partner: una sola fila che scorre, come le strisce di loghi
 * delle pagine marketing.
 *
 * I simboli sono disegni del nostro set di icone, non i marchi ufficiali delle
 * aziende. Per usare i loghi veri metti l'SVG in `public/tech/` e valorizza
 * `logo` nella voce corrispondente in data/content.js.
 */

/** Marchio nudo: niente cornice, solo simbolo e nome in grigio. */
function Marchio({ voce }) {
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap text-fg-subtle transition-colors duration-200 hover:text-fg">
      {voce.logo ? (
        <img src={voce.logo} alt="" aria-hidden="true" className="size-6 opacity-80" />
      ) : (
        <Icon name={voce.icon} size={22} className="shrink-0" />
      )}
      <span className="text-xl font-semibold tracking-tight">{voce.nome}</span>
    </span>
  )
}

export default function Partners() {
  return (
    <section className="border-b border-line-muted py-14" aria-labelledby="partner-titolo">
      {/* Il titolo resta solo per chi naviga con uno screen reader: a video la
          fascia parla da sé. */}
      <h2 id="partner-titolo" className="sr-only">
        I nostri partner
      </h2>

      <Marquee speed={70} pauseOnHover className="mask-fade-x" gap="3.5rem">
        {partners.map((voce) => (
          <Marchio key={voce.nome} voce={voce} />
        ))}
      </Marquee>
    </section>
  )
}
