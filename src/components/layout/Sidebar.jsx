import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-item">
            <span className="sidebar-icon">📊</span>
            <span className="sidebar-label">Dashboard</span>
          </Link>
          <Link to="/log-period" className="sidebar-item">
            <span className="sidebar-icon">📝</span>
            <span className="sidebar-label">Log Period</span>
          </Link>
          <Link to="/log-symptoms" className="sidebar-item">
            <span className="sidebar-icon">🔔</span>
            <span className="sidebar-label">Symptoms</span>
          </Link>
          <Link to="/calendar" className="sidebar-item">
            <span className="sidebar-icon">📅</span>
            <span className="sidebar-label">Calendar</span>
          </Link>
          <Link to="/history" className="sidebar-item">
            <span className="sidebar-icon">📖</span>
            <span className="sidebar-label">History</span>
          </Link>
          <Link to="/tips" className="sidebar-item">
            <span className="sidebar-icon">💡</span>
            <span className="sidebar-label">Tips</span>
          </Link>
          <Link to="/profile" className="sidebar-item">
            <span className="sidebar-icon">👤</span>
            <span className="sidebar-label">Profile</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}
