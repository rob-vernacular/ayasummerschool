import { useState } from 'react'
import ActivityScene from '../../components/world/ActivityScene'
import ActivityChooserCard from '../../components/ui/ActivityChooserCard'
import FlashCardFrenzy from './FlashCardFrenzy'
import SentenceFillIn from './SentenceFillIn'
import WordHunt from './WordHunt'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'

const ACTIVITIES = [
  { id: 'flashcard', label: 'Flash Card Frenzy', desc: 'How fast can you read these words?' },
  { id: 'sentence_fill', label: 'Sentence Fill-In', desc: 'Pick the right word to finish the sentence!' },
  { id: 'word_hunt', label: 'Word Hunt', desc: 'Find the hidden words in the grid!' },
]

export default function SightWordsModule() {
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
    <ActivityScene subject="sightwords" message="Welcome to Word Cove! Learn the words you'll see everywhere. Pick a game!" stitchPose="happy" stitchSize={110}>
      <div className="glass rounded-3xl px-4 py-3 mb-4">
        <div className="font-fredoka text-white text-shadow-soft">Dolch Sight Words</div>
        <div className="font-nunito font-600 text-white/85 text-sm">Learn the most common words in reading!</div>
      </div>
      <h2 className="font-fredoka text-xl text-white mb-3 text-shadow-soft">Choose a game</h2>
      <div className="flex flex-col gap-3">
        {ACTIVITIES.map((act, i) => (
          <ActivityChooserCard key={act.id} subject="sightwords" index={i}
            label={act.label} desc={act.desc} onClick={() => setActivity(act.id)} />
        ))}
      </div>
    </ActivityScene>
  )
}
