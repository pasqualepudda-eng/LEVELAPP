import { Children, useState } from 'react'

/**
 * Infinite CSS marquee. The track holds two identical copies of the children and
 * translates -50%, so the loop is seamless. Pausing on hover is opt-in.
 */
export default function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = false,
  gap = '3rem',
  className = '',
}) {
  const items = Children.toArray(children)
  const [paused, setPaused] = useState(false)

  const Track = ({ ariaHidden }) => (
    <div
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={ariaHidden || undefined}
    >
      {items}
    </div>
  )

  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <div
        className="animate-marquee flex w-max"
        style={{
          '--marquee-duration': `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  )
}
