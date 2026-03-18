import { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './DashboardLayout.css'

export default function DashboardLayout({ children, showFooter = true }) {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
