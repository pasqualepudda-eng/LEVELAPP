import { motion } from 'motion/react'
import Icon from './ui/Icon'
import Logo from './Logo'

/**
 * Pannello conversazionale che mostra come si comporta un assistente collegato
 * ai documenti aziendali: risposta breve, fonti citate, azione proposta.
 * Le battute entrano in sequenza quando la sezione arriva in vista.
 */

const thread = [
  {
    from: 'user',
    text: 'Quali condizioni abbiamo concordato con Novaform sui resi?',
  },
  {
    from: 'ai',
    text: 'Reso accettato entro 30 giorni sui prodotti a catalogo, escluse le lavorazioni su misura. Le spese sono a carico del cliente sopra i 20 kg.',
    sources: ['Contratto Novaform 2024.pdf · art. 7', 'Allegato condizioni logistiche · p. 3'],
  },
  {
    from: 'user',
    text: 'Ci sono commesse aperte che rientrano in questa casistica?',
  },
  {
    from: 'ai',
    text: 'Due: CM-2419 e CM-2431. Entrambe contengono articoli a catalogo consegnati da meno di 30 giorni.',
    action: 'Apri le commesse nel gestionale',
  },
]

export default function AiConsole({ className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-canvas-inset ${className}`}
      aria-hidden="true"
    >
      {/* Intestazione */}
      <div className="flex items-center gap-2.5 border-b border-line bg-canvas-subtle px-4 py-3">
        <Logo size={20} className="text-fg" />
        <span className="text-sm font-semibold">Assistente LevelApp</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[11px] text-fg-muted">
          <Icon name="lock" size={10} />
          dati interni
        </span>
      </div>

      {/* Conversazione */}
      <div className="space-y-4 p-4">
        {thread.map((message, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={message.from === 'user' ? 'flex justify-end' : ''}
          >
            {message.from === 'user' ? (
              <p className="max-w-[85%] rounded-lg rounded-br-sm border border-line bg-canvas-overlay px-3.5 py-2.5 text-sm text-fg">
                {message.text}
              </p>
            ) : (
              <div className="max-w-[92%]">
                <div className="rounded-lg rounded-bl-sm border border-line bg-canvas px-3.5 py-2.5">
                  <p className="text-sm leading-relaxed text-fg">
                    {message.text}
                    {i === thread.length - 1 && (
                      <span className="animate-caret ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-fg" />
                    )}
                  </p>

                  {message.sources && (
                    <ul className="mt-3 space-y-1.5 border-t border-line-muted pt-2.5">
                      {message.sources.map((source) => (
                        <li
                          key={source}
                          className="flex items-center gap-1.5 font-mono text-[11px] text-fg-muted"
                        >
                          <Icon name="file" size={11} className="shrink-0 text-fg-subtle" />
                          <span className="truncate">{source}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {message.action && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas-overlay px-2.5 py-1 text-xs text-accent">
                    <Icon name="arrowUpRight" size={12} />
                    {message.action}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Barra di input */}
      <div className="flex items-center gap-2 border-t border-line bg-canvas-subtle px-4 py-3">
        <span className="flex-1 truncate text-sm text-fg-subtle">Chiedi qualcosa ai tuoi dati…</span>
        <span className="flex size-7 items-center justify-center rounded-md bg-success-emphasis text-white">
          <Icon name="arrowRight" size={14} />
        </span>
      </div>
    </div>
  )
}
