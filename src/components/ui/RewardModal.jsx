import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../characters/Stitch'
import Luna from '../characters/Luna'
import ConfettiExplosion from './ConfettiExplosion'
import { TrophyIcon, StarIcon, SparkleIcon } from '../icons'

/* ============================================================================
   RewardModal — a full-screen celebration MOMENT. Stitch dances, confetti
   rains, the world celebrates. Handles level-ups (reward.kind === 'levelup',
   with Luna) and generic reward unlocks.
   ========================================================================== */
export default function RewardModal({ open, reward, onClose }) {
  const [confettiDone, setConfettiDone] = useState(false)
  const isLevelUp = reward?.kind === 'levelup'

  // Auto-dismiss level-ups after 4s
  useEffect(() => {
    if (!open || !isLevelUp) return
    const t = setTimeout(() => onClose?.(), 4200)
    return () => clearTimeout(t)
  }, [open, isLevelUp])

  useEffect(() => { if (open) setConfettiDone(false) }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <ConfettiExplosion active={open && !confettiDone} count={isLevelUp ? 60 : 30} onComplete={() => setConfettiDone(true)} />
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-midnight/75 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Luna flies in for level-ups */}
            {isLevelUp && (
              <motion.div className="absolute top-[14%]"
                initial={{ x: -260, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}>
                <Luna pose="fly" size={130} />
              </motion.div>
            )}

            {/* Stitch celebrating */}
            <motion.div
              initial={{ scale: 0, y: 40 }} animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}>
              <Stitch pose="celebrate" size={200} />
            </motion.div>

            {/* Banner */}
            <motion.div
              className="text-center mt-2 max-w-sm"
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.25 }}
              onClick={e => e.stopPropagation()}>

              <div className="flex justify-center mb-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-float anim-glow">
                  {isLevelUp ? <StarIcon size={44} color="#fff" /> : <TrophyIcon size={44} color="#fff" />}
                </div>
              </div>

              <h2 className="font-fredoka text-4xl text-gold mb-2"
                style={{ textShadow: '0 0 22px rgba(255,215,0,0.7), 0 2px 4px rgba(0,0,0,0.4)' }}>
                {reward?.title || 'Reward Unlocked!'}
              </h2>
              <p className="font-nunito font-700 text-white/95 mb-6 text-lg leading-relaxed">
                {reward?.message || 'You earned something amazing!'}
              </p>

              <button className="btn-gold w-full flex items-center justify-center gap-2" onClick={onClose}>
                <SparkleIcon size={22} color="#16202B" /> Awesome!
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
