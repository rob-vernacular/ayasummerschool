import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../characters/Stitch'
import ConfettiExplosion from './ConfettiExplosion'
import { useState } from 'react'

export default function RewardModal({ open, reward, onClose }) {
  const [confettiDone, setConfettiDone] = useState(false)

  return (
    <AnimatePresence>
      {open && (
        <>
          <ConfettiExplosion active={open && !confettiDone} onComplete={() => setConfettiDone(true)} />
          <motion.div
            className="fixed inset-0 bg-midnight/70 z-40 flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-cloud rounded-4xl p-8 max-w-sm w-full text-center shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <Stitch pose="dance" size={120} />
              </div>

              <div className="text-6xl mb-3">{reward?.emoji || '🏆'}</div>
              <h2 className="font-fredoka text-3xl text-ocean mb-2">{reward?.title || 'Reward Unlocked!'}</h2>
              <p className="font-nunito text-midnight/80 mb-6 text-lg leading-relaxed">
                {reward?.message || 'You earned something amazing!'}
              </p>

              <motion.button
                className="bg-ocean text-white font-fredoka text-xl px-8 py-4 rounded-2xl w-full shadow-lg"
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Awesome! 🎉
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
