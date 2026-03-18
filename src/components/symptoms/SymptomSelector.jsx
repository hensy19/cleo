import { useState } from 'react'
import './SymptomSelector.css'

const SYMPTOMS = [
  { id: 'cramps', label: 'Cramps', icon: '🤕' },
  { id: 'mood', label: 'Mood Swings', icon: '😔' },
  { id: 'headache', label: 'Headache', icon: '🤯' },
  { id: 'fatigue', label: 'Fatigue', icon: '😴' },
  { id: 'bloating', label: 'Bloating', icon: '💨' },
  { id: 'nausea', label: 'Nausea', icon: '🤢' },
  { id: 'acne', label: 'Acne', icon: '😞' },
  { id: 'backpain', label: 'Back Pain', icon: '🔙' },
]

export default function SymptomSelector({
  selected = [],
  onChange
}) {
  return (
    <div className="symptom-selector">
      <div className="symptoms-grid">
        {SYMPTOMS.map(symptom => (
          <button
            key={symptom.id}
            className={`symptom-button ${selected.includes(symptom.id) ? 'selected' : ''}`}
            onClick={() => {
              const newSelected = selected.includes(symptom.id)
                ? selected.filter(id => id !== symptom.id)
                : [...selected, symptom.id]
              onChange(newSelected)
            }}
          >
            <span className="symptom-icon">{symptom.icon}</span>
            <span className="symptom-label">{symptom.label}</span>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="selected-symptoms">
          <p className="selected-label">Selected: {selected.length}</p>
          <div className="selected-tags">
            {selected.map(selectedId => {
              const symptom = SYMPTOMS.find(s => s.id === selectedId)
              return (
                <span key={selectedId} className="selected-tag">
                  {symptom.label}
                  <button
                    onClick={() => onChange(selected.filter(id => id !== selectedId))}
                    className="tag-remove"
                  >
                    ✕
                  </button>
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
