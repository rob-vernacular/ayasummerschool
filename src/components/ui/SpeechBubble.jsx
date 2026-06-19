import { motion } from 'framer-motion'

/* ============================================================================
   SpeechBubble — Stitch's voice. A frosted white bubble with a directional
   tail. `tail` points toward the speaker: 'left' | 'bottom' | 'bottom-left'.
   ========================================================================== */
export default function SpeechBubble({ children, tail = 'left', className = '', animateKey }) {
  const tailEl = {
    left: <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-4 h-4 bg-white rotate-45 shadow-[-2px_2px_3px_rgba(0,0,0,0.06)]" />,
    'bottom-left': <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white rotate-45" />,
    bottom: <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />,
  }[tail]

  return (
    <motion.div
      key={animateKey}
      className={`relative bg-white rounded-3xl px-5 py-3.5 shadow-card ${className}`}
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {tailEl}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
