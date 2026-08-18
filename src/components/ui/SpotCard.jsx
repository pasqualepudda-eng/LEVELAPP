/**
 * Card con l'alone che segue il puntatore.
 *
 * L'unica cosa che facciamo in JavaScript è scrivere due variabili CSS con la
 * posizione del cursore: il resto — gradiente, bordo acceso, sollevamento — è
 * in `.card-spot` dentro index.css. Niente stato React, quindi nessun
 * ri-render mentre il mouse si muove.
 */
export default function SpotCard({ as: Tag = 'article', tono, className = '', style, ...rest }) {
  function segui(event) {
    const r = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - r.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - r.top}px`)
  }

  return (
    <Tag
      onPointerMove={segui}
      className={`card card-spot ${className}`}
      style={{ '--spot': tono, ...style }}
      {...rest}
    />
  )
}
