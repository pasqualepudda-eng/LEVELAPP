import { useId, useState } from 'react'
import { Link } from '../lib/router'
import { company, footerLinks, legalLinks } from '../data/content'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import Button from './ui/Button'
import Icon from './ui/Icon'

/**
 * Footer sul modello di github.com: colonna del marchio con iscrizione agli
 * aggiornamenti, mappa del sito su quattro colonne e riga finale con
 * copyright, link legali, social e selettore del tema (al posto del selettore
 * di lingua).
 */

/** Iscrizione agli aggiornamenti. Come il resto del sito non ha backend: apre
 *  una mail precompilata. TODO: collegare un vero provider (Buttondown,
 *  Mailchimp, Resend) sostituendo il corpo di `onSubmit`. */
function Newsletter() {
  const id = useId()
  const [email, setEmail] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent('Iscrizione agli aggiornamenti')
    const body = encodeURIComponent(`Iscrivetemi agli aggiornamenti su questo indirizzo: ${email}\n`)
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <label htmlFor={id} className="block text-sm font-semibold text-fg">
        Aggiornamenti, non spam
      </label>
      <p className="mt-1.5 text-sm text-fg-muted">
        Un’email quando pubblichiamo un case study o una guida tecnica.
      </p>

      <div className="mt-3 flex max-w-sm flex-col gap-2 sm:flex-row">
        <input
          id={id}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="nome@azienda.it"
          className="field h-8 flex-1"
        />
        <Button type="submit" variant="default" size="md" className="shrink-0">
          Iscrivimi
        </Button>
      </div>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-line-muted bg-canvas-inset">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          {/* Marchio, iscrizione, riferimenti */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-fg" aria-label={company.name}>
              <img src="/logo.png" alt="" className="marchio h-8 w-auto" />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {company.payoff} Software gestionale su misura, piattaforme web e AI applicata.
            </p>

            <Newsletter />

            <ul className="mt-8 space-y-2 text-sm text-fg-muted">
              <li className="flex items-center gap-2">
                <Icon name="mail" size={14} className="shrink-0 text-fg-subtle" />
                <a href={`mailto:${company.email}`} className="hover:text-accent hover:underline">
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="phone" size={14} className="shrink-0 text-fg-subtle" />
                <a href={company.phoneHref} className="hover:text-accent hover:underline">
                  {company.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Mappa del sito */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-semibold text-fg">{column.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-fg-muted transition-colors hover:text-accent hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Riga finale */}
        <div className="mt-12 flex flex-col gap-5 border-t border-line-muted pt-6 text-sm text-fg-subtle lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Logo size={22} className="text-fg-subtle" />
            <p>
              © {new Date().getFullYear()} {company.name}
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors hover:text-fg hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <ul className="flex items-center gap-1">
              {company.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-canvas-subtle hover:text-fg"
                    {...(social.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
