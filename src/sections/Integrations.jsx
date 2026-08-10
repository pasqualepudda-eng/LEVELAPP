import { integrations } from '../data/content'
import Marquee from '../components/ui/Marquee'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Icon from '../components/ui/Icon'
import CodeWindow from '../components/CodeWindow'

const half = Math.ceil(integrations.length / 2)

/** Ecosistema: con cosa si collega il software che costruiamo. */
export default function Integrations() {
  return (
    <section id="integrazioni" className="border-b border-line-muted py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Integrazioni"
          title="Si innesta su quello che usi già"
          subtitle="API REST, webhook e sincronizzazioni bidirezionali. Il software nuovo non sostituisce tutto: parla con il resto."
          accent="var(--color-purple)"
        />
      </div>

      <div className="mt-12 space-y-3">
        {[integrations.slice(0, half), integrations.slice(half)].map((row, i) => (
          <Marquee key={i} speed={i === 0 ? 60 : 75} reverse={i === 1} className="mask-fade-x" gap="0.75rem">
            {row.map((name) => (
              <span
                key={name}
                className="flex items-center gap-2 rounded-full border border-line bg-canvas-subtle px-4 py-2 text-sm whitespace-nowrap text-fg-muted"
              >
                <Icon name="plug" size={14} className="text-fg-subtle" />
                {name}
              </span>
            ))}
          </Marquee>
        ))}
      </div>

      <div className="shell mt-14 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <h3 className="text-2xl font-semibold">Un webhook, e i dati si muovono da soli</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Quando qualcosa cambia in un sistema, gli altri lo sanno subito: ordine confermato,
            fattura emessa, spedizione partita. Niente esportazioni notturne, niente file CSV
            passati a mano fra reparti.
          </p>

          <ul className="mt-6 space-y-2.5">
            {[
              'Log completo di ogni scambio, consultabile senza aprire un ticket',
              'Ritentativi automatici se il sistema di destinazione non risponde',
              'Ambiente di test separato, con dati finti',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[15px] text-fg">
                <Icon name="check" size={15} className="mt-1 shrink-0 text-purple" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} y={32}>
          <CodeWindow
            filename="webhook.ts"
            tabs={['webhook.ts', 'ordini.service.ts']}
            code={[
              'app.post("/webhook/ordini", async (req, res) => {',
              '  const evento = verificaFirma(req)',
              '',
              '  if (evento.tipo === "ordine.confermato") {',
              '    await erp.creaCommessa(evento.dati)',
              '    await crm.aggiornaOpportunita(evento.dati.clienteId)',
              '  }',
              '',
              '  res.status(200).send("ok")',
              '})',
            ]}
            footer={
              <>
                <span className="text-success">✓</span> 1.284 eventi sincronizzati oggi · 0 in
                errore
              </>
            }
          />
        </Reveal>
      </div>
    </section>
  )
}
