import { useState, useEffect, useRef } from 'react'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { useSound } from '../../hooks/useSound'
import { PRE_PRIMER } from '../../data/sightwords'

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
      <CompletionScreen subject="sightwords" title="Treasure Found!" score={targetWords.length} total={targetWords.length}
        perfect xp={60} buttonLabel="Collect 60 XP!" onCollect={() => onComplete(100, true)} />
    )
  }

  return (
    <ActivityScene
      subject="sightwords" title="Word Hunt" backRoute="/learn/sight-words"
      current={found.length} total={targetWords.length} showStitch={false}>

      <div className="flex flex-col items-center gap-4">
        {/* Treasure words to find */}
        <div className="flex gap-3 w-full justify-center flex-wrap">
          {targetWords.map(w => (
            <div key={w} className={`font-fredoka text-lg px-4 py-2 rounded-xl
              ${found.includes(w) ? 'bg-grass-dark text-white line-through' : 'bg-gold text-[#6b4a12] border-2 border-gold-dark'}`}>
              {w}
            </div>
          ))}
        </div>

        {/* Treasure map grid */}
        {gridData && (
          <div
            className="rounded-2xl p-3 shadow-card select-none"
            style={{ background: 'linear-gradient(160deg,#F3E2B3,#E0C381)', border: '4px solid #B89052' }}
            onPointerUp={handleCellEnd} onPointerLeave={handleCellEnd}>
            {gridData.grid.map((row, r) => (
              <div key={r} className="flex">
                {row.map((letter, c) => {
                  const sel = isCellSelected(r, c)
                  const fnd = isCellFound(r, c)
                  return (
                    <div key={c}
                      className={`w-10 h-10 flex items-center justify-center font-fredoka text-lg
                        rounded cursor-pointer select-none transition-colors
                        ${fnd ? 'bg-grass-dark text-white' : sel ? 'bg-gold text-[#6b4a12]' : 'text-[#5a4322] hover:bg-white/40'}`}
                      onPointerDown={() => handleCellStart(r, c)}
                      onPointerEnter={() => handleCellEnter(r, c)}
                      style={{ touchAction: 'none' }}>
                      {letter.toUpperCase()}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </ActivityScene>
  )
}
