import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../../components/layout/TopBar'
import Stitch from '../../components/characters/Stitch'
import SoundMatching from './SoundMatching'
import WordBuilder from './WordBuilder'
import SortIt from './SortIt'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'
import { PHONICS_LEVELS } from '../../data/phonicsLevels'

const ACTIVITIES = [
  { id: 'sound_matching', label: 'Sound Matching', emoji: '🔊', desc: 'Listen and match the sound!' },
  { id: 'word_builder', label: 'Word Builder', emoji: '🧱', desc: 'Build words with letter tiles!' },
  { id: 'sort_it', label: 'Sort It!', emoji: '🗂️', desc: 'Sort words into groups!' },
]

export default function PhonicsModule() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { progress, addXP } = useProgress()
  const [activity, setActivity] = useState(null)
  const [startTime] = useState(Date.now())

  const phonicsLevel = PHONICS_LEVELS.find(l => l.level === (progress?.phonics_level || 1)) || PHONICS_LEVELS[0]

  const handleComplete = async (score, perfect) => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    const xp = XP_VALUES.phonics + (perfect ? XP_VALUES.perfect_bonus : 0)
    await addXP('phonics', perfect)
    await logActivity(profile.id, 'phonics', activity, score, xp, duration)
    setActivity(null)
  }

  if (activity === 'sound_matching') return <SoundMatching level={phonicsLevel} onComplete={handleComplete} profile={profile} progress={progress} />
  if (activity === 'word_builder') return <WordBuilder level={phonicsLevel} onComplete={handleComplete} profile={profile} progress={progress} />
  if (activity === 'sort_it') return <SortIt level={phonicsLevel} onComplete={handleComplete} profile={profile} progress={progress} />

  return (
    <div className="min-h-screen bg-gradient-to-b from-coral/20 to-red-50 flex flex-col">
      <TopBar profile={profile} progress={progress} showBack backRoute="/home" title="🔤 Phonics" />

      <div className="flex-1 p-6">
        {/* Level info */}
        <div className="bg-coral/20 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <Stitch pose="idle" size={70} />
          <div>
            <div className="font-fredoka text-xl text-coral">Level {phonicsLevel.level}: {phonicsLevel.name}</div>
            <div className="font-nunito text-sm text-midnight/70">{phonicsLevel.description}</div>
            <div className="font-nunito text-sm text-midnight/50 mt-1">Pattern: {phonicsLevel.pattern}</div>
          </div>
        </div>

        <h2 className="font-fredoka text-2xl text-midnight mb-4">Choose an activity</h2>
        <div className="flex flex-col gap-4">
          {ACTIVITIES.map((act, i) => (
            <motion.button key={act.id}
              className="bg-white rounded-2xl p-5 shadow-md flex items-center gap-4 text-left active:scale-98"
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
