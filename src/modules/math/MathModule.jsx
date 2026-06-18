import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../../components/layout/TopBar'
import Stitch from '../../components/characters/Stitch'
import CountAndTap from './CountAndTap'
import NumberLineJump from './NumberLineJump'
import ShapeSort from './ShapeSort'
import MathStories from './MathStories'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'
import { MATH_TOPICS } from '../../data/mathTopics'

const ACTIVITIES = [
  { id: 'count', label: 'Count & Tap', emoji: '🔢', desc: 'Count the objects Stitch is holding!' },
  { id: 'numberline', label: 'Number Line Jump', emoji: '🦘', desc: 'Help Stitch jump to the right number!' },
  { id: 'shapes', label: 'Shape Sort', emoji: '🔷', desc: 'Sort the shapes by type and color!' },
  { id: 'stories', label: 'Math Stories', emoji: '📖', desc: 'Solve word problems with Stitch!' },
]

export default function MathModule() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { progress, addXP } = useProgress()
  const [activity, setActivity] = useState(null)
  const [startTime] = useState(Date.now())

  const handleComplete = async (score, perfect) => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    const xp = XP_VALUES.math + (perfect ? XP_VALUES.perfect_bonus : 0)
    await addXP('math', perfect)
    await logActivity(profile.id, 'math', activity, score, xp, duration)
    setActivity(null)
  }

  if (activity === 'count')      return <CountAndTap onComplete={handleComplete} profile={profile} />
  if (activity === 'numberline') return <NumberLineJump onComplete={handleComplete} profile={profile} />
  if (activity === 'shapes')     return <ShapeSort onComplete={handleComplete} profile={profile} />
  if (activity === 'stories')    return <MathStories onComplete={handleComplete} profile={profile} />

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold/20 to-yellow-50 flex flex-col">
      <TopBar profile={profile} progress={progress} showBack backRoute="/home" title="🔢 Math" />

      <div className="flex-1 p-6">
        <div className="bg-gold/30 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <Stitch pose="happy" size={70} />
          <div>
            <div className="font-fredoka text-xl text-yellow-700">Math Bonus Zone! 🎉</div>
            <div className="font-nunito text-sm text-midnight/70">
              You unlocked Math! This is bonus fun on top of your 3 daily activities.
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
