import { motion } from 'framer-motion'
import Stitch from '../characters/Stitch'
import TropicalBackground from '../world/TropicalBackground'
import ConfettiExplosion from './ConfettiExplosion'
import { SUBJECT_THEME } from '../world/ActivityScene'
import { StarIcon, SparkleIcon } from '../icons'

/* ============================================================================
   CompletionScreen — the earned reward moment at the end of an activity.
   Stitch dances, confetti falls, the score shows, and a big gold button
   collects the XP. Drop-in replacement for the old "Done!" screens.
   ========================================================================== */
export default function CompletionScreen({
  subject = 'phonics',
  score, total,
  perfect = false,
  xp,
  onCollect,
  title = 'Done!',
  buttonLabel,
}) {
  const theme = SUBJECT_THEME[subject] || SUBJECT_THEME.phonics
  const pct = total ? Math.round((score / total) * 100) : null

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden text-center">
      <TropicalBackground variant={theme.variant} />
      <ConfettiExplosion active count={perfect ? 50 : 24} />

      <motion.div className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}>
        <div className="anim-jump"><Stitch pose="celebrate" size={180} /></div>

        <h2 className="font-fredoka text-4xl text-white mt-3 text-shadow-soft">{title}</h2>

        {typeof score === 'number' && typeof total === 'number' && (
          <p className="font-nunito font-700 text-xl text-white/95 mt-2 text-shadow-soft">
            {score}/{total} correct{pct !== null ? ` — ${pct}%` : ''}
          </p>
        )}

        {perfect && (
          <div className="flex items-center gap-2 mt-2 font-fredoka text-2xl text-gold"
            style={{ textShadow: '0 0 18px rgba(255,215,0,0.7)' }}>
            <StarIcon size={28} /> Perfect score!
          </div>
        )}

        <motion.button
          className="btn-gold mt-8 px-10 flex items-center justify-center gap-2 anim-glow"
          whileTap={{ scale: 0.95 }} onClick={onCollect}>
          <SparkleIcon size={22} color="#16202B" />
          {buttonLabel || (xp != null ? `Collect ${xp} XP!` : 'Collect Reward!')}
        </motion.button>
      </motion.div>
    </div>
  )
}
