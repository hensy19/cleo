import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import './UserManagement.css'

// Mock user data matching the layout image
const MOCK_USERS = [
  {
    id: 1,
    name: "Komal Mishra",
    email: "komal@gmail.com",
    initials: "KM",
    joinDate: "Jan 15, 2024",
    lastActive: "2 mins ago",
    cyclesLogged: 8
  },
  {
    id: 2,
    name: "Ridhdhi Raval",
    email: "ridhdhi.raval@gmail.com",
    initials: "RR",
    joinDate: "Feb 3, 2024",
    lastActive: "1 hour ago",
    cyclesLogged: 5
  },
  {
    id: 3,
    name: "Olivia Brown",
    email: "olivia.brown@gmail.com",
    initials: "OB",
    joinDate: "Dec 20, 2023",
    lastActive: "3 hour ago",
    cyclesLogged: 12
  },
  {
    id: 4,
    name: "Sophia Davis",
    email: "sophia.davis@gmail.com",
    initials: "SD",
    joinDate: "Mar 8, 2024",
    lastActive: "5 hours ago",
    cyclesLogged: 5
  },
  {
    id: 5,
    name: "Ava Martinez",
    email: "ava.martinez@gmail.com",
    initials: "AM",
    joinDate: "Nov 12, 2023",
    lastActive: "2 days ago",
    cyclesLogged: 9
  },
  {
    id: 6,
    name: "Isabella Garcia",
    email: "isabella.garcia@gmail.com",
    initials: "IG",
    joinDate: "Jan 28, 2024",
    lastActive: "1 week ago",
    cyclesLogged: 7
  }
]

export default function UserManagement() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      navigate('/admin/login')
      return
    }
  }, [navigate])

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const handleBlockUser = (id) => {
    // Usually this would update the user status
    alert('User has been blocked/unblocked')
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout activePage="users">
      <div className="users-header-section">
        <h1>User Management</h1>
        <p>Manage and monitor user accounts</p>
      </div>

      <div className="users-search-wrapper">
        <svg className="users-search-icon" width="20" height="20" fill="none" stroke="#A0AEC0" strokeWidth="2" viewBox="0 0 24 24">
           <circle cx="11" cy="11" r="8"></circle>
           <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          placeholder="Search users by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="users-search-input"
        />
      </div>

      <div className="users-table-card">
        <div className="users-table-wrapper">
          <table className="u-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Join Date</th>
                <th>Last Active</th>
                <th>Cycles Logged</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="u-user-cell">
                        <div className="u-avatar">{user.initials}</div>
                        <div className="u-name-email">
                          <span className="u-name">{user.name}</span>
                          <span className="u-email">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="u-text-base">{user.joinDate}</td>
                    <td className="u-text-base">{user.lastActive}</td>
                    <td className="u-text-bold">{user.cyclesLogged}</td>
                    <td>
                      <div className="u-actions">
                        <button 
                          className="btn-action block-btn" 
                          onClick={() => handleBlockUser(user.id)}
                          title="Block User"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="#FFA8B6" strokeWidth="1.5" />
                            <path d="M7 17L17 7" stroke="#FFA8B6" strokeWidth="1.5" />
                          </svg>
                        </button>
                        <button 
                          className="btn-action del-btn" 
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete User"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M4 7H20" stroke="#FF4757" strokeWidth="1.5" strokeLinecap="round" />
                             <path d="M10 11V17" stroke="#FF4757" strokeWidth="1.5" strokeLinecap="round" />
                             <path d="M14 11V17" stroke="#FF4757" strokeWidth="1.5" strokeLinecap="round" />
                             <path d="M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7" stroke="#FF4757" strokeWidth="1.5" strokeLinecap="round" />
                             <path d="M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7" stroke="#FF4757" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="u-no-results">No users found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="u-pagination">
          <span className="u-page-info">Showing 1-{filteredUsers.length} of 2,481</span>
          <div className="u-page-controls">
            <button className="u-page-text">Previous</button>
            <button className="u-page-num active">1</button>
            <button className="u-page-num">2</button>
            <button className="u-page-num">3</button>
            <button className="u-page-text">Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
