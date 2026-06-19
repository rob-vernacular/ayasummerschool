import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../components/characters/Stitch'
import SpeechBubble from '../components/ui/SpeechBubble'
import TropicalBackground from '../components/world/TropicalBackground'
import { ReadingIcon, SightWordsIcon, StarIcon, ArrowRightIcon } from '../components/icons'
import { useProfile } from '../hooks/useProfile'

const SLIDES = [
  { title: "Hi! I'm Stitch!", body: 'Ready for the BEST summer ever?', pose: 'wave', cta: "Let's Go!" },
  { title: '', body: '', pose: 'happy', cta: 'Keep Going!' },
  { title: 'Your Mission', body: 'Do 3 activities every day. Earn stars. Unlock cool stuff!', pose: 'thinking', cta: 'Got it!',
    steps: [
      { icon: ReadingIcon, label: 'Read and write' },
      { icon: SightWordsIcon, label: 'Learn new words' },
      { icon: StarIcon, label: 'Collect rewards' },
    ] },
  { title: "Let's Start!", body: 'Your first mission is ready. Stitch is with you every step!', pose: 'excited', cta: 'Start Learning!' },
]

export default function Onboarding() {
  const [slide, setSlide] = useState(0)
  const navigate = useNavigate()
  const { profile } = useProfile()

  const current = SLIDES[slide]
  const isLast = slide === SLIDES.length - 1
  const name = profile?.display_name || 'Friend'

  const handleNext = () => { isLast ? navigate('/home') : setSlide(s => s + 1) }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <TropicalBackground variant="beach" />

      <div className="relative z-10 w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            className="flex flex-col items-center text-center gap-5"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            <div className={current.pose === 'excited' ? 'anim-jump' : 'anim-float-slow'}>
              <Stitch pose={current.pose} size={180} />
            </div>

            <SpeechBubble tail="bottom" className="w-full">
              {current.title && <h2 className="font-fredoka text-2xl text-ocean mb-1">{current.title}</h2>}
              <p className="font-nunito font-700 text-lg text-midnight leading-relaxed">
                {slide === 1 ? `Great to meet you, ${name}! Let's be best friends this summer.` : current.body}
              </p>

              {current.steps && (
                <ul className="mt-4 space-y-2.5 text-left">
                  {current.steps.map((step, i) => {
                    const Icon = step.icon
                    return (
                      <motion.li key={i}
                        className="font-nunito font-700 text-midnight flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 + 0.3 }}>
                        <span className="w-9 h-9 rounded-xl bg-ocean flex items-center justify-center shrink-0">
                          <Icon size={20} color="#fff" />
                        </span>
                        {step.label}
                      </motion.li>
                    )
                  })}
                </ul>
              )}
            </SpeechBubble>

            {/* Progress dots */}
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <div key={i} className={`h-3 rounded-full transition-all
                  ${i === slide ? 'w-7 bg-white' : i < slide ? 'w-3 bg-white/60' : 'w-3 bg-white/30'}`} />
              ))}
            </div>

            {/* Surfboard CTA */}
            <motion.button
              className="relative w-full font-fredoka text-2xl text-white py-5 shadow-float active:scale-95"
              style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', borderRadius: '999px' }}
              whileTap={{ scale: 0.95 }} onClick={handleNext}>
              <span className="absolute left-6 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/40 rounded-full" />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 inline-flex"><ArrowRightIcon size={26} /></span>
              {current.cta}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
