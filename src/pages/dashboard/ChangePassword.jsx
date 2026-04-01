import { useState } from 'react'
import { Monitor } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import './ChangePassword.css'

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setMessage({ type: 'success', text: 'Password saved successfully!' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="change-password-page">
        <div className="hifi-password-card">
          <div className="form-column">
            <h2>Change your password</h2>
            
            <form onSubmit={handleSubmit} className="hifi-form">
              <div className="hifi-group">
                <label>Current Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your current password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="hifi-group">
                <label>New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter a new password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="hifi-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Re-enter your password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {message.text && (
                <div className={`hifi-message ${message.type}`}>
                  {message.text}
                </div>
              )}

              <button type="submit" className="save-password-btn" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save password'}
              </button>
            </form>
          </div>

          <div className="visual-column">
            <div className="monitor-illustration">
              <div className="monitor-frame">
                <div className="monitor-screen">
                  <div className="screen-avatar"></div>
                  <div className="screen-lock-ui">
                    <div className="lock-dot"></div>
                    <div className="lock-bar">
                      <div className="lock-stars">********</div>
                    </div>
                  </div>
                </div>
                <div className="monitor-stand"></div>
                <div className="monitor-base"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
