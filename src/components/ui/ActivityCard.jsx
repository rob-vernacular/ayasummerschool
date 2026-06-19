import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ActivityIcon, LockIcon, CheckIcon } from '../icons'

/* Each activity is a named location in Stitch's world. */
const CARD_STYLES = {
  phonics:    { title: 'Sound Beach',  gradient: 'linear-gradient(145deg, #FF6B6B, #FF8E53)', route: '/learn/phonics' },
  sightwords: { title: 'Word Cove',    gradient: 'linear-gradient(145deg, #1B6CA8, #4FC3F7)', route: '/learn/sight-words' },
  reading:    { title: 'Story Grove',  gradient: 'linear-gradient(145deg, #2E7D32, #66BB6A)', route: '/learn/reading' },
  writing:    { title: 'Writing Cave', gradient: 'linear-gradient(145deg, #4A148C, #7B1FA2)', route: '/learn/writing' },
  math:       { title: 'Number Island',gradient: 'linear-gradient(145deg, #F57F17, #FFD700)', route: '/learn/math' },
}

/* A tiny decorative scene per location, drawn small in the card corner. */
function CardScene({ type }) {
  switch (type) {
    case 'phonics': // shells & letters on sand
      return (
        <svg viewBox="0 0 80 50" className="w-full h-full">
          <path d="M0 40 Q40 30 80 40 V50 H0 Z" fill="rgba(255,255,255,0.25)" />
          <g fill="rgba(255,255,255,0.85)" stroke="rgba(0,0,0,0.1)" strokeWidth="1">
            <path d="M16 40 a8 8 0 0 1 16 0 Z" />
            <path d="M16 40 l4 -7 M22 40 l2 -8 M28 40 l3 -7" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" fill="none" />
          </g>
          <text x="48" y="42" fontFamily="Fredoka One" fontSize="14" fill="#fff">B</text>
        </svg>
      )
    case 'sightwords': // message in a bottle
      return (
        <svg viewBox="0 0 80 50" className="w-full h-full">
          <g transform="rotate(-18 40 28)">
            <rect x="28" y="14" width="22" height="30" rx="9" fill="rgba(255,255,255,0.85)" stroke="rgba(255,255,255,0.5)" />
            <rect x="35" y="8" width="8" height="8" rx="2" fill="#C98A3A" />
            <rect x="32" y="22" width="14" height="12" rx="2" fill="#FFF3D6" />
            <path d="M35 26 h8 M35 30 h6" stroke="#1B6CA8" strokeWidth="1.4" />
          </g>
        </svg>
      )
    case 'reading': // open book with stars
      return (
        <svg viewBox="0 0 80 50" className="w-full h-full">
          <path d="M14 10 l4 2 M62 8 l-3 3 M40 6 l1 3" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
          <path d="M40 22 C32 16 20 16 14 20 V42 C20 38 32 38 40 44 C48 38 60 38 66 42 V20 C60 16 48 16 40 22 Z"
            fill="rgba(255,255,255,0.9)" stroke="rgba(0,0,0,0.1)" />
          <path d="M40 22 V44 M22 26 h12 M22 31 h12 M46 26 h12 M46 31 h12" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" fill="none" />
        </svg>
      )
    case 'writing': // pencil & notebook
      return (
        <svg viewBox="0 0 80 50" className="w-full h-full">
          <rect x="20" y="12" width="28" height="32" rx="3" fill="rgba(255,255,255,0.9)" />
          <path d="M26 20 h16 M26 26 h16 M26 32 h12" stroke="#7B1FA2" strokeWidth="1.4" />
          <g transform="rotate(40 56 28)">
            <rect x="52" y="10" width="7" height="30" rx="1.5" fill="#FFC93C" stroke="rgba(0,0,0,0.15)" />
            <path d="M52 10 l3.5 -7 l3.5 7 Z" fill="#F4A259" />
            <path d="M54 6 l1.5 -3 l1.5 3 Z" fill="#16202B" />
          </g>
        </svg>
      )
    case 'math': // numbers
      return (
        <svg viewBox="0 0 80 50" className="w-full h-full">
          <text x="14" y="38" fontFamily="Fredoka One" fontSize="22" fill="rgba(255,255,255,0.85)">1</text>
          <text x="30" y="38" fontFamily="Fredoka One" fontSize="22" fill="rgba(255,255,255,0.6)">+</text>
          <text x="48" y="38" fontFamily="Fredoka One" fontSize="22" fill="rgba(255,255,255,0.85)">2</text>
        </svg>
      )
    default: return null
  }
}

export default function ActivityCard({ type, label, completedToday = 0, totalRequired = 3, locked = false, index = 0 }) {
  const navigate = useNavigate()
  const style = CARD_STYLES[type] || CARD_STYLES.phonics
  const done = completedToday >= totalRequired

  return (
    <motion.button
      className={`relative rounded-3xl p-4 text-left w-full overflow-hidden shadow-card text-white
        ${locked ? '' : 'active:scale-[0.97]'} min-h-[150px] flex flex-col justify-between`}
      style={{ background: style.gradient }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileTap={!locked ? { scale: 0.97 } : {}}
      whileHover={!locked ? { scale: 1.03, transition: { duration: 0.2 } } : {}}
      onClick={() => !locked && navigate(style.route)}
    >
      {/* Decorative scene */}
      <div className="absolute right-0 bottom-9 w-24 h-14 opacity-90 pointer-events-none">
        <CardScene type={type} />
      </div>

      {/* Top — icon + title */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="w-11 h-11 rounded-2xl bg-white/25 flex items-center justify-center shrink-0">
          <ActivityIcon type={type} size={26} color="#fff" />
        </div>
        <h3 className="font-fredoka text-lg leading-tight text-shadow-soft">{style.title}</h3>
      </div>

      {/* Bottom — progress */}
      <div className="relative z-10">
        {!locked && (
          <div className="flex gap-1.5 mb-2">
            {Array.from({ length: totalRequired }).map((_, i) => (
              <div key={i} className={`w-3.5 h-3.5 rounded-full border-2 border-white/70
                ${i < completedToday ? 'bg-white' : 'bg-white/20'}`} />
            ))}
          </div>
        )}

        {locked ? (
          <span className="font-nunito font-700 text-xs opacity-95">Coming Soon!</span>
        ) : done ? (
          <span className="inline-flex items-center gap-1.5 font-nunito font-700 text-sm bg-white/30 rounded-full px-3 py-1">
            <CheckIcon size={16} circle={false} /> Done today!
          </span>
        ) : (
          <span className="font-nunito font-700 text-sm opacity-95">{completedToday}/{totalRequired} today</span>
        )}
      </div>

      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/35 rounded-3xl">
          <div className="flex flex-col items-center gap-1">
            <LockIcon size={40} color="#fff" />
          </div>
        </div>
      )}
    </motion.button>
  )
}
