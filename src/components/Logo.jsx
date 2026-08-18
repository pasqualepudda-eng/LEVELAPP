import { useId } from 'react'

/**
 * Marchio LevelApp: la nuvola con dentro `</>`.
 *
 * È ridisegnato in SVG invece di caricare il PNG per due motivi: il file
 * originale ha il fondo bianco senza trasparenza (in tema scuro si vedrebbe il
 * riquadro) ed è un quadrato da 2160px per un segno che a video ne occupa 30.
 *
 * Il pieno usa `currentColor`, quindi il marchio prende il colore del testo in
 * cui sta; il simbolo è ritagliato con una maschera, così lascia vedere lo
 * sfondo qualunque esso sia — chiaro, scuro o dentro un mockup.
 */
export default function Logo({ size = 28, className = '' }) {
  // La maschera ha bisogno di un id unico: il marchio compare più volte
  // nella stessa pagina (header, footer, mockup).
  const id = useId()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        {/* Nero = trasparente, bianco = pieno */}
        <rect width="32" height="32" fill="black" />

        {/* Corpo della nuvola: lobo sinistro e base arrotondata */}
        <circle cx="10.4" cy="18" r="7" fill="white" />
        <rect x="3.4" y="17.2" width="25.2" height="8.6" rx="4.3" fill="white" />

        {/* Solco chiaro fra il lobo e la bolla grande, come nel marchio */}
        <circle cx="19.8" cy="14.4" r="8.8" stroke="black" strokeWidth="1.5" />

        {/* Bolla grande */}
        <circle cx="19.8" cy="14.4" r="8" fill="white" />

        {/* Il simbolo, ritagliato dal pieno */}
        <g stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.3 11.6 14.4 14.5l2.9 2.9" />
          <path d="M22.3 11.6 25.2 14.5l-2.9 2.9" />
          <path d="M20.7 10.3 18.9 18.7" />
        </g>
      </mask>

      <rect width="32" height="32" fill="currentColor" mask={`url(#${id})`} />
    </svg>
  )
}
