import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import { CheckIcon, ArrowRightIcon } from '../../components/icons'
import { useSound } from '../../hooks/useSound'

export default function ReadAloudMode({ story, onComplete }) {
  const [page, setPage] = useState(0)
  const [highlightWord, setHighlightWord] = useState(-1)
  const [showQuestions, setShowQuestions] = useState(false)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [stitchPose, setStitchPose] = useState('idle')
  const { correct: playCorrect, wrong: playWrong, storyComplete } = useSound(true)

  const isLastPage = page === story.text.length - 1

  const handleWordTap = (i) => {
    setHighlightWord(i === highlightWord ? -1 : i)
  }

  const handleNext = () => {
    if (isLastPage) {
      setShowQuestions(true)
    } else {
      setPage(p => p + 1)
      setHighlightWord(-1)
    }
  }

  const handleAnswer = (qIdx, answerIdx) => {
    setAnswers(prev => ({ ...prev, [qIdx]: answerIdx }))
  }

  const handleSubmitAnswers = () => {
    setSubmitted(true)
    const score = story.questions.filter((q, i) => answers[i] === q.correct).length
    const pct = Math.round((score / story.questions.length) * 100)
    const perfect = pct === 100
    storyComplete()
    setStitchPose('dance')
    setTimeout(() => onComplete(pct, perfect), 2000)
  }

  if (showQuestions) {
    const allAnswered = Object.keys(answers).length === story.questions.length
    const score = submitted ? story.questions.filter((q, i) => answers[i] === q.correct).length : 0

    return (
      <ActivityScene
        subject="reading" title="What do you think?" backRoute="/learn/reading"
        stitchPose={stitchPose} stitchSize={88}
        message={submitted
          ? `${score}/${story.questions.length} correct! ${score === story.questions.length ? 'Stitch is SO proud!' : 'Good try!'}`
          : 'Answer the questions about the story!'}>

        <div className="flex flex-col gap-5 max-w-lg mx-auto">
          {story.questions.map((q, qi) => (
            <div key={qi} className="glass-strong rounded-2xl p-5">
              <p className="font-fredoka text-white text-lg mb-3 text-shadow-soft">{qi + 1}. {q.question}</p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => {
                  const sel = answers[qi] === oi
                  const correct = q.correct === oi
                  let cls = 'bg-white/85 text-midnight border-transparent'
                  if (submitted) {
                    if (correct) cls = 'bg-grass text-white border-white'
                    else if (sel && !correct) cls = 'bg-coral text-white border-white'
                  } else if (sel) {
                    cls = 'bg-white text-ocean border-ocean'
                  }
                  return (
                    <motion.button key={oi}
                      className={`border-2 rounded-xl px-4 py-3 text-left instruction-text font-700 ${cls}`}
                      whileTap={{ scale: submitted ? 1 : 0.97 }}
                      onClick={() => !submitted && handleAnswer(qi, oi)}>{opt}</motion.button>
                  )
                })}
              </div>
            </div>
          ))}

          {!submitted && (
            <motion.button
              className={`btn-primary w-full flex items-center justify-center gap-2 ${!allAnswered ? 'opacity-50' : ''}`}
              style={{ background: 'linear-gradient(135deg,#56C271,#2E7D32)' }}
              disabled={!allAnswered} whileTap={{ scale: 0.95 }} onClick={handleSubmitAnswers}>
              <CheckIcon size={24} circle={false} /> Check my answers!
            </motion.button>
          )}
        </div>
      </ActivityScene>
    )
  }

  const sentence = story.text[page]
  const words = sentence.split(' ')

  return (
    <ActivityScene
      subject="reading" title={story.title} backRoute="/learn/reading"
      current={page} total={story.text.length} showStitch={false}>

      <div className="flex flex-col items-center gap-5 max-w-lg mx-auto">
        <div className="text-7xl mt-1">{story.illustration}</div>

        {/* Storybook page */}
        <AnimatePresence mode="wait">
          <motion.div key={page}
            className="rounded-3xl p-8 shadow-card w-full"
            style={{ background: 'linear-gradient(160deg,#FFFDF6,#FBF3DD)', border: '3px solid #E0CE96' }}
            initial={{ opacity: 0, rotateY: 30 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -30 }} transition={{ duration: 0.3 }}>
            <p className="reading-text flex flex-wrap gap-2 justify-center">
              {words.map((word, i) => (
                <motion.span key={i}
                  className={`cursor-pointer rounded-lg px-1 transition-colors
                    ${highlightWord === i ? 'bg-gold text-midnight' : 'text-midnight'}`}
                  whileTap={{ scale: 0.95 }} onClick={() => handleWordTap(i)}>{word}</motion.span>
              ))}
            </p>
            <p className="font-nunito text-xs text-midnight/40 text-center mt-4">Tap words to highlight them</p>
          </motion.div>
        </AnimatePresence>

        <motion.button
          className="btn-primary w-full flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg,#56C271,#2E7D32)' }}
          whileTap={{ scale: 0.95 }} onClick={handleNext}>
          {isLastPage ? 'Answer Questions!' : <>Next Page <ArrowRightIcon size={22} /></>}
        </motion.button>
      </div>
    </ActivityScene>
  )
}
