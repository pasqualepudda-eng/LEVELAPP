/**
 * Il marchio per la carta.
 *
 * Il marchio del sito è ritagliato con una `<mask>` SVG: comodo a video, ma in
 * stampa alcuni motori (Safari) scartano le maschere e il segno sparisce. Qui
 * lo stesso disegno è fatto di forme piene — nuvola nera, simbolo bianco sopra
 * — così esce su qualunque stampante e in qualunque PDF.
 */
export default function MarchioStampa({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Corpo della nuvola */}
      <g fill="#0d1117">
        <circle cx="10.4" cy="18" r="7" />
        <rect x="3.4" y="17.2" width="25.2" height="8.6" rx="4.3" />
        <circle cx="19.8" cy="14.4" r="8" />
      </g>

      {/* Solco fra lobo e bolla, come nel marchio */}
      <circle cx="19.8" cy="14.4" r="8.8" stroke="#fff" strokeWidth="1.5" fill="none" />

      {/* Il simbolo, in negativo sopra il pieno */}
      <g stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M17.3 11.6 14.4 14.5l2.9 2.9" />
        <path d="M22.3 11.6 25.2 14.5l-2.9 2.9" />
        <path d="M20.7 10.3 18.9 18.7" />
      </g>
    </svg>
  )
}
