import { useEffect, useRef } from 'react'

/**
 * Titolo fatto di particelle: le lettere vengono disegnate una volta su un
 * canvas nascosto, se ne campionano i pixel pieni e ognuno diventa un punto
 * che vola al suo posto. Il puntatore li scosta, poi tornano.
 *
 * Il testo vero resta nella pagina come `sr-only` accanto a questo componente:
 * qui dentro è tutto decorativo, quindi lettori di schermo e motori di ricerca
 * leggono comunque la frase.
 *
 * Su schermi piccoli o con `prefers-reduced-motion` il componente non viene
 * nemmeno montato: se ne occupa chi lo usa.
 */

const PASSO = 4 // distanza fra i punti campionati, in pixel
const RAGGIO_MOUSE = 110
const RITORNO = 0.055 // quanto tira la molla verso il posto giusto
const ATTRITO = 0.86

export default function ParticleTitle({ righe, colori, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particelle = []
    let raf
    let larghezza = 0
    let altezza = 0
    const puntatore = { x: -9999, y: -9999 }

    /** Ridisegna il testo fuori schermo e ne ricava i punti. */
    function campiona() {
      const rect = canvas.getBoundingClientRect()
      larghezza = Math.max(1, Math.floor(rect.width))
      altezza = Math.max(1, Math.floor(rect.height))

      canvas.width = larghezza * dpr
      canvas.height = altezza * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Tela di servizio: qui il testo serve solo per essere letto pixel a pixel
      const tela = document.createElement('canvas')
      tela.width = larghezza
      tela.height = altezza
      const tctx = tela.getContext('2d', { willReadFrequently: true })

      const interlinea = altezza / (righe.length + 0.35)
      const corpo = Math.min(interlinea * 0.86, larghezza / 8.2)

      tctx.fillStyle = '#fff'
      tctx.textBaseline = 'middle'
      tctx.font = `700 ${corpo}px "Mona Sans", system-ui, sans-serif`

      righe.forEach((riga, i) => {
        tctx.fillText(riga, 0, interlinea * (i + 0.72))
      })

      const dati = tctx.getImageData(0, 0, larghezza, altezza).data
      const nuove = []

      for (let y = 0; y < altezza; y += PASSO) {
        for (let x = 0; x < larghezza; x += PASSO) {
          const alfa = dati[(y * larghezza + x) * 4 + 3]
          if (alfa < 128) continue

          const riga = Math.min(righe.length - 1, Math.floor(y / interlinea))
          nuove.push({
            // Partono sparse: l'assemblaggio si vede
            x: larghezza / 2 + (Math.random() - 0.5) * larghezza * 1.4,
            y: altezza / 2 + (Math.random() - 0.5) * altezza * 2.5,
            vx: 0,
            vy: 0,
            mx: x,
            my: y,
            colore: colori[riga] ?? colori[colori.length - 1],
          })
        }
      }
      particelle = nuove
    }

    function passo() {
      ctx.clearRect(0, 0, larghezza, altezza)

      for (const p of particelle) {
        // Molla verso il posto assegnato
        p.vx += (p.mx - p.x) * RITORNO
        p.vy += (p.my - p.y) * RITORNO

        // Il puntatore spinge via i punti vicini
        const dx = p.x - puntatore.x
        const dy = p.y - puntatore.y
        const dist2 = dx * dx + dy * dy
        if (dist2 < RAGGIO_MOUSE * RAGGIO_MOUSE) {
          const dist = Math.sqrt(dist2) || 1
          const spinta = (1 - dist / RAGGIO_MOUSE) * 5
          p.vx += (dx / dist) * spinta
          p.vy += (dy / dist) * spinta
        }

        p.vx *= ATTRITO
        p.vy *= ATTRITO
        p.x += p.vx
        p.y += p.vy

        ctx.fillStyle = p.colore
        ctx.fillRect(p.x, p.y, 2, 2)
      }

      raf = requestAnimationFrame(passo)
    }

    function muovi(event) {
      const r = canvas.getBoundingClientRect()
      puntatore.x = event.clientX - r.left
      puntatore.y = event.clientY - r.top
    }
    function esci() {
      puntatore.x = -9999
      puntatore.y = -9999
    }

    // I caratteri devono essere pronti, altrimenti si campiona il ripiego
    const avvia = () => {
      campiona()
      raf = requestAnimationFrame(passo)
    }
    if (document.fonts?.ready) document.fonts.ready.then(avvia)
    else avvia()

    const osservatore = new ResizeObserver(() => campiona())
    osservatore.observe(canvas)
    window.addEventListener('pointermove', muovi)
    window.addEventListener('pointerleave', esci)

    return () => {
      cancelAnimationFrame(raf)
      osservatore.disconnect()
      window.removeEventListener('pointermove', muovi)
      window.removeEventListener('pointerleave', esci)
    }
  }, [righe, colori])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
