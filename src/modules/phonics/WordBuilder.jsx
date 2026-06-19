import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { CheckIcon } from '../../components/icons'
import { useSound } from '../../hooks/useSound'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function WordBuilder({ level, onComplete }) {
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
      <CompletionScreen subject="phonics" title="Words Built!" score={score} total={words.length}
        perfect={perfect} xp={perfect ? 65 : 50} onCollect={() => onComplete(pct, perfect)} />
    )
  }

  return (
    <ActivityScene
      subject="phonics" title="Word Builder" backRoute="/learn/phonics"
      current={current} total={words.length}
      stitchPose={stitchPose} stitchSize={84}
      message="Build the word for this picture!">

      <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
        {/* Picture clue */}
        <div className="text-8xl">{level.pictures?.[word] || '📝'}</div>

        {/* Sandcastle wall slots */}
        <motion.div className="flex gap-3 justify-center"
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}} transition={{ duration: 0.4 }}>
          {built.map((tile, i) => (
            <motion.button key={i}
              className={`w-14 h-16 flex items-center justify-center font-fredoka text-2xl
                ${tile ? 'text-white' : 'text-midnight/40 border-dashed'}`}
              style={{ borderRadius: '8px 8px 4px 4px',
                background: tile ? (submitted ? '#56C271' : 'linear-gradient(160deg,#F0C987,#D4A35A)') : 'rgba(255,255,255,0.5)',
                border: tile ? '2px solid #B07D45' : '2px dashed rgba(0,0,0,0.25)' }}
              whileTap={{ scale: tile ? 0.9 : 1 }} onClick={() => tile && handleRemove(i)}>
              {tile?.char.toUpperCase() || ''}
            </motion.button>
          ))}
        </motion.div>

        {/* Letter flags */}
        <div className="flex flex-wrap gap-3 justify-center">
          {available.map(tile => (
            <motion.button key={tile.id}
              className="relative w-14 h-14 text-white rounded-xl font-fredoka text-2xl shadow-card"
              style={{ background: 'linear-gradient(160deg,#FF8E53,#FF6B6B)' }}
              whileTap={{ scale: 0.9 }} layout onClick={() => handleTile(tile)}>
              {tile.char.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {!built.some(b => b === null) && !submitted && (
          <motion.button
            className="btn-primary w-full flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#56C271,#2E7D32)' }}
            whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onClick={handleSubmit}>
            <CheckIcon size={24} circle={false} /> Check!
          </motion.button>
        )}
      </div>
    </ActivityScene>
  )
}
