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
  const [notificationSettings, setNotificationSettings] = useState({
    periodReminder: true,
    ovulationReminder: true,
    weeklyReport: true,
    emailNotifications: true
  })
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/login')
      return
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const savedNotifications = JSON.parse(localStorage.getItem('notificationSettings') || '{}')
    
    setUser(userInfo)
    setFormData({
      name: userInfo.name || '',
      email: userInfo.email || '',
      age: userInfo.age || '',
      cycleLength: userInfo.cycleLength || 28,
      periodLength: userInfo.periodLength || 5,
      lastPeriodDate: userInfo.lastPeriodDate || ''
    })
    
    if (Object.keys(savedNotifications).length > 0) {
      setNotificationSettings(savedNotifications)
    }
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

  const handleNotificationSave = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings))
    alert('Notification settings updated!')
    setActiveModal(null)
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
            <h3>📢 Notifications</h3>
            <p>Manage reminder notifications for your cycle</p>
            <Button 
              variant="outline"
              onClick={() => setActiveModal('notifications')}
              className="button-full"
            >
              Notification Settings
            </Button>
          </Card>

          <Card className="setting-card">
            <h3>📊 Data & Privacy</h3>
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
          <h3>Sign Out</h3>
          <p>You will be logged out from your CLEO account</p>
          <Button
            variant="danger"
            onClick={handleLogout}
            size="large"
            className="button-full"
          >
            Logout
          </Button>
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

        {/* Notifications Modal */}
        {activeModal === 'notifications' && (
          <Modal onClose={() => setActiveModal(null)}>
            <h2>Notification Settings</h2>
            <div className="notification-options">
              <div className="notification-item">
                <label>
                  <input
                    type="checkbox"
                    checked={notificationSettings.periodReminder}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      periodReminder: e.target.checked
                    })}
                  />
                  <span>Period Reminders</span>
                </label>
                <p>Get notified when your period is starting soon</p>
              </div>
              <div className="notification-item">
                <label>
                  <input
                    type="checkbox"
                    checked={notificationSettings.ovulationReminder}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      ovulationReminder: e.target.checked
                    })}
                  />
                  <span>Ovulation Alerts</span>
                </label>
                <p>Get notified when you're in your ovulation window</p>
              </div>
              <div className="notification-item">
                <label>
                  <input
                    type="checkbox"
                    checked={notificationSettings.weeklyReport}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      weeklyReport: e.target.checked
                    })}
                  />
                  <span>Weekly Report</span>
                </label>
                <p>Receive a weekly summary of your cycle</p>
              </div>
              <div className="notification-item">
                <label>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: e.target.checked
                    })}
                  />
                  <span>Email Notifications</span>
                </label>
                <p>Receive notifications via email</p>
              </div>
            </div>
            <div className="modal-actions">
              <Button variant="primary" onClick={handleNotificationSave}>
                Save Settings
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
              <Button variant="outline" className="button-full">
                📥 Download My Data
              </Button>
              <Button variant="outline" className="button-full">
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
              <Button variant="outline" className="button-full">
                📧 Email Support
              </Button>
              <Button variant="outline" className="button-full">
                💬 Chat with Us
              </Button>
              <Button variant="outline" className="button-full">
                📚 Read Documentation
              </Button>
              <Button variant="outline" className="button-full">
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
