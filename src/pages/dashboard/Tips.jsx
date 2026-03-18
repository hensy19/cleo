import DashboardLayout from '../../components/layout/DashboardLayout'
import TipCard from '../../components/tips/TipCard'
import './Tips.css'

const TIPS_DATA = [
  {
    id: 1,
    title: 'Iron-Rich Foods',
    category: 'Nutrition',
    content: 'During your period, increase iron intake through spinach, red meat, or fortified cereals to combat fatigue.',
    icon: '🥬'
  },
  {
    id: 2,
    title: 'Yoga & Stretching',
    category: 'Exercise',
    content: 'Gentle yoga and stretching can help ease cramps and improve flexibility during your cycle.',
    icon: '🧘‍♀️'
  },
  {
    id: 3,
    title: 'Meditation Practice',
    category: 'Mental Health',
    content: 'Regular meditation can help manage mood swings and reduce stress throughout your cycle.',
    icon: '🧘'
  },
  {
    id: 4,
    title: 'Warm Baths',
    category: 'Self Care',
    content: 'Soak in warm water with Epsom salts to relax muscles and ease period discomfort.',
    icon: '🛁'
  },
  {
    id: 5,
    title: 'Magnesium Supplements',
    category: 'Nutrition',
    content: 'Magnesium can reduce menstrual cramps and improve sleep quality during your period.',
    icon: '💊'
  },
  {
    id: 6,
    title: 'Walking & Light Cardio',
    category: 'Exercise',
    content: 'Light cardio like walking releases endorphins and helps ease menstrual cramps naturally.',
    icon: '🚶‍♀️'
  },
  {
    id: 7,
    title: 'Journaling',
    category: 'Mental Health',
    content: 'Keep a mood journal to track emotional patterns and understand your cycle better.',
    icon: '📔'
  },
  {
    id: 8,
    title: 'Hydration',
    category: 'Self Care',
    content: 'Drink plenty of water to reduce bloating and keep your body hydrated during your period.',
    icon: '💧'
  }
]

export default function Tips() {
  const categories = ['All', 'Nutrition', 'Exercise', 'Mental Health', 'Self Care']

  const [activeCategory, setActiveCategory] = React.useState('All')
  const filteredTips = activeCategory === 'All'
    ? TIPS_DATA
    : TIPS_DATA.filter(tip => tip.category === activeCategory)

  return (
    <DashboardLayout>
      <div className="tips-page">
        <div className="tips-header">
          <h1>💡 Health & Wellness Tips</h1>
          <p>Personalized guidance for every phase of your cycle</p>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="tips-grid">
          {filteredTips.map(tip => (
            <TipCard
              key={tip.id}
              title={tip.title}
              category={tip.category}
              content={tip.content}
              icon={tip.icon}
            />
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="no-tips">
            <p>No tips found in this category</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

import React from 'react'
