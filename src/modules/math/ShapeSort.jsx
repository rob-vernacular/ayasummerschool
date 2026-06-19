import { useState } from 'react'
import { motion } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { useSound } from '../../hooks/useSound'

const SHAPES = [
  { name: 'circle', color: 'red', emoji: '🔴', type: 'round' },
  { name: 'square', color: 'blue', emoji: '🟦', type: 'flat' },
  { name: 'triangle', color: 'green', emoji: '🔺', type: 'pointy' },
  { name: 'star', color: 'yellow', emoji: '⭐', type: 'pointy' },
  { name: 'heart', color: 'pink', emoji: '❤️', type: 'round' },
  { name: 'diamond', color: 'purple', emoji: '💜', type: 'pointy' },
  { name: 'circle', color: 'orange', emoji: '🟠', type: 'round' },
  { name: 'square', color: 'green', emoji: '🟩', type: 'flat' },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function ShapeSort({ onComplete }) {
  const [shapes] = useState(() => shuffle(SHAPES).slice(0, 6))
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const [feedback, setFeedback] = useState(null)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  const shape = shapes[current]
  const question = current % 2 === 0
    ? { text: `Is this shape round or flat/pointy?`, catA: 'Round', catB: 'Flat / Pointy', correct: shape.type === 'round' ? 'A' : 'B' }
    : { text: `Which color is this shape?`, catA: shape.color, catB: ['red','blue','green','yellow','pink','purple','orange'].find(c => c !== shape.color), correct: 'A' }

  const handleAnswer = (bucket) => {
    if (bucket === question.correct) {
      playCorrect(); setStitchPose('happy'); setScore(s => s + 1)
      setFeedback({ type: 'correct', msg: 'Correct! 🎉' })
    } else {
      playWrong(); setStitchPose('sad')
      setFeedback({ type: 'wrong', msg: 'Almost! Try again next time!' })
    }
    setTimeout(() => {
      setFeedback(null); setStitchPose('idle')
      if (current + 1 >= shapes.length) { storyComplete(); setDone(true) }
      else setCurrent(c => c + 1)
    }, 1100)
  }

  if (done) {
    const pct = Math.round((score / shapes.length) * 100)
    return (
      <CompletionScreen subject="math" title="Shape Sorter!" score={score} total={shapes.length}
        perfect={pct === 100} xp={pct === 100 ? 55 : 40} buttonLabel={`Collect ${pct === 100 ? 55 : 40} XP!`}
        onCollect={() => onComplete(pct, pct === 100)} />
    )
  }

  return (
    <ActivityScene
      subject="math" title="Shape Sort" backRoute="/learn/math"
      current={current} total={shapes.length}
      stitchPose={stitchPose} stitchSize={84}
      message={feedback ? feedback.msg : question.text}>

      <div className="flex flex-col items-center gap-5 max-w-sm mx-auto">
        <div className="text-9xl">{shape.emoji}</div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {['A','B'].map(b => (
            <motion.button key={b}
              className="glass-strong text-white font-fredoka text-2xl py-6 rounded-2xl shadow-card text-shadow-soft"
              whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(b)}>
              {b === 'A' ? question.catA : question.catB}
            </motion.button>
          ))}
        </div>
      </div>
    </ActivityScene>
  )
}
