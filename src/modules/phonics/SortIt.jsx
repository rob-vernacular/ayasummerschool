import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { useSound } from '../../hooks/useSound'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function SortIt({ level, onComplete }) {
  const [words, setWords] = useState([])
  const [sortedA, setSortedA] = useState([])
  const [sortedB, setSortedB] = useState([])
  const [currentWord, setCurrentWord] = useState(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [done, setDone] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const [feedback, setFeedback] = useState(null)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  const catA = level.sortCategories?.[0] || { label: 'Group A', words: level.words.slice(0, 5) }
  const catB = level.sortCategories?.[1] || { label: 'Group B', words: level.words.slice(5, 10) }

  useEffect(() => {
    const allWords = shuffle([...catA.words, ...catB.words]).slice(0, 8)
    setWords(allWords)
    setTotal(allWords.length)
    setCurrentWord(allWords[0])
  }, [level])

  const remaining = words.filter(w => !sortedA.includes(w) && !sortedB.includes(w))

  const handleSort = (bucket) => {
    if (!currentWord) return
    const isCorrect = bucket === 'A'
      ? catA.words.includes(currentWord)
      : catB.words.includes(currentWord)

    if (isCorrect) {
      playCorrect()
      setScore(s => s + 1)
      setStitchPose('happy')
      if (bucket === 'A') setSortedA(prev => [...prev, currentWord])
      else setSortedB(prev => [...prev, currentWord])
      setFeedback({ type: 'correct', msg: ['Yes!', 'Right!', 'Great sort!'][Math.floor(Math.random()*3)] })
    } else {
      playWrong()
      setStitchPose('sad')
      setFeedback({ type: 'wrong', msg: ['Not quite!', 'Try again!', 'Almost!'][Math.floor(Math.random()*3)] })
    }

    setTimeout(() => {
      setFeedback(null)
      setStitchPose('idle')
      const nextWords = remaining.filter(w => w !== currentWord)
      if (isCorrect) {
        if (nextWords.length === 0) { storyComplete(); setDone(true) }
        else setCurrentWord(nextWords[0])
      }
    }, 900)
  }

  if (done) {
    const pct = Math.round((score / total) * 100)
    const perfect = score === total
    return (
      <CompletionScreen subject="phonics" title="All Sorted!" score={score} total={total}
        perfect={perfect} xp={perfect ? 65 : 50} onCollect={() => onComplete(pct, perfect)} />
    )
  }

  if (!currentWord) return null

  return (
    <ActivityScene
      subject="phonics" title="Sort It!" backRoute="/learn/phonics"
      current={total - remaining.length} total={total}
      stitchPose={stitchPose} stitchSize={84}
      message={feedback ? feedback.msg : 'Which treasure chest does this word belong in?'}>

      <div className="flex flex-col items-center gap-5 max-w-sm mx-auto">
        {/* Word on a coin */}
        <motion.div key={currentWord}
          className="font-fredoka text-4xl text-[#6b4a12] px-10 py-6 rounded-full shadow-card"
          style={{ background: 'radial-gradient(circle at 38% 32%, #FFE9A8, #E6B53C)', border: '4px solid #C9962B' }}
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          {currentWord}
        </motion.div>

        {/* Treasure chests */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {[
            { bucket: 'A', cat: catA, words: sortedA, grad: 'linear-gradient(160deg,#4FC3F7,#1B6CA8)' },
            { bucket: 'B', cat: catB, words: sortedB, grad: 'linear-gradient(160deg,#8FE0A6,#2E7D32)' },
          ].map(({ bucket, cat, words: sw, grad }) => (
            <motion.button key={bucket}
              className="text-white rounded-2xl p-4 min-h-[150px] flex flex-col items-center justify-between shadow-card"
              style={{ background: grad, border: '3px solid rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.95 }} onClick={() => handleSort(bucket)}>
              <span className="font-fredoka text-lg text-shadow-soft">{cat.label}</span>
              <div className="flex flex-wrap gap-1 justify-center">
                {sw.map(w => <span key={w} className="bg-white/30 rounded px-2 py-0.5 text-xs font-nunito font-700">{w}</span>)}
              </div>
              <span className="font-nunito font-700 text-sm opacity-90">{sw.length} words</span>
            </motion.button>
          ))}
        </div>
      </div>
    </ActivityScene>
  )
}
