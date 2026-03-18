import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import './History.css'

export default function History() {
  const [periodHistory, setPeriodHistory] = useState([])

  useEffect(() => {
    // Get period logs from local storage
    const logs = JSON.parse(localStorage.getItem('periodLogs') || '[]')
    setPeriodHistory(logs.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)))
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateDuration = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
  }

  return (
    <DashboardLayout>
      <div className="history-page">
        <div className="history-header">
          <h1>📖 Cycle History</h1>
          <p>View your past periods and cycles</p>
        </div>

        {periodHistory.length > 0 ? (
          <div className="history-list">
            {periodHistory.map((period, index) => (
              <Card key={period.id} className="history-card">
                <div className="history-card-content">
                  <div className="history-dates">
                    <div className="history-date-item">
                      <span className="history-label">Start</span>
                      <span className="history-date">{formatDate(period.startDate)}</span>
                    </div>
                    <div className="history-arrow">→</div>
                    <div className="history-date-item">
                      <span className="history-label">End</span>
                      <span className="history-date">{formatDate(period.endDate)}</span>
                    </div>
                  </div>
                  <div className="history-duration">
                    <span className="duration-badge">
                      {calculateDuration(period.startDate, period.endDate)} days
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="empty-state">
            <div className="empty-content">
              <div className="empty-icon">📊</div>
              <h3>No Period History Yet</h3>
              <p>Start logging your periods to see your history here</p>
            </div>
          </Card>
        )}

        {periodHistory.length > 0 && (
          <Card className="statistics-card">
            <h3>📊 Your Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total Periods Logged</span>
                <span className="stat-value">{periodHistory.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Period Length</span>
                <span className="stat-value">
                  {Math.round(
                    periodHistory.reduce((sum, p) => sum + calculateDuration(p.startDate, p.endDate), 0) / periodHistory.length
                  )} days
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Latest Period</span>
                <span className="stat-value">
                  {formatDate(periodHistory[0].startDate)}
                </span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
