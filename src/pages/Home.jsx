import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import ActivityCard from '../components/ui/ActivityCard'
import Stitch from '../components/characters/Stitch'
import SpeechBubble from '../components/ui/SpeechBubble'
import TropicalBackground from '../components/world/TropicalBackground'
import RewardModal from '../components/ui/RewardModal'
import { ActivityIcon, CheckIcon, TrophyIcon, StarIcon, SparkleIcon } from '../components/icons'
import { useProfile } from '../hooks/useProfile'
import { useProgress } from '../hooks/useProgress'
import { useStreak } from '../hooks/useStreak'
import { useSound } from '../hooks/useSound'
import { getTodaysActivities, getSettings, updateSettings } from '../lib/db'
import { selectDailyActivities, getActivityLabel } from '../utils/curriculum'
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

const BG_VARIANT = {
  tropical_beach: 'beach',
  ocean_world: 'ocean',
  rainbow_sky: 'twilight',
}

export default function Home() {
  const navigate = useNavigate()
  const { profile, loading: profileLoading } = useProfile()
  const { progress, refresh: refreshProgress, leveledUp, clearLevelUp } = useProgress()
  const { checkAndUpdateStreak } = useStreak()
  const [settings, setSettings] = useState({ sound_enabled: true })
  const [todayActivities, setTodayActivities] = useState([])
  const [curriculum, setCurriculum] = useState({ required: [], optional: null, completed: [] })
  const [stitchPose, setStitchPose] = useState('wave')
  const [msgIndex, setMsgIndex] = useState(0)
  const [showInactivity, setShowInactivity] = useState(false)
  const inactivityRef = useRef(null)
  useSound(settings.sound_enabled)

  useEffect(() => {
    if (!profile) return
    getSettings(profile.id).then(s => setSettings(s || { sound_enabled: true }))
    getTodaysActivities(profile.id).then(acts => setTodayActivities(acts))
    checkAndUpdateStreak().then(() => refreshProgress())
    setMsgIndex(Math.floor(Math.random() * STITCH_MESSAGES.length))
    // Greet, then settle to idle
    setStitchPose('wave')
    const settle = setTimeout(() => setStitchPose('idle'), 2600)
    const t = setInterval(() => setMsgIndex(i => (i + 1) % STITCH_MESSAGES.length), 12000)
    return () => { clearInterval(t); clearTimeout(settle) }
  }, [profile?.id])

  useEffect(() => {
    if (!progress || !todayActivities) return
    setCurriculum(selectDailyActivities(todayActivities, progress))
  }, [progress, todayActivities])

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

  const countCompletedToday = (type) => todayActivities.filter(a => a.activity_type === type).length

  const pokeStitch = () => {
    setStitchPose('happy')
    setTimeout(() => setStitchPose('idle'), 1400)
    setMsgIndex(i => (i + 1) % STITCH_MESSAGES.length)
  }

  if (profileLoading) return (
    <div className="relative min-h-screen flex items-center justify-center">
      <TropicalBackground variant="beach" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="anim-float"><Stitch pose="idle" size={120} /></div>
        <div className="text-white font-fredoka text-2xl text-shadow-soft animate-pulse">Loading your world...</div>
      </div>
    </div>
  )

  const name = profile?.display_name || 'Friend'
  const variant = BG_VARIANT[profile?.background_skin] || 'beach'
  const xpData = progress ? getXPProgress(progress.xp || 0) : null
  const mathUnlocked = progress?.math_unlocked || false

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0"><TropicalBackground variant={variant} /></div>

      <div className="relative z-20"><TopBar profile={profile} progress={progress} soundEnabled={settings.sound_enabled} onMuteToggle={handleMuteToggle} /></div>

      {/* Level progress vine */}
      {xpData && (
        <div className="relative z-10 px-4 pt-3">
          <div className="glass rounded-full px-3 py-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-fredoka text-white text-sm text-shadow-soft">Lvl {xpData.current.level} · {xpData.current.title}</span>
              <span className="font-nunito font-700 text-white/90 text-xs flex items-center gap-1"><StarIcon size={14} /> {progress?.xp || 0} XP</span>
            </div>
            <div className="relative h-3 rounded-full bg-black/15 overflow-visible">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-dark"
                initial={{ width: 0 }} animate={{ width: `${xpData.progress}%` }} transition={{ duration: 1, delay: 0.4 }} />
              <motion.div className="absolute -top-3.5"
                initial={{ left: 0 }} animate={{ left: `${xpData.progress}%` }} transition={{ duration: 1, delay: 0.4 }}>
                <div className="-translate-x-1/2"><Stitch pose="idle" size={30} /></div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex-1 overflow-auto px-4 pb-8">
        {/* Stitch greeter */}
        <div className="flex items-end gap-2 pt-3 pb-2">
          <motion.div onTap={pokeStitch} whileTap={{ scale: 0.94 }} className="cursor-pointer shrink-0 anim-float-slow">
            <Stitch pose={stitchPose} size={130} />
          </motion.div>
          <SpeechBubble className="mb-6 flex-1" tail="left" animateKey={msgIndex}>
            <p className="font-nunito font-700 text-[15px] text-midnight leading-snug">{STITCH_MESSAGES[msgIndex](name)}</p>
          </SpeechBubble>
        </div>

        {/* Today's missions */}
        <div className="glass rounded-3xl px-4 py-3 mb-4">
          <h3 className="font-fredoka text-white text-base mb-2.5 flex items-center gap-2 text-shadow-soft">
            <SparkleIcon size={18} /> Today's Missions
          </h3>
          <div className="flex gap-3">
            {curriculum.required.map((type) => {
              const done = countCompletedToday(type) > 0
              return (
                <div key={type} className={`flex-1 flex flex-col items-center gap-1.5 rounded-2xl p-2.5 transition-colors
                  ${done ? 'bg-grass/85' : 'glass-strong'} text-white ${done ? '' : 'anim-breathe'}`}>
                  <ActivityIcon type={type} size={26} color="#fff" />
                  <span className="font-nunito font-700 text-[11px] text-center leading-tight">{getActivityLabel(type)}</span>
                  {done
                    ? <CheckIcon size={18} circle={false} />
                    : <div className="w-3.5 h-3.5 rounded-full border-2 border-white/70" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity cards */}
        <h2 className="font-fredoka text-xl text-white mb-3 text-shadow-soft">Explore Your World</h2>
        <div className="grid grid-cols-2 gap-3.5 mb-3.5">
          {['phonics','sightwords','reading','writing'].map((type, i) => (
            <ActivityCard key={type} type={type} label={getActivityLabel(type)}
              completedToday={countCompletedToday(type)}
              totalRequired={curriculum.required.filter(r => r === type).length || 1}
              locked={false} index={i} />
          ))}
        </div>

        <ActivityCard type="math" label="Math"
          completedToday={countCompletedToday('math')} totalRequired={1}
          locked={!mathUnlocked} index={4} />

        {/* Rewards room */}
        <motion.button
          className="w-full mt-4 btn-gold flex items-center justify-center gap-3 anim-glow"
          whileTap={{ scale: 0.96 }} onClick={() => navigate('/rewards')}>
          <TrophyIcon size={26} color="#16202B" /> Rewards Room
        </motion.button>
      </div>

      {/* Inactivity overlay */}
      <AnimatePresence>
        {showInactivity && (
          <motion.div className="fixed inset-0 bg-midnight/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetInactivity}>
            <div className="anim-float"><Stitch pose="idle" size={160} /></div>
            <div className="bg-white rounded-3xl p-8 max-w-xs text-center shadow-float">
              <p className="font-fredoka text-2xl text-ocean mb-2">Still there, {name}?</p>
              <p className="font-nunito font-600 text-midnight/70">Tap anywhere to keep learning!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RewardModal
        open={!!leveledUp}
        reward={{ kind: 'levelup', level: leveledUp, title: `Level ${leveledUp} Unlocked!`,
          message: `Amazing, ${name}! You reached a new level! Stitch is doing a happy dance!` }}
        onClose={clearLevelUp}
      />
    </div>
  )
}
