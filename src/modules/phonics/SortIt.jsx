import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { useNavigate } from 'react-router-dom'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function SortIt({ level, onComplete }) {
  const navigate = useNavigate()
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
      <div className="min-h-screen bg-gradient-to-b from-coral/20 to-red-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-coral mt-4">All Sorted!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">{score}/{total} correct</p>
        <motion.button
          className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl shadow-lg"
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(pct, perfect)}
        >Collect {perfect ? 65 : 50} XP! ⭐</motion.button>
      </div>
    )
  }

  if (!currentWord) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-coral/20 to-red-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-coral/20 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/phonics')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Sort It!</div>
        <div className="font-nunito text-sm text-midnight/60">{total - remaining.length + 1} / {total}</div>
      </div>

      <div className="w-full bg-gray-200 h-2">
        <div className="bg-coral h-2 transition-all" style={{ width: `${((total - remaining.length) / total) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-4">
        <div className="flex items-center gap-3">
          <Stitch pose={stitchPose} size={80} />
          <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
            <p className="font-nunito text-sm text-midnight">Which group does this word belong to?</p>
          </div>
        </div>

        {/* Current word */}
        <motion.div
          key={currentWord}
          className="bg-ocean text-white font-fredoka text-5xl px-10 py-6 rounded-3xl shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {currentWord}
        </motion.div>

        {/* Bucket buttons */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {[
            { bucket: 'A', cat: catA, words: sortedA, color: 'from-blue-400 to-ocean' },
            { bucket: 'B', cat: catB, words: sortedB, color: 'from-grass to-green-600' },
          ].map(({ bucket, cat, words: sw, color }) => (
            <motion.button key={bucket}
              className={`bg-gradient-to-br ${color} text-white rounded-2xl p-4 min-h-[140px]
                flex flex-col items-center justify-between shadow-lg`}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort(bucket)}
            >
              <span className="font-fredoka text-lg">{cat.label}</span>
              <div className="flex flex-wrap gap-1 justify-center">
                {sw.map(w => (
                  <span key={w} className="bg-white/30 rounded px-2 py-1 text-xs font-nunito">{w}</span>
                ))}
              </div>
              <span className="font-nunito text-sm opacity-80">{sw.length} words</span>
            </motion.button>
          ))}
        </div>

        {/* Feedback */}
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
