import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getXPProgress } from '../../utils/levelCalc'
import { StarIcon } from '../icons'

export default function XPBar({ xp = 0, compact = false }) {
  const { current, next, progress, xpInLevel, xpNeeded } = getXPProgress(xp)
  const [displayXP, setDisplayXP] = useState(xp)

  useEffect(() => {
    const start = displayXP
    const diff = xp - start
    if (diff === 0) return
    const steps = 20
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayXP(Math.round(start + (diff * i) / steps))
      if (i >= steps) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [xp])

  if (compact) {
    return (
      <div className="xp-counter flex items-center gap-1.5">
        <StarIcon size={20} />
        <span className="font-fredoka text-lg text-white text-shadow-soft">{displayXP.toLocaleString()}</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="font-fredoka text-sm text-midnight/80">Level {current.level}</span>
        <span className="font-nunito text-xs text-midnight/60">
          {xpInLevel} / {xpNeeded} XP
        </span>
        {next && <span className="font-fredoka text-sm text-midnight/80">Level {next.level}</span>}
      </div>
      <div className="w-full bg-black/10 rounded-full overflow-hidden h-4">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold to-yellow-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
