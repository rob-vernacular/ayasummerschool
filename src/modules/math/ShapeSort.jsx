import { useState } from 'react'
import { motion } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
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
      <div className="min-h-screen bg-gradient-to-b from-gold/20 to-yellow-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-yellow-700 mt-4">Shape Sorter!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">{score}/{shapes.length} correct!</p>
        <motion.button className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl"
          whileTap={{ scale: 0.95 }} onClick={() => onComplete(pct, pct === 100)}>
          Collect {pct === 100 ? 55 : 40} XP! ⭐
        </motion.button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold/20 to-yellow-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gold/30 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/math')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Shape Sort</div>
        <div className="font-nunito text-sm text-midnight/60">{current + 1} / {shapes.length}</div>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-5">
        <Stitch pose={stitchPose} size={80} />
        <div className="bg-white rounded-2xl px-5 py-3 shadow-md text-center">
          <p className="font-nunito text-lg text-midnight">{question.text}</p>
        </div>
        <div className="text-9xl">{shape.emoji}</div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {['A','B'].map(b => (
            <motion.button key={b}
              className="bg-white border-2 border-gray-200 font-fredoka text-2xl py-6 rounded-2xl shadow-md"
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(b)}
            >{b === 'A' ? question.catA : question.catB}</motion.button>
          ))}
        </div>
        {feedback && (
          <div className={`font-fredoka text-xl px-6 py-3 rounded-2xl
            ${feedback.type === 'correct' ? 'bg-grass/20 text-grass' : 'bg-coral/20 text-coral'}`}>
            {feedback.msg}
          </div>
        )}
      </div>
    </div>
  )
}
