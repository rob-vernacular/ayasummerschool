import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { clearActiveProfile } from '../../lib/session'
import StreakCounter from '../ui/StreakCounter'
import XPBar from '../ui/XPBar'
import { BackIcon, SoundOnIcon, SoundOffIcon, MenuIcon, PeopleIcon, TrophyIcon, HomeIcon } from '../icons'

export default function TopBar({ profile, progress, onMuteToggle, soundEnabled = true, showBack = false, backRoute = '/home', title = '' }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const timeGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const handleSwitchPlayer = () => {
    clearActiveProfile()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <div className="relative z-30">
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 glass-strong text-white">
        {/* Left */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {showBack ? (
            <motion.button
              className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/20 shrink-0"
              whileTap={{ scale: 0.9 }} onClick={() => navigate(backRoute)} aria-label="Back">
              <BackIcon size={30} />
            </motion.button>
          ) : (
            <div className="min-w-0">
              <div className="font-fredoka text-lg leading-tight truncate text-shadow-soft">
                {timeGreeting()}, {profile?.display_name || 'Friend'}!
              </div>
              {progress && <StreakCounter streak={progress.streak_current || 0} compact />}
            </div>
          )}
          {title && <span className="font-fredoka text-xl ml-1 text-shadow-soft truncate">{title}</span>}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          {progress && (
            <div className="bg-white/15 rounded-xl px-2.5 py-1.5">
              <XPBar xp={progress.xp || 0} compact />
            </div>
          )}

          <motion.button
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20"
            whileTap={{ scale: 0.9 }} onClick={onMuteToggle} aria-label={soundEnabled ? 'Mute' : 'Unmute'}>
            {soundEnabled ? <SoundOnIcon size={24} /> : <SoundOffIcon size={24} />}
          </motion.button>

          <motion.button
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20"
            whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <MenuIcon size={24} />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute right-3 top-full mt-2 bg-white rounded-2xl shadow-float overflow-hidden min-w-[210px] z-40"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}>
            <button className="w-full text-left px-5 py-4 font-nunito font-700 text-midnight hover:bg-sand flex items-center gap-3"
              onClick={handleSwitchPlayer}>
              <PeopleIcon size={22} color="#1B6CA8" /> Switch Player
            </button>
            <button className="w-full text-left px-5 py-4 font-nunito font-700 text-midnight hover:bg-sand flex items-center gap-3"
              onClick={() => { navigate('/rewards'); setMenuOpen(false) }}>
              <TrophyIcon size={22} /> Rewards Room
            </button>
            <button className="w-full text-left px-5 py-4 font-nunito font-700 text-midnight hover:bg-sand flex items-center gap-3"
              onClick={() => { navigate('/parent'); setMenuOpen(false) }}>
              <HomeIcon size={22} color="#1B6CA8" /> Parent Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {menuOpen && <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />}
    </div>
  )
}
