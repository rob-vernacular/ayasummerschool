import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../../components/layout/TopBar'
import Stitch from '../../components/characters/Stitch'
import SentenceScramble from './SentenceScramble'
import StoryPrompt from './StoryPrompt'
import TraceAndWrite from './TraceAndWrite'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'

const ACTIVITIES = [
  { id: 'scramble',  label: 'Sentence Scramble', emoji: '🔀', desc: 'Put the words in the right order!' },
  { id: 'prompt',   label: 'Story Prompt',       emoji: '✍️', desc: 'Write your own story with Stitch!' },
  { id: 'trace',    label: 'Trace & Write',      emoji: '✏️', desc: 'Trace letters with your finger!' },
]

export default function WritingModule() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { progress, addXP } = useProgress()
  const [activity, setActivity] = useState(null)
  const [startTime] = useState(Date.now())

  const handleComplete = async (score, perfect) => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    const xp = XP_VALUES.writing + (perfect ? XP_VALUES.perfect_bonus : 0)
    await addXP('writing', perfect)
    await logActivity(profile.id, 'writing', activity, score, xp, duration)
    setActivity(null)
  }

  if (activity === 'scramble') return <SentenceScramble onComplete={handleComplete} profile={profile} />
  if (activity === 'prompt')   return <StoryPrompt onComplete={handleComplete} profile={profile} />
  if (activity === 'trace')    return <TraceAndWrite onComplete={handleComplete} profile={profile} />

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean/20 to-blue-50 flex flex-col">
      <TopBar profile={profile} progress={progress} showBack backRoute="/home" title="✏️ Writing" />

      <div className="flex-1 p-6">
        <div className="bg-ocean/20 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <Stitch pose="idle" size={70} />
          <div>
            <div className="font-fredoka text-xl text-ocean">Writing Practice</div>
            <div className="font-nunito text-sm text-midnight/70">
              Writing is the hardest — and worth the most stars!
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
