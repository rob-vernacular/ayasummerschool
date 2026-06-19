import { useState } from 'react'
import { motion } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { CheckIcon } from '../../components/icons'
import { useSound } from '../../hooks/useSound'
import { MATH_TOPICS } from '../../data/mathTopics'

const topic = MATH_TOPICS[0]

export default function CountAndTap({ onComplete }) {
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
      <CompletionScreen subject="math" title="Counting Champ!" score={score} total={total}
        perfect={perfect} xp={perfect ? 55 : 40} buttonLabel={`Collect ${perfect ? 55 : 40} XP!`}
        onCollect={() => onComplete(pct, perfect)} />
    )
  }

  return (
    <ActivityScene
      subject="math" title="Count & Tap" backRoute="/learn/math"
      current={roundIdx} total={total}
      stitchPose={stitchPose} stitchSize={84}
      message={`Tap each ${round.label}. How many are there?`}>

      <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
        <div className="flex flex-wrap gap-4 justify-center glass-strong rounded-2xl p-6 w-full">
          {Array.from({ length: round.count }).map((_, i) => (
            <motion.button key={i}
              className={`text-5xl rounded-xl p-1 transition-all ${tapped.includes(i) ? 'scale-110 bg-white/40' : ''}`}
              whileTap={{ scale: 0.85 }} onClick={() => handleTap(i)}>
              {tapped.includes(i) ? '✅' : round.emoji}
            </motion.button>
          ))}
        </div>

        <div className="font-fredoka text-3xl text-white text-shadow-soft">I counted: {tapped.length}</div>

        {tapped.length > 0 && !answered && (
          <motion.button
            className="btn-primary w-full flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#56C271,#2E7D32)' }}
            whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onClick={handleCheck}>
            <CheckIcon size={24} circle={false} /> Check!
          </motion.button>
        )}
      </div>
    </ActivityScene>
  )
}
