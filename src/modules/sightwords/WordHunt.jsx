import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import { useSound } from '../../hooks/useSound'
import { PRE_PRIMER } from '../../data/sightwords'
import { useNavigate } from 'react-router-dom'

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

const GRID_W = 8, GRID_H = 6

function createGrid(words) {
  const grid = Array.from({ length: GRID_H }, () =>
    Array.from({ length: GRID_W }, () => '')
  )
  const placed = []
  const targetWords = words.slice(0, 3)

  for (const word of targetWords) {
    let tries = 0
    let success = false
    while (tries < 50 && !success) {
      tries++
      const horizontal = Math.random() > 0.5
      let r, c
      if (horizontal) {
        r = Math.floor(Math.random() * GRID_H)
        c = Math.floor(Math.random() * (GRID_W - word.length + 1))
      } else {
        r = Math.floor(Math.random() * (GRID_H - word.length + 1))
        c = Math.floor(Math.random() * GRID_W)
      }
      // Check if fits
      let fits = true
      const cells = []
      for (let i = 0; i < word.length; i++) {
        const tr = horizontal ? r : r + i
        const tc = horizontal ? c + i : c
        if (grid[tr][tc] !== '' && grid[tr][tc] !== word[i]) { fits = false; break }
        cells.push([tr, tc])
      }
      if (fits) {
        for (let i = 0; i < word.length; i++) {
          const [tr, tc] = cells[i]
          grid[tr][tc] = word[i]
        }
        placed.push({ word, cells })
        success = true
      }
    }
  }

  // Fill remaining with random letters
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  for (let r = 0; r < GRID_H; r++)
    for (let c = 0; c < GRID_W; c++)
      if (grid[r][c] === '') grid[r][c] = letters[Math.floor(Math.random() * letters.length)]

  return { grid, placed }
}

export default function WordHunt({ onComplete, profile }) {
  const navigate = useNavigate()
  const [targetWords] = useState(() => shuffle(PRE_PRIMER).slice(0, 3))
  const [gridData, setGridData] = useState(null)
  const [found, setFound] = useState([])
  const [selecting, setSelecting] = useState([])
  const [foundCells, setFoundCells] = useState([])
  const [stitchPose, setStitchPose] = useState('idle')
  const [done, setDone] = useState(false)
  const isPointerDown = useRef(false)
  const { correct: playCorrect, storyComplete } = useSound(true)

  useEffect(() => {
    const data = createGrid(targetWords)
    setGridData(data)
  }, [])

  const handleCellStart = (r, c) => {
    isPointerDown.current = true
    setSelecting([[r, c]])
  }

  const handleCellEnter = (r, c) => {
    if (!isPointerDown.current) return
    setSelecting(prev => {
      const already = prev.some(([pr, pc]) => pr === r && pc === c)
      if (already) return prev
      return [...prev, [r, c]]
    })
  }

  const handleCellEnd = () => {
    isPointerDown.current = false
    // Check if selection matches any target word
    if (!gridData) return
    const selectedLetters = selecting.map(([r, c]) => gridData.grid[r][c]).join('')
    const matchedWord = targetWords.find(w => w === selectedLetters && !found.includes(w))
    if (matchedWord) {
      playCorrect()
      setStitchPose('happy')
      setFound(prev => {
        const next = [...prev, matchedWord]
        if (next.length === targetWords.length) {
          setTimeout(() => { storyComplete(); setDone(true) }, 1000)
        }
        return next
      })
      setFoundCells(prev => [...prev, ...selecting])
      setTimeout(() => setStitchPose('idle'), 1200)
    }
    setSelecting([])
  }

  const isCellSelected = (r, c) => selecting.some(([sr, sc]) => sr === r && sc === c)
  const isCellFound = (r, c) => foundCells.some(([fr, fc]) => fr === r && fc === c)

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky/30 to-blue-50 flex flex-col items-center justify-center p-6">
        <motion.div animate={{ rotate: [-5, 5, -5, 5, 0] }} transition={{ duration: 1 }}>
          <Stitch pose="happy" size={160} />
        </motion.div>
        <h2 className="font-fredoka text-4xl text-ocean mt-4">All Words Found!</h2>
        <p className="font-nunito text-xl text-midnight mt-2">You found all {targetWords.length} words!</p>
        <motion.button
          className="mt-8 bg-ocean text-white font-fredoka text-2xl px-10 py-4 rounded-2xl"
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete(100, true)}
        >Collect 60 XP! ⭐</motion.button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky/30 to-blue-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/50">
        <motion.button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-sky/30 text-2xl"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/learn/sight-words')}>←</motion.button>
        <div className="font-fredoka text-xl text-midnight">Word Hunt</div>
        <div className="font-nunito text-sm text-midnight/60">{found.length} / {targetWords.length}</div>
      </div>

      <div className="flex-1 flex flex-col items-center p-4 gap-4">
        {/* Target words */}
        <div className="flex gap-3 w-full justify-center">
          {targetWords.map(w => (
            <div key={w} className={`font-fredoka text-xl px-4 py-2 rounded-xl
              ${found.includes(w) ? 'bg-grass text-white line-through' : 'bg-white text-ocean border-2 border-ocean'}`}>
              {w}
            </div>
          ))}
        </div>

        <Stitch pose={stitchPose} size={70} />

        {/* Grid */}
        {gridData && (
          <div
            className="bg-white rounded-2xl p-3 shadow-xl select-none"
            onPointerUp={handleCellEnd}
            onPointerLeave={handleCellEnd}
          >
            {gridData.grid.map((row, r) => (
              <div key={r} className="flex">
                {row.map((letter, c) => {
                  const sel = isCellSelected(r, c)
                  const fnd = isCellFound(r, c)
                  return (
                    <div
                      key={c}
                      className={`w-10 h-10 flex items-center justify-center font-fredoka text-lg
                        rounded cursor-pointer select-none transition-colors
                        ${fnd ? 'bg-grass text-white' : sel ? 'bg-sky/50 text-ocean' : 'text-midnight hover:bg-sand'}`}
                      onPointerDown={() => handleCellStart(r, c)}
                      onPointerEnter={() => handleCellEnter(r, c)}
                      style={{ touchAction: 'none' }}
                    >
                      {letter.toUpperCase()}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
