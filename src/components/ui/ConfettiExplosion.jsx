import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#FF6B6B','#FFD700','#4FC3F7','#56C271','#c4b5fd','#f9a8d4','#FFF8E7','#1B6CA8','#FFA000']

function Star({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 l2.9 5.9 l6.5 .9 l-4.7 4.6 l1.1 6.5 l-5.8 -3 l-5.8 3 l1.1 -6.5 l-4.7 -4.6 l6.5 -.9 Z" fill={color} />
    </svg>
  )
}

function Particle({ color, x, startY, shape, size }) {
  const tx = (Math.random() - 0.5) * 600
  const ty = Math.random() * 400 + 200
  const rotate = Math.random() * 720 - 360
  const delay = Math.random() * 0.5
  const duration = 2.5 + Math.random()

  const body =
    shape === 'star'
      ? <Star size={size} color={color} />
      : <div style={{ width: size, height: size, backgroundColor: color, borderRadius: shape === 'circle' ? '50%' : '2px' }} />

  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: startY, willChange: 'transform' }}
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ x: tx, y: ty, opacity: 0, rotate, scale: 0.4 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {body}
    </motion.div>
  )
}

export default function ConfettiExplosion({ active, count = 60, onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) return
    const shapes = ['circle', 'square', 'star']
    const p = Array.from({ length: count }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      x: `${Math.random() * 100}%`,
      startY: `${Math.random() * 25}%`,
      shape: shapes[i % shapes.length],
      size: Math.random() * 8 + 8,
    }))
    setParticles(p)
    const t = setTimeout(() => { setParticles([]); onComplete?.() }, 3500)
    return () => clearTimeout(t)
  }, [active, count])

  if (!particles.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
      {particles.map(p => <Particle key={p.id} {...p} />)}
    </div>
  )
}
