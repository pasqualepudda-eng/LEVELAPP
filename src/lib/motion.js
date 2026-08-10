/**
 * Shared motion language.
 * Every section pulls from here so timing/easing stay consistent across the site.
 */

export const EASE = [0.16, 1, 0.3, 1] // expo-out
export const EASE_SOFT = [0.33, 1, 0.68, 1]

export const SPRING = { type: 'spring', stiffness: 120, damping: 20, mass: 0.6 }
export const SPRING_SNAPPY = { type: 'spring', stiffness: 340, damping: 30, mass: 0.5 }
export const SPRING_LAZY = { type: 'spring', stiffness: 60, damping: 22, mass: 1 }

/** Standard "in view once" config — sections settle slightly before fully on screen. */
export const VIEWPORT = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' }
export const VIEWPORT_EARLY = { once: true, amount: 0.1, margin: '0px 0px -5% 0px' }

/** Parent that staggers its children. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Rise + fade — the default entrance for text and cards. */
export const riseIn = (y = 28, duration = 0.85) => ({
  hidden: { opacity: 0, y, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration, ease: EASE },
  },
})

export const fadeIn = (duration = 0.9) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration, ease: EASE } },
})

export const scaleIn = (from = 0.94, duration = 0.9) => ({
  hidden: { opacity: 0, scale: from },
  show: { opacity: 1, scale: 1, transition: { duration, ease: EASE } },
})

export const slideIn = (x = 40, duration = 0.9) => ({
  hidden: { opacity: 0, x },
  show: { opacity: 1, x: 0, transition: { duration, ease: EASE } },
})

/** Character/word mask reveal — used by <SplitText />. */
export const maskChild = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
}
