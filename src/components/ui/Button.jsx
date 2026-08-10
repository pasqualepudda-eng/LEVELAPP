import { Link } from '../../lib/router'
import Icon from './Icon'

/**
 * Bottone unico per tutto il sito, sul modello dei `Button` di Primer. Regge
 * tre forme:
 *   <Button to="/contatti">   → link interno (router)
 *   <Button href="mailto:…">  → link esterno
 *   <Button onClick={…}>      → <button>
 *
 * Varianti: primary (verde, l'azione principale), default (grigio con bordo),
 * outline, invisible (solo testo), danger e marketing — il bottone pieno a
 * contrasto delle hero, come il "Sign up" di github.com.
 * Una sola azione primaria per schermata.
 *
 * I colori arrivano tutti dai token, quindi la variante è la stessa nei due
 * temi: nessuna classe con un colore scritto a mano.
 */

const base =
  'inline-flex items-center justify-center gap-2 rounded-md border font-medium whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  primary:
    'border-btn-primary-border bg-btn-primary-bg text-white shadow-card hover:bg-btn-primary-hover active:bg-btn-primary-active',
  default:
    'border-btn-border bg-btn-bg text-fg shadow-card hover:bg-btn-hover active:bg-btn-active',
  outline: 'border-line bg-transparent text-fg hover:bg-btn-bg hover:border-fg-subtle',
  invisible: 'border-transparent bg-transparent text-fg-muted hover:bg-btn-bg hover:text-fg',
  danger: 'border-btn-border bg-btn-bg text-danger hover:bg-danger hover:text-white',
  marketing:
    'border-transparent bg-fg text-canvas hover:opacity-90 active:opacity-80',
}

const sizes = {
  sm: 'h-7 px-3 text-xs',
  md: 'h-8 px-4 text-sm',
  lg: 'h-10 px-5 text-sm',
  xl: 'h-12 px-6 text-base',
}

export default function Button({
  children,
  variant = 'default',
  size = 'md',
  to,
  href,
  icon,
  trailingIcon,
  className = '',
  ...rest
}) {
  const classes = `${base} ${variants[variant] ?? variants.default} ${sizes[size] ?? sizes.md} ${className}`

  const content = (
    <>
      {icon && <Icon name={icon} size={16} className="shrink-0 opacity-90" />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={16} className="shrink-0 opacity-90" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
