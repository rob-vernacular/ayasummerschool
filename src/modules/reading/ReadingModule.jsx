import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import ReadAloudMode from './ReadAloudMode'
import { ReadingIcon, CheckIcon, ArrowRightIcon } from '../../components/icons'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity, getRecentSessions } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'
import { getStoriesByLevel } from '../../data/stories'

export default function ReadingModule() {
  const { profile } = useProfile()
  const { progress, addXP } = useProgress()
  const [story, setStory] = useState(null)
  const [startTime] = useState(Date.now())
  const [readStoryIds, setReadStoryIds] = useState([])

  const currentLevel = progress?.reading_fp_level || 'C'

  useEffect(() => {
    if (!profile) return
    getRecentSessions(profile.id, 30).then(sessions => {
      const ids = sessions.filter(s => s.activity_type === 'reading').map(s => s.activity_id)
      setReadStoryIds(ids)
    })
  }, [profile?.id])

  const getNextStory = () => {
    const levelStories = getStoriesByLevel(currentLevel)
    const unread = levelStories.filter(s => !readStoryIds.includes(s.id))
    return unread.length > 0 ? unread[0] : levelStories[0]
  }

  const handleComplete = async (score, perfect) => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    const xp = XP_VALUES.reading + (perfect ? XP_VALUES.perfect_bonus : 0)
    await addXP('reading', perfect)
    await logActivity(profile.id, 'reading', story.id, score, xp, duration)
    setStory(null)
  }

  if (story) return <ReadAloudMode story={story} onComplete={handleComplete} profile={profile} />

  const levelStories = getStoriesByLevel(currentLevel)
  const next = getNextStory()

  return (
    <ActivityScene subject="reading" message={`Welcome to Story Grove! You're a Level ${currentLevel} reader. Let's read together!`} stitchPose="reading" stitchSize={110}>
      {/* Quick start */}
      <motion.button
        className="w-full glass-strong rounded-3xl p-5 shadow-card mb-5 flex items-center gap-4 text-left active:scale-[0.98]"
        whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }} onClick={() => setStory(next)}>
        <div className="w-14 h-14 rounded-2xl bg-grass-dark flex items-center justify-center shrink-0">
          <ReadingIcon size={30} color="#fff" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-fredoka text-xl text-white text-shadow-soft">Start Reading!</div>
          <div className="font-nunito font-600 text-white/85 text-sm truncate">Next: {next?.title}</div>
        </div>
        <span className="text-white/90 shrink-0"><ArrowRightIcon size={26} /></span>
      </motion.button>

      <h2 className="font-fredoka text-xl text-white mb-3 text-shadow-soft">All Stories — Level {currentLevel}</h2>
      <div className="flex flex-col gap-3">
        {levelStories.map((s, i) => {
          const isRead = readStoryIds.includes(s.id)
          return (
            <motion.button key={s.id}
              className="glass rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98]"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.97 }} onClick={() => setStory(s)}>
              <span className="text-3xl">{s.illustration}</span>
              <div className="flex-1 min-w-0">
                <div className="font-fredoka text-lg text-white text-shadow-soft truncate">{s.title}</div>
                <div className="font-nunito font-600 text-white/70 text-xs">{s.text.length} pages</div>
              </div>
              {isRead
                ? <span className="flex items-center gap-1 text-sm font-nunito font-700 text-white bg-grass-dark/80 px-3 py-1 rounded-full"><CheckIcon size={14} circle={false} /> Read</span>
                : <span className="text-sm font-nunito font-700 text-white/80 bg-white/20 px-3 py-1 rounded-full">New</span>}
            </motion.button>
          )
        })}
      </div>
    </ActivityScene>
  )
}
