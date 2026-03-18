import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [adminInfo, setAdminInfo] = useState(null)
  const [stats, setStats] = useState({
    totalUsers: 152,
    activeUsers: 87,
    cyclesLogged: 1240
  })
  const navigate = useNavigate()

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      navigate('/admin/login')
      return
    }

    const info = JSON.parse(localStorage.getItem('adminInfo') || '{}')
    setAdminInfo(info)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminInfo')
    navigate('/admin/login')
  }

  if (!adminInfo) return null

  return (
    <div className="admin-dashboard-page">
      <Navbar />

      <div className="admin-container">
        <div className="admin-sidebar">
          <div className="admin-logo">CLEO Admin</div>
          <nav className="admin-nav">
            <a href="#dashboard" className="admin-nav-item active">📊 Dashboard</a>
            <a href="/admin/users" className="admin-nav-item">👥 Users</a>
            <a href="#content" className="admin-nav-item">📝 Content</a>
            <a href="#settings" className="admin-nav-item">⚙️ Settings</a>
            <button className="admin-nav-item logout" onClick={handleLogout}>🚪 Logout</button>
          </nav>
        </div>

        <main className="admin-main">
          <div className="admin-header">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {adminInfo.email}</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <Card className="stat-card">
              <div className="stat-content">
                <h3>Total Users</h3>
                <div className="stat-number">{stats.totalUsers}</div>
                <p className="stat-description">Registered users</p>
              </div>
              <div className="stat-icon">👥</div>
            </Card>

            <Card className="stat-card">
              <div className="stat-content">
                <h3>Active Users</h3>
                <div className="stat-number">{stats.activeUsers}</div>
                <p className="stat-description">This month</p>
              </div>
              <div className="stat-icon">🟢</div>
            </Card>

            <Card className="stat-card">
              <div className="stat-content">
                <h3>Cycles Logged</h3>
                <div className="stat-number">{stats.cyclesLogged}</div>
                <p className="stat-description">Total cycles tracked</p>
              </div>
              <div className="stat-icon">📊</div>
            </Card>
          </div>

          {/* Actions */}
          <div className="admin-actions">
            <Card>
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <Button
                  variant="primary"
                  onClick={() => navigate('/admin/users')}
                >
                  Manage Users
                </Button>
                <Button variant="primary">View Reports</Button>
                <Button variant="primary">System Settings</Button>
                <Button variant="primary">View Logs</Button>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">✅</span>
                <div className="activity-details">
                  <p className="activity-title">New user registration</p>
                  <p className="activity-time">5 minutes ago</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📝</span>
                <div className="activity-details">
                  <p className="activity-title">Period logged</p>
                  <p className="activity-time">15 minutes ago</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">⚙️</span>
                <div className="activity-details">
                  <p className="activity-title">System update completed</p>
                  <p className="activity-time">1 hour ago</p>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>

      <Footer />
    </div>
  )
}
