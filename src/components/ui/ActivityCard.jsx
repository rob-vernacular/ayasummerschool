import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getActivityEmoji } from '../../utils/curriculum'

const CARD_STYLES = {
  phonics:    { bg: 'from-coral to-red-400',   route: '/learn/phonics' },
  sightwords: { bg: 'from-sky to-blue-400',    route: '/learn/sight-words' },
  reading:    { bg: 'from-grass to-green-400', route: '/learn/reading' },
  writing:    { bg: 'from-ocean to-blue-700',  route: '/learn/writing' },
  math:       { bg: 'from-gold to-yellow-400', route: '/learn/math' },
}

export default function ActivityCard({ type, label, completedToday = 0, totalRequired = 3, locked = false, index = 0 }) {
  const navigate = useNavigate()
  const style = CARD_STYLES[type] || CARD_STYLES.phonics
  const emoji = getActivityEmoji(type)
  const done = completedToday >= totalRequired

  return (
    <motion.button
      className={`relative rounded-3xl p-5 text-left w-full shadow-lg overflow-hidden
        bg-gradient-to-br ${style.bg} text-white
        ${locked ? 'opacity-60' : 'active:scale-95'}
        min-h-[140px] flex flex-col justify-between`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileTap={!locked ? { scale: 0.95 } : {}}
      onClick={() => !locked && navigate(style.route)}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 text-white/20 text-8xl select-none">{emoji}</div>

      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl">
          <span className="text-4xl">🔒</span>
        </div>
      )}

      <div>
        <span className="text-3xl">{emoji}</span>
        <h3 className="font-fredoka text-xl mt-1 leading-tight">{label}</h3>
      </div>

      <div>
        {/* Progress dots */}
        <div className="flex gap-2 mb-2">
          {Array.from({ length: totalRequired }).map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 border-white/60
              ${i < completedToday ? 'bg-white' : 'bg-white/20'}`} />
          ))}
        </div>

        {done ? (
          <span className="font-nunito font-700 text-sm bg-white/30 rounded-full px-3 py-1">
            ✅ Done today!
          </span>
        ) : locked ? (
          <span className="font-nunito text-sm opacity-70">Keep going to unlock!</span>
        ) : (
          <span className="font-nunito font-600 text-sm opacity-90">
            {completedToday}/{totalRequired} today
          </span>
        )}
      </div>
    </motion.button>
  )
}
