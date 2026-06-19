import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { CheckIcon } from '../../components/icons'
import { useSound } from '../../hooks/useSound'

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
      <CompletionScreen subject="writing" title="Scramble Master!" score={score} total={rounds.length}
        perfect={perfect} xp={perfect ? 85 : 70} buttonLabel={`Collect ${perfect ? 85 : 70} XP!`}
        onCollect={() => onComplete(pct, perfect)} />
    )
  }

  const round = rounds[current]

  return (
    <ActivityScene
      subject="writing" title="Sentence Scramble" backRoute="/learn/writing"
      current={current} total={rounds.length}
      stitchPose={stitchPose} stitchSize={84}
      message="Stitch spilled his word tiles! Put them in order.">

      <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
        {/* Banner that unfurls */}
        <motion.div
          className="min-h-[72px] w-full rounded-2xl p-4 flex flex-wrap gap-2 items-center justify-center"
          style={{ background: 'linear-gradient(160deg,#FFF7E0,#F0DFB0)', border: '3px solid #C9A24B', boxShadow: 'var(--shadow-card)' }}
          animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}>
          {placed.length === 0 && (
            <span className="font-nunito font-700 text-[#9a7a3a] text-sm w-full text-center">Tap the bamboo tiles below to build the sentence</span>
          )}
          {placed.map(tile => (
            <motion.button key={tile.id}
              className="text-white font-fredoka text-lg px-4 py-2 rounded-xl shadow-sm"
              style={{ background: 'linear-gradient(160deg,#9C5FD0,#7B1FA2)' }}
              whileTap={{ scale: 0.9 }} layout onClick={() => handleRemove(tile)}>{tile.word}</motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          {showHint && (
            <motion.div className="glass rounded-xl px-4 py-2 text-sm font-nunito font-700 text-white text-shadow-soft"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Hint: "{round.answer[0]} {round.answer[1]}..."
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bamboo tiles */}
        <div className="flex flex-wrap gap-3 justify-center w-full">
          {available.map(tile => (
            <motion.button key={tile.id}
              className="font-fredoka text-xl px-5 py-3 rounded-xl shadow-card text-[#5a4322]"
              style={{ background: 'linear-gradient(160deg,#E8D9A8,#C9B273)', border: '2px solid #A8924f' }}
              whileTap={{ scale: 0.9 }} layout onClick={() => handleTile(tile)}>{tile.word}</motion.button>
          ))}
        </div>

        {placed.length === round.words.length && (
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
