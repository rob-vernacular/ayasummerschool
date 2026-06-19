import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useSpeech, speechSupported } from '../../hooks/useSpeech'

/* Tap-to-speak button used throughout activities.
   Props:
     text      — what to say
     size      — 'sm' | 'md' | 'lg'   (40 / 56 / 72 px)
     mode      — 'word' | 'sentence' | 'instruction' | 'letter'
     autoSpeak — speak once automatically (after an 800ms delay)
     delay     — override auto-speak delay (ms)
*/
const SIZES = { sm: 40, md: 56, lg: 72 }

export default function SpeakerButton({ text, size = 'md', mode = 'word', autoSpeak = false, delay = 800, className = '' }) {
  const { speak, speakWord, speakSentence, speakInstruction, speakLetter } = useSpeech()
  const [speaking, setSpeaking] = useState(false)
  const [hasSpoken, setHasSpoken] = useState(false)
  const px = SIZES[size] || SIZES.md

  if (!speechSupported) return null

  const run = () => {
    setHasSpoken(true)
    const fn = mode === 'sentence' ? speakSentence
      : mode === 'instruction' ? speakInstruction
      : mode === 'letter' ? speakLetter
      : speakWord
    const u = fn(text)
    if (u) {
      setSpeaking(true)
      u.onend = () => setSpeaking(false)
      u.onerror = () => setSpeaking(false)
    }
  }

  // Auto-speak once when text changes (if requested)
  useEffect(() => {
    if (!autoSpeak || !text) return
    setHasSpoken(false)
    const t = setTimeout(run, delay)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, autoSpeak])

  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <motion.button
        type="button"
        onClick={run}
        whileTap={{ scale: 0.9 }}
        aria-label={`Hear: ${text}`}
        className={`rounded-full flex items-center justify-center text-white shadow-card shrink-0
          ${!hasSpoken && !speaking ? 'anim-speaker-pulse' : ''}`}
        style={{ width: px, height: px, background: 'linear-gradient(150deg,#4FC3F7,#1B6CA8)' }}
      >
        <svg width={px * 0.5} height={px * 0.5} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 9 H7 L11 5 V19 L7 15 H4 Z" fill="#fff" />
          <path d="M14.5 9 a4 4 0 0 1 0 6 M17 7 a7 7 0 0 1 0 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </motion.button>

      {/* animated sound bars while speaking */}
      {speaking && (
        <span className="absolute left-full ml-1.5 flex items-end gap-0.5" style={{ height: px * 0.5 }} aria-hidden="true">
          {[0, 1, 2].map(i => (
            <span key={i} className="w-1 rounded-full bg-ocean-light anim-sound-wave"
              style={{ height: '100%', animationDelay: `${i * 0.15}s` }} />
          ))}
        </span>
      )}
    </span>
  )
}
