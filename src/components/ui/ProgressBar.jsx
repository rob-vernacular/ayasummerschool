import { motion } from 'framer-motion'

export default function ProgressBar({ value = 0, max = 100, color = 'bg-grass', height = 12, showLabel = false, label = '' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm font-nunito font-600 mb-1 text-midnight/70">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="w-full bg-black/10 rounded-full overflow-hidden" style={{ height }}>
        <motion.div
          className={`${color} h-full rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
