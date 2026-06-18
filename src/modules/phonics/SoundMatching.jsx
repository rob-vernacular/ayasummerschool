import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { useNavigate } from 'react-router-dom'

const CELEBRATE = ['Amazing!', 'You got it!', 'Super!', 'Stitch loves it!', 'Wow, wow, wow!', 'So smart!', 'Yes! Yes!']
const ENCOURAGEMENT = ['Uh oh! Almost!', 'So close! Try again!', 'Stitch believes in you!', 'One more try!']

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function SoundMatching({ level, onComplete, profile }) {
  const navigate = useNavigate()
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
      <div className="min-h-screen bg-gradient-to-b from-coral/20 to-red-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-coral mt-4">Done!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">{score}/{totalQ} correct — {pct}%</p>
        {perfect && <p className="font-fredoka text-2xl text-gold mt-2">⭐ Perfect score!</p>}
        <motion.button
          className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl shadow-lg"
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(pct, perfect)}
        >Collect {perfect ? 65 : 50} XP! ⭐</motion.button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-coral/20 to-red-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-coral/20 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/phonics')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Sound Matching</div>
        <div className="font-nunito text-sm text-midnight/60">{current + 1} / {totalQ}</div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-2">
        <motion.div className="bg-coral h-2" animate={{ width: `${((current + 1) / totalQ) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-6">
        {/* Stitch + question */}
        <div className="flex items-center gap-4">
          <Stitch pose={stitchPose} size={90} />
          <div className="bg-white rounded-3xl px-5 py-4 shadow-md max-w-[220px]">
            <p className="font-nunito text-base text-midnight">
              What word does this picture show?
            </p>
          </div>
        </div>

        {/* Target display */}
        <motion.div
          className="bg-white rounded-3xl px-8 py-6 shadow-lg text-center w-full max-w-sm"
          key={current}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-8xl">{q.emoji}</div>
        </motion.div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {q.options.map(opt => {
            const isSelected = selected === opt
            const isCorrect = opt === q.target
            let btnClass = 'bg-white border-2 border-gray-200 text-midnight'
            if (isSelected) {
              btnClass = isCorrect
                ? 'bg-grass/20 border-2 border-grass text-grass'
                : 'bg-coral/20 border-2 border-coral text-coral'
            }
            return (
              <motion.button key={opt}
                className={`font-fredoka text-2xl py-5 rounded-2xl shadow-sm ${btnClass}`}
                whileTap={{ scale: selected ? 1 : 0.93 }}
                animate={isSelected && !isCorrect ? { x: [-4, 4, -4, 4, 0] } : {}}
                transition={{ duration: 0.3 }}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </motion.button>
            )
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              className={`font-fredoka text-2xl px-6 py-3 rounded-2xl
                ${feedback.type === 'correct' ? 'bg-grass/20 text-grass' : 'bg-coral/20 text-coral'}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              {feedback.msg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
