import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import './History.css'

export default function History() {
  const navigate = useNavigate()
  const [periodHistory, setPeriodHistory] = useState([
    { id: 1, cycleNum: 6, startDate: 'Jan 31, 2026', endDate: 'Feb 5, 2026', length: '28 days', flow: 'Medium' },
    { id: 2, cycleNum: 5, startDate: 'Jan 3, 2026', endDate: 'Jan 8, 2026', length: '29 days', flow: 'Heavy' },
    { id: 3, cycleNum: 4, startDate: 'Dec 5, 2025', endDate: 'Dec 10, 2025', length: '28 days', flow: 'Light' },
    { id: 4, cycleNum: 3, startDate: 'Nov 7, 2025', endDate: 'Nov 12, 2025', length: '28 days', flow: 'Medium' },
    { id: 5, cycleNum: 2, startDate: 'Oct 10, 2025', endDate: 'Oct 15, 2025', length: '27 days', flow: 'Medium' },
    { id: 6, cycleNum: 1, startDate: 'Sep 13, 2025', endDate: 'Sep 18, 2025', length: '28 days', flow: 'Heavy' }
  ])

  return (
    <DashboardLayout>
      <div className="history-container">
        {/* Header section */}
        <div className="history-header">
          <div className="history-header-left">
            <h1>Period History</h1>
            <p className="history-subtitle">View and manage your cycle records</p>
          </div>
        </div>

        {/* Summary Stats Row */}
        <div className="history-stats-row">
          <Card className="history-stat-card">
            <span className="stat-label">Total Cycles</span>
            <h2 className="stat-value">6</h2>
          </Card>
          <Card className="history-stat-card">
            <span className="stat-label">Avg Cycle Length</span>
            <h2 className="stat-value">28 days</h2>
          </Card>
          <Card className="history-stat-card">
            <span className="stat-label">Last Period</span>
            <h2 className="stat-value text-blue">Jan 31, 2026</h2>
          </Card>
          <Card className="history-stat-card">
            <span className="stat-label">Next Expected</span>
            <h2 className="stat-value">Feb 28, 2026</h2>
          </Card>
        </div>

        {/* Cycle History Table */}
        <Card className="history-table-card">
          <table className="history-table">
            <thead>
              <tr>
                <th>Cycle #</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Cycle Length</th>
                <th>Flow</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {periodHistory.map((period) => (
                <tr key={period.id}>
                  <td>{period.cycleNum}</td>
                  <td>{period.startDate}</td>
                  <td>{period.endDate}</td>
                  <td>{period.length}</td>
                  <td>
                    <span className={`flow-tag flow-${period.flow.toLowerCase()}`}>
                      {period.flow}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="icon-btn edit-btn" title="Edit">📝</button>
                    <button className="icon-btn delete-btn" title="Delete">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Cycle Insights Footer Section */}
        <Card className="cycle-insights-footer">
          <div className="insights-header">
            <span className="insights-icon">📈</span>
            <h3>Cycle Insights</h3>
          </div>
          
          <div className="insights-grid">
            <div className="insight-stat">
              <span className="insight-label">Regularity</span>
              <h4 className="insight-value">Very Regular</h4>
              <p className="insight-detail">1 day variation</p>
            </div>
            <div className="insight-stat">
              <span className="insight-label">Most Common Flow</span>
              <h4 className="insight-value">Medium</h4>
              <p className="insight-detail">66% of cycles</p>
            </div>
            <div className="insight-stat">
              <span className="insight-label">Prediction Accuracy</span>
              <h4 className="insight-value">95%</h4>
              <p className="insight-detail">Based on 6 cycles</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
