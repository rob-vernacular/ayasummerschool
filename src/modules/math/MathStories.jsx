import { useState } from 'react'
import { motion } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { useNavigate } from 'react-router-dom'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const PROBLEMS = [
  { story: 'Stitch found 3 shells on the beach. Then he found 4 more. How many shells does he have?', a: 3, b: 4, op: '+', answer: 7, emoji: '🐚' },
  { story: 'Luna had 10 stars in the sky. 3 stars fell down. How many stars are left?', a: 10, b: 3, op: '-', answer: 7, emoji: '⭐' },
  { story: 'SpongeBob made 5 patties in the morning and 6 in the afternoon. How many patties total?', a: 5, b: 6, op: '+', answer: 11, emoji: '🍔' },
  { story: 'Stitch had 8 fish. He gave 3 to Luna. How many fish does Stitch have now?', a: 8, b: 3, op: '-', answer: 5, emoji: '🐟' },
  { story: 'There were 7 waves and then 5 more came. How many waves are there now?', a: 7, b: 5, op: '+', answer: 12, emoji: '🌊' },
  { story: 'Luna counted 15 flowers. She picked 6. How many flowers are still in the meadow?', a: 15, b: 6, op: '-', answer: 9, emoji: '🌸' },
  { story: 'SpongeBob has 4 friends and made 8 new ones. How many friends does he have now?', a: 4, b: 8, op: '+', answer: 12, emoji: '🧽' },
  { story: 'Stitch had 20 stickers. He gave 9 to Lilo. How many stickers does Stitch have left?', a: 20, b: 9, op: '-', answer: 11, emoji: '✨' },
]

export default function MathStories({ onComplete }) {
  const navigate = useNavigate()
  const [problems] = useState(() => shuffle(PROBLEMS).slice(0, 6))
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  const p = problems[idx]
  const options = shuffle([p.answer, p.answer + 2, p.answer - 1, p.answer + 5]).slice(0, 3)
  if (!options.includes(p.answer)) options[0] = p.answer

  const handleAnswer = (opt) => {
    if (selected !== null) return
    setSelected(opt)
    if (opt === p.answer) {
      playCorrect(); setStitchPose('happy'); setScore(s => s + 1)
    } else {
      playWrong(); setStitchPose('sad')
    }
    setTimeout(() => {
      setSelected(null); setStitchPose('idle')
      if (idx + 1 >= problems.length) { storyComplete(); setDone(true) }
      else setIdx(i => i + 1)
    }, 1300)
  }

  if (done) {
    const pct = Math.round((score / problems.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-b from-gold/20 to-yellow-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-yellow-700 mt-4">Math Story Hero!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">{score}/{problems.length} solved!</p>
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
        <div className="font-fredoka text-xl text-midnight">Math Stories</div>
        <div className="font-nunito text-sm text-midnight/60">{idx + 1} / {problems.length}</div>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-5">
        <Stitch pose={stitchPose} size={80} />
        <motion.div
          key={idx}
          className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-5xl text-center mb-4">{p.emoji}</div>
          <p className="font-nunito text-xl text-midnight leading-relaxed text-center" style={{ lineHeight: 1.7 }}>
            {p.story}
          </p>
          {/* Visual counters */}
          <div className="flex flex-wrap gap-1 justify-center mt-3">
            {Array.from({ length: Math.min(p.a, 10) }).map((_, i) => <span key={`a-${i}`} className="text-xl">{p.emoji}</span>)}
            {p.op === '-' && <span className="font-fredoka text-2xl text-coral mx-2">−</span>}
            {p.op === '+' && <span className="font-fredoka text-2xl text-grass mx-2">+</span>}
            {Array.from({ length: Math.min(p.b, 10) }).map((_, i) => (
              <span key={`b-${i}`} className={`text-xl ${p.op === '-' ? 'opacity-40' : ''}`}>{p.emoji}</span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
          {shuffle(options).map((opt, i) => {
            const isSel = selected === opt
            const isCorrect = opt === p.answer
            let cls = 'bg-white border-2 border-gray-200 text-midnight'
            if (isSel) cls = isCorrect ? 'bg-grass/20 border-grass text-grass' : 'bg-coral/20 border-coral text-coral'
            return (
              <motion.button key={i}
                className={`font-fredoka text-3xl py-6 rounded-2xl shadow-sm ${cls}`}
                whileTap={{ scale: selected ? 1 : 0.9 }}
                onClick={() => handleAnswer(opt)}
              >{opt}</motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
