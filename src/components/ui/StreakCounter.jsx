import { motion } from 'framer-motion'
import { FlameIcon, TrophyIcon } from '../icons'

export default function StreakCounter({ streak = 0, compact = false }) {
  if (compact) {
    return (
      <div className="streak-counter flex items-center gap-1.5">
        <motion.span
          className="inline-flex"
          animate={streak > 0 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        ><FlameIcon size={20} /></motion.span>
        <span className="font-fredoka text-base text-white text-shadow-soft">Day {streak}</span>
      </div>
    )
  }

  return (
    <motion.div className="flex items-center gap-2 bg-white/85 rounded-2xl px-4 py-2 shadow-sm" whileTap={{ scale: 0.95 }}>
      <motion.span className="inline-flex"
        animate={streak > 0 ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}><FlameIcon size={28} /></motion.span>
      <div>
        <div className="font-fredoka text-lg leading-none text-midnight">Day {streak} streak!</div>
        {streak >= 7 && (
          <div className="font-nunito font-700 text-xs text-coral-dark flex items-center gap-1 mt-0.5">
            <TrophyIcon size={13} /> Amazing streak!
          </div>
        )}
      </div>
    </motion.div>
  )
}
