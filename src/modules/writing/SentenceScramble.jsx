import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { useNavigate } from 'react-router-dom'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const SENTENCES = [
  { words: ['Stitch', 'likes', 'the', 'ocean', '.'], answer: ['Stitch', 'likes', 'the', 'ocean', '.'] },
  { words: ['Luna', 'can', 'fly', 'high', '.'], answer: ['Luna', 'can', 'fly', 'high', '.'] },
  { words: ['SpongeBob', 'made', 'a', 'sandwich', '.'], answer: ['SpongeBob', 'made', 'a', 'sandwich', '.'] },
  { words: ['I', 'love', 'to', 'read', '.'], answer: ['I', 'love', 'to', 'read', '.'] },
  { words: ['The', 'fish', 'swam', 'away', '.'], answer: ['The', 'fish', 'swam', 'away', '.'] },
  { words: ['Stitch', 'found', 'a', 'shell', '.'], answer: ['Stitch', 'found', 'a', 'shell', '.'] },
  { words: ['We', 'play', 'on', 'the', 'beach', '.'], answer: ['We', 'play', 'on', 'the', 'beach', '.'] },
  { words: ['Luna', 'has', 'a', 'golden', 'horn', '.'], answer: ['Luna', 'has', 'a', 'golden', 'horn', '.'] },
  { words: ['Stitch', 'said', 'hello', 'to', 'me', '.'], answer: ['Stitch', 'said', 'hello', 'to', 'me', '.'] },
  { words: ['The', 'star', 'fell', 'from', 'the', 'sky', '.'], answer: ['The', 'star', 'fell', 'from', 'the', 'sky', '.'] },
]

export default function SentenceScramble({ onComplete }) {
  const navigate = useNavigate()
  const [rounds, setRounds] = useState([])
  const [current, setCurrent] = useState(0)
  const [placed, setPlaced] = useState([])
  const [available, setAvailable] = useState([])
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const [shake, setShake] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintCount, setHintCount] = useState(0)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  useEffect(() => {
    const selected = shuffle(SENTENCES).slice(0, 6)
    setRounds(selected)
    setupRound(selected[0])
  }, [])

  const setupRound = (round) => {
    const tiles = shuffle(round.words).map((w, i) => ({ id: `${w}-${i}`, word: w }))
    setAvailable(tiles)
    setPlaced([])
    setShowHint(false)
    setHintCount(0)
  }

  const handleTile = (tile) => {
    setPlaced(prev => [...prev, tile])
    setAvailable(prev => prev.filter(t => t.id !== tile.id))
  }

  const handleRemove = (tile) => {
    setPlaced(prev => prev.filter(t => t.id !== tile.id))
    setAvailable(prev => [...prev, tile])
  }

  const handleCheck = () => {
    const attempt = placed.map(t => t.word).join(' ')
    const target = rounds[current].answer.join(' ')
    if (attempt === target) {
      playCorrect()
      setStitchPose('happy')
      setScore(s => s + 1)
      setTimeout(() => {
        setStitchPose('idle')
        if (current + 1 >= rounds.length) { storyComplete(); setDone(true) }
        else { setCurrent(c => c + 1); setupRound(rounds[current + 1]) }
      }, 1200)
    } else {
      playWrong()
      setStitchPose('sad')
      setShake(true)
      setHintCount(h => h + 1)
      if (hintCount >= 1) setShowHint(true)
      setTimeout(() => { setShake(false); setStitchPose('idle') }, 500)
    }
  }

  if (!rounds.length) return null

  if (done) {
    const pct = Math.round((score / rounds.length) * 100)
    const perfect = score === rounds.length
    return (
      <div className="min-h-screen bg-gradient-to-b from-ocean/20 to-blue-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-ocean mt-4">Scramble Master!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">{score}/{rounds.length} sentences!</p>
        <motion.button
          className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl"
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(pct, perfect)}
        >Collect {perfect ? 85 : 70} XP! ⭐</motion.button>
      </div>
    )
  }

  const round = rounds[current]

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean/20 to-blue-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-ocean/20 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/writing')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Sentence Scramble</div>
        <div className="font-nunito text-sm text-midnight/60">{current + 1} / {rounds.length}</div>
      </div>

      <div className="w-full bg-gray-200 h-2">
        <div className="bg-ocean h-2 transition-all" style={{ width: `${((current + 1) / rounds.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-4">
        <div className="flex items-center gap-3">
          <Stitch pose={stitchPose} size={80} />
          <div className="bg-white rounded-2xl px-4 py-3 shadow-md max-w-[200px]">
            <p className="font-nunito text-sm text-midnight">Put the words in the right order!</p>
          </div>
        </div>

        {/* Placed words */}
        <motion.div
          className="min-h-[70px] w-full bg-white rounded-2xl p-4 shadow-inner flex flex-wrap gap-2 items-center border-2 border-ocean/30"
          animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {placed.length === 0 && (
            <span className="font-nunito text-midnight/30 text-sm w-full text-center">Tap words below to build the sentence</span>
          )}
          {placed.map(tile => (
            <motion.button key={tile.id}
              className="bg-ocean text-white font-fredoka text-lg px-4 py-2 rounded-xl shadow-sm"
              whileTap={{ scale: 0.9 }}
              layout
              onClick={() => handleRemove(tile)}
            >{tile.word}</motion.button>
          ))}
        </motion.div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div className="bg-gold/20 rounded-xl px-4 py-2 text-sm font-nunito text-midnight/70"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Hint: "{round.answer[0]} {round.answer[1]}..."
            </motion.div>
          )}
        </AnimatePresence>

        {/* Available tiles */}
        <div className="flex flex-wrap gap-3 justify-center w-full">
          {available.map(tile => (
            <motion.button key={tile.id}
              className="bg-white border-2 border-ocean/50 text-midnight font-fredoka text-xl px-5 py-3 rounded-xl shadow-md"
              whileTap={{ scale: 0.9 }}
              layout
              onClick={() => handleTile(tile)}
            >{tile.word}</motion.button>
          ))}
        </div>

        {/* Check button */}
        {placed.length === round.words.length && (
          <motion.button
            className="w-full max-w-sm bg-grass text-white font-fredoka text-2xl py-5 rounded-2xl shadow-lg"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleCheck}
          >Check! ✅</motion.button>
        )}
      </div>
    </div>
  )
}
