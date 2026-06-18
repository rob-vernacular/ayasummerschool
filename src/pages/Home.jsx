import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import ActivityCard from '../components/ui/ActivityCard'
import Stitch from '../components/characters/Stitch'
import RewardModal from '../components/ui/RewardModal'
import { useProfile } from '../hooks/useProfile'
import { useProgress } from '../hooks/useProgress'
import { useStreak } from '../hooks/useStreak'
import { useSound } from '../hooks/useSound'
import { getTodaysActivities, getSettings, updateSettings } from '../lib/db'
import { selectDailyActivities, getActivityLabel, getActivityEmoji } from '../utils/curriculum'
import { getXPProgress } from '../utils/levelCalc'

const STITCH_MESSAGES = [
  (name) => `Ohana means family — and today we learn together, ${name}!`,
  (name) => `You showed up, ${name}! That's the hardest part. Now let's go!`,
  (name) => `Stitch is SO happy you're here, ${name}!`,
  (name) => `Every lesson makes you stronger, ${name}. Let's do this!`,
  (name) => `Three activities today. You can totally do it, ${name}!`,
  (name) => `Stitch believes in you, ${name}. Always.`,
  (name) => `Ready for an adventure, ${name}? Stitch is!`,
]

const BG_STYLES = {
  tropical_beach: 'from-sky-400 via-blue-500 to-ocean',
  ocean_world:    'from-blue-700 via-blue-800 to-indigo-900',
  rainbow_sky:    'from-pink-400 via-purple-500 to-indigo-600',
}

