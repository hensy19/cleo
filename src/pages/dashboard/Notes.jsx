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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentNoteId, setCurrentNoteId] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('userNotes')
    if (stored) {
      setNotes(JSON.parse(stored))
    }
  }, [])

  const handleOpenAddModal = () => {
    setCurrentNoteId(null)
    setNoteTitle('')
    setNoteContent('')
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (note) => {
    setCurrentNoteId(note.id)
    setNoteTitle(note.title)
    setNoteContent(note.content)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setNoteTitle('')
    setNoteContent('')
    setCurrentNoteId(null)
  }

  const handleSaveNote = () => {
    if (!noteTitle.trim() && !noteContent.trim()) {
      alert('Please add a title or content')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      if (currentNoteId !== null) {
        // Edit existing
        const updatedNotes = notes.map(n => {
          if (n.id === currentNoteId) {
            return {
              ...n,
              title: noteTitle || 'Untitled Note',
              content: noteContent,
            }
          }
          return n
        })
        setNotes(updatedNotes)
        localStorage.setItem('userNotes', JSON.stringify(updatedNotes))
      } else {
        // Add new
        const newNote = {
          id: Date.now(),
          title: noteTitle || 'Untitled Note',
          content: noteContent,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: new Date().toLocaleTimeString(),
          createdAt: new Date().toISOString()
        }
        const updated = [newNote, ...notes]
        setNotes(updated)
        localStorage.setItem('userNotes', JSON.stringify(updated))
      }
      
      handleCloseModal()
      setIsLoading(false)
    }, 500)
  }

  const handleDeleteNote = (id, e) => {
    if (e) {
      e.stopPropagation();
    }
    const updated = notes.filter(note => note.id !== id)
    setNotes(updated)
    localStorage.setItem('userNotes', JSON.stringify(updated))
  }

  return (
    <DashboardLayout>
      <div className="notes-page">
        <div className="notes-container">
          
          <div className="notes-header-bar">
            <div className="notes-header-text">
               <h1>&lt; My Notes</h1>
               <p>Keep track of your thoughts, ideas, and important observations.</p>
            </div>
            <button className="btn-add-note" onClick={handleOpenAddModal}>
               + Add Note
            </button>
          </div>

          {notes.length > 0 ? (
            <div className="notes-grid-container">
              <div className="notes-grid">
                {notes.map(note => (
                  <div key={note.id} className="note-card" onClick={() => handleOpenEditModal(note)}>
                    <div className="note-card-top-bar">
                      <span className="note-date">{note.date}</span>
                      <div className="note-icons">
                         <button className="icon-btn edit-icon" onClick={(e) => { e.stopPropagation(); handleOpenEditModal(note); }} title="Edit">
                           <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M10.875 1.58332C11.1114 1.34694 11.432 1.21415 11.7663 1.21415C12.1006 1.21415 12.4212 1.34694 12.6576 1.58332C12.894 1.8197 13.0268 2.14032 13.0268 2.47466C13.0268 2.80899 12.894 3.12961 12.6576 3.366L4.54226 11.4813L1.16667 12.25L1.93533 8.87441L10.875 1.58332Z" stroke="#718EBF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </button>
                         <button className="icon-btn delete-icon" onClick={(e) => handleDeleteNote(note.id, e)} title="Delete">
                           <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.75 3.5H12.25" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M4.66667 3.49992V2.33325C4.66667 2.02383 4.78958 1.72709 5.00838 1.5083C5.22718 1.2895 5.52392 1.16659 5.83333 1.16659H8.16667C8.47609 1.16659 8.77283 1.2895 8.99163 1.5083C9.21042 1.72709 9.33333 2.02383 9.33333 2.33325V3.49992M11.0833 3.49992V11.6666C11.0833 11.976 10.9604 12.2727 10.7416 12.4915C10.5228 12.7103 10.2261 12.8333 9.91667 12.8333H4.08333C3.77392 12.8333 3.47717 12.7103 3.25838 12.4915C3.03958 12.2727 2.91667 11.976 2.91667 11.6666V3.49992H11.0833Z" stroke="#E53935" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </button>
                      </div>
                    </div>
                    <div className="note-card-body">
                      <h3 className="note-card-title">{note.title}</h3>
                      <p className="note-card-preview">{note.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
             <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No Notes Yet</h3>
              <p>Add your first note to get started!</p>
            </div>
          )}

          <div className="notes-tips-card">
            <h3 className="tips-title">Note Taking Tips:</h3>
            <ul className="tips-list">
              <li>Use informative titles to make it easier to search for specific notes.</li>
              <li>Keep details concise and relevant to the issue at hand.</li>
              <li>Review past notes before your next meeting to stay prepared.</li>
              <li>Maintain a consistent format for tracking action items and decisions.</li>
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="note-modal-overlay" onClick={handleCloseModal}>
          <div className="note-modal" onClick={e => e.stopPropagation()}>
            <div className="note-modal-header">
              <button className="note-modal-back" onClick={handleCloseModal}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12.6667L5.33333 8.00004L10 3.33337" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Note / Edit
              </button>
            </div>
            <div className="note-modal-body">
              <input
                id="modal-note-title"
                type="text"
                placeholder="Title (optional)"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="modal-note-title-input"
              />
              <textarea
                id="modal-note-content"
                placeholder="Write your note here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows="10"
                className="modal-note-textarea"
              />
            </div>
            <div className="note-modal-footer">
              <button 
                className="btn-modal-save" 
                onClick={handleSaveNote}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

