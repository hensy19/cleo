import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import CalendarGrid from '../../components/calendar/CalendarGrid'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import './CalendarPage.css'

export default function CalendarPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [cycleData, setCycleData] = useState(null)
  const [periodLogs, setPeriodLogs] = useState([])
  const [symptomLogs, setSymptomLogs] = useState([])
  const [moodEntries, setMoodEntries] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [showDayModal, setShowDayModal] = useState(false)
  const [dayDetails, setDayDetails] = useState(null)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const periods = JSON.parse(localStorage.getItem('periodLogs') || '[]')
    const symptoms = JSON.parse(localStorage.getItem('symptomLogs') || '[]')
    const moods = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    
    setCycleData(userInfo)
    setPeriodLogs(periods)
    setSymptomLogs(symptoms)
    setMoodEntries(moods)
  }, [])

  // Calculate period days from logs
  const getPeriodDays = () => {
    const periodDays = []
    periodLogs.forEach(log => {
      if (log.startDate && log.endDate) {
        const start = new Date(log.startDate)
        const end = new Date(log.endDate)
        const current = new Date(start)
        
        while (current <= end) {
          periodDays.push(current.toISOString().split('T')[0])
          current.setDate(current.getDate() + 1)
        }
      }
    })
    return periodDays
  }

  // Calculate predicted days based on cycle data
  const getPredictedDays = () => {
    if (!cycleData || !cycleData.lastPeriodDate) return []
    
    const lastPeriod = new Date(cycleData.lastPeriodDate)
    const cycleLength = cycleData.cycleLength || 28
    const periodLength = cycleData.periodLength || 5
    
    const nextPeriodStart = new Date(lastPeriod)
    nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleLength)
    
    const predictedDays = []
    for (let i = 0; i < periodLength; i++) {
      const date = new Date(nextPeriodStart)
      date.setDate(date.getDate() + i)
      predictedDays.push(date.toISOString().split('T')[0])
    }
    
    return predictedDays
  }

  // Handle day click to show details
  const handleDayClick = (date) => {
    const dateString = date.toISOString().split('T')[0]
    
    // Find data for this date
    const periodData = periodLogs.find(log => {
      if (!log.startDate || !log.endDate) return false
      const start = new Date(log.startDate).toISOString().split('T')[0]
      const end = new Date(log.endDate).toISOString().split('T')[0]
      return dateString >= start && dateString <= end
    })
    
    const symptomData = symptomLogs.find(log => 
      log.date === dateString
    )
    
    const moodData = moodEntries.find(entry => 
      entry.date === dateString
    )
    
    setSelectedDate(date)
    setDayDetails({
      period: periodData,
      symptoms: symptomData,
      mood: moodData
    })
    setShowDayModal(true)
  }

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleToday = () => {
    const now = new Date()
    setCurrentMonth(now.getMonth())
    setCurrentYear(now.getFullYear())
  }

  return (
    <DashboardLayout>
      <div className="calendar-page">
        {/* Header Section */}
        <div className="calendar-header-section">
          <div className="header-content">
            <h1>📅 Cycle Calendar</h1>
            <p className="header-subtitle">Track your period, fertile window, and cycle phases</p>
          </div>
        </div>

        {/* Controls */}
        <div className="calendar-controls-wrapper">
          <div className="calendar-controls">
            <button className="control-btn prev-btn" onClick={handlePreviousMonth} title="Previous month">
              ◀
            </button>
            <button className="control-btn today-btn" onClick={handleToday}>
              Today
            </button>
            <button className="control-btn next-btn" onClick={handleNextMonth} title="Next month">
              ▶
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid-wrapper">
          <CalendarGrid
            year={currentYear}
            month={currentMonth}
            periodDays={getPeriodDays()}
            predictedDays={getPredictedDays()}
            onDayClick={handleDayClick}
            cycleData={cycleData}
          />
        </div>

        {/* Cycle Guide Section */}
        <div className="cycle-guide-section">
          <h2 className="guide-title">Cycle Phases Explained</h2>
          <div className="guide-grid">
            <div className="guide-card period-card">
              <div className="guide-icon">🩸</div>
              <h3>Period Phase</h3>
              <p>Days when menstruation occurs. Track your flow and symptoms for better predictions.</p>
              <div className="phase-badge">Recorded</div>
            </div>
            
            <div className="guide-card follicular-card">
              <div className="guide-icon">📈</div>
              <h3>Follicular Phase</h3>
              <p>Rising energy and hormones. Great time for exercise and new initiatives.</p>
              <div className="phase-badge">Days 6-14</div>
            </div>
            
            <div className="guide-card ovulation-card">
              <div className="guide-icon">🌟</div>
              <h3>Ovulation Phase</h3>
              <p>Peak fertility window. Highest energy, confidence, and motivation.</p>
              <div className="phase-badge">Most Fertile</div>
            </div>
            
            <div className="guide-card luteal-card">
              <div className="guide-icon">🌙</div>
              <h3>Luteal Phase</h3>
              <p>Last phase before period. May experience low energy - prioritize rest and self-care.</p>
              <div className="phase-badge">Days 15-28</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-label">Last Period</div>
            <div className="stat-value">{cycleData?.lastPeriodDate ? new Date(cycleData.lastPeriodDate).toLocaleDateString() : 'Not tracked'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Cycle Length</div>
            <div className="stat-value">{cycleData?.cycleLength || 28} days</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Period Length</div>
            <div className="stat-value">{cycleData?.periodLength || 5} days</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Tracked Periods</div>
            <div className="stat-value">{periodLogs.length}</div>
          </div>
        </div>

        {/* Day Details Modal */}
        {showDayModal && (
          <Modal
            isOpen={showDayModal}
            onClose={() => setShowDayModal(false)}
            title={`${selectedDate?.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric'
            })} - Day Details`}
          >
            <div className="day-details">
              {dayDetails?.period && (
                <div className="detail-section period-section">
                  <h4>🩸 Period Info</h4>
                  <p><strong>Flow:</strong> {dayDetails.period.flow || 'Not specified'}</p>
                  <p><strong>Pain:</strong> {dayDetails.period.pain || 'Not specified'}</p>
                  <p><strong>Notes:</strong> {dayDetails.period.notes || 'No notes'}</p>
                </div>
              )}
              
              {dayDetails?.symptoms && (
                <div className="detail-section symptom-section">
                  <h4>🤒 Symptoms</h4>
                  <p><strong>Symptoms:</strong> {dayDetails.symptoms.symptoms?.join(', ') || 'None recorded'}</p>
                  <p><strong>Severity:</strong> {dayDetails.symptoms.severity || 'Not specified'}</p>
                  <p><strong>Notes:</strong> {dayDetails.symptoms.notes || 'No notes'}</p>
                </div>
              )}
              
              {dayDetails?.mood && (
                <div className="detail-section mood-section">
                  <h4>😊 Mood & Energy</h4>
                  <p><strong>Mood:</strong> {dayDetails.mood.mood || 'Not specified'}</p>
                  <p><strong>Energy:</strong> {dayDetails.mood.energy || 'Not specified'}</p>
                  <p><strong>Notes:</strong> {dayDetails.mood.notes || 'No notes'}</p>
                </div>
              )}
              
              {!dayDetails?.period && !dayDetails?.symptoms && !dayDetails?.mood && (
                <p className="no-data">📝 No data recorded for this day. Start tracking to gain insights!</p>
              )}
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  )
}
