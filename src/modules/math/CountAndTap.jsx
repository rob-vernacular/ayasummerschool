import { useState } from 'react'
import { motion } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { MATH_TOPICS } from '../../data/mathTopics'
import { useNavigate } from 'react-router-dom'

const topic = MATH_TOPICS[0]

export default function CountAndTap({ onComplete }) {
  const navigate = useNavigate()
  const [roundIdx, setRoundIdx] = useState(0)
  const [tapped, setTapped] = useState([])
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const [answered, setAnswered] = useState(false)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  const round = topic.items[roundIdx]
  const total = topic.items.length

  const handleTap = (i) => {
    if (answered) return
    if (tapped.includes(i)) {
      setTapped(t => t.filter(x => x !== i))
    } else {
      setTapped(t => [...t, i])
    }
  }

  const handleCheck = () => {
    const correct = tapped.length === round.count
    setAnswered(true)
    if (correct) {
      playCorrect()
      setStitchPose('happy')
      setScore(s => s + 1)
    } else {
      playWrong()
      setStitchPose('sad')
    }
    setTimeout(() => {
      setStitchPose('idle')
      setAnswered(false)
      setTapped([])
      if (roundIdx + 1 >= total) { storyComplete(); setDone(true) }
      else setRoundIdx(r => r + 1)
    }, 1200)
  }

  if (done) {
    const pct = Math.round((score / total) * 100)
    const perfect = score === total
    return (
      <div className="min-h-screen bg-gradient-to-b from-gold/20 to-yellow-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-yellow-700 mt-4">Counting Champ!</h2>
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
        <div className="font-fredoka text-xl text-midnight">Count & Tap</div>
        <div className="font-nunito text-sm text-midnight/60">{roundIdx + 1} / {total}</div>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-4">
        <Stitch pose={stitchPose} size={80} />
        <div className="bg-white rounded-2xl px-5 py-3 shadow-md">
          <p className="font-nunito text-lg text-midnight">
            Tap each <strong>{round.label}</strong>. How many are there?
          </p>
        </div>

        {/* Objects to count */}
        <div className="flex flex-wrap gap-4 justify-center bg-white rounded-2xl p-6 shadow-md w-full max-w-sm">
          {Array.from({ length: round.count }).map((_, i) => (
            <motion.button key={i}
              className={`text-5xl rounded-xl p-1 transition-all
                ${tapped.includes(i) ? 'scale-110 bg-gold/30' : ''}`}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleTap(i)}
            >
              {tapped.includes(i) ? '✅' : round.emoji}
            </motion.button>
          ))}
        </div>

        <div className="font-fredoka text-3xl text-ocean">
          I counted: {tapped.length}
        </div>

        {tapped.length > 0 && !answered && (
          <motion.button
            className="w-full max-w-sm bg-grass text-white font-fredoka text-2xl py-5 rounded-2xl shadow-lg"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onClick={handleCheck}
          >Check! ✅</motion.button>
        )}
      </div>
    </div>
  )
}
