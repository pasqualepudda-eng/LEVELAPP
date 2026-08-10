import { motion } from 'motion/react'

const custom = new Map()

/**
 * Resolve an `as` prop (an element name like "article", or a component) to a
 * motion component.
 *
 * Calling `motion.create()` during render returns a brand-new component type on
 * every pass, which makes React unmount and remount the whole subtree — losing
 * DOM state and replaying entrance animations. `motion[tag]` is memoised by the
 * library for intrinsic elements; components are cached here at module scope.
 */
export function motionTag(as = 'div') {
  if (typeof as === 'string') return motion[as] ?? motion.div

  let cached = custom.get(as)
  if (!cached) {
    cached = motion.create(as)
    custom.set(as, cached)
  }
  return cached
}
