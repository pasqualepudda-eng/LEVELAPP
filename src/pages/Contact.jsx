import { useState } from 'react'
import { company, contactReasons, contactSteps, faqs } from '../data/content'
import PageHeader from '../components/PageHeader'
import FaqList from '../components/FaqList'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'

const field =
  'w-full rounded-md border border-line bg-canvas px-3 py-2.5 text-[15px] text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:ring-2 focus:ring-accent/35 focus:outline-none'
const labelClass = 'mb-1.5 block text-sm font-medium text-fg'

export default function Contact() {
  const [sent, setSent] = useState(false)

  /**
   * Il form non ha ancora un backend: componiamo una mail precompilata verso
   * l'indirizzo aziendale.
   * TODO: per ricevere i messaggi via API (Formspree, Resend, endpoint tuo)
   * sostituisci il blocco `window.location.href` con la fetch al tuo endpoint.
   */
  function onSubmit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))

    const corpo = [
      `Nome: ${data.nome}`,
      `Azienda: ${data.azienda}`,
      `Email: ${data.email}`,
      `Telefono: ${data.telefono || '—'}`,
      `Tipo di progetto: ${data.progetto}`,
      '',
      data.messaggio,
    ].join('\n')

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      `Richiesta dal sito — ${data.azienda || data.nome}`,
    )}&body=${encodeURIComponent(corpo)}`

    setSent(true)
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contatti' }]}
        eyebrow="Contatti"
        title="Parliamo del tuo processo. O della tua idea"
        lead="Rispondiamo entro un giorno lavorativo. La prima call dura mezz'ora, è senza impegno e serve a capire se siamo la scelta giusta per il tuo progetto."
        accent="var(--color-success)"
      />

      {/* Form + riferimenti */}
      <section className="border-b border-line-muted py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          {/* Modulo */}
          <Reveal>
            <div className="card p-6 md:p-8">
              <h2 className="text-xl font-semibold">Raccontaci il progetto</h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                I campi con <span className="text-danger">*</span> sono obbligatori.
              </p>

              <form onSubmit={onSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className={labelClass}>
                    Nome e cognome <span className="text-danger">*</span>
                  </label>
                  <input id="nome" name="nome" required className={field} placeholder="Mario Rossi" />
                </div>

                <div>
                  <label htmlFor="azienda" className={labelClass}>
                    Azienda <span className="text-danger">*</span>
                  </label>
                  <input
                    id="azienda"
                    name="azienda"
                    required
                    className={field}
                    placeholder="Nome azienda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={field}
                    placeholder="mario@azienda.it"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className={labelClass}>
                    Telefono
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    className={field}
                    placeholder="+39 …"
                  />
                </div>

                <div>
                  <label htmlFor="progetto" className={labelClass}>
                    Di cosa hai bisogno <span className="text-danger">*</span>
                  </label>
                  <select id="progetto" name="progetto" required className={field}>
                    {contactReasons.map((reason) => (
                      <option key={reason.value} value={reason.label}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="messaggio" className={labelClass}>
                    Il problema da risolvere <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    required
                    rows={6}
                    className={`${field} resize-y`}
                    placeholder="Es. gestiamo i preventivi su Excel e ogni offerta passa da tre persone diverse…"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-2.5 text-sm text-fg-muted">
                    <input
                      type="checkbox"
                      name="privacy"
                      required
                      className="mt-0.5 size-4 shrink-0 rounded border-line bg-canvas accent-btn-primary-bg"
                    />
                    <span>
                      Ho letto la{' '}
                      {/* TODO: link alla privacy policy reale */}
                      <a href="#" className="text-accent hover:underline">
                        privacy policy
                      </a>{' '}
                      e acconsento al trattamento dei dati. <span className="text-danger">*</span>
                    </span>
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <Button type="submit" variant="primary" size="xl" trailingIcon="arrowRight">
                    Invia la richiesta
                  </Button>

                  {sent && (
                    <p className="flex items-center gap-2 text-sm text-success">
                      <Icon name="check" size={15} />
                      Si è aperto il tuo client di posta con il messaggio già pronto.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </Reveal>

          {/* Contatti diretti */}
          <div className="space-y-5">
            <Reveal delay={0.08}>
              <div className="card p-6">
                <h2 className="text-sm font-semibold text-fg">Preferisci scrivere o chiamare?</h2>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a
                      href={`mailto:${company.email}`}
                      className="flex items-center gap-3 rounded-md border border-line bg-canvas px-4 py-3 text-sm transition-colors hover:border-fg-subtle"
                    >
                      <Icon name="mail" size={16} className="text-fg-muted" />
                      <span className="min-w-0 flex-1 truncate text-fg">{company.email}</span>
                      <Icon name="arrowUpRight" size={14} className="text-fg-subtle" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={company.phoneHref}
                      className="flex items-center gap-3 rounded-md border border-line bg-canvas px-4 py-3 text-sm transition-colors hover:border-fg-subtle"
                    >
                      <Icon name="phone" size={16} className="text-fg-muted" />
                      <span className="min-w-0 flex-1 truncate text-fg">{company.phone}</span>
                      <Icon name="arrowUpRight" size={14} className="text-fg-subtle" />
                    </a>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-fg-subtle">
                  Lunedì–venerdì, 9:00–18:30. Fuori orario scrivi: rispondiamo il primo giorno
                  lavorativo utile.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card p-6">
                <h2 className="text-sm font-semibold text-fg">Cosa succede dopo</h2>
                <ol className="mt-4 space-y-5">
                  {contactSteps.map((step, i) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-canvas font-mono text-[11px] text-fg-muted">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-[15px] font-medium text-fg">{step.title}</span>
                        <span className="mt-1 block text-[13px] leading-relaxed text-fg-muted">
                          {step.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="card p-6">
                <h2 className="text-sm font-semibold text-fg">Le nostre sedi</h2>
                <ul className="mt-4 space-y-4">
                  {company.offices.map((office) => (
                    <li key={office.city} className="flex gap-3">
                      <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-fg-muted" />
                      <span className="text-sm">
                        <span className="block font-medium text-fg">{office.city}</span>
                        <span className="block text-fg-muted">
                          {office.address} · {office.zip}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-line-muted pt-4 text-xs text-fg-subtle">
                  {company.name} · {company.vat}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Perché scriverci */}
      <section className="border-b border-line-muted py-16">
        <RevealGroup className="shell grid gap-5 sm:grid-cols-3">
          {[
            { icon: 'clock', title: 'Risposta in 1 giorno', body: 'Non un ticket: una persona.' },
            {
              icon: 'gift',
              title: 'Prima analisi senza impegno',
              body: 'Mezz’ora di call per capire il perimetro.',
            },
            { icon: 'shield', title: 'Nessun impegno', body: 'Se non facciamo al caso tuo, te lo diciamo.' },
          ].map((item) => (
            <RevealItem key={item.title}>
              <div className="card flex h-full items-start gap-3 p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-success">
                  <Icon name={item.icon} size={16} />
                </span>
                <span>
                  <span className="block font-medium text-fg">{item.title}</span>
                  <span className="mt-1 block text-sm text-fg-muted">{item.body}</span>
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-line-muted py-20 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Domande frequenti"
            title="Le risposte che servono prima di chiamarci"
            accent="var(--color-success)"
          />
          <FaqList items={faqs} defaultOpen={0} />
        </div>
      </section>
    </>
  )
}
