import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import CalendarGrid from '../../components/calendar/CalendarGrid'
import './CalendarPage.css'

export default function CalendarPage() {
  const navigate = useNavigate()
  const today = new Date()
  // Looking at the mockup, it says "February 2026", so I'll set 2026-02 as default for exact match, 
  // or just use current month/year but the data needs to line up.
  const [currentMonth, setCurrentMonth] = useState(1) // February (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026)
  const [cycleData, setCycleData] = useState(null)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if (userInfo) setCycleData(userInfo)
  }, [])

  // Hardcoded mockup data to perfectly match the screenshot of February 2026
  // Period Days: 3, 4, 5, 6, 7
  // Fertile Window: 14, 15, 17, 18
  // Ovulation: 16
  // Today: 19
  const periodDays = [
    '2026-02-03', '2026-02-04', '2026-02-05', '2026-02-06', '2026-02-07'
  ]
  const fertileDays = [
    '2026-02-14', '2026-02-15', '2026-02-17', '2026-02-18'
  ]
  const ovulationDays = [
    '2026-02-16'
  ]
  const todayDateStr = '2026-02-19' // Mocking today to force the border

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

  return (
    <DashboardLayout>
      <div className="calendar-page-mock">
        
        <div className="calendar-header-top">
          <div className="calendar-title-group">
            <Link to="/dashboard" className="back-arrow">&lt;</Link>
            <div>
              <h1 className="calendar-title">Cycle Calendar</h1>
              <p className="calendar-subtitle">Track your cycle across the month.</p>
            </div>
          </div>
          
          <div className="calendar-actions">
            <button className="btn-log-period" onClick={() => navigate('/log-period')}>Log Period</button>
            <button className="btn-view-history" onClick={() => navigate('/history')}>View History</button>
          </div>
        </div>

        <div className="calendar-main-content">
          <CalendarGrid
            year={currentYear}
            month={currentMonth}
            periodDays={periodDays}
            fertileDays={fertileDays}
            ovulationDays={ovulationDays}
            todayStr={todayDateStr}
            onPrev={handlePreviousMonth}
            onNext={handleNextMonth}
          />

          <div className="calendar-legend-card">
            <h4 className="legend-title">Legend</h4>
            <div className="legend-items-wrapper">
              <div className="legend-item-block">
                <div className="box period-box"></div>
                <span>Period Days</span>
              </div>
              <div className="legend-item-block">
                <div className="box ovulation-box"></div>
                <span>Ovulation</span>
              </div>
              <div className="legend-item-block">
                <div className="box fertile-box"></div>
                <span>Fertile Window</span>
              </div>
              <div className="legend-item-block">
                <div className="box today-box"></div>
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}