export default function Home() {
  const navigate = useNavigate()
  const { profile, loading: profileLoading } = useProfile()
  const { progress, refresh: refreshProgress, leveledUp, clearLevelUp } = useProgress()
  const { checkAndUpdateStreak } = useStreak()
  const [settings, setSettings] = useState({ sound_enabled: true })
  const [todayActivities, setTodayActivities] = useState([])
  const [curriculum, setCurriculum] = useState({ required: [], optional: null, completed: [] })
  const [stitchPose, setStitchPose] = useState('idle')
  const [msgIndex, setMsgIndex] = useState(0)
  const [inactivityTimer, setInactivityTimer] = useState(null)
  const [showInactivity, setShowInactivity] = useState(false)
  const inactivityRef = useRef(null)
  const { streak } = useSound(settings.sound_enabled)

  useEffect(() => {
    if (!profile) return
    getSettings(profile.id).then(s => setSettings(s || { sound_enabled: true }))
    getTodaysActivities(profile.id).then(acts => {
      setTodayActivities(acts)
    })
    checkAndUpdateStreak().then(() => refreshProgress())
    setMsgIndex(Math.floor(Math.random() * STITCH_MESSAGES.length))
    // Periodic message rotation
    const t = setInterval(() => setMsgIndex(i => (i + 1) % STITCH_MESSAGES.length), 12000)
    return () => clearInterval(t)
  }, [profile?.id])

  useEffect(() => {
    if (!progress || !todayActivities) return
    const c = selectDailyActivities(todayActivities, progress)
    setCurriculum(c)
  }, [progress, todayActivities])

  // Inactivity timer — 5 minutes
  const resetInactivity = () => {
    if (inactivityRef.current) clearTimeout(inactivityRef.current)
    setShowInactivity(false)
    inactivityRef.current = setTimeout(() => setShowInactivity(true), 5 * 60 * 1000)
  }

  useEffect(() => {
    resetInactivity()
    window.addEventListener('touchstart', resetInactivity)
    window.addEventListener('mousedown', resetInactivity)
    return () => {
      clearTimeout(inactivityRef.current)
      window.removeEventListener('touchstart', resetInactivity)
      window.removeEventListener('mousedown', resetInactivity)
    }
  }, [])

  const handleMuteToggle = () => {
    const newVal = !settings.sound_enabled
    setSettings(s => ({ ...s, sound_enabled: newVal }))
    if (profile) updateSettings(profile.id, { sound_enabled: newVal })
  }

  const countCompletedToday = (type) =>
    todayActivities.filter(a => a.activity_type === type).length

  if (profileLoading) return (
    <div className="min-h-screen bg-gradient-to-b from-sky to-ocean flex items-center justify-center">
      <div className="text-white font-fredoka text-3xl animate-pulse">Loading your world...</div>
    </div>
  )

  const name = profile?.display_name || 'Friend'
  const bg = BG_STYLES[profile?.background_skin] || BG_STYLES.tropical_beach
  const xpData = progress ? getXPProgress(progress.xp || 0) : null
  const mathUnlocked = progress?.math_unlocked || false

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bg} flex flex-col overflow-hidden`}>
      {/* Top bar */}
      <TopBar
        profile={profile}
        progress={progress}
        soundEnabled={settings.sound_enabled}
        onMuteToggle={handleMuteToggle}
      />

      {/* Ocean wave decoration */}
      <div className="w-full overflow-hidden" style={{ height: 40, marginTop: -1 }}>
        <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="w-full h-full">
          <motion.path
            d="M0,20 Q50,5 100,20 Q150,35 200,20 Q250,5 300,20 Q350,35 400,20 L400,40 L0,40 Z"
            fill="rgba(255,248,231,0.15)"
            animate={{ d: [
              'M0,20 Q50,5 100,20 Q150,35 200,20 Q250,5 300,20 Q350,35 400,20 L400,40 L0,40 Z',
              'M0,20 Q50,35 100,20 Q150,5 200,20 Q250,35 300,20 Q350,5 400,20 L400,40 L0,40 Z',
            ]}}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto px-4 pb-6">

        {/* Stitch + speech bubble */}
        <div className="flex items-end justify-center gap-4 py-4">
          <motion.div
            onTap={() => {
              setStitchPose('happy')
              setTimeout(() => setStitchPose('idle'), 1500)
              setMsgIndex(i => (i + 1) % STITCH_MESSAGES.length)
            }}
          >
            <Stitch pose={stitchPose} size={120} />
          </motion.div>
          <motion.div
            className="relative bg-white rounded-3xl rounded-bl-sm px-5 py-4 shadow-lg max-w-[220px] mb-4"
            key={msgIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute bottom-2 -left-3 w-4 h-4 bg-white"
              style={{ clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)' }} />
            <p className="font-nunito text-sm text-midnight leading-snug">
              {STITCH_MESSAGES[msgIndex](name)}
            </p>
          </motion.div>
        </div>

        {/* XP Level bar */}
        {xpData && (
          <div className="bg-white/20 rounded-2xl px-5 py-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-fredoka text-white text-sm">Level {xpData.current.level} — {xpData.current.title}</span>
              <span className="font-nunito text-white/80 text-xs">{progress?.xp || 0} XP</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <motion.div
                className="bg-gold h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpData.progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Today's missions strip */}
        <div className="bg-white/20 rounded-2xl px-4 py-3 mb-4">
          <h3 className="font-fredoka text-white text-lg mb-2">⚡ Today's Missions</h3>
          <div className="flex gap-3">
            {curriculum.required.map((type, i) => {
              const done = countCompletedToday(type) > 0
              return (
                <div key={type} className={`flex-1 flex flex-col items-center gap-1 rounded-xl p-2
                  ${done ? 'bg-grass/80' : 'bg-white/20'} text-white`}>
                  <span className="text-xl">{getActivityEmoji(type)}</span>
                  <span className="font-nunito text-xs text-center">{getActivityLabel(type)}</span>
                  <span className="text-xs">{done ? '✅' : '○'}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity cards grid */}
        <h2 className="font-fredoka text-2xl text-white mb-3">Your Activities</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {['phonics','sightwords','reading','writing'].map((type, i) => (
            <ActivityCard
              key={type}
              type={type}
              label={getActivityLabel(type)}
              completedToday={countCompletedToday(type)}
              totalRequired={curriculum.required.filter(r => r === type).length || 1}
              locked={false}
              index={i}
            />
          ))}
        </div>

        {/* Math card */}
        <ActivityCard
          type="math"
          label="Math"
          completedToday={countCompletedToday('math')}
          totalRequired={1}
          locked={!mathUnlocked}
          index={4}
        />

        {/* Rewards room button */}
        <motion.button
          className="w-full mt-4 bg-gold text-midnight font-fredoka text-xl py-4 rounded-2xl shadow-lg
            flex items-center justify-center gap-3"
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/rewards')}
          animate={{ boxShadow: ['0 0 0 0 rgba(255,215,0,0.5)', '0 0 0 12px rgba(255,215,0,0)', '0 0 0 0 rgba(255,215,0,0.5)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>🏆</span> Rewards Room
        </motion.button>
      </div>

      {/* Inactivity overlay */}
      <AnimatePresence>
        {showInactivity && (
          <motion.div
            className="fixed inset-0 bg-midnight/80 z-50 flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={resetInactivity}
          >
            <Stitch pose="idle" size={160} />
            <div className="bg-white rounded-3xl p-8 max-w-xs text-center">
              <p className="font-fredoka text-2xl text-ocean mb-2">Still there, {name}?</p>
              <p className="font-nunito text-midnight/70">Tap anywhere to keep learning!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level up modal */}
      <RewardModal
        open={!!leveledUp}
        reward={{
          emoji: '⭐',
          title: `Level ${leveledUp} Unlocked!`,
          message: `Amazing, ${name}! You reached a new level! Stitch is doing a happy dance!`,
        }}
        onClose={clearLevelUp}
      />
    </div>
  )
}
