import { useState } from 'react'
import ActivityScene from '../../components/world/ActivityScene'
import ActivityChooserCard from '../../components/ui/ActivityChooserCard'
import SoundMatching from './SoundMatching'
import WordBuilder from './WordBuilder'
import SortIt from './SortIt'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'
import { PHONICS_LEVELS } from '../../data/phonicsLevels'

const ACTIVITIES = [
  { id: 'sound_matching', label: 'Sound Matching', desc: 'Listen and match the sound!' },
  { id: 'word_builder', label: 'Word Builder', desc: 'Build words with letter tiles!' },
  { id: 'sort_it', label: 'Sort It!', desc: 'Sort words into groups!' },
]

export default function PhonicsModule() {
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
    <ActivityScene
      subject="phonics"
      message={`Welcome to Sound Beach! Level ${phonicsLevel.level}: ${phonicsLevel.name}. Pick a game!`}
      stitchPose="happy" stitchSize={110}>

      <div className="glass rounded-3xl px-4 py-3 mb-4">
        <div className="font-fredoka text-white text-shadow-soft">Level {phonicsLevel.level}: {phonicsLevel.name}</div>
        <div className="font-nunito font-600 text-white/85 text-sm">{phonicsLevel.description}</div>
        <div className="font-nunito text-white/70 text-xs mt-0.5">Pattern: {phonicsLevel.pattern}</div>
      </div>

      <h2 className="font-fredoka text-xl text-white mb-3 text-shadow-soft">Choose a game</h2>
      <div className="flex flex-col gap-3">
        {ACTIVITIES.map((act, i) => (
          <ActivityChooserCard key={act.id} subject="phonics" index={i}
            label={act.label} desc={act.desc} onClick={() => setActivity(act.id)} />
        ))}
      </div>
    </ActivityScene>
  )
}
