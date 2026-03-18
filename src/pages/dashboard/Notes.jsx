import { useState, useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/common/Button'
import DashboardLayout from '../../components/layout/DashboardLayout'
import './Notes.css'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('userNotes')
    if (stored) {
      setNotes(JSON.parse(stored))
    }
  }, [])

  const handleAddNote = () => {
    if (!noteTitle.trim() && !noteContent.trim()) {
      alert('Please add a title or content')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const newNote = {
        id: Date.now(),
        title: noteTitle || 'Untitled Note',
        content: noteContent,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        createdAt: new Date().toISOString()
      }

      const updated = [newNote, ...notes]
      setNotes(updated)
      localStorage.setItem('userNotes', JSON.stringify(updated))
      setNoteTitle('')
      setNoteContent('')
      setIsLoading(false)
    }, 500)
  }

  const handleDeleteNote = (id) => {
    const updated = notes.filter(note => note.id !== id)
    setNotes(updated)
    localStorage.setItem('userNotes', JSON.stringify(updated))
  }

  const handleEditNote = (id) => {
    const note = notes.find(n => n.id === id)
    if (note) {
      setNoteTitle(note.title)
      setNoteContent(note.content)
      handleDeleteNote(id)
      // Focus on the textarea
      setTimeout(() => {
        const textarea = document.querySelector('.note-textarea')
        if (textarea) textarea.focus()
      }, 100)
    }
  }

  return (
    <DashboardLayout>
      <div className="notes-page">
        <div className="notes-container">
          <div className="notes-header">
            <h1>My Notes</h1>
            <p>Keep track of your personal notes and observations</p>
          </div>

          <div className="notes-section">
            <div className="notes-input-card">
              <h2>Add a New Note</h2>
              
              <div className="note-title-group">
                <label htmlFor="note-title">Title (Optional)</label>
                <input
                  id="note-title"
                  type="text"
                  placeholder="Note title"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="note-title-input"
                />
              </div>

              <div className="note-content-group">
                <label htmlFor="note-content">Note</label>
                <textarea
                  id="note-content"
                  placeholder="Write your note here..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows="6"
                  className="note-textarea"
                />
              </div>

              <Button
                variant="primary"
                size="large"
                onClick={handleAddNote}
                disabled={isLoading}
                className="button-full"
              >
                {isLoading ? 'Adding...' : 'Add Note'}
              </Button>
            </div>
          </div>

          {notes.length > 0 && (
            <div className="notes-list">
              <h2>Your Notes ({notes.length})</h2>
              <div className="notes-grid">
                {notes.map(note => (
                  <div key={note.id} className="note-card">
                    <div className="note-card-header">
                      <h3 className="note-title">{note.title}</h3>
                      <span className="note-date">{note.date}</span>
                    </div>
                    <p className="note-preview">{note.content}</p>
                    <div className="note-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditNote(note.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete-note"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notes.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No Notes Yet</h3>
              <p>Add your first note to get started!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
