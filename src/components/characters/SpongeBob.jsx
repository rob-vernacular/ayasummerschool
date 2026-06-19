import { motion } from 'framer-motion'

// Original SVG illustration of a yellow square sea creature — not a reproduction of any existing character
export default function SpongeBob({ size = 100, pose = 'idle', className = '' }) {
  return (
    <div style={{ width: size, height: size * 1.2 }} className={`select-none ${className}`}>
      <motion.svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg"
        animate={pose === 'happy' ? { scale: [1, 1.1, 1], rotate: [-3, 3, 0] } : { scale: [1, 1.01, 1] }}
        transition={{ duration: pose === 'happy' ? 0.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Brown pants */}
        <rect x="25" y="80" width="50" height="30" rx="4" fill="#8B6914" />
        {/* Belt */}
        <rect x="25" y="80" width="50" height="6" rx="2" fill="#4a3008" />
        <rect x="46" y="79" width="8" height="8" rx="1" fill="#c9a227" />

        {/* Shirt white */}
        <rect x="22" y="65" width="56" height="20" rx="4" fill="white" />
        {/* Tie */}
        <polygon points="50,67 47,73 50,78 53,73" fill="#cc2200" />
        <polygon points="50,67 47,63 50,61 53,63" fill="#cc2200" />

        {/* Body */}
        <rect x="18" y="20" width="64" height="60" rx="8" fill="#FFE135" stroke="#c9a227" strokeWidth="1.5" />

        {/* Pores (holes) */}
        {[[28,30],[55,25],[38,45],[65,40],[30,55],[60,58],[42,35],[70,30]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#d4b820" opacity="0.6" />
        ))}

        {/* Eyes white */}
        <ellipse cx="36" cy="38" rx="11" ry="13" fill="white" stroke="#c9a227" strokeWidth="1" />
        <ellipse cx="64" cy="38" rx="11" ry="13" fill="white" stroke="#c9a227" strokeWidth="1" />
        {/* Eyes pupils */}
        <circle cx="37" cy="39" r="7" fill="#4a90d9" />
        <circle cx="65" cy="39" r="7" fill="#4a90d9" />
        <circle cx="37" cy="39" r="4" fill="#1a1a2e" />
        <circle cx="65" cy="39" r="4" fill="#1a1a2e" />
        <circle cx="39" cy="37" r="2" fill="white" />
        <circle cx="67" cy="37" r="2" fill="white" />

        {/* Eyelashes */}
        <line x1="29" y1="27" x2="27" y2="23" stroke="#8B6914" strokeWidth="1.5" />
        <line x1="36" y1="25" x2="36" y2="21" stroke="#8B6914" strokeWidth="1.5" />
        <line x1="43" y1="27" x2="45" y2="23" stroke="#8B6914" strokeWidth="1.5" />
        <line x1="57" y1="27" x2="55" y2="23" stroke="#8B6914" strokeWidth="1.5" />
        <line x1="64" y1="25" x2="64" y2="21" stroke="#8B6914" strokeWidth="1.5" />
        <line x1="71" y1="27" x2="73" y2="23" stroke="#8B6914" strokeWidth="1.5" />

        {/* Nose */}
        <ellipse cx="50" cy="52" rx="3" ry="5" fill="#d4a017" />

        {/* Mouth */}
        {pose === 'surprised' ? (
          <ellipse cx="50" cy="66" rx="9" ry="11" fill="#8B6914" />
        ) : (
          <>
            <path d={pose === 'happy' ? 'M 30 62 Q 50 76 70 62' : 'M 32 62 Q 50 72 68 62'}
              fill="none" stroke="#8B6914" strokeWidth="2.5" strokeLinecap="round" />
            {/* Teeth */}
            <rect x="38" y="62" width="8" height="7" rx="1" fill="white" stroke="#c9a227" strokeWidth="0.5" />
            <rect x="46" y="62" width="8" height="7" rx="1" fill="white" stroke="#c9a227" strokeWidth="0.5" />
          </>
        )}

        {/* Arms */}
        <rect x="4" y="62" width="16" height="8" rx="4" fill="#FFE135" stroke="#c9a227" strokeWidth="1" />
        <rect x="80" y="62" width="16" height="8" rx="4" fill="#FFE135" stroke="#c9a227" strokeWidth="1" />

        {/* Legs */}
        <rect x="28" y="105" width="12" height="14" rx="3" fill="#8B6914" />
        <rect x="60" y="105" width="12" height="14" rx="3" fill="#8B6914" />
        {/* Shoes */}
        <ellipse cx="34" cy="119" rx="10" ry="5" fill="#1a1a1a" />
        <ellipse cx="66" cy="119" rx="10" ry="5" fill="#1a1a1a" />
      </motion.svg>
    </div>
  )
}
