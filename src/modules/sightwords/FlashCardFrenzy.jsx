import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { getSightWordMastery, updateSightWord } from '../../lib/db'
import { PRE_PRIMER, PRIMER } from '../../data/sightwords'
import { useNavigate } from 'react-router-dom'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const WORD_POOL = [...PRE_PRIMER, ...PRIMER]

export default function FlashCardFrenzy({ onComplete, profile }) {
  const navigate = useNavigate()
  const [words, setWords] = useState([])
  const [current, setCurrent] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const [timer, setTimer] = useState(5)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const timerRef = useRef(null)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  const SENTENCES = {
    a: 'I want a cat.', and: 'Stitch and Luna play.', the: 'The fish is blue.',
    is: 'Stitch is happy.', in: 'Stitch is in the ocean.', it: 'It is big!',
    can: 'Stitch can jump.', we: 'We love the beach.', said: 'Stitch said hello.',
    see: 'I can see the star.', look: 'Look at the fish!', go: 'Let us go!',
    to: 'I want to play.', up: 'Stitch went up.', come: 'Come with me!',
    my: 'This is my book.', you: 'I like you.', me: 'Come with me.',
    he: 'He is Stitch.', she: 'She is Luna.', was: 'It was fun.',
    they: 'They are friends.', have: 'I have a fish.', with: 'Play with me.',
    like: 'I like the beach.', run: 'Run to the waves!', play: 'Let us play.',
    want: 'I want to play.', big: 'Stitch is big.', little: 'Luna is little.',
    not: 'I can not fly.', for: 'This is for you.', make: 'Let us make a sandcastle.',
    help: 'Help me, please!', where: 'Where is Stitch?', what: 'What do you see?',
    here: 'Come here, friend!', there: 'The fish is there.', this: 'This is fun!',
    that: 'That is a big wave.', at: 'Look at the moon!', will: 'I will learn!',
  }

  useEffect(() => {
    getSightWordMastery(profile.id).then(mastery => {
      const masteredSet = new Set((mastery || []).filter(m => m.mastered).map(m => m.word))
      const unseenOrReview = WORD_POOL.filter(w => !masteredSet.has(w))
      const selected = shuffle(unseenOrReview).slice(0, 15)
      setWords(selected)
    })
  }, [profile.id])

  useEffect(() => {
    if (done || !words.length) return
    setTimer(5)
    setShowHelp(false)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); setShowHelp(true); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [current, words.length, done])

  const handleKnow = async () => {
    clearInterval(timerRef.current)
    playCorrect()
    setStitchPose('happy')
    setScore(s => s + 1)
    await updateSightWord(profile.id, words[current], true)
    next()
  }

  const handleHelp = async () => {
    clearInterval(timerRef.current)
    playWrong()
    setStitchPose('sad')
    await updateSightWord(profile.id, words[current], false)
    next()
  }

  const next = () => {
    setTimeout(() => {
      setStitchPose('idle')
      if (current + 1 >= words.length) { storyComplete(); setDone(true) }
      else setCurrent(c => c + 1)
    }, 800)
  }

  if (!words.length) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="font-fredoka text-2xl text-ocean animate-pulse">Loading words...</div>
    </div>
  )

  if (done) {
    const pct = Math.round((score / words.length) * 100)
    const perfect = pct === 100
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky/30 to-blue-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-ocean mt-4">Flash Card Frenzy Done!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">{score}/{words.length} words known!</p>
        {perfect && <p className="font-fredoka text-2xl text-gold mt-2">⭐ Amazing!</p>}
        <motion.button
          className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl"
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(pct, perfect)}
        >Collect {perfect ? 60 : 45} XP! ⭐</motion.button>
      </div>
    )
  }

  const word = words[current]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky/30 to-blue-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-sky/30 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/sight-words')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Flash Card Frenzy</div>
        <div className="font-nunito text-sm text-midnight/60">{current + 1} / {words.length}</div>
      </div>

      <div className="w-full bg-gray-200 h-2">
        <div className="bg-sky h-2 transition-all" style={{ width: `${((current + 1) / words.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-4">
        {/* Timer */}
        <div className="flex gap-2">
          {[5,4,3,2,1].map(t => (
            <div key={t} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-fredoka
              ${timer >= t ? 'bg-ocean text-white border-ocean' : 'bg-gray-100 border-gray-200 text-gray-300'}`}>{t}</div>
          ))}
        </div>

        {/* Stitch holding the card */}
        <Stitch pose={stitchPose} size={100} />

        {/* Word card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={word}
            className="bg-white rounded-3xl shadow-xl px-12 py-10 text-center w-full max-w-sm"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-fredoka text-6xl text-ocean">{word}</div>
          </motion.div>
        </AnimatePresence>

        {/* Help sentence */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              className="bg-sky/20 rounded-2xl px-5 py-4 text-center max-w-sm"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-nunito text-midnight/70 text-sm italic">
                "{SENTENCES[word] || `Stitch loves this ${word}!`}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-auto">
          <motion.button
            className="bg-grass text-white font-fredoka text-xl py-5 rounded-2xl shadow-lg"
            whileTap={{ scale: 0.95 }}
            onClick={handleKnow}
          >I know it! ✅</motion.button>
          <motion.button
            className="bg-coral text-white font-fredoka text-xl py-5 rounded-2xl shadow-lg"
            whileTap={{ scale: 0.95 }}
            onClick={handleHelp}
          >Help me 🙋</motion.button>
        </div>
      </div>
    </div>
  )
}
