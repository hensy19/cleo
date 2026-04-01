import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import './LogPeriod.css'

export default function LogPeriod() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    if (!startDate) newErrors.startDate = 'Start date is required'
    if (!endDate) newErrors.endDate = 'End date is required'
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Save to local storage
      const periodLogs = JSON.parse(localStorage.getItem('periodLogs') || '[]')
      const newPeriod = {
        id: Date.now(),
        startDate,
        endDate,
        createdAt: new Date().toISOString()
      }
      periodLogs.push(newPeriod)
      localStorage.setItem('periodLogs', JSON.stringify(periodLogs))

      // Save as current/last period for use in other parts of the app
      localStorage.setItem('currentPeriod', JSON.stringify(newPeriod))

      setIsLoading(false)
      setSuccessMessage('Period logged successfully!')
      
      // Reset form
      setStartDate('')
      setEndDate('')
      setErrors({})
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="log-period-container">
        <div className="log-period-header">
          <h1>📝 Log Your Period</h1>
          <p>Enter the dates of your current period</p>
        </div>

        {successMessage && (
          <div className="success-message" style={{ 
            backgroundColor: '#d4edda', 
            color: '#155724', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {successMessage}
          </div>
        )}

        <Card>
          <form onSubmit={handleSubmit} className="log-form">
            <Input
              label="Period Start Date"
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              error={errors.startDate}
              required
            />

            <Input
              label="Period End Date"
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              error={errors.endDate}
              required
            />

            {startDate && endDate && (
              <div className="period-summary">
                <p>
                  Period duration: <strong>
                    {Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1)} days
                  </strong>
                </p>
              </div>
            )}

            <div className="form-actions">
              <Button
                variant="primary"
                size="large"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Period'}
              </Button>
              <Button
                variant="outline"
                size="large"
                onClick={() => navigate('/dashboard')}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Tips Section */}
        <Card className="tips-section">
          <h3>💡 Tips for Accurate Tracking</h3>
          <ul className="tips-list">
            <li>Log your period as soon as it starts</li>
            <li>Be consistent with your tracking for better predictions</li>
            <li>You can update or delete past entries anytime</li>
            <li>The more accurate your logs, the better our predictions</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  )
}
