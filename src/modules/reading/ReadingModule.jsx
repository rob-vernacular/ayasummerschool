import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopBar from '../../components/layout/TopBar'
import Stitch from '../../components/characters/Stitch'
import ReadAloudMode from './ReadAloudMode'
import { useProfile } from '../../hooks/useProfile'
import { useProgress } from '../../hooks/useProgress'
import { logActivity, getRecentSessions } from '../../lib/db'
import { XP_VALUES } from '../../hooks/useXP'
import { STORIES, getStoriesByLevel } from '../../data/stories'

const FP_WEEKS = {
  'C': [1,2], 'D': [1,2], 'E': [3,4], 'F': [3,4],
  'G': [5,6], 'H': [5,6], 'I': [7,8], 'J': [9,10], 'K': [9,10]
}

export default function ReadingModule() {
  const navigate = useNavigate()
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-grass/20 to-green-50 flex flex-col">
      <TopBar profile={profile} progress={progress} showBack backRoute="/home" title="📖 Reading" />

      <div className="flex-1 p-6">
        {/* Level info */}
        <div className="bg-grass/20 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <Stitch pose="idle" size={70} />
          <div>
            <div className="font-fredoka text-xl text-grass">Level {currentLevel} Reader</div>
            <div className="font-nunito text-sm text-midnight/70">
              {levelStories.length} stories at this level
            </div>
          </div>
        </div>

        {/* Quick start */}
        <motion.button
          className="w-full bg-grass text-white rounded-3xl p-6 shadow-lg mb-6 flex items-center gap-4"
          whileTap={{ scale: 0.97 }}
          onClick={() => setStory(getNextStory())}
        >
          <span className="text-5xl">📖</span>
          <div className="text-left">
            <div className="font-fredoka text-2xl">Start Reading!</div>
            <div className="font-nunito text-sm opacity-90">Next story: {getNextStory()?.title}</div>
          </div>
          <span className="ml-auto text-3xl">→</span>
        </motion.button>

        {/* Story list */}
        <h2 className="font-fredoka text-2xl text-midnight mb-4">All Stories — Level {currentLevel}</h2>
        <div className="flex flex-col gap-3">
          {levelStories.map((s, i) => {
            const isRead = readStoryIds.includes(s.id)
            return (
              <motion.button key={s.id}
                className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4 text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStory(s)}
              >
                <span className="text-3xl">{s.illustration}</span>
                <div className="flex-1">
                  <div className="font-fredoka text-lg text-midnight">{s.title}</div>
                  <div className="font-nunito text-xs text-midnight/50">{s.text.length} pages</div>
                </div>
                <span className={`text-sm font-nunito px-3 py-1 rounded-full
                  ${isRead ? 'bg-grass/20 text-grass' : 'bg-gray-100 text-gray-400'}`}>
                  {isRead ? '✅ Read' : 'New'}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
