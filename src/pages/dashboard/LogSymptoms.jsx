import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import SymptomSelector from '../../components/symptoms/SymptomSelector'
import Button from '../../components/common/Button'
import './LogSymptoms.css'

export default function LogSymptoms() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const symptomLogs = JSON.parse(localStorage.getItem('symptomLogs') || '[]')
      symptomLogs.push({
        id: Date.now(),
        date: selectedDate,
        symptoms: selectedSymptoms,
        notes,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('symptomLogs', JSON.stringify(symptomLogs))

      setIsLoading(false)
      setSuccessMessage('Symptoms logged successfully!')
      // Reset form
      setSelectedSymptoms([])
      setNotes('')
      setSelectedDate(new Date().toISOString().split('T')[0])
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="log-symptoms-container">
        <div className="log-symptoms-header">
          <h1>🔔 Log Your Symptoms</h1>
          <p>Track how you're feeling today</p>
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
          <form onSubmit={handleSubmit} className="symptoms-form">
            <div className="form-group">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Select Symptoms</label>
              <SymptomSelector
                selected={selectedSymptoms}
                onChange={setSelectedSymptoms}
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes" className="form-label">Notes (Optional)</label>
              <textarea
                id="notes"
                placeholder="Add any additional notes about your symptoms..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="notes-textarea"
                rows="4"
              />
            </div>

            <div className="form-actions">
              <Button
                variant="primary"
                size="large"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Symptoms'}
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
      </div>
    </DashboardLayout>
  )
}
