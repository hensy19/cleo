import { useState, useEffect } from 'react'
import { 
  User, 
  Mail, 
  Calendar, 
  Hash, 
  Activity, 
  Clock, 
  Notebook, 
  Heart, 
  Trash2, 
  LogOut 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import './Profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: 'Hensy Patel',
    email: 'hensypatel@gmail.com',
    dob: '01/01/2005',
    age: 19,
    cycleLength: 28,
    periodLength: 5,
    memberSince: 'Jan 2026',
    cyclesTracked: 2,
    notesCreated: 16,
    moodEntries: 42
  })

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    if (Object.keys(userInfo).length > 0) {
      setUser(prev => ({ ...prev, ...userInfo }))
    }
    
    // Dynamically calculate stats
    const notes = JSON.parse(localStorage.getItem('userNotes') || '[]')
    const moods = JSON.parse(localStorage.getItem('moodEntries') || '[]')
    
    setUser(prev => ({
      ...prev,
      notesCreated: notes.length,
      moodEntries: moods.length
    }))
  }, [])

  const handleUpdateProfile = () => {
    localStorage.setItem('userInfo', JSON.stringify(user))
    alert('Profile updated successfully!')
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  return (
    <DashboardLayout>
      <div className="profile-page-modern">
        <div className="profile-header-modern">
          <h1>My Profile</h1>
          <p>Manage your account and cycle information</p>
        </div>

        <div className="profile-main-card">
          <div className="profile-banner-blue">
            <div className="banner-avatar">
              <span className="avatar-letter">H</span>
            </div>
            <div className="banner-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-form-section">
            <div className="form-grid-row">
              <div className="form-item">
                <label><User size={14} /> Full Name</label>
                <input 
                  type="text" 
                  value={user.name} 
                  onChange={(e) => setUser({...user, name: e.target.value})}
                />
              </div>
              <div className="form-item">
                <label><Mail size={14} /> Email Address</label>
                <input 
                  type="email" 
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                />
              </div>
              <div className="form-item">
                <label><Calendar size={14} /> Date of Birth</label>
                <input 
                  type="text" 
                  value={user.dob}
                  onChange={(e) => setUser({...user, dob: e.target.value})}
                />
              </div>
            </div>

            <div className="form-section-divider">
              <h3>Cycle Information</h3>
            </div>

            <div className="form-grid-row">
              <div className="form-item">
                <label>Age</label>
                <input 
                  type="number" 
                  value={user.age}
                  onChange={(e) => setUser({...user, age: e.target.value})}
                />
              </div>
              <div className="form-item">
                <label>Avg cycle length (days)</label>
                <input 
                  type="number" 
                  value={user.cycleLength}
                  onChange={(e) => setUser({...user, cycleLength: e.target.value})}
                />
              </div>
              <div className="form-item">
                <label>Avg period length (days)</label>
                <input 
                  type="number" 
                  value={user.periodLength}
                  onChange={(e) => setUser({...user, periodLength: e.target.value})}
                />
              </div>
            </div>

            <div className="form-actions-modern">
              <button className="update-profile-btn" onClick={handleUpdateProfile}>Update Profile</button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>

        <div className="profile-stats-grid">
          <div className="stat-box">
            <span className="stat-label">Member since</span>
            <span className="stat-value">{user.memberSince}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Cycles Tracked</span>
            <span className="stat-value">{user.cyclesTracked}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Notes Created</span>
            <span className="stat-value">{user.notesCreated}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Mood Entries</span>
            <span className="stat-value">{user.moodEntries}</span>
          </div>
        </div>

        <div className="delete-account-card">
          <h3>Delete Account</h3>
          <p>Want to delete your account ?</p>
          <button className="delete-btn-modern">Delete account</button>
          <p className="delete-warning">Warning: This action cannot be undone. All your data will be permanently deleted.</p>
        </div>

        <div className="profile-footer-modern">
          <button className="logout-btn-modern" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
