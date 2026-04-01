import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import './AdminProfile.css'

export default function AdminProfile() {
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem('adminInfo')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return {
          firstName: parsed.firstName || parsed.name?.split(' ')[0] || 'Hensy',
          lastName: parsed.lastName || parsed.name?.split(' ')[1] || 'Patel',
          role: parsed.role || 'Admin',
          email: parsed.email || 'abc@gmail.com',
          phone: parsed.phone || '+91 0123456789',
          dob: parsed.dob || '01/01/2005',
        }
      } catch { /* ignore */ }
    }
    return {
      firstName: 'Hensy',
      lastName: 'Patel',
      role: 'Admin',
      email: 'abc@gmail.com',
      phone: '+91 0123456789',
      dob: '01/01/2005',
    }
  })

  const [editProfile, setEditProfile] = useState({ ...profile })

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleEdit = () => {
    setEditProfile({ ...profile })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setProfile({ ...editProfile })
    localStorage.setItem('adminInfo', JSON.stringify({
      ...editProfile,
      name: `${editProfile.firstName} ${editProfile.lastName}`
    }))
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminInfo')
    navigate('/admin/login')
  }

  return (
    <AdminLayout activePage="profile">
      {/* Page Title */}
      <h1 className="ap-title">My Profile</h1>

      {/* Avatar / Name Banner */}
      <div className="ap-banner-card">
        <div className="ap-avatar-wrap">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#7BAFD4" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div>
          <div className="ap-banner-name">{profile.firstName} {profile.lastName}</div>
          <div className="ap-banner-role">{profile.role}</div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="ap-info-card">
        <div className="ap-info-top">
          <h2 className="ap-info-title">Personal Information</h2>
          {!isEditing && (
            <button className="ap-edit-btn" onClick={handleEdit} title="Edit">
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
          )}
        </div>

        <form onSubmit={handleSave}>
          {/* Row 1: First Name | Last Name | Date of Birth */}
          <div className="ap-grid-row">
            <div className="ap-field">
              <label>First Name</label>
              <input
                type="text"
                value={isEditing ? editProfile.firstName : profile.firstName}
                onChange={e => setEditProfile({ ...editProfile, firstName: e.target.value })}
                readOnly={!isEditing}
                className={!isEditing ? 'ap-input-readonly' : 'ap-input-active'}
              />
            </div>
            <div className="ap-field">
              <label>Last Name</label>
              <input
                type="text"
                value={isEditing ? editProfile.lastName : profile.lastName}
                onChange={e => setEditProfile({ ...editProfile, lastName: e.target.value })}
                readOnly={!isEditing}
                className={!isEditing ? 'ap-input-readonly' : 'ap-input-active'}
              />
            </div>
            <div className="ap-field">
              <label>Date of Birth</label>
              <input
                type="text"
                value={isEditing ? editProfile.dob : profile.dob}
                onChange={e => setEditProfile({ ...editProfile, dob: e.target.value })}
                placeholder="DD/MM/YYYY"
                readOnly={!isEditing}
                className={!isEditing ? 'ap-input-readonly' : 'ap-input-active'}
              />
            </div>
          </div>

          {/* Row 2: Email | Phone */}
          <div className="ap-grid-row ap-grid-row-2">
            <div className="ap-field">
              <label>Email Address</label>
              <input
                type="email"
                value={isEditing ? editProfile.email : profile.email}
                onChange={e => setEditProfile({ ...editProfile, email: e.target.value })}
                readOnly={!isEditing}
                className={!isEditing ? 'ap-input-readonly' : 'ap-input-active'}
              />
            </div>
            <div className="ap-field">
              <label>Phone number</label>
              <input
                type="tel"
                value={isEditing ? editProfile.phone : profile.phone}
                onChange={e => setEditProfile({ ...editProfile, phone: e.target.value })}
                readOnly={!isEditing}
                className={!isEditing ? 'ap-input-readonly' : 'ap-input-active'}
              />
            </div>
          </div>

          {isEditing && (
            <div className="ap-edit-actions">
              <button type="button" className="ap-btn-cancel" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="ap-btn-save">Save Changes</button>
            </div>
          )}
        </form>

        {saved && (
          <div className="ap-toast">✓ Profile saved successfully</div>
        )}
      </div>

      {/* Logout Button */}
      <button className="ap-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </AdminLayout>
  )
}
