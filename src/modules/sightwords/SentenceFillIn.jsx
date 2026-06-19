import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import SpeakerButton from '../../components/ui/SpeakerButton'
import { useSound } from '../../hooks/useSound'
import { useSpeech } from '../../hooks/useSpeech'
import SENTENCES from '../../data/sentences'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function SentenceFillIn({ onComplete, profile }) {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const [feedback, setFeedback] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)
  const { speakWord } = useSpeech()

  useEffect(() => {
    const qs = shuffle(SENTENCES).slice(0, 10)
    setQuestions(qs)
  }, [])

  if (!questions.length) return null

  const q = questions[current]

  const handleAnswer = (choice) => {
    if (selected) return
    speakWord(choice)
    setSelected(choice)
    if (choice === q.word) {
      playCorrect()
      setStitchPose('happy')
      setScore(s => s + 1)
      setFeedback({ type: 'correct', msg: ['Yes!', 'Perfect!', 'You got it!', 'Stitch cheers!'][Math.floor(Math.random()*4)] })
      setTimeout(() => {
        setFeedback(null); setSelected(null); setAttempts(0); setStitchPose('idle')
        if (current + 1 >= questions.length) { storyComplete(); setDone(true) }
        else setCurrent(c => c + 1)
      }, 1100)
    } else {
      playWrong()
      setStitchPose('sad')
      const a = attempts + 1
      setAttempts(a)
      setFeedback({ type: 'wrong', msg: ['Almost!', 'Try again!', 'So close!'][Math.floor(Math.random()*3)] })
      setTimeout(() => {
        setFeedback(null); setSelected(null); setStitchPose('idle')
        if (a >= 3) {
          if (current + 1 >= questions.length) { storyComplete(); setDone(true) }
          else { setCurrent(c => c + 1); setAttempts(0) }
        }
      }, 1000)
    }
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    const perfect = pct === 100
    return (
      <CompletionScreen subject="sightwords" title="Sentences Done!" score={score} total={questions.length}
        perfect={perfect} xp={perfect ? 60 : 45} buttonLabel={`Collect ${perfect ? 60 : 45} XP!`}
        onCollect={() => onComplete(pct, perfect)} />
    )
  }

  return (
    <ActivityScene
      subject="sightwords" title="Sentence Fill-In" backRoute="/learn/sight-words"
      current={current} total={questions.length}
      stitchPose={stitchPose} stitchSize={88}
      message={feedback ? feedback.msg : 'Read the letter and pick the right word!'}>

      <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
        {/* Letter on paper */}
        <motion.div key={current}
          className="w-full text-center p-6 rounded-2xl shadow-card"
          style={{ background: 'linear-gradient(160deg,#FFFDF2,#FDF3D0)', border: '2px solid #E3D08C',
            boxShadow: 'var(--shadow-card)' }}
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="flex justify-center mb-3">
            <SpeakerButton key={current} text={q.sentence.replace('___', ', ,')} mode="sentence" size="md" autoSpeak />
          </div>
          <p className="sentence-text text-midnight">
            {q.sentence.split('___').map((part, i) => (
              <span key={i}>
                {part}
                {i < q.sentence.split('___').length - 1 && (
                  <span className={`inline-block min-w-[5rem] border-b-[3px] mx-1 font-fredoka
                    ${selected === q.word ? 'text-grass-dark border-grass-dark' : 'text-ocean border-ocean'}`}>
                    {selected || '___'}
                  </span>
                )}
              </span>
            ))}
          </p>
        </motion.div>

        {/* Seashell choices */}
        <div className="flex gap-3 w-full justify-center flex-wrap">
          {q.choices.map(choice => {
            const isSelected = selected === choice
            const isCorrect = choice === q.word
            let bg = 'linear-gradient(160deg,#FFFFFF,#E6F4FF)', ring = 'rgba(0,0,0,0.08)', text = '#16202B'
            if (isSelected && isCorrect) { bg = 'linear-gradient(160deg,#C8F2D4,#8FE0A6)'; ring = '#56C271'; text = '#1B5E20' }
            if (isSelected && !isCorrect) { bg = 'linear-gradient(160deg,#FFD6D6,#FFA9A9)'; ring = '#E53935'; text = '#B71C1C' }
            return (
              <motion.button key={choice}
                className="activity-word answer-card flex-1 shadow-card"
                style={{ background: bg, color: text, border: `3px solid ${ring}`, borderRadius: '46% 46% 50% 50% / 60% 60% 40% 40%' }}
                whileTap={{ scale: selected ? 1 : 0.92 }}
                animate={isSelected && !isCorrect ? { x: [-5, 5, -3, 3, 0] } : {}}
                onClick={() => handleAnswer(choice)}>{choice}</motion.button>
            )
          })}
        </div>
      </div>
    </ActivityScene>
  )
}
