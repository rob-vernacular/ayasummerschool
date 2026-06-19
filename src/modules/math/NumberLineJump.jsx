import { useState } from 'react'
import { motion } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { CheckIcon } from '../../components/icons'
import { useSound } from '../../hooks/useSound'
import { MATH_TOPICS } from '../../data/mathTopics'

const problems = MATH_TOPICS[1].problems

export default function NumberLineJump({ onComplete }) {
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
      <CompletionScreen subject="math" title="Math Star!" score={score} total={total}
        perfect={perfect} xp={perfect ? 55 : 40} buttonLabel={`Collect ${perfect ? 55 : 40} XP!`}
        onCollect={() => onComplete(pct, perfect)} />
    )
  }

  return (
    <ActivityScene
      subject="math" title="Number Line Jump" backRoute="/learn/math"
      current={idx} total={total}
      stitchPose={stitchPose} stitchSize={84}
      message={feedback ? feedback.msg : `Help Stitch jump! What is ${p.a} + ${p.b}?`}>

      <div className="flex flex-col items-center gap-5 max-w-sm mx-auto">
        <div className="glass-strong rounded-3xl p-6 w-full text-center">
          <div className="font-fredoka text-5xl text-white text-shadow-soft mb-2">{p.a} + {p.b} = ?</div>
          <div className="flex flex-wrap gap-1 justify-center my-2">
            {Array.from({ length: p.a }).map((_, i) => <span key={`a-${i}`} className="text-2xl">{p.emoji[0]}</span>)}
            <span className="font-fredoka text-2xl text-white mx-2">+</span>
            {Array.from({ length: p.b }).map((_, i) => <span key={`b-${i}`} className="text-2xl">{p.emoji[1] || p.emoji[0]}</span>)}
          </div>
        </div>

        <input
          type="number" value={answer} onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()} placeholder="?" min="0" max="40"
          className="font-fredoka text-5xl text-center bg-white border-4 border-white rounded-2xl py-4 w-32
            focus:outline-none focus:border-gold text-midnight" />

        <div className="grid grid-cols-5 gap-2 w-full max-w-xs">
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(n => (
            <motion.button key={n}
              className={`py-3 rounded-xl font-fredoka text-lg
                ${answer == n ? 'bg-gold text-[#6b4a12]' : 'bg-white/85 text-midnight'}`}
              whileTap={{ scale: 0.9 }} onClick={() => setAnswer(String(n))}>{n}</motion.button>
          ))}
        </div>

        {answer && !feedback && (
          <motion.button
            className="btn-primary w-full flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#56C271,#2E7D32)' }}
            whileTap={{ scale: 0.95 }} onClick={handleSubmit}>
            <CheckIcon size={24} circle={false} /> Check!
          </motion.button>
        )}
      </div>
    </ActivityScene>
  )
}
