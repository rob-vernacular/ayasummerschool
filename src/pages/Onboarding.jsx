import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../components/characters/Stitch'
import { useProfile } from '../hooks/useProfile'

const SLIDES = [
  {
    title: 'Hi! I\'m Stitch!',
    body: 'Ready for the best summer ever?',
    emoji: '🌊',
    pose: 'wave',
    cta: "Let's Go!",
  },
  {
    title: '',
    body: 'Great! Let\'s be best friends this summer!',
    emoji: '❤️',
    pose: 'happy',
    cta: 'Keep Going!',
  },
  {
    title: 'Your Mission',
    body: 'Do 3 activities every day. Earn stars. Unlock cool stuff. Simple!',
    emoji: '⭐',
    pose: 'idle',
    cta: 'Got it!',
    steps: ['📚 Read and write', '🔤 Learn new words', '⭐ Collect rewards'],
  },
  {
    title: 'Let\'s Start!',
    body: 'Your first mission is ready. Stitch will be with you every step!',
    emoji: '🚀',
    pose: 'dance',
    cta: 'Start Learning!',
  },
]

export default function Onboarding() {
  const [slide, setSlide] = useState(0)
  const navigate = useNavigate()
  const { profile } = useProfile()

  const current = SLIDES[slide]
  const isLast = slide === SLIDES.length - 1
  const name = profile?.display_name || 'Friend'

  const handleNext = () => {
    if (isLast) navigate('/home')
    else setSlide(s => s + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky to-ocean flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          className="flex flex-col items-center text-center max-w-sm w-full gap-6"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35 }}
        >
          {/* Character */}
          <motion.div
            animate={current.pose === 'dance' ? { rotate: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.8, repeat: current.pose === 'dance' ? Infinity : 0 }}
          >
            <Stitch pose={current.pose} size={160} />
          </motion.div>

          {/* Speech bubble */}
          <div className="relative bg-white rounded-3xl px-8 py-6 shadow-xl w-full">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-white"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            {current.title && (
              <h2 className="font-fredoka text-2xl text-ocean mb-2">{current.title}</h2>
            )}
            <p className="font-nunito text-lg text-midnight leading-relaxed">
              {slide === 1
                ? `Great to meet you, ${name}! Let's be best friends.`
                : current.body}
            </p>

            {current.steps && (
              <ul className="mt-4 space-y-2 text-left">
                {current.steps.map((step, i) => (
                  <motion.li key={i}
                    className="font-nunito text-midnight/80 text-base flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 + 0.3 }}>
                    {step}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full transition-all
                ${i === slide ? 'bg-white w-6' : i < slide ? 'bg-white/60' : 'bg-white/30'}`} />
            ))}
          </div>

          {/* CTA button */}
          <motion.button
            className="w-full bg-coral text-white font-fredoka text-2xl py-5 rounded-2xl shadow-lg"
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
          >
            {current.cta}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
