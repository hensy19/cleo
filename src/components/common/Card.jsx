import './Card.css'

export default function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  hover = false
}) {
  return (
    <div
      className={`card card-${variant} ${hover ? 'card-hover' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
