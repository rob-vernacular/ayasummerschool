import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { clearActiveProfile } from '../../lib/session'
import StreakCounter from '../ui/StreakCounter'
import XPBar from '../ui/XPBar'

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
    <div className="relative z-20">
      <div className="flex items-center justify-between px-4 py-3 bg-ocean/90 backdrop-blur-sm text-white">
        {/* Left */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {showBack ? (
            <motion.button
              className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/20 text-2xl shrink-0"
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(backRoute)}
            >←</motion.button>
          ) : (
            <div className="min-w-0">
              <div className="font-fredoka text-lg leading-tight truncate">
                {timeGreeting()}, {profile?.display_name || 'Friend'}! ☀️
              </div>
              {progress && <StreakCounter streak={progress.streak_current || 0} compact />}
            </div>
          )}
          {title && <span className="font-fredoka text-xl ml-2">{title}</span>}
        </div>

        {/* Center/Right */}
        <div className="flex items-center gap-3 shrink-0">
          {progress && <XPBar xp={progress.xp || 0} compact />}

          {/* Mute */}
          <motion.button
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 text-xl"
            whileTap={{ scale: 0.9 }}
            onClick={onMuteToggle}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </motion.button>

          {/* Menu */}
          <motion.button
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 text-xl"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >☰</motion.button>
        </div>
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute right-4 top-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden min-w-[200px] z-30"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <button className="w-full text-left px-5 py-4 font-nunito font-600 text-midnight hover:bg-sand flex items-center gap-3"
              onClick={handleSwitchPlayer}>
              <span>👥</span> Switch Player
            </button>
            <button className="w-full text-left px-5 py-4 font-nunito font-600 text-midnight hover:bg-sand flex items-center gap-3"
              onClick={() => { navigate('/rewards'); setMenuOpen(false) }}>
              <span>🏆</span> Rewards Room
            </button>
            <button className="w-full text-left px-5 py-4 font-nunito font-600 text-midnight hover:bg-sand flex items-center gap-3"
              onClick={() => { navigate('/parent'); setMenuOpen(false) }}>
              <span>👪</span> Parent Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {menuOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
      )}
    </div>
  )
}
