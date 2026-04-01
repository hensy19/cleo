import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { formatDate } from '../../utils/helpers'
import './Dashboard.css'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [cycleData, setCycleData] = useState(null)
  const [mood, setMood] = useState(null)
  const [notes, setNotes] = useState([])
  const [healthTip, setHealthTip] = useState(null)
  const [showMoodSelector, setShowMoodSelector] = useState(true)
  const navigate = useNavigate()

  const moodOptions = [
    { label: 'Happy', emoji: '😊', color: '#FFD93D' },
    { label: 'Calm', emoji: '😌', color: '#A8E6CF' },
    { label: 'Tired', emoji: '😴', color: '#C7CEEA' },
    { label: 'Sad', emoji: '😢', color: '#FFB6C1' }
  ]

  const healthTips = [
    { title: 'Stay Hydrated', description: 'Drinking plenty of water, especially during your period and fertile window periods, helps with symptoms.' },
    { title: 'Regular Exercise', description: 'Light exercise during your cycle can help reduce cramps and improve mood.' },
    { title: 'Healthy Diet', description: 'Eating nutrients like iron and calcium during your period helps manage symptoms.' }
  ]

  const cycleInsights = [
    { label: 'Regular Cycle Pattern', description: 'Your fertile window starts in 5 days' },
    { label: 'Approaching Fertile Window', description: 'Your fertile window starts in 5 days' },
    { label: 'Average Cycle Length', description: 'Your average cycle is 28 days' }
  ]

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/login')
      return
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    setUser(userInfo)

    // Initialize cycle data
    const today = new Date()
    const lastPeriodStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14)
    const cycleLength = 28
    const currentCycleDay = 14
    const nextPeriodDate = new Date(lastPeriodStart)
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength)
    
    const daysUntilNext = Math.ceil((nextPeriodDate - today) / (1000 * 60 * 60 * 24))
    const fertileWindowStart = new Date(lastPeriodStart)
    fertileWindowStart.setDate(fertileWindowStart.getDate() + 12)

    setCycleData({
      cycleLength,
      periodLength: 5,
      lastPeriodStart,
      nextPeriodDate,
      daysUntilNextPeriod: daysUntilNext,
      currentCycleDay,
      currentCycleDayPercent: (currentCycleDay / cycleLength) * 100,
      fertileWindowStart,
      fertileWindowEnd: new Date(fertileWindowStart.getTime() + 5 * 24 * 60 * 60 * 1000)
    })

    // Initialize with random health tip
    setHealthTip(healthTips[Math.floor(Math.random() * healthTips.length)])

    // Load recent notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('userNotes') || '[]')
    setNotes(savedNotes.slice(0, 3))

    // Load mood from localStorage if exists
    const savedMood = localStorage.getItem('todayMood')
    if (savedMood) {
      setMood(savedMood)
      setShowMoodSelector(false)
    }
  }, [navigate])

  const handleMoodSelect = (moodLabel) => {
    setMood(moodLabel)
    localStorage.setItem('todayMood', moodLabel)
    setShowMoodSelector(false)
    // Save mood to database/backend here
  }

  const addNote = () => {
    navigate('/notes')
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="dashboard">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h1>Welcome back, {user.name || 'User'}! 👋</h1>
          <p className="welcome-subtitle">Here's your period and cycle tracker overview</p>
        </div>

        {/* Main Grid - Top Section with 3 Cards */}
        <div className="dashboard-top-grid">
          {/* Next Period Card */}
          <Card className="info-card next-period-card">
            <div className="info-card-header">
              <h4 className="info-label">Next Period</h4>
              <span className="info-icon">📅</span>
            </div>
            <p className="info-date">{cycleData && formatDate(cycleData.nextPeriodDate)}</p>
            <p className="info-subtext">in {cycleData?.daysUntilNextPeriod} days</p>
          </Card>

          {/* Fertile Window Card */}
          <Card className="info-card fertile-card">
            <div className="info-card-header">
              <h4 className="info-label">Predicted</h4>
              <span className="info-icon">💜</span>
            </div>
            <p className="info-date">{cycleData && formatDate(cycleData.fertileWindowStart)}</p>
            <span className="fertile-badge">Fertile Window</span>
            <p className="info-subtext">in 7 days</p>
          </Card>

          {/* Current Cycle Day Card */}
          <Card className="info-card cycle-day-card">
            <div className="cycle-day-content">
              <div className="circle-progress">
                <svg viewBox="0 0 100 100" className="progress-circle">
                  <circle cx="50" cy="50" r="45" className="progress-background" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    className="progress-fill"
                    style={{
                      strokeDasharray: `${cycleData ? (cycleData.currentCycleDayPercent / 100) * 283 : 0} 283`
                    }}
                  />
                </svg>
                <div className="cycle-day-text">
                  <p className="cycle-day-number">{cycleData?.currentCycleDay}</p>
                  <p className="cycle-day-label">of {cycleData?.cycleLength} days</p>
                </div>
              </div>
              <p className="cycle-day-phase">Current cycle day</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="quick-actions-card">
          <div className="quick-actions-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            <button className="quick-action-btn" onClick={() => navigate('/log-period')}>
              <span className="action-icon">📝</span>
              <span className="action-text">Log Period</span>
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/notes')}>
              <span className="action-icon">✏️</span>
              <span className="action-text">Add Note</span>
            </button>
          </div>
        </Card>

        {/* Main Content Grid - 2 columns */}
        <div className="dashboard-main-grid">
          {/* Left Column */}
          <div className="dashboard-left-column">
            {/* Mood Section */}
            <Card className="mood-card">
              <h3>How are you feeling today?</h3>
              <div className="mood-buttons">
                {moodOptions.map((option) => (
                  <button
                    key={option.label}
                    className={`mood-btn ${mood === option.label ? 'active' : ''}`}
                    onClick={() => handleMoodSelect(option.label)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {mood && <p className="mood-selected">✓ Mood logged: {mood}</p>}
            </Card>

            {/* Cycle Insights */}
            <Card className="insights-card">
              <h3>
                <span className="insights-icon">📊</span>
                Cycle Insights
              </h3>
              <div className="insights-list">
                {cycleInsights.map((insight, idx) => (
                  <div key={idx} className="insight-item">
                    <div className="insight-bullet">•</div>
                    <div className="insight-content">
                      <p className="insight-label">{insight.label}</p>
                      <p className="insight-description">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="dashboard-right-column">
            {/* Health Tip */}
            <Card className="health-tip-card">
              <div className="health-tip-header">
                <h4>Today's Health Tip</h4>
              </div>
              <h5 className="health-tip-title">{healthTip?.title}</h5>
              <p className="health-tip-text">{healthTip?.description}</p>
              <button className="more-tips-btn" onClick={() => navigate('/tips')}>
                more tips
              </button>
            </Card>

            {/* Recent Notes */}
            <Card className="recent-notes-card">
              <h3>Recent Notes</h3>
              {notes.length > 0 ? (
                <div className="notes-list">
                  {notes.map((note, idx) => (
                    <p key={idx} className="note-item">{note.text}</p>
                  ))}
                </div>
              ) : (
                <p className="no-notes">No notes yet. Start tracking!</p>
              )}
              <button className="view-all-btn" onClick={() => navigate('/notes')}>
                View all notes
              </button>
            </Card>

            {/* Reminders */}
            <Card className="reminders-card">
              <h3>Reminders</h3>
              <p className="reminder-text">Get notified before your period starts</p>
              <button className="manage-reminders-btn" onClick={() => navigate('/profile')}>
                Manage Reminders
              </button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
