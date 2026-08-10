import { riseIn, VIEWPORT } from '../../lib/motion'
import { motionTag } from '../../lib/motionTag'

/** Single-element rise+fade+deblur on scroll into view. */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  duration = 0.85,
  as = 'div',
  ...rest
}) {
  const MotionTag = motionTag(as)
  const variants = riseIn(y, duration)

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: variants.hidden,
        show: { ...variants.show, transition: { ...variants.show.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/** Wrap a list to stagger its <Reveal> / motion children. */
export function RevealGroup({
  children,
  className = '',
  stagger = 0.09,
  delay = 0,
  as = 'div',
  ...rest
}) {
  const MotionTag = motionTag(as)
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/** Child of <RevealGroup> — inherits the parent's stagger timeline. */
export function RevealItem({ children, className = '', y = 26, as = 'div', ...rest }) {
  const MotionTag = motionTag(as)
  return (
    <MotionTag className={className} variants={riseIn(y)} {...rest}>
      {children}
    </MotionTag>
  )
}
