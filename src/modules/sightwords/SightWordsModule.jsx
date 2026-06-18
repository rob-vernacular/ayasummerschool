import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../../components/layout/TopBar'
import Stitch from '../../components/characters/Stitch'
import FlashCardFrenzy from './FlashCardFrenzy'
import SentenceFillIn from './SentenceFillIn'
import WordHunt from './WordHunt'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'

const ACTIVITIES = [
  { id: 'flashcard', label: 'Flash Card Frenzy', emoji: '⚡', desc: 'How fast can you read these words?' },
  { id: 'sentence_fill', label: 'Sentence Fill-In', emoji: '📝', desc: 'Pick the right word to complete the sentence!' },
  { id: 'word_hunt', label: 'Word Hunt', emoji: '🔍', desc: 'Find the hidden words in the grid!' },
]

export default function SightWordsModule() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { progress, addXP } = useProgress()
  const [activity, setActivity] = useState(null)
  const [startTime] = useState(Date.now())

  const handleComplete = async (score, perfect) => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    const xp = XP_VALUES.sightwords + (perfect ? XP_VALUES.perfect_bonus : 0)
    await addXP('sightwords', perfect)
    await logActivity(profile.id, 'sightwords', activity, score, xp, duration)
    setActivity(null)
  }

  if (activity === 'flashcard') return <FlashCardFrenzy onComplete={handleComplete} profile={profile} progress={progress} />
  if (activity === 'sentence_fill') return <SentenceFillIn onComplete={handleComplete} profile={profile} />
  if (activity === 'word_hunt') return <WordHunt onComplete={handleComplete} profile={profile} />

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky/30 to-blue-50 flex flex-col">
      <TopBar profile={profile} progress={progress} showBack backRoute="/home" title="👁️ Sight Words" />

      <div className="flex-1 p-6">
        <div className="bg-sky/20 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <Stitch pose="idle" size={70} />
          <div>
            <div className="font-fredoka text-xl text-ocean">Dolch Sight Words</div>
            <div className="font-nunito text-sm text-midnight/70">
              Learn the most common words in reading!
            </div>
          </div>
        </div>

        <h2 className="font-fredoka text-2xl text-midnight mb-4">Choose an activity</h2>
        <div className="flex flex-col gap-4">
          {ACTIVITIES.map((act, i) => (
            <motion.button key={act.id}
              className="bg-white rounded-2xl p-5 shadow-md flex items-center gap-4 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivity(act.id)}
            >
              <span className="text-4xl">{act.emoji}</span>
              <div>
                <div className="font-fredoka text-xl text-midnight">{act.label}</div>
                <div className="font-nunito text-sm text-midnight/60">{act.desc}</div>
              </div>
              <span className="ml-auto text-2xl">→</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
