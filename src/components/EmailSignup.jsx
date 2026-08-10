import { useId, useState } from 'react'
import { company } from '../data/content'
import Button from './ui/Button'

/**
 * Campo email attaccato all'azione primaria: è il gruppo che github.com usa
 * nella hero e nella chiusura della home. Compare in entrambi i punti, quindi
 * vive qui.
 *
 * Non esiste un backend: la richiesta parte come mail precompilata, come il
 * form della pagina contatti. Il punto in cui agganciare un vero endpoint
 * (Formspree, Resend, API tua) è il corpo di `onSubmit`.
 */
export default function EmailSignup({
  label = "Richiedi un'analisi",
  placeholder = 'La tua email di lavoro',
  className = '',
}) {
  const id = useId()
  const [email, setEmail] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent('Richiesta di analisi')
    const body = encodeURIComponent(
      `Ciao ${company.name},\nvorrei parlare di un progetto.\n\nEmail di contatto: ${email}\n`,
    )
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full max-w-lg flex-col gap-2 sm:flex-row sm:items-center ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        type="email"
        name="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={placeholder}
        className="field h-12 flex-1 text-base"
      />
      <Button type="submit" variant="primary" size="xl" className="shrink-0">
        {label}
      </Button>
    </form>
  )
}
