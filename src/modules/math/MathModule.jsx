import { useState } from 'react'
import ActivityScene from '../../components/world/ActivityScene'
import ActivityChooserCard from '../../components/ui/ActivityChooserCard'
import CountAndTap from './CountAndTap'
import NumberLineJump from './NumberLineJump'
import ShapeSort from './ShapeSort'
import MathStories from './MathStories'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'

const ACTIVITIES = [
  { id: 'count',      label: 'Count & Tap',       desc: 'Count the objects Stitch is holding!' },
  { id: 'numberline', label: 'Number Line Jump',  desc: 'Help Stitch jump to the right number!' },
  { id: 'shapes',     label: 'Shape Sort',        desc: 'Sort the shapes by type and color!' },
  { id: 'stories',    label: 'Math Stories',      desc: 'Solve word problems with Stitch!' },
]

export default function MathModule() {
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
    <ActivityScene subject="math" message="Welcome to Number Island! This is bonus fun on top of your daily 3. Pick a game!" stitchPose="excited" stitchSize={110}>
      <div className="glass rounded-3xl px-4 py-3 mb-4">
        <div className="font-fredoka text-white text-shadow-soft">Math Bonus Zone!</div>
        <div className="font-nunito font-600 text-white/85 text-sm">You unlocked Math! Bonus fun on top of your 3 daily activities.</div>
      </div>
      <h2 className="font-fredoka text-xl text-white mb-3 text-shadow-soft">Choose a game</h2>
      <div className="flex flex-col gap-3">
        {ACTIVITIES.map((act, i) => (
          <ActivityChooserCard key={act.id} subject="math" index={i}
            label={act.label} desc={act.desc} onClick={() => setActivity(act.id)} />
        ))}
      </div>
    </ActivityScene>
  )
}
