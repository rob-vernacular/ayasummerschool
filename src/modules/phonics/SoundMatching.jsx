import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { useSound } from '../../hooks/useSound'

const CELEBRATE = ['Amazing!', 'You got it!', 'Super!', 'Stitch loves it!', 'Wow, wow, wow!', 'So smart!', 'Yes! Yes!']
const ENCOURAGEMENT = ['Uh oh! Almost!', 'So close! Try again!', 'Stitch believes in you!', 'One more try!']

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function SoundMatching({ level, onComplete, profile }) {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [score, setScore] = useState(0)
  const [stitchPose, setStitchPose] = useState('idle')
  const [feedback, setFeedback] = useState(null)
  const [done, setDone] = useState(false)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  useEffect(() => {
    // Only use words that have real pictures so the game is meaningful
    const pictureWords = level.words.filter(w => level.pictures?.[w])
    const pool = pictureWords.length >= 4 ? pictureWords : level.words
    const words = shuffle(pool).slice(0, Math.min(10, pool.length))
    const qs = words.map(word => {
      const distractors = shuffle(level.words.filter(w => w !== word)).slice(0, 3)
      return {
        target: word,
        emoji: level.pictures?.[word] || '📝',
        options: shuffle([word, ...distractors]),
      }
    })
    setQuestions(qs)
  }, [level])

  if (!questions.length) return null

  const q = questions[current]
  const totalQ = questions.length

  const handleAnswer = (option) => {
    if (selected !== null) return
    setSelected(option)

    if (option === q.target) {
      playCorrect()
      setScore(s => s + 1)
      setStitchPose('happy')
      setFeedback({ type: 'correct', msg: CELEBRATE[Math.floor(Math.random() * CELEBRATE.length)] })
      setTimeout(() => {
        setFeedback(null)
        setSelected(null)
        setAttempts(0)
        setStitchPose('idle')
        if (current + 1 >= totalQ) {
          storyComplete()
          setDone(true)
        } else {
          setCurrent(c => c + 1)
        }
      }, 1200)
    } else {
      playWrong()
      setStitchPose('sad')
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setFeedback({ type: 'wrong', msg: ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)] })
      setTimeout(() => {
        setFeedback(null)
        setSelected(null)
        setStitchPose('idle')
        if (newAttempts >= 3) {
          // Move on after 3 attempts
          if (current + 1 >= totalQ) { storyComplete(); setDone(true) }
          else { setCurrent(c => c + 1); setAttempts(0) }
        }
      }, 1000)
    }
  }

  if (done) {
    const pct = Math.round((score / totalQ) * 100)
    const perfect = score === totalQ
    return (
      <CompletionScreen subject="phonics" score={score} total={totalQ} perfect={perfect}
        xp={perfect ? 65 : 50} onCollect={() => onComplete(pct, perfect)} />
    )
  }

  return (
    <ActivityScene
      subject="phonics" title="Sound Matching" backRoute="/learn/phonics"
      current={current} total={totalQ}
      stitchPose={stitchPose} stitchSize={90}
      message={feedback ? feedback.msg : 'What word does this picture show?'}>

      <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
        {/* Picture on driftwood */}
        <motion.div
          className="relative w-full text-center px-8 py-6 rounded-3xl shadow-card"
          style={{ background: 'linear-gradient(160deg, #E7C9A0, #C99A63)', border: '4px solid #B07D45' }}
          key={current} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="absolute inset-x-6 top-1/2 h-px bg-black/10" />
          <div className="text-8xl relative">{q.emoji}</div>
        </motion.div>

        {/* Shell answer options */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {q.options.map(opt => {
            const isSelected = selected === opt
            const isCorrect = opt === q.target
            let bg = 'linear-gradient(160deg, #FFFFFF, #FFE9D6)'
            let ring = 'rgba(0,0,0,0.08)'
            let text = '#16202B'
            if (isSelected && isCorrect) { bg = 'linear-gradient(160deg, #C8F2D4, #8FE0A6)'; ring = '#56C271'; text = '#1B5E20' }
            if (isSelected && !isCorrect) { bg = 'linear-gradient(160deg, #FFD6D6, #FFA9A9)'; ring = '#E53935'; text = '#B71C1C' }
            return (
              <motion.button key={opt}
                className="relative font-fredoka text-2xl py-6 shadow-card overflow-hidden"
                style={{ background: bg, color: text, borderRadius: '46% 46% 50% 50% / 60% 60% 40% 40%', border: `3px solid ${ring}` }}
                whileTap={{ scale: selected ? 1 : 0.93 }}
                animate={isSelected && !isCorrect ? { x: [-6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.35 }}
                onClick={() => handleAnswer(opt)}>
                {/* shell ridges */}
                <span className="pointer-events-none absolute inset-x-3 top-2 flex justify-center gap-1.5 opacity-30">
                  {[0,1,2,3,4].map(i => <span key={i} className="w-px h-3" style={{ background: text, transform: `rotate(${(i-2)*12}deg)` }} />)}
                </span>
                {opt}
              </motion.button>
            )
          })}
        </div>
      </div>
    </ActivityScene>
  )
}
