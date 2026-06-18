import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import SENTENCES from '../../data/sentences'
import { useNavigate } from 'react-router-dom'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function SentenceFillIn({ onComplete, profile }) {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const [feedback, setFeedback] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  useEffect(() => {
    const qs = shuffle(SENTENCES).slice(0, 10)
    setQuestions(qs)
  }, [])

  if (!questions.length) return null

  const q = questions[current]

  const handleAnswer = (choice) => {
    if (selected) return
    setSelected(choice)
    if (choice === q.word) {
      playCorrect()
      setStitchPose('happy')
      setScore(s => s + 1)
      setFeedback({ type: 'correct', msg: ['Yes!', 'Perfect!', 'You got it!', 'Stitch cheers!'][Math.floor(Math.random()*4)] })
      setTimeout(() => {
        setFeedback(null); setSelected(null); setAttempts(0); setStitchPose('idle')
        if (current + 1 >= questions.length) { storyComplete(); setDone(true) }
        else setCurrent(c => c + 1)
      }, 1100)
    } else {
      playWrong()
      setStitchPose('sad')
      const a = attempts + 1
      setAttempts(a)
      setFeedback({ type: 'wrong', msg: ['Almost!', 'Try again!', 'So close!'][Math.floor(Math.random()*3)] })
      setTimeout(() => {
        setFeedback(null); setSelected(null); setStitchPose('idle')
        if (a >= 3) {
          if (current + 1 >= questions.length) { storyComplete(); setDone(true) }
          else { setCurrent(c => c + 1); setAttempts(0) }
        }
      }, 1000)
    }
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    const perfect = pct === 100
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky/30 to-blue-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-ocean mt-4">Sentences Done!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">{score}/{questions.length} correct!</p>
        <motion.button
          className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl"
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(pct, perfect)}
        >Collect {perfect ? 60 : 45} XP! ⭐</motion.button>
      </div>
    )
  }

  const displaySentence = q.sentence.replace('___', '______')

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky/30 to-blue-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-sky/30 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/sight-words')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Sentence Fill-In</div>
        <div className="font-nunito text-sm text-midnight/60">{current + 1} / {questions.length}</div>
      </div>

      <div className="w-full bg-gray-200 h-2">
        <div className="bg-sky h-2 transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-6">
        <div className="flex items-center gap-3">
          <Stitch pose={stitchPose} size={90} />
          <div className="bg-white rounded-2xl px-4 py-3 shadow-md max-w-[200px]">
            <p className="font-nunito text-sm text-midnight">Pick the right word!</p>
          </div>
        </div>

        <motion.div
          key={current}
          className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-sm text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="font-nunito text-2xl text-midnight leading-relaxed" style={{ lineHeight: 1.7 }}>
            {q.sentence.split('___').map((part, i) => (
              <span key={i}>
                {part}
                {i < q.sentence.split('___').length - 1 && (
                  <span className={`inline-block w-24 border-b-3 mx-1 font-fredoka text-2xl
                    ${selected === q.word ? 'text-grass border-grass' : 'text-ocean border-ocean'}`}>
                    {selected || '___'}
                  </span>
                )}
              </span>
            ))}
          </p>
        </motion.div>

        {/* Choices */}
        <div className="flex gap-3 w-full max-w-sm justify-center flex-wrap">
          {q.choices.map(choice => {
            const isSelected = selected === choice
            const isCorrect = choice === q.word
            let cls = 'bg-white border-2 border-gray-200 text-midnight'
            if (isSelected) cls = isCorrect ? 'bg-grass/20 border-grass text-grass' : 'bg-coral/20 border-coral text-coral'
            return (
              <motion.button key={choice}
                className={`font-fredoka text-2xl px-6 py-4 rounded-2xl shadow-md flex-1 min-w-[100px] ${cls}`}
                whileTap={{ scale: selected ? 1 : 0.92 }}
                onClick={() => handleAnswer(choice)}
              >{choice}</motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              className={`font-fredoka text-2xl px-6 py-3 rounded-2xl
                ${feedback.type === 'correct' ? 'bg-grass/20 text-grass' : 'bg-coral/20 text-coral'}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >{feedback.msg}</motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
