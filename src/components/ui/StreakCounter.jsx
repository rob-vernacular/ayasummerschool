import { motion } from 'framer-motion'

export default function StreakCounter({ streak = 0, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <motion.span
          className="text-2xl"
          animate={streak > 0 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >🔥</motion.span>
        <span className="font-fredoka text-lg text-midnight">Day {streak}</span>
      </div>
    )
  }

  return (
    <motion.div className="flex items-center gap-2 bg-white/80 rounded-2xl px-4 py-2 shadow-sm"
      whileTap={{ scale: 0.95 }}>
      <motion.span className="text-3xl"
        animate={streak > 0 ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}>🔥</motion.span>
      <div>
        <div className="font-fredoka text-lg leading-none text-midnight">Day {streak} streak!</div>
        {streak >= 7 && <div className="font-nunito text-xs text-coral">🏆 Amazing streak!</div>}
      </div>
    </motion.div>
  )
}
