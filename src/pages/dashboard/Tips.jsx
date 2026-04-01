import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import './Tips.css'
import { Lightbulb, MessageSquare, Heart, Droplets, Zap } from 'lucide-react'

const TIPS_DATA = [
  {
    id: 1,
    title: 'Iron-Rich Foods',
    category: 'Diet & Nutrition',
    content: 'Include spinach, lentils, and red meat in your diet to replenish iron lost during menstruation.',
    icon: <Lightbulb size={24} />,
    color: 'green'
  },
  {
    id: 2,
    title: 'Light Exercise During Period',
    category: 'Exercise',
    content: 'Gentle yoga or walking can help reduce cramps and improve mood during your period.',
    icon: <MessageSquare size={24} />,
    color: 'blue'
  },
  {
    id: 3,
    title: 'Managing PMS Symptoms',
    category: 'PMS Relief',
    content: 'Stay hydrated, reduce caffeine and salt intake, and get adequate sleep to minimize PMS symptoms.',
    icon: <Heart size={24} />,
    color: 'pink'
  },
  {
    id: 4,
    title: 'Menstrual Hygiene',
    category: 'Hygiene',
    content: 'Change pads/tampons every 4-6 hours. Always wash hands before and after changing menstrual products.',
    icon: <Droplets size={24} />,
    color: 'lightblue'
  },
  {
    id: 5,
    title: 'Reduce Bloating',
    category: 'Diet & Nutrition',
    content: 'Avoid salty foods and drink plenty of water. Potassium-rich foods like bananas can help reduce bloating.',
    icon: <Lightbulb size={24} />,
    color: 'green'
  },
  {
    id: 6,
    title: 'Stress Management',
    category: 'Wellness',
    content: 'Practice meditation or deep breathing exercises. Stress can affect your menstrual cycle regularity.',
    icon: <Zap size={24} />,
    color: 'purple'
  },
  {
    id: 7,
    title: 'Sleep Quality',
    category: 'Wellness',
    content: 'Aim for 7-8 hours of quality sleep. Poor sleep can worsen PMS symptoms and irregular cycles.',
    icon: <Zap size={24} />,
    color: 'purple'
  },
  {
    id: 8,
    title: 'Heat Therapy',
    category: 'PMS Relief',
    content: 'Apply a heating pad to your lower abdomen for 15-20 minutes to relieve menstrual cramps.',
    icon: <Heart size={24} />,
    color: 'pink'
  },
  {
    id: 9,
    title: 'Choose the Right Products',
    category: 'Hygiene',
    content: 'Select menstrual products based on your flow. Consider trying different options to find what works best.',
    icon: <Droplets size={24} />,
    color: 'lightblue'
  },
  {
    id: 10,
    title: 'Swimming Benefits',
    category: 'Exercise',
    content: 'Swimming is excellent during your period. It provides pain relief and can improve overall wellbeing.',
    icon: <MessageSquare size={24} />,
    color: 'blue'
  },
  {
    id: 11,
    title: 'Omega-3 Fatty Acids',
    category: 'Diet & Nutrition',
    content: 'Foods rich in omega-3s like salmon and walnuts can help reduce inflammation and period pain.',
    icon: <Lightbulb size={24} />,
    color: 'green'
  },
  {
    id: 12,
    title: 'Strength Training Benefits',
    category: 'Exercise',
    content: 'Regular strength training can help reduce period pain and regulate hormones over time.',
    icon: <MessageSquare size={24} />,
    color: 'blue'
  }
]

export default function Tips() {
  const categories = ['All Tips', 'Diet & Nutrition', 'Exercise', 'PMS Relief', 'Hygiene', 'Wellness']

  const [activeCategory, setActiveCategory] = useState('All Tips')
  
  const filteredTips = activeCategory === 'All Tips'
    ? TIPS_DATA
    : TIPS_DATA.filter(tip => tip.category === activeCategory)

  return (
    <DashboardLayout>
      <div className="tips-page">
        <div className="tips-header">
          <h1>Health & Self-Care Tips</h1>
          <p>Expert advice for better menstrual health</p>
        </div>

        <div className="category-container">
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
        </div>

        <div className="tips-grid">
          {filteredTips.map(tip => (
            <div key={tip.id} className="modern-tip-card">
              <div className={`tip-card-header ${tip.color}`}>
                <div className="tip-icon-bubble">
                  {tip.icon}
                </div>
              </div>
              <div className="tip-card-content">
                <h3>{tip.title}</h3>
                <p>{tip.content}</p>
              </div>
            </div>
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
