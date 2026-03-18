import './DayCell.css'

export default function DayCell({
  day,
  isCurrentMonth,
  isPeriodDay = false,
  isPredictedDay = false,
  isFollicularDay = false,
  isOvulationDay = false,
  onClick
}) {
  return (
    <button
      className={`day-cell 
        ${!isCurrentMonth ? 'other-month' : ''} 
        ${isPeriodDay ? 'period-day' : ''} 
        ${isPredictedDay ? 'predicted-day' : ''}
        ${isFollicularDay ? 'follicular-day' : ''}
        ${isOvulationDay ? 'ovulation-day' : ''}
      `}
      onClick={onClick}
    >
      <span className="day-number">{day}</span>
      {isPeriodDay && <span className="period-indicator">●</span>}
      {isOvulationDay && <span className="ovulation-indicator">◆</span>}
      {isFollicularDay && <span className="follicular-indicator">○</span>}
      {isPredictedDay && <span className="predicted-indicator">◯</span>}
    </button>
  )
}

