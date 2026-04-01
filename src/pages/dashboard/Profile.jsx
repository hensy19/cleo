import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import './Profile.css'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [activeModal, setActiveModal] = useState(null)
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/login')
      return
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    
    setUser(userInfo)
    setFormData({
      name: userInfo.name || '',
      email: userInfo.email || '',
      age: userInfo.age || '',
      cycleLength: userInfo.cycleLength || 28,
      periodLength: userInfo.periodLength || 5,
      lastPeriodDate: userInfo.lastPeriodDate || ''
    })
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert('Name and email are required')
      return
    }
    localStorage.setItem('userInfo', JSON.stringify(formData))
    setUser(formData)
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('Passwords do not match')
      return
    }
    if (passwordData.new.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    alert('Password changed successfully!')
    setPasswordData({ current: '', new: '', confirm: '' })
    setActiveModal(null)
  }

  const handleDeleteProfile = () => {
    if (confirm('Are you sure you want to delete your profile? This action cannot be undone and will permanently remove all your data.')) {
      // Clear all user data
      localStorage.removeItem('authToken')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('onboardingCompleted')
      localStorage.removeItem('periodLogs')
      localStorage.removeItem('symptomLogs')
      localStorage.removeItem('moodEntries')
      localStorage.removeItem('userNotes')
      localStorage.removeItem('currentPeriod')
      localStorage.removeItem('notificationSettings')
      
      alert('Profile deleted successfully.')
      navigate('/')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('onboardingCompleted')
    navigate('/')
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="profile-page">
        <div className="profile-header">
          <h1>👤 My Profile</h1>
          <p>Manage your personal information and preferences</p>
        </div>

        {/* User Info Card */}
        <Card className="profile-info-card">
          <div className="profile-content">
            <div className="profile-avatar">
              <div className="avatar-placeholder">{user.name?.[0]?.toUpperCase() || 'U'}</div>
            </div>

            {!isEditing ? (
              <div className="profile-display">
                <div className="profile-section">
                  <h2>Personal Information</h2>
                  <div className="profile-fields">
                    <div className="profile-field">
                      <label>Name</label>
                      <p>{user.name}</p>
                    </div>
                    <div className="profile-field">
                      <label>Email</label>
                      <p>{user.email}</p>
                    </div>
                    {user.age && (
                      <div className="profile-field">
                        <label>Age</label>
                        <p>{user.age} years</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="profile-section">
                  <h2>Cycle Information</h2>
                  <div className="profile-fields">
                    <div className="profile-field">
                      <label>Average Cycle Length</label>
                      <p>{user.cycleLength || 28} days</p>
                    </div>
                    <div className="profile-field">
                      <label>Average Period Length</label>
                      <p>{user.periodLength || 5} days</p>
                    </div>
                    {user.lastPeriodDate && (
                      <div className="profile-field">
                        <label>Last Period Date</label>
                        <p>{user.lastPeriodDate}</p>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                  size="large"
                >
                  Edit Profile
                </Button>
              </div>
            ) : (
              <form className="profile-form">
                <h2>Edit Profile</h2>
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="13"
                  max="100"
                />
                <Input
                  label="Average Cycle Length (days)"
                  type="number"
                  name="cycleLength"
                  value={formData.cycleLength}
                  onChange={handleChange}
                  min="20"
                  max="45"
                />
                <Input
                  label="Average Period Length (days)"
                  type="number"
                  name="periodLength"
                  value={formData.periodLength}
                  onChange={handleChange}
                  min="1"
                  max="10"
                />
                <Input
                  label="Last Period Date"
                  type="date"
                  name="lastPeriodDate"
                  value={formData.lastPeriodDate}
                  onChange={handleChange}
                />

                <div className="form-buttons">
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    type="button"
                    size="large"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    type="button"
                    size="large"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Card>

        {/* Settings Cards */}
        <div className="settings-grid">
          <Card className="setting-card">
            <h3>🔒 Security</h3>
            <p>Change your password or secure your account</p>
            <Button 
              variant="outline"
              onClick={() => setActiveModal('password')}
              className="button-full"
            >
              Change Password
            </Button>
          </Card>

          <Card className="setting-card">
            <h3> Data & Privacy</h3>
            <p>Download or delete your personal data</p>
            <Button 
              variant="outline"
              onClick={() => setActiveModal('data')}
              className="button-full"
            >
              Data Management
            </Button>
          </Card>

          <Card className="setting-card">
            <h3>❓ Help & Support</h3>
            <p>Get help or contact our support team</p>
            <Button 
              variant="outline"
              onClick={() => setActiveModal('support')}
              className="button-full"
            >
              Contact Support
            </Button>
          </Card>
        </div>

        {/* Logout Section */}
        <Card className="logout-card">
          <div className="logout-actions">
            <div className="logout-section">
              <h3>Sign Out</h3>
              <p>You will be logged out from your CLEO account</p>
              <Button
                variant="danger"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
            
            <div className="delete-section">
              <h3>Delete Profile</h3>
              <p>Permanently delete your account and all data</p>
              <Button
                variant="danger"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Password Modal */}
        {activeModal === 'password' && (
          <Modal onClose={() => setActiveModal(null)}>
            <h2>Change Password</h2>
            <Input
              label="Current Password"
              type="password"
              value={passwordData.current}
              onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
            />
            <Input
              label="New Password"
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
            />
            <div className="modal-actions">
              <Button variant="primary" onClick={handlePasswordChange}>
                Change Password
              </Button>
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Cancel
              </Button>
            </div>
          </Modal>
        )}

        {/* Data Management Modal */}
        {activeModal === 'data' && (
          <Modal onClose={() => setActiveModal(null)}>
            <h2>Data & Privacy</h2>
            <div className="data-options">
              <p>Manage your personal data and privacy preferences</p>
              <Button 
                variant="outline" 
                className="button-full"
                onClick={() => {
                  const data = {
                    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
                    periodLogs: JSON.parse(localStorage.getItem('periodLogs') || '[]'),
                    symptomLogs: JSON.parse(localStorage.getItem('symptomLogs') || '[]'),
                    moodEntries: JSON.parse(localStorage.getItem('moodEntries') || '[]'),
                    userNotes: JSON.parse(localStorage.getItem('userNotes') || '[]')
                  }
                  const dataStr = JSON.stringify(data, null, 2)
                  const blob = new Blob([dataStr], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'cleo-data.json'
                  a.click()
                  URL.revokeObjectURL(url)
                  alert('Data downloaded successfully!')
                }}
              >
                📥 Download My Data
              </Button>
              <Button 
                variant="outline" 
                className="button-full"
                onClick={() => alert('Privacy Policy: We collect and store your personal health data locally on your device. We do not share your data with third parties.')}
              >
                📋 View Privacy Policy
              </Button>
              <Button 
                variant="danger" 
                className="button-full"
                onClick={() => {
                  if (confirm('Are you sure? This will permanently delete all your data.')) {
                    localStorage.clear()
                    navigate('/')
                  }
                }}
              >
                🗑️ Delete All Data
              </Button>
            </div>
            <div className="modal-actions">
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Close
              </Button>
            </div>
          </Modal>
        )}

        {/* Support Modal */}
        {activeModal === 'support' && (
          <Modal onClose={() => setActiveModal(null)}>
            <h2>Help & Support</h2>
            <div className="support-options">
              <Button 
                variant="outline" 
                className="button-full"
                onClick={() => window.open('mailto:support@cleo.app?subject=Support Request', '_blank')}
              >
                📧 Email Support
              </Button>
              <Button 
                variant="outline" 
                className="button-full"
                onClick={() => alert('Live chat is not available right now. Please email us at support@cleo.app')}
              >
                💬 Chat with Us
              </Button>
              <Button 
                variant="outline" 
                className="button-full"
                onClick={() => window.open('https://cleo.app/docs', '_blank')}
              >
                📚 Read Documentation
              </Button>
              <Button 
                variant="outline" 
                className="button-full"
                onClick={() => window.open('https://github.com/hensy19/cleo/issues', '_blank')}
              >
                🐛 Report a Bug
              </Button>
            </div>
            <div className="modal-actions">
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Close
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  )
}
