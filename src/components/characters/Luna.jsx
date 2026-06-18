import { motion } from 'framer-motion'

// Original SVG illustration of a white horse with horn and pastel mane — not a reproduction
export default function Luna({ size = 120, pose = 'idle', className = '' }) {
  return (
    <div style={{ width: size, height: size }} className={`select-none ${className}`}>
      <motion.svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"
        animate={pose === 'idle' ? { scaleY: [1, 1.02, 1] } : pose === 'happy' ? { scale: [1, 1.1, 1], rotate: [-2, 2, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Tail */}
        <motion.path d="M 98 75 Q 115 65 112 85 Q 118 70 108 88"
          fill="none" stroke="#f9a8d4" strokeWidth="4" strokeLinecap="round"
          animate={{ d: ['M 98 75 Q 115 65 112 85 Q 118 70 108 88', 'M 98 75 Q 112 68 108 90 Q 116 72 106 92'] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path d="M 98 75 Q 112 62 110 82 Q 116 67 106 86"
          fill="none" stroke="#c4b5fd" strokeWidth="3" strokeLinecap="round"
          animate={{ d: ['M 98 75 Q 112 62 110 82 Q 116 67 106 86', 'M 98 75 Q 110 66 106 86 Q 114 70 104 90'] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse' }}
        />

        {/* Body */}
        <ellipse cx="65" cy="82" rx="35" ry="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />

        {/* Legs */}
        <rect x="42" y="96" width="10" height="20" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <rect x="58" y="96" width="10" height="20" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <rect x="74" y="95" width="10" height="20" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <rect x="88" y="96" width="10" height="20" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />

        {/* Hooves */}
        {[[42,115],[58,115],[74,114],[88,115]].map(([x,y],i) => (
          <ellipse key={i} cx={x+5} cy={y} rx="5" ry="3" fill="#d4a8c7" />
        ))}

        {/* Neck */}
        <ellipse cx="35" cy="70" rx="14" ry="18" fill="white" stroke="#e2e8f0" strokeWidth="1.5"
          transform="rotate(-15, 35, 70)" />

        {/* Head */}
        <ellipse cx="22" cy="50" rx="18" ry="16" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />

        {/* Muzzle */}
        <ellipse cx="12" cy="58" rx="10" ry="8" fill="#fef3f8" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="9" cy="58" r="2" fill="#f9a8d4" opacity="0.6" />
        <circle cx="14" cy="58" r="2" fill="#f9a8d4" opacity="0.6" />

        {/* Mouth */}
        <path d="M 8 62 Q 12 65 16 62" fill="none" stroke="#e2a8c0" strokeWidth="1.5" strokeLinecap="round" />

        {/* Eye */}
        <ellipse cx="24" cy="46" rx="5" ry="6" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />
        <ellipse cx="24" cy="47" rx="3.5" ry="4" fill="#2d1b5e" />
        <ellipse cx="25" cy="45" rx="1.5" ry="2" fill="#5b2d8e" />
        <circle cx="26" cy="44" r="1.5" fill="white" />

        {/* Eyelashes */}
        <line x1="20" y1="41" x2="18" y2="38" stroke="#c4b5fd" strokeWidth="1.5" />
        <line x1="24" y1="40" x2="24" y2="37" stroke="#c4b5fd" strokeWidth="1.5" />
        <line x1="28" y1="41" x2="30" y2="38" stroke="#c4b5fd" strokeWidth="1.5" />

        {/* Horn */}
        <motion.polygon points="28,32 22,10 18,32"
          fill="#FFD700" stroke="#c9a227" strokeWidth="0.5"
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Horn sparkle */}
        <motion.g animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>
          <circle cx="22" cy="8" r="2" fill="#fff" />
          <line x1="22" y1="4" x2="22" y2="12" stroke="#FFD700" strokeWidth="0.5" />
          <line x1="18" y1="8" x2="26" y2="8" stroke="#FFD700" strokeWidth="0.5" />
        </motion.g>

        {/* Mane */}
        <motion.path d="M 28 36 Q 22 44 26 54 Q 20 46 24 58"
          fill="none" stroke="#f9a8d4" strokeWidth="5" strokeLinecap="round"
          animate={{ d: ['M 28 36 Q 22 44 26 54 Q 20 46 24 58', 'M 28 36 Q 24 42 28 52 Q 22 44 26 56'] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path d="M 30 35 Q 24 43 28 53"
          fill="none" stroke="#c4b5fd" strokeWidth="4" strokeLinecap="round"
          animate={{ d: ['M 30 35 Q 24 43 28 53', 'M 30 35 Q 26 41 30 51'] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path d="M 32 36 Q 26 44 30 54"
          fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round"
          animate={{ d: ['M 32 36 Q 26 44 30 54', 'M 32 36 Q 28 42 32 52'] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse' }}
        />

        {/* Stars/sparkles near horn */}
        {(pose === 'happy') && (
          <motion.g animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}>
            <text x="2" y="25" fontSize="10">✨</text>
            <text x="30" y="15" fontSize="8">⭐</text>
          </motion.g>
        )}
      </motion.svg>
    </div>
  )
}
