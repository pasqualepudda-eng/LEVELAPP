import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { accedi, useSessione } from '../lib/auth'
import { company } from '../data/content'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import { Link, navigate } from '../lib/router'
import { EASE } from '../lib/motion'

/** Accesso all'area riservata: se la sessione c'è già, si tira dritto. */
export default function Login() {
  const sessione = useSessione()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState('')
  const [attesa, setAttesa] = useState(false)

  useEffect(() => {
    if (sessione) navigate('/area')
  }, [sessione])

  async function invia(e) {
    e.preventDefault()
    setAttesa(true)
    setErrore('')
    const esito = await accedi(email, password)
    setAttesa(false)
    if (esito.ok) navigate('/area')
    else setErrore(esito.errore)
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden border-b border-line-muted">
      <div className="grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-30" />

      <div className="shell relative py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto w-full max-w-md"
        >
          <p className="font-mono text-mini tracking-[0.25em] text-fg-subtle uppercase">
            Area riservata
          </p>
          <h1 className="display mt-4 text-3xl sm:text-4xl">Accedi allo studio preventivi</h1>
          <p className="mt-3 text-fg-muted">
            Da qui si scrivono, si aggiornano e si stampano i preventivi. Serve un account: se non
            ce l’hai, chiedilo a chi gestisce il sito.
          </p>

          <form onSubmit={invia} className="mt-8 rounded-xl border border-line bg-canvas p-6">
            <label htmlFor="email" className="font-mono text-mini tracking-wider text-fg-subtle uppercase">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field mt-1.5"
              placeholder={company.email}
            />

            <label
              htmlFor="password"
              className="mt-5 block font-mono text-mini tracking-wider text-fg-subtle uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field mt-1.5"
            />

            {errore && (
              <p
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-lg border border-danger-emphasis/40 bg-danger-subtle px-3 py-2.5 text-sm text-danger"
              >
                <Icon name="x" size={14} className="mt-0.5 shrink-0" />
                {errore}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              trailingIcon="arrowRight"
              className="mt-6 w-full justify-center"
              disabled={attesa}
            >
              {attesa ? 'Verifica…' : 'Entra'}
            </Button>
          </form>

          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-fg-subtle">
            <Icon name="lock" size={13} className="mt-0.5 shrink-0" />
            La verifica avviene nel browser e i preventivi restano su questo dispositivo: è comodo e
            funziona offline, ma non è una cassaforte. Per un accesso vero serve un server che
            controlli la password.
          </p>

          <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg">
            <Icon name="arrowRight" size={13} className="rotate-180" />
            Torna al sito
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
