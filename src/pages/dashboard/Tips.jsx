import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import TipCard from '../../components/tips/TipCard'
import Modal from '../../components/common/Modal'
import './Tips.css'

const TIPS_DATA = [
  {
    id: 1,
    title: 'Iron-Rich Foods',
    category: 'Nutrition',
    content: 'During your period, increase iron intake through spinach, red meat, or fortified cereals to combat fatigue.',
    icon: '🥬',
    detailedContent: `
      <h4>Why Iron Matters During Your Period</h4>
      <p>Your body loses iron through menstrual blood, which can lead to fatigue and weakness. Increasing iron intake helps maintain healthy blood levels.</p>
      
      <h4>Best Iron-Rich Foods:</h4>
      <ul>
        <li><strong>Leafy greens:</strong> Spinach, kale, and broccoli</li>
        <li><strong>Red meat:</strong> Beef, lamb, and pork</li>
        <li><strong>Seafood:</strong> Clams, oysters, and sardines</li>
        <li><strong>Plant-based:</strong> Lentils, chickpeas, and tofu</li>
        <li><strong>Fortified foods:</strong> Cereals and orange juice</li>
      </ul>
      
      <h4>Tips for Better Absorption:</h4>
      <ul>
        <li>Pair iron-rich foods with vitamin C sources (citrus, bell peppers)</li>
        <li>Avoid coffee and tea around mealtime as they inhibit absorption</li>
        <li>Consider iron supplements if your diet is insufficient</li>
      </ul>
    `
  },
  {
    id: 2,
    title: 'Yoga & Stretching',
    category: 'Exercise',
    content: 'Gentle yoga and stretching can help ease cramps and improve flexibility during your cycle.',
    icon: '🧘‍♀️',
    detailedContent: `
      <h4>Benefits of Yoga During Your Period</h4>
      <p>Yoga helps reduce menstrual cramps, improves blood circulation, and promotes relaxation. Certain poses can specifically target pelvic pain and discomfort.</p>
      
      <h4>Recommended Poses for Period Relief:</h4>
      <ul>
        <li><strong>Child's Pose:</strong> Relieves back and abdominal tension</li>
        <li><strong>Cat-Cow Pose:</strong> Improves spinal flexibility and reduces cramps</li>
        <li><strong>Seated Forward Bend:</strong> Calms the mind and eases lower back pain</li>
        <li><strong>Bridge Pose:</strong> Strengthens pelvic floor and relieves menstrual discomfort</li>
      </ul>
      
      <h4>When to Practice:</h4>
      <ul>
        <li>Best during the first few days of your period when cramps are strongest</li>
        <li>Practice for 10-15 minutes daily</li>
        <li>Focus on gentle, restorative poses rather than intense flows</li>
        <li>Use props like bolsters for added comfort</li>
      </ul>
    `
  },
  {
    id: 3,
    title: 'Meditation Practice',
    category: 'Mental Health',
    content: 'Regular meditation can help manage mood swings and reduce stress throughout your cycle.',
    icon: '🧘',
    detailedContent: `
      <h4>How Meditation Helps Your Cycle</h4>
      <p>Hormonal fluctuations during your menstrual cycle can affect mood and stress levels. Meditation helps regulate the nervous system and promotes emotional balance.</p>
      
      <h4>Simple Meditation Techniques:</h4>
      <ul>
        <li><strong>Breath Awareness:</strong> Focus on your natural breathing rhythm</li>
        <li><strong>Body Scan:</strong> Systematically relax different parts of your body</li>
        <li><strong>Loving-Kindness:</strong> Send positive thoughts to yourself and others</li>
        <li><strong>Mindfulness:</strong> Observe thoughts without judgment</li>
      </ul>
      
      <h4>Cycle-Specific Benefits:</h4>
      <ul>
        <li><strong>Menstrual Phase:</strong> Reduces PMS symptoms and emotional turbulence</li>
        <li><strong>Follicular Phase:</strong> Enhances creativity and positive mood</li>
        <li><strong>Ovulation:</strong> Supports emotional stability</li>
        <li><strong>Luteal Phase:</strong> Manages mood swings and anxiety</li>
      </ul>
      
      <h4>Getting Started:</h4>
      <p>Start with 5 minutes daily. Use apps like Headspace or Calm for guided sessions, or simply sit quietly and focus on your breath.</p>
    `
  },
  {
    id: 4,
    title: 'Warm Baths',
    category: 'Self Care',
    content: 'Soak in warm water with Epsom salts to relax muscles and ease period discomfort.',
    icon: '🛁',
    detailedContent: `
      <h4>Therapeutic Benefits of Warm Baths</h4>
      <p>Heat therapy is one of the most effective natural remedies for menstrual cramps. Warm water increases blood flow and relaxes tense muscles.</p>
      
      <h4>How to Create the Perfect Period Bath:</h4>
      <ul>
        <li><strong>Temperature:</strong> 95-100°F (35-38°C) - warm but not hot</li>
        <li><strong>Duration:</strong> 15-20 minutes for optimal relief</li>
        <li><strong>Additives:</strong> Epsom salts, essential oils, or bath bombs</li>
        <li><strong>Enhancements:</strong> Candles, soft music, or aromatherapy</li>
      </ul>
      
      <h4>Additional Heat Therapies:</h4>
      <ul>
        <li><strong>Heating Pad:</strong> Apply to lower abdomen or back</li>
        <li><strong>Warm Compress:</strong> Soak a towel in warm water and apply</li>
        <li><strong>Hot Water Bottle:</strong> Portable and reusable option</li>
      </ul>
      
      <h4>Safety Tips:</h4>
      <ul>
        <li>Avoid extremely hot water which can increase bleeding</li>
        <li>Stay hydrated before and after bathing</li>
        <li>Limit bath time to avoid dizziness</li>
      </ul>
    `
  },
  {
    id: 5,
    title: 'Magnesium Supplements',
    category: 'Nutrition',
    content: 'Magnesium can reduce menstrual cramps and improve sleep quality during your period.',
    icon: '💊',
    detailedContent: `
      <h4>Magnesium's Role in Period Health</h4>
      <p>Magnesium helps relax uterine muscles, reduces inflammation, and supports better sleep. Many women experience magnesium deficiency during their period.</p>
      
      <h4>Recommended Daily Intake:</h4>
      <ul>
        <li><strong>During Period:</strong> 300-400mg daily</li>
        <li><strong>Throughout Cycle:</strong> 200-300mg daily</li>
        <li><strong>Forms:</strong> Magnesium citrate, glycinate, or oxide</li>
      </ul>
      
      <h4>Food Sources of Magnesium:</h4>
      <ul>
        <li><strong>Nuts & Seeds:</strong> Almonds, pumpkin seeds, sunflower seeds</li>
        <li><strong>Leafy Greens:</strong> Spinach, Swiss chard, kale</li>
        <li><strong>Whole Grains:</strong> Brown rice, quinoa, oats</li>
        <li><strong>Legumes:</strong> Black beans, chickpeas, lentils</li>
      </ul>
      
      <h4>When to Take Magnesium:</h4>
      <ul>
        <li>Start 1-2 weeks before your period begins</li>
        <li>Take with food to improve absorption</li>
        <li>Evening doses can improve sleep quality</li>
        <li>Consult your doctor before starting supplements</li>
      </ul>
    `
  },
  {
    id: 6,
    title: 'Walking & Light Cardio',
    category: 'Exercise',
    content: 'Light cardio like walking releases endorphins and helps ease menstrual cramps naturally.',
    icon: '🚶‍♀️',
    detailedContent: `
      <h4>Benefits of Light Exercise During Your Period</h4>
      <p>Regular movement releases endorphins, improves circulation, and can significantly reduce menstrual pain. Light cardio is often more beneficial than complete rest.</p>
      
      <h4>Recommended Activities:</h4>
      <ul>
        <li><strong>Walking:</strong> 20-30 minutes at a comfortable pace</li>
        <li><strong>Swimming:</strong> Low-impact water exercise</li>
        <li><strong>Cycling:</strong> Light stationary biking</li>
        <li><strong>Dancing:</strong> Fun movement to favorite music</li>
      </ul>
      
      <h4>Exercise Timing:</h4>
      <ul>
        <li><strong>Best Time:</strong> When pain is manageable (not during peak cramps)</li>
        <li><strong>Duration:</strong> 20-45 minutes, 3-5 times per week</li>
        <li><strong>Intensity:</strong> Keep heart rate moderate - you should be able to talk</li>
      </ul>
      
      <h4>Additional Tips:</h4>
      <ul>
        <li>Stay hydrated and fuel properly before exercising</li>
        <li>Wear comfortable, breathable clothing</li>
        <li>Listen to your body - stop if pain increases</li>
        <li>Try yoga or stretching if cardio feels too intense</li>
      </ul>
    `
  },
  {
    id: 7,
    title: 'Journaling',
    category: 'Mental Health',
    content: 'Keep a mood journal to track emotional patterns and understand your cycle better.',
    icon: '📔',
    detailedContent: `
      <h4>The Power of Cycle Journaling</h4>
      <p>Tracking your emotional and physical symptoms helps you understand your unique cycle patterns and prepare for challenges.</p>
      
      <h4>What to Track:</h4>
      <ul>
        <li><strong>Physical Symptoms:</strong> Cramps, energy levels, sleep quality</li>
        <li><strong>Emotional State:</strong> Mood, anxiety, irritability</li>
        <li><strong>Energy Patterns:</strong> When you feel most/least energetic</li>
        <li><strong>Social Patterns:</strong> How your cycle affects relationships</li>
      </ul>
      
      <h4>Journaling Prompts:</h4>
      <ul>
        <li>"How am I feeling physically today?"</li>
        <li>"What emotions am I experiencing?"</li>
        <li>"How is my energy level?"</li>
        <li>"What activities feel good/bad today?"</li>
        <li>"What do I need most right now?"</li>
      </ul>
      
      <h4>Getting Started:</h4>
      <ul>
        <li>Use a dedicated notebook or period tracking app</li>
        <li>Journal daily for at least one full cycle</li>
        <li>Look for patterns after 2-3 months of tracking</li>
        <li>Be kind and non-judgmental in your writing</li>
      </ul>
    `
  },
  {
    id: 8,
    title: 'Hydration',
    category: 'Self Care',
    content: 'Drink plenty of water to reduce bloating and keep your body hydrated during your period.',
    icon: '💧',
    detailedContent: `
      <h4>Why Hydration Matters During Your Period</h4>
      <p>Proper hydration helps reduce bloating, supports detoxification, and can alleviate many period symptoms. Dehydration can worsen cramps and fatigue.</p>
      
      <h4>Daily Water Goals:</h4>
      <ul>
        <li><strong>General:</strong> 8-10 glasses (64-80 oz) per day</li>
        <li><strong>During Period:</strong> 10-12 glasses to combat fluid retention</li>
        <li><strong>With Exercise:</strong> Additional 16 oz per hour of activity</li>
      </ul>
      
      <h4>Hydrating Foods:</h4>
      <ul>
        <li><strong>Fruits:</strong> Watermelon, oranges, grapes, strawberries</li>
        <li><strong>Vegetables:</strong> Cucumber, lettuce, celery, tomatoes</li>
        <li><strong>Other:</strong> Coconut water, herbal teas, broths</li>
      </ul>
      
      <h4>Hydration Tips:</h4>
      <ul>
        <li>Carry a reusable water bottle throughout the day</li>
        <li>Set phone reminders to drink water regularly</li>
        <li>Flavor water with lemon, cucumber, or mint</li>
        <li>Monitor urine color - pale yellow indicates good hydration</li>
        <li>Increase intake if you experience heavy bleeding</li>
      </ul>
    `
  }
]

export default function Tips() {
  const categories = ['All', 'Nutrition', 'Exercise', 'Mental Health', 'Self Care']

  const [activeCategory, setActiveCategory] = React.useState('All')
  const [selectedTip, setSelectedTip] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredTips = activeCategory === 'All'
    ? TIPS_DATA
    : TIPS_DATA.filter(tip => tip.category === activeCategory)

  const handleTipClick = (tip) => {
    setSelectedTip(tip)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTip(null)
  }

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
              onClick={() => handleTipClick(tip)}
            />
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="no-tips">
            <p>No tips found in this category</p>
          </div>
        )}

        {isModalOpen && selectedTip && (
          <Modal onClose={closeModal}>
            <div className="tip-modal-content">
              <div className="tip-modal-header">
                <span className="tip-modal-icon">{selectedTip.icon}</span>
                <div>
                  <h2>{selectedTip.title}</h2>
                  <span className="tip-modal-category">{selectedTip.category}</span>
                </div>
              </div>
              <div 
                className="tip-modal-body"
                dangerouslySetInnerHTML={{ __html: selectedTip.detailedContent }}
              />
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  )
}
