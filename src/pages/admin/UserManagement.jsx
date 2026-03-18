import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Input from '../../components/common/Input'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import './UserManagement.css'

// Mock user data
const MOCK_USERS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    lastActive: '2024-03-10',
    cyclesLogged: 12
  },
  {
    id: 2,
    name: 'Emma Smith',
    email: 'emma.smith@email.com',
    lastActive: '2024-03-09',
    cyclesLogged: 8
  },
  {
    id: 3,
    name: 'Lisa Brown',
    email: 'lisa.brown@email.com',
    lastActive: '2024-03-08',
    cyclesLogged: 15
  },
  {
    id: 4,
    name: 'Jessica Davis',
    email: 'jessica.davis@email.com',
    lastActive: '2024-03-07',
    cyclesLogged: 5
  },
  {
    id: 5,
    name: 'Michael Wilson',
    email: 'michael.wilson@email.com',
    lastActive: '2024-03-06',
    cyclesLogged: 3
  }
]

export default function UserManagement() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS)
  const navigate = useNavigate()

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      navigate('/admin/login')
      return
    }
  }, [navigate])

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const handleBlockUser = (id) => {
    alert('User has been blocked')
  }

  return (
    <div className="user-management-page">
      <Navbar />

      <div className="user-management-container">
        <div className="management-sidebar">
          <div className="admin-logo">CLEO Admin</div>
          <nav className="admin-nav">
            <a href="/admin/dashboard" className="admin-nav-item">📊 Dashboard</a>
            <a href="#users" className="admin-nav-item active">👥 Users</a>
            <a href="#content" className="admin-nav-item">📝 Content</a>
            <a href="#settings" className="admin-nav-item">⚙️ Settings</a>
          </nav>
        </div>

        <main className="management-main">
          <div className="management-header">
            <h1>👥 User Management</h1>
            <p>Manage and monitor user accounts</p>
          </div>

          <Card>
            <div className="management-toolbar">
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="toolbar-buttons">
                <Button variant="primary">Add User</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>

            {filteredUsers.length > 0 ? (
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Last Active</th>
                      <th>Cycles Logged</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td className="name-cell">{user.name}</td>
                        <td className="email-cell">{user.email}</td>
                        <td className="date-cell">{user.lastActive}</td>
                        <td className="cycles-cell">{user.cyclesLogged}</td>
                        <td className="actions-cell">
                          <button
                            className="action-btn view"
                            title="View"
                          >
                            👁️
                          </button>
                          <button
                            className="action-btn block"
                            onClick={() => handleBlockUser(user.id)}
                            title="Block"
                          >
                            🚫
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteUser(user.id)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-users">
                <p>No users found</p>
              </div>
            )}

            <div className="table-footer">
              <p>Showing 1-{filteredUsers.length} of {users.length} users</p>
              <div className="pagination">
                <Button variant="outline" disabled>← Previous</Button>
                <span className="page-info">Page 1 of 10</span>
                <Button variant="outline">Next →</Button>
              </div>
            </div>
          </Card>
        </main>
      </div>

      <Footer />
    </div>
  )
}
