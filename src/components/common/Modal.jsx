import { useState } from 'react'
import './Modal.css'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  hasCloseButton = true
}) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {hasCloseButton && (
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        )}

        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
        )}

        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}
