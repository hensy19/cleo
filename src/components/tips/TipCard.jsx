import './TipCard.css'

export default function TipCard({
  title,
  category,
  content,
  icon,
  onClick
}) {
  return (
    <div className="tip-card" onClick={onClick}>
      <div className="tip-header">
        {icon && <span className="tip-icon">{icon}</span>}
        <div>
          <h3 className="tip-title">{title}</h3>
          <span className="tip-category">{category}</span>
        </div>
      </div>
      <p className="tip-content">{content}</p>
      <a href="#read-more" className="tip-link">Read More →</a>
    </div>
  )
}
