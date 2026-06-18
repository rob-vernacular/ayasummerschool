import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { useNavigate } from 'react-router-dom'

export default function ReadAloudMode({ story, onComplete }) {
  const navigate = useNavigate()
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
      <div className="min-h-screen bg-gradient-to-b from-grass/20 to-green-50 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-white/50">
          <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-grass/30 text-2xl"
            whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/reading')}>←</motion.button>
          <div className="font-fredoka text-xl text-midnight">Comprehension</div>
          <div className="font-nunito text-sm text-midnight/60">{story.title}</div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <div className="flex items-center gap-3 mb-6">
            <Stitch pose={stitchPose} size={80} />
            <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
              <p className="font-nunito text-sm text-midnight">
                {submitted
                  ? `${score}/${story.questions.length} correct! ${score === story.questions.length ? 'Stitch is SO proud!' : 'Good try!'}`
                  : 'Answer the questions about the story!'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {story.questions.map((q, qi) => (
              <div key={qi} className="bg-white rounded-2xl p-5 shadow-md">
                <p className="font-nunito font-700 text-midnight text-lg mb-3">{qi + 1}. {q.question}</p>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, oi) => {
                    const sel = answers[qi] === oi
                    const correct = q.correct === oi
                    let cls = 'bg-gray-50 border-gray-200 text-midnight'
                    if (submitted) {
                      if (correct) cls = 'bg-grass/20 border-grass text-grass'
                      else if (sel && !correct) cls = 'bg-coral/20 border-coral text-coral'
                    } else if (sel) {
                      cls = 'bg-ocean/20 border-ocean text-ocean'
                    }
                    return (
                      <motion.button key={oi}
                        className={`border-2 rounded-xl px-4 py-3 text-left font-nunito text-base ${cls}`}
                        whileTap={{ scale: submitted ? 1 : 0.97 }}
                        onClick={() => !submitted && handleAnswer(qi, oi)}
                      >{opt}</motion.button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {!submitted && (
            <motion.button
              className={`w-full mt-6 bg-grass text-white font-fredoka text-2xl py-5 rounded-2xl shadow-lg
                ${!allAnswered ? 'opacity-50' : ''}`}
              disabled={!allAnswered}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmitAnswers}
            >Check my answers! ✅</motion.button>
          )}
        </div>
      </div>
    )
  }

  const sentence = story.text[page]
  const words = sentence.split(' ')

  return (
    <div className="min-h-screen bg-gradient-to-b from-grass/20 to-green-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-grass/30 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/reading')}>←</motion.button>
        <div className="font-fredoka text-lg text-midnight">{story.title}</div>
        <div className="font-nunito text-sm text-midnight/60">{page + 1} / {story.text.length}</div>
      </div>

      {/* Page progress */}
      <div className="w-full bg-gray-200 h-2">
        <div className="bg-grass h-2 transition-all" style={{ width: `${((page + 1) / story.text.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-6">
        {/* Story illustration */}
        <div className="text-8xl">{story.illustration}</div>

        {/* Text with word tap */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="bg-white rounded-3xl p-8 shadow-xl w-full max-w-lg"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-nunito leading-loose flex flex-wrap gap-2 justify-center" style={{ fontSize: 26 }}>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className={`cursor-pointer rounded-lg px-1 transition-colors
                    ${highlightWord === i ? 'bg-gold/50 text-midnight' : 'text-midnight'}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWordTap(i)}
                >
                  {word}
                </motion.span>
              ))}
            </p>
            <p className="font-nunito text-xs text-midnight/30 text-center mt-4">Tap words to highlight them</p>
          </motion.div>
        </AnimatePresence>

        <Stitch pose="idle" size={80} />

        {/* Next button */}
        <motion.button
          className="w-full max-w-sm bg-grass text-white font-fredoka text-2xl py-5 rounded-2xl shadow-lg"
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
        >
          {isLastPage ? 'Answer Questions! 🧠' : 'Next Page →'}
        </motion.button>
      </div>
    </div>
  )
}
