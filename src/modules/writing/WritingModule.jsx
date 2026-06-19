import { useState } from 'react'
import ActivityScene from '../../components/world/ActivityScene'
import ActivityChooserCard from '../../components/ui/ActivityChooserCard'
import SentenceScramble from './SentenceScramble'
import StoryPrompt from './StoryPrompt'
import TraceAndWrite from './TraceAndWrite'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'

const ACTIVITIES = [
  { id: 'scramble', label: 'Sentence Scramble', desc: 'Put the words in the right order!' },
  { id: 'prompt',   label: 'Story Prompt',      desc: 'Write your own story with Stitch!' },
  { id: 'trace',    label: 'Trace & Write',     desc: 'Trace letters with your finger!' },
]

export default function WritingModule() {
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
    <ActivityScene subject="writing" message="Welcome to the Writing Cave! Writing earns the most stars. Pick a game!" stitchPose="writing" stitchSize={110}>
      <div className="glass rounded-3xl px-4 py-3 mb-4">
        <div className="font-fredoka text-white text-shadow-soft">Writing Practice</div>
        <div className="font-nunito font-600 text-white/85 text-sm">Writing is the hardest — and worth the most stars!</div>
      </div>
      <h2 className="font-fredoka text-xl text-white mb-3 text-shadow-soft">Choose a game</h2>
      <div className="flex flex-col gap-3">
        {ACTIVITIES.map((act, i) => (
          <ActivityChooserCard key={act.id} subject="writing" index={i}
            label={act.label} desc={act.desc} onClick={() => setActivity(act.id)} />
        ))}
      </div>
    </ActivityScene>
  )
}
