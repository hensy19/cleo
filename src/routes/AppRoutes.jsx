import { Routes, Route } from 'react-router-dom'

// Public Pages
import Home from '../pages/public/Home'
import Login from '../pages/public/Login'
import Signup from '../pages/public/Signup'

// Onboarding
import OnboardingPage from '../pages/OnboardingPage'

// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard'
import LogPeriod from '../pages/dashboard/LogPeriod'
import LogSymptoms from '../pages/dashboard/LogSymptoms'
import CalendarPage from '../pages/dashboard/CalendarPage'
import History from '../pages/dashboard/History'
import Tips from '../pages/dashboard/Tips'
import Profile from '../pages/dashboard/Profile'
import Mood from '../pages/dashboard/Mood'
import Notes from '../pages/dashboard/Notes'

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin'
import AdminDashboard from '../pages/admin/AdminDashboard'
import UserManagement from '../pages/admin/UserManagement'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Onboarding */}
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/log-period" element={<LogPeriod />} />
      <Route path="/log-symptoms" element={<LogSymptoms />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/history" element={<History />} />
      <Route path="/mood" element={<Mood />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/tips" element={<Tips />} />
      <Route path="/profile" element={<Profile />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
    </Routes>
  )
}
