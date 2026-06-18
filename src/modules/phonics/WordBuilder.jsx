import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { useNavigate } from 'react-router-dom'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function WordBuilder({ level, onComplete }) {
  const navigate = useNavigate()
  const [words, setWords] = useState([])
  const [current, setCurrent] = useState(0)
  const [built, setBuilt] = useState([])
  const [available, setAvailable] = useState([])
  const [stitchPose, setStitchPose] = useState('idle')
  const [shake, setShake] = useState(false)
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  useEffect(() => {
    const w = shuffle(level.words).slice(0, 8)
    setWords(w)
    setupWord(w[0])
  }, [level])

  const setupWord = (word) => {
    const letters = word.split('').map((l, i) => ({ id: `${l}-${i}`, char: l }))
    const extras = shuffle('abcdefghijklmnopqrstuvwxyz'.split('')
      .filter(c => !word.includes(c))).slice(0, 4)
      .map((l, i) => ({ id: `extra-${l}-${i}`, char: l }))
    setAvailable(shuffle([...letters, ...extras]))
    setBuilt(Array(word.length).fill(null))
    setSubmitted(false)
  }

  const word = words[current]
  if (!word) return null

  const handleTile = (tile) => {
    if (submitted) return
    // Find first empty slot
    const emptyIndex = built.findIndex(b => b === null)
    if (emptyIndex === -1) return
    const newBuilt = [...built]
    newBuilt[emptyIndex] = tile
    setBuilt(newBuilt)
    setAvailable(prev => prev.filter(t => t.id !== tile.id))
  }

  const handleRemove = (i) => {
    if (submitted) return
    const tile = built[i]
    if (!tile) return
    const newBuilt = [...built]
    newBuilt[i] = null
    setBuilt(newBuilt)
    setAvailable(prev => [...prev, tile])
  }

  const handleSubmit = () => {
    if (built.some(b => b === null)) return
    const attempt = built.map(b => b.char).join('')
    if (attempt === word) {
      playCorrect()
      setStitchPose('happy')
      setSubmitted(true)
      setScore(s => s + 1)
      setTimeout(() => {
        setStitchPose('idle')
        if (current + 1 >= words.length) { storyComplete(); setDone(true) }
        else { setCurrent(c => c + 1); setupWord(words[current + 1]) }
      }, 1200)
    } else {
      playWrong()
      setShake(true)
      setStitchPose('sad')
      setTimeout(() => {
        setShake(false)
        setStitchPose('idle')
        // Reset
        setupWord(word)
      }, 800)
    }
  }

  if (done) {
    const pct = Math.round((score / words.length) * 100)
    const perfect = score === words.length
    return (
      <div className="min-h-screen bg-gradient-to-b from-coral/20 to-red-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-coral mt-4">Words Built!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">{score}/{words.length} correct</p>
        <motion.button
          className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl shadow-lg"
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(pct, perfect)}
        >Collect {perfect ? 65 : 50} XP! ⭐</motion.button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-coral/20 to-red-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-coral/20 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/phonics')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Word Builder</div>
        <div className="font-nunito text-sm text-midnight/60">{current + 1} / {words.length}</div>
      </div>

      <div className="w-full bg-gray-200 h-2">
        <div className="bg-coral h-2 transition-all" style={{ width: `${((current + 1) / words.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-6">
        <div className="flex items-center gap-4">
          <Stitch pose={stitchPose} size={80} />
          <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
            <p className="font-nunito text-sm text-midnight">
              Build the word for: <span className="font-fredoka text-2xl text-ocean">{level.pictures?.[word] || '📝'}</span>
            </p>
          </div>
        </div>

        {/* Picture clue */}
        <div className="text-8xl">{level.pictures?.[word] || '📝'}</div>

        {/* Built word slots */}
        <motion.div
          className="flex gap-3 justify-center"
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {built.map((tile, i) => (
            <motion.button key={i}
              className={`w-14 h-14 rounded-xl border-3 flex items-center justify-center
                font-fredoka text-2xl text-midnight
                ${tile ? 'bg-sky/30 border-ocean' : 'bg-white border-dashed border-gray-300'}`}
              whileTap={{ scale: tile ? 0.9 : 1 }}
              onClick={() => tile && handleRemove(i)}
              animate={tile && submitted ? { backgroundColor: '#56C271', color: 'white' } : {}}
            >
              {tile?.char.toUpperCase() || ''}
            </motion.button>
          ))}
        </motion.div>

        {/* Available tiles */}
        <div className="flex flex-wrap gap-3 justify-center">
          {available.map(tile => (
            <motion.button key={tile.id}
              className="w-14 h-14 bg-ocean text-white rounded-xl font-fredoka text-2xl shadow-md"
              whileTap={{ scale: 0.9 }}
              layout
              onClick={() => handleTile(tile)}
            >
              {tile.char.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* Submit button */}
        {!built.some(b => b === null) && !submitted && (
          <motion.button
            className="bg-grass text-white font-fredoka text-2xl px-10 py-4 rounded-2xl shadow-lg w-full max-w-sm"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSubmit}
          >Check! ✅</motion.button>
        )}
      </div>
    </div>
  )
}
