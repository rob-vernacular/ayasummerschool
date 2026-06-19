import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { useSound } from '../../hooks/useSound'

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
      <CompletionScreen subject="writing" title="Great Writing!" score={TOTAL} total={TOTAL}
        perfect xp={85} buttonLabel="Collect 85 XP!" onCollect={() => onComplete(100, true)} />
    )
  }

  return (
    <ActivityScene
      subject="writing" title="Trace & Write" backRoute="/learn/writing"
      current={completed} total={TOTAL}
      stitchPose={stitchPose} stitchSize={84}
      message={`Trace the letter "${letter.toUpperCase()}" on the chalkboard with your finger!`}>

      <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
        <div className="font-fredoka text-3xl text-white text-shadow-soft">
          {letter.toUpperCase()} <span className="text-white/60 ml-2">{letter}</span>
        </div>

        <LetterCanvas key={letter} letter={letter} onComplete={handleLetterDone} />

        <div className="flex gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full transition-colors
              ${i < completed ? 'bg-white' : i === completed ? 'bg-white/60' : 'bg-white/25'}`} />
          ))}
        </div>
      </div>
    </ActivityScene>
  )
}
