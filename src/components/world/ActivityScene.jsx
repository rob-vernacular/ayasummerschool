import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TropicalBackground from './TropicalBackground'
import Stitch from '../characters/Stitch'
import SpeechBubble from '../ui/SpeechBubble'
import { BackIcon } from '../icons'

/* ============================================================================
   Per-subject world theme. Every activity lives in one of these places.
   ========================================================================== */
export const SUBJECT_THEME = {
  phonics:    { variant: 'sunset',   accent: '#FF6B6B', title: 'Sound Beach' },
  sightwords: { variant: 'ocean',    accent: '#1B6CA8', title: 'Word Cove' },
  reading:    { variant: 'grove',    accent: '#2E7D32', title: 'Story Grove' },
  writing:    { variant: 'cave',     accent: '#7B1FA2', title: 'Writing Cave' },
  math:       { variant: 'island',   accent: '#F57F17', title: 'Number Island' },
}

/* ============================================================================
   ActivityScene — the consistent shell for every activity screen.
   Themed world background + a frosted header (back / title / progress) +
   an optional Stitch companion with a speech bubble. Content goes in children.
   ========================================================================== */
export default function ActivityScene({
  subject = 'phonics',
  title,
  backRoute = '/home',
  onBack,
  current, total,                 // optional progress (shows dots + bar)
  stitchPose = 'idle',
  stitchSize = 96,
  message,                        // optional speech-bubble text
  showStitch = true,
  scroll = true,
  children,
}) {
  const navigate = useNavigate()
  const theme = SUBJECT_THEME[subject] || SUBJECT_THEME.phonics
  const heading = title || theme.title
  const hasProgress = typeof current === 'number' && typeof total === 'number'

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="fixed inset-0"><TropicalBackground variant={theme.variant} /></div>

      {/* Header */}
      <div className="relative z-20 flex items-center gap-3 px-3 py-2.5 glass-strong text-white">
        <motion.button
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/20 shrink-0"
          whileTap={{ scale: 0.9 }} onClick={() => (onBack ? onBack() : navigate(backRoute))} aria-label="Back">
          <BackIcon size={30} />
        </motion.button>
        <h1 className="font-fredoka text-xl text-shadow-soft flex-1 truncate">{heading}</h1>
        {hasProgress && <span className="font-fredoka text-base text-shadow-soft shrink-0">{Math.min(current + 1, total)} / {total}</span>}
      </div>

      {/* Progress bar */}
      {hasProgress && (
        <div className="relative z-10 h-1.5 bg-black/10">
          <motion.div className="h-full rounded-r-full" style={{ background: theme.accent }}
            animate={{ width: `${((current + 1) / total) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
      )}

      {/* Stitch companion */}
      {showStitch && (
        <div className="relative z-10 flex items-end gap-2 px-4 pt-3">
          <div className="shrink-0 anim-float-slow"><Stitch pose={stitchPose} size={stitchSize} /></div>
          {message && (
            <SpeechBubble className="mb-3 flex-1 max-w-[280px]" tail="left" animateKey={message}>
              <p className="bubble-text text-midnight">{message}</p>
            </SpeechBubble>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex-1 ${scroll ? 'overflow-auto' : ''} px-4 pb-8`}>
        {children}
      </div>
    </div>
  )
}
