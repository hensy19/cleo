import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import CalendarGrid from '../../components/calendar/CalendarGrid'
import Button from '../../components/common/Button'
import './CalendarPage.css'

export default function CalendarPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [cycleData, setCycleData] = useState(null)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if (userInfo) {
      setCycleData(userInfo)
    }
  }, [])

  // Mock data - period days and predicted days
  const periodDays = [
    '2024-03-01',
    '2024-03-02',
    '2024-03-03',
    '2024-03-04',
    '2024-03-05'
  ]

  const predictedDays = [
    '2024-03-29',
    '2024-03-30',
    '2024-03-31',
    '2024-04-01',
    '2024-04-02'
  ]

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
        <div className="calendar-header-section">
          <h1>📅 Your Cycle Calendar</h1>
          <p>Track your period and predicted cycle days</p>
        </div>

        <div className="calendar-controls">
          <Button
            variant="outline"
            onClick={handlePreviousMonth}
          >
            ← Previous
          </Button>
          <Button
            variant="secondary"
            onClick={handleToday}
          >
            Today
          </Button>
          <Button
            variant="outline"
            onClick={handleNextMonth}
          >
            Next →
          </Button>
        </div>

        <CalendarGrid
          year={currentYear}
          month={currentMonth}
          periodDays={periodDays}
          predictedDays={predictedDays}
          cycleData={cycleData}
        />

        <div className="calendar-info">
          <div className="info-card">
            <h3>🔴 Period Days</h3>
            <p>These are the days of your recorded period. Track them consistently for better predictions.</p>
          </div>
          <div className="info-card">
            <h3>🟦 Predicted Days</h3>
            <p>Based on your history, these days are when your next period is predicted to start.</p>
          </div>
          <div className="info-card">
            <h3>🟧 Follicular Phase</h3>
            <p>Days of increasing energy and mood. Good time for new projects and exercise.</p>
          </div>
          <div className="info-card">
            <h3>🟥 Ovulation Phase</h3>
            <p>Peak fertility window. You may feel most energetic and confident during this phase.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
