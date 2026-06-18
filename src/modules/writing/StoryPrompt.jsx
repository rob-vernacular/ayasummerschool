import { useState } from 'react'
import { motion } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { saveWritingSubmission } from '../../lib/db'
import { useNavigate } from 'react-router-dom'

const PROMPTS = [
  { scene: '🏖️', text: 'Stitch found something on the beach today. What was it?' },
  { scene: '🌊', text: 'Stitch went swimming in the ocean. What did he see?' },
  { scene: '🦄', text: 'Luna the unicorn flew to a magical place. Where did she go?' },
  { scene: '🧽', text: 'SpongeBob made something special. What was it?' },
  { scene: '⭐', text: 'A star fell from the sky. What happened next?' },
  { scene: '🌈', text: 'Stitch, Luna, and SpongeBob went on an adventure. Where did they go?' },
  { scene: '🏰', text: 'Stitch built something amazing. What did he build?' },
  { scene: '🐢', text: 'Stitch met a baby turtle on the beach. What happened?' },
]

export default function StoryPrompt({ onComplete, profile }) {
  const navigate = useNavigate()
  const [promptIndex] = useState(Math.floor(Math.random() * PROMPTS.length))
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const { storyComplete } = useSound(true)

  const prompt = PROMPTS[promptIndex]

  const handleSubmit = async () => {
    if (!text.trim() || saving) return
    setSaving(true)
    await saveWritingSubmission(profile.id, prompt.text, text.trim())
    storyComplete()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ocean/20 to-blue-50 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6 }}
        >
          <Stitch pose="dance" size={160} />
        </motion.div>
        <h2 className="font-fredoka text-4xl text-ocean mt-4">Amazing Story!</h2>
        <p className="font-nunito text-xl text-midnight mt-2 text-center">
          Stitch loved your story! It's saved in your Story Book!
        </p>
        <div className="bg-white rounded-2xl p-5 mt-4 w-full max-w-sm shadow-md">
          <p className="font-nunito text-sm text-ocean italic mb-2">{prompt.text}</p>
          <p className="font-nunito text-base text-midnight">{text}</p>
        </div>
        <motion.button
          className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl shadow-lg"
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(100, false)}
        >Collect 70 XP! ⭐</motion.button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean/20 to-blue-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-ocean/20 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/writing')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Story Prompt</div>
        <div className="text-2xl">✍️</div>
      </div>

      <div className="flex-1 flex flex-col p-6 gap-4">
        {/* Scene illustration */}
        <div className="flex items-center gap-4 bg-ocean/10 rounded-2xl p-4">
          <span className="text-6xl">{prompt.scene}</span>
          <Stitch pose="idle" size={80} />
        </div>

        {/* Prompt */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h2 className="font-fredoka text-2xl text-ocean mb-1">Your Writing Prompt</h2>
          <p className="font-nunito text-xl text-midnight leading-relaxed">{prompt.text}</p>
        </div>

        {/* Writing area */}
        <div className="flex-1 relative">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write your answer here... (1 or 2 sentences is great!)"
            className="w-full h-full min-h-[160px] font-nunito text-xl text-midnight
              border-3 border-ocean/30 rounded-2xl p-4 resize-none focus:outline-none
              focus:border-ocean bg-white shadow-md leading-relaxed"
            style={{ lineHeight: 1.7 }}
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 font-nunito text-xs text-midnight/30">
            {text.length}/500
          </div>
        </div>

        <motion.button
          className={`w-full bg-ocean text-white font-fredoka text-2xl py-5 rounded-2xl shadow-lg
            ${!text.trim() ? 'opacity-50' : ''}`}
          disabled={!text.trim() || saving}
          whileTap={{ scale: text.trim() ? 0.95 : 1 }}
          onClick={handleSubmit}
        >
          {saving ? '⏳ Saving...' : 'Submit My Story! 🚀'}
        </motion.button>
      </div>
    </div>
  )
}
