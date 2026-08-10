import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Icon from './ui/Icon'

/**
 * Accordion delle domande frequenti. Un pannello aperto alla volta, con
 * `aria-expanded`/`aria-controls` per chi naviga da tastiera o screen reader.
 */
export default function FaqList({ items = [], defaultOpen = -1, className = '' }) {
  const [open, setOpen] = useState(defaultOpen)
  const baseId = useId()

  return (
    <div className={`divide-y divide-line-muted overflow-hidden rounded-xl border border-line ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        const buttonId = `${baseId}-button-${i}`

        return (
          <div key={item.q} className={isOpen ? 'bg-canvas-subtle' : ''}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-fg transition-colors hover:bg-canvas-subtle"
              >
                {item.q}
                <Icon
                  name="chevronDown"
                  size={16}
                  className={`shrink-0 text-fg-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-fg-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
