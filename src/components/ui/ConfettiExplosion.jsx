import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLORS = ['#FF6B6B','#FFD700','#4FC3F7','#56C271','#c4b5fd','#f9a8d4','#FFF8E7','#1B6CA8']
const COUNT = 60

function Particle({ color, x, startY }) {
  const tx = (Math.random() - 0.5) * 600
  const ty = Math.random() * 400 + 100
  const rotate = Math.random() * 720 - 360
  const size = Math.random() * 10 + 6

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: startY,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      }}
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ x: tx, y: ty, opacity: 0, rotate, scale: 0.3 }}
      transition={{ duration: 2 + Math.random(), ease: 'easeOut' }}
    />
  )
}

export default function ConfettiExplosion({ active, onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) return
    const p = Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      x: `${Math.random() * 100}%`,
      startY: `${Math.random() * 30}%`,
    }))
    setParticles(p)
    const t = setTimeout(() => {
      setParticles([])
      onComplete?.()
    }, 3000)
    return () => clearTimeout(t)
  }, [active])

  if (!particles.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map(p => <Particle key={p.id} {...p} />)}
    </div>
  )
}
