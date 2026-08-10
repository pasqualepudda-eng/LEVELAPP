import Reveal from './Reveal'

/**
 * Intestazione di sezione: occhiello colorato, titolo, sottotitolo.
 * `align="center"` per le sezioni a tutta larghezza, `left` per le colonne.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  accent = 'var(--color-accent)',
  className = '',
  children,
}) {
  const centered = align === 'center'

  return (
    <div
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}
      style={{ '--accent': accent }}
    >
      {eyebrow && (
        <Reveal
          as="p"
          className={`flex items-center gap-2 text-sm font-semibold ${centered ? 'justify-center' : ''}`}
          style={{ color: accent }}
        >
          <span className="inline-block h-px w-6" style={{ backgroundColor: accent }} />
          {eyebrow}
        </Reveal>
      )}

      <Reveal as="h2" delay={0.05} className="display mt-4 text-4xl sm:text-5xl">
        {title}
      </Reveal>

      {subtitle && (
        <Reveal as="p" delay={0.1} className="mt-4 text-lg leading-relaxed text-fg-muted">
          {subtitle}
        </Reveal>
      )}

      {children}
    </div>
  )
}
