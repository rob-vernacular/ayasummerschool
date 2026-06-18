import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { useNavigate } from 'react-router-dom'

// Letter order by stroke complexity
const LETTER_ORDER = ['l','i','t','u','j','e','f','k','h','b','p','r','n','m','a','d','g','q','c','o','s','v','w','x','y','z']

function LetterCanvas({ letter, onComplete }) {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [strokes, setStrokes] = useState([])
  const [currentPath, setCurrentPath] = useState([])
  const [done, setDone] = useState(false)
  const lastPos = useRef(null)

  useEffect(() => {
    drawLetter()
  }, [letter])

  const drawLetter = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw dotted guide letter
    ctx.font = 'bold 220px Fredoka One, cursive'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Create dotted effect
    ctx.save()
    ctx.globalAlpha = 0.15
    ctx.fillStyle = '#1B6CA8'
    ctx.fillText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2)
    ctx.restore()

    // Stroke guide
    ctx.save()
    ctx.globalAlpha = 0.4
    ctx.strokeStyle = '#4FC3F7'
    ctx.lineWidth = 3
    ctx.setLineDash([8, 6])
    ctx.strokeText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2)
    ctx.restore()

    // Redraw user strokes
    for (const path of strokes) {
      if (path.length < 2) continue
      ctx.beginPath()
      ctx.moveTo(path[0].x, path[0].y)
      for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y)
      ctx.strokeStyle = '#FF6B6B'
      ctx.lineWidth = 8
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.setLineDash([])
      ctx.stroke()
    }
  }

  useEffect(() => { drawLetter() }, [strokes, letter])

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const touch = e.touches?.[0] || e
    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY
    }
  }

  const handleStart = (e) => {
    e.preventDefault()
    setDrawing(true)
    const pos = getPos(e)
    setCurrentPath([pos])
    lastPos.current = pos
  }

  const handleMove = (e) => {
    e.preventDefault()
    if (!drawing) return
    const pos = getPos(e)
    setCurrentPath(prev => {
      const next = [...prev, pos]
      // Draw live
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = '#FF6B6B'
      ctx.lineWidth = 8
      ctx.lineCap = 'round'
      ctx.setLineDash([])
      ctx.stroke()
      lastPos.current = pos
      return next
    })
  }

  const handleEnd = (e) => {
    e.preventDefault()
    setDrawing(false)
    if (currentPath.length > 0) {
      setStrokes(prev => {
        const next = [...prev, currentPath]
        if (next.length >= 1) setDone(true)
        return next
      })
      setCurrentPath([])
    }
  }

  const handleClear = () => {
    setStrokes([])
    setDone(false)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={300}
        height={280}
        className="border-3 border-ocean/30 rounded-2xl bg-sand/50 w-full max-w-[300px]"
        style={{ touchAction: 'none', cursor: 'crosshair' }}
        onPointerDown={handleStart}
        onPointerMove={handleMove}
        onPointerUp={handleEnd}
        onPointerLeave={handleEnd}
      />
      <div className="flex gap-3">
        <motion.button
          className="bg-gray-100 text-midnight font-fredoka text-base px-5 py-3 rounded-xl"
          whileTap={{ scale: 0.95 }}
          onClick={handleClear}
        >Clear ✗</motion.button>
        {done && (
          <motion.button
            className="bg-grass text-white font-fredoka text-base px-5 py-3 rounded-xl"
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            onClick={onComplete}
          >Done! ✨</motion.button>
        )}
      </div>
    </div>
  )
}

export default function TraceAndWrite({ onComplete }) {
  const navigate = useNavigate()
  const [letterIdx, setLetterIdx] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [stitchPose, setStitchPose] = useState('idle')
  const [done, setDone] = useState(false)
  const { correct: playCorrect, storyComplete } = useSound(true)

  const TOTAL = 6
  const letter = LETTER_ORDER[letterIdx % LETTER_ORDER.length]

  const handleLetterDone = () => {
    playCorrect()
    setStitchPose('happy')
    setCompleted(c => c + 1)
    setTimeout(() => {
      setStitchPose('idle')
      if (completed + 1 >= TOTAL) {
        storyComplete()
        setDone(true)
      } else {
        setLetterIdx(i => i + 1)
      }
    }, 1000)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ocean/20 to-blue-50 flex flex-col items-center justify-center p-6">
        <Stitch pose="dance" size={160} />
        <h2 className="font-fredoka text-4xl text-ocean mt-4">Great Writing!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">You traced {TOTAL} letters perfectly!</p>
        <motion.button
          className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl"
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(100, true)}
        >Collect 85 XP! ⭐</motion.button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean/20 to-blue-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-ocean/20 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/writing')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Trace & Write</div>
        <div className="font-nunito text-sm text-midnight/60">{completed} / {TOTAL}</div>
      </div>

      <div className="w-full bg-gray-200 h-2">
        <div className="bg-ocean h-2 transition-all" style={{ width: `${(completed / TOTAL) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 gap-4">
        <div className="flex items-center gap-4">
          <Stitch pose={stitchPose} size={80} />
          <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
            <p className="font-nunito text-sm text-midnight">
              Trace the letter <strong className="font-fredoka text-2xl text-ocean">{letter.toUpperCase()}</strong> with your finger!
            </p>
          </div>
        </div>

        <div className="font-fredoka text-4xl text-ocean">
          Letter: <span className="text-5xl">{letter.toUpperCase()}</span>
          <span className="text-midnight/30 ml-4 text-3xl">{letter}</span>
        </div>

        <LetterCanvas key={letter} letter={letter} onComplete={handleLetterDone} />

        {/* Progress dots */}
        <div className="flex gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full transition-colors
              ${i < completed ? 'bg-grass' : i === completed ? 'bg-ocean' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
