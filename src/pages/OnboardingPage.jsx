import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Onboarding from '../components/onboarding/Onboarding'

export default function OnboardingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    
    if (!authToken) {
      navigate('/login')
      return
    }

    if (userInfo.onboardingCompleted) {
      navigate('/dashboard')
    }
  }, [navigate])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Onboarding />
      </div>
      <Footer />
    </div>
  )
}
