import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import './Dashboard.css'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [cycleData, setCycleData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/login')
      return
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    setUser(userInfo)

    // Simulate fetching cycle data
    setCycleData({
      cycleLength: 28,
      periodLength: 5,
      lastPeriodStart: new Date(2024, 1, 10),
      nextPeriodEstimate: new Date(2024, 2, 10),
      daysUntilNextPeriod: 27,
      currentCycleDay: 1
    })
  }, [navigate])

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="dashboard">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h1>Welcome back, {user.name || 'User'}! 👋</h1>
          <p>Here's what's happening today</p>
        </div>

        {/* Summary Cards */}
        <div className="dashboard-cards-grid">
          <Card className="summary-card">
            <h3>Current Cycle Day</h3>
            <div className="summary-number">{cycleData?.currentCycleDay || '-'}</div>
            <p className="summary-label">Days into cycle</p>
          </Card>

          <Card className="summary-card">
            <h3>Days Until Next Period</h3>
            <div className="summary-number">{cycleData?.daysUntilNextPeriod || '-'}</div>
            <p className="summary-label">Estimated days</p>
          </Card>

          <Card className="summary-card">
            <h3>Cycle Length</h3>
            <div className="summary-number">{cycleData?.cycleLength || '-'}</div>
            <p className="summary-label">Days average</p>
          </Card>

          <Card className="summary-card">
            <h3>Period Length</h3>
            <div className="summary-number">{cycleData?.periodLength || '-'}</div>
            <p className="summary-label">Days average</p>
          </Card>
        </div>

        {/* Next Period Section */}
        <Card className="next-period-card">
          <div className="next-period-content">
            <div>
              <h3>Next Predicted Period</h3>
              <p className="next-period-date">
                {cycleData?.nextPeriodEstimate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="next-period-description">
                Based on your cycle history and current tracking data
              </p>
            </div>
            <div className="next-period-icon">📅</div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Button 
              variant="primary" 
              onClick={() => navigate('/log-period')}
            >
              📝 Log Period
            </Button>
            <Button 
              variant="primary"
              onClick={() => navigate('/log-symptoms')}
            >
              🔔 Log Symptoms
            </Button>
            <Button 
              variant="primary"
              onClick={() => navigate('/calendar')}
            >
              📅 View Calendar
            </Button>
            <Button 
              variant="primary"
              onClick={() => navigate('/tips')}
            >
              💡 Get Tips
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
