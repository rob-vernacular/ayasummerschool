import { useState } from 'react'
import { motion } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { MATH_TOPICS } from '../../data/mathTopics'
import { useNavigate } from 'react-router-dom'

const problems = MATH_TOPICS[1].problems

export default function NumberLineJump({ onComplete }) {
  const navigate = useNavigate()
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const [feedback, setFeedback] = useState(null)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  const p = problems[idx]
  const total = problems.length
  const correctAnswer = p.a + p.b

  const handleSubmit = () => {
    if (!answer) return
    if (parseInt(answer) === correctAnswer) {
      playCorrect()
      setStitchPose('happy')
      setScore(s => s + 1)
      setFeedback({ type: 'correct', msg: `${p.a} + ${p.b} = ${correctAnswer} ✅` })
      setTimeout(() => {
        setFeedback(null); setAnswer(''); setStitchPose('idle')
        if (idx + 1 >= total) { storyComplete(); setDone(true) }
        else setIdx(i => i + 1)
      }, 1200)
    } else {
      playWrong()
      setStitchPose('sad')
      setFeedback({ type: 'wrong', msg: `Not quite! The answer is ${correctAnswer}` })
      setTimeout(() => {
        setFeedback(null); setAnswer(''); setStitchPose('idle')
        if (idx + 1 >= total) { storyComplete(); setDone(true) }
        else setIdx(i => i + 1)
      }, 1800)
    }
  }

  if (done) {
    const pct = Math.round((score / total) * 100)
    const perfect = score === total
    return (
      <div className="min-h-screen bg-gradient-to-b from-gold/20 to-yellow-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-yellow-700 mt-4">Math Star!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">{score}/{total} correct!</p>
        <motion.button className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl"
          whileTap={{ scale: 0.95 }} onClick={() => onComplete(pct, perfect)}>
          Collect {perfect ? 55 : 40} XP! ⭐
        </motion.button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold/20 to-yellow-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gold/30 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/math')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Number Line Jump</div>
        <div className="font-nunito text-sm text-midnight/60">{idx + 1} / {total}</div>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-5">
        <Stitch pose={stitchPose} size={80} />

        {/* Problem */}
        <div className="bg-white rounded-3xl p-8 shadow-xl w-full max-w-sm text-center">
          <div className="font-fredoka text-5xl text-ocean mb-2">
            {p.a} + {p.b} = ?
          </div>

          {/* Visual counters */}
          <div className="flex flex-wrap gap-1 justify-center my-4">
            {Array.from({ length: p.a }).map((_, i) => <span key={`a-${i}`} className="text-2xl">{p.emoji[0]}</span>)}
            <span className="font-fredoka text-2xl text-coral mx-2">+</span>
            {Array.from({ length: p.b }).map((_, i) => <span key={`b-${i}`} className="text-2xl">{p.emoji[1] || p.emoji[0]}</span>)}
          </div>
        </div>

        {/* Number input */}
        <input
          type="number"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="?"
          min="0" max="40"
          className="font-fredoka text-5xl text-center border-4 border-ocean rounded-2xl py-4 w-32
            focus:outline-none focus:border-gold text-midnight"
        />

        {/* Number pad */}
        <div className="grid grid-cols-5 gap-2 w-full max-w-xs">
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(n => (
            <motion.button key={n}
              className={`py-3 rounded-xl font-fredoka text-lg
                ${answer == n ? 'bg-ocean text-white' : 'bg-white text-midnight border border-gray-200'}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => setAnswer(String(n))}
            >{n}</motion.button>
          ))}
        </div>

        {feedback && (
          <div className={`font-fredoka text-xl px-6 py-3 rounded-2xl
            ${feedback.type === 'correct' ? 'bg-grass/20 text-grass' : 'bg-coral/20 text-coral'}`}>
            {feedback.msg}
          </div>
        )}

        {answer && !feedback && (
          <motion.button
            className="w-full max-w-sm bg-grass text-white font-fredoka text-2xl py-5 rounded-2xl"
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
          >Check! ✅</motion.button>
        )}
      </div>
    </div>
  )
}
