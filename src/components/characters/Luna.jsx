import { motion } from 'framer-motion'

/* ============================================================================
   Luna — original pastel unicorn for reward moments. Not a reproduction of any
   existing character. Poses: stand | fly | celebrate.
   ========================================================================== */

const MANE = ['#FFB3D9', '#B3D9FF', '#B3FFD9', '#FFD9B3']

export default function Luna({ size = 160, pose = 'stand', className = '' }) {
  const flying = pose === 'fly'
  const celebrating = pose === 'celebrate'

  const bob = flying
    ? { y: [0, -10, 0], rotate: [-2, 2, -2] }
    : celebrating
      ? { y: [0, -14, 0], rotate: [-3, 3, -3] }
      : { y: [0, -4, 0] }

  return (
    <div style={{ width: size, height: size }} className={`select-none pointer-events-none ${className}`} aria-hidden="true">
      <motion.svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" className="overflow-visible"
        animate={bob}
        transition={{ duration: celebrating ? 1 : 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="lunaHorn" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE89C" />
            <stop offset="100%" stopColor="#FFC107" />
          </linearGradient>
        </defs>

        {/* Wings (fly pose) */}
        {flying && (
          <>
            <motion.path d="M 60 78 Q 18 50 8 86 Q 34 80 56 92 Z"
              fill="#fff" stroke="#E8D5F5" strokeWidth="2"
              style={{ transformBox: 'fill-box', transformOrigin: 'right center' }}
              animate={{ rotate: [0, -16, 0] }} transition={{ duration: 0.7, repeat: Infinity }} />
            <path d="M 60 78 Q 24 58 16 84 Q 36 80 56 90 Z" fill="#F3E8FB" opacity="0.8" />
          </>
        )}

        {/* Tail — flowing rainbow */}
        {MANE.map((c, i) => (
          <motion.path key={i}
            d={`M 110 86 Q ${128 + i * 2} ${72 + i * 4} ${120 + i} ${96 + i * 3}`}
            fill="none" stroke={c} strokeWidth={5 - i * 0.6} strokeLinecap="round"
            animate={{ d: [
              `M 110 86 Q ${128 + i * 2} ${72 + i * 4} ${120 + i} ${96 + i * 3}`,
              `M 110 86 Q ${124 + i * 2} ${76 + i * 4} ${116 + i} ${100 + i * 3}`,
            ] }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, repeatType: 'reverse' }} />
        ))}

        {/* Body */}
        <ellipse cx="78" cy="92" rx="40" ry="26" fill="#fff" stroke="#E8D5F5" strokeWidth="2" />
        <ellipse cx="78" cy="98" rx="30" ry="16" fill="#F6EDFB" opacity="0.6" />

        {/* Legs */}
        {(celebrating ? [[52,108,-14],[68,110,0],[88,110,0],[104,108,12]]
                      : [[52,110,0],[68,112,0],[88,112,0],[104,110,0]]).map(([x,y,r],i) => (
          <g key={i} transform={`rotate(${r} ${x+6} ${y})`}>
            <rect x={x} y={y} width="11" height="22" rx="5" fill="#fff" stroke="#E8D5F5" strokeWidth="2" />
            <ellipse cx={x+5.5} cy={y+22} rx="6" ry="3.5" fill="#E8D5F5" />
          </g>
        ))}

        {/* Neck + head */}
        <ellipse cx="42" cy="76" rx="16" ry="20" fill="#fff" stroke="#E8D5F5" strokeWidth="2" transform="rotate(-16 42 76)" />
        <ellipse cx="26" cy="52" rx="20" ry="18" fill="#fff" stroke="#E8D5F5" strokeWidth="2" />

        {/* Muzzle */}
        <ellipse cx="14" cy="60" rx="11" ry="9" fill="#FBF1F8" stroke="#E8D5F5" strokeWidth="1.5" />
        <circle cx="10" cy="60" r="2" fill="#E8B3D5" opacity="0.7" />
        <circle cx="16" cy="60" r="2" fill="#E8B3D5" opacity="0.7" />

        {/* Eye (sparkly purple, star highlight) */}
        <ellipse cx="28" cy="48" rx="6" ry="7.5" fill="#fff" stroke="#E8D5F5" strokeWidth="0.5" />
        <ellipse cx="28" cy="49" rx="4.5" ry="6" fill="#9B59B6" />
        <circle cx="28" cy="50" r="3" fill="#5B2D6E" />
        <path d="M30 45 l.7 1.6 l1.7 .2 l-1.3 1.2 l.4 1.7 l-1.5 -.9 l-1.5 .9 l.4 -1.7 l-1.3 -1.2 l1.7 -.2 Z" fill="#fff" />

        {/* Eyelashes */}
        <path d="M22 42 l-2 -2.5 M28 40 v-3 M34 42 l2 -2.5" stroke="#9B59B6" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* Horn */}
        <polygon points="34,34 27,8 22,34" fill="url(#lunaHorn)" stroke="#E0A800" strokeWidth="0.8" />
        <path d="M24 28 l8 -2 M25 22 l6.5 -1.5 M26 16 l5 -1" stroke="#E0A800" strokeWidth="0.8" opacity="0.7" />
        <motion.g animate={{ opacity: [0, 1, 0], scale: [0.6, 1.3, 0.6] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <path d="M27 4 l1 2.4 l2.4 .4 l-2 1.8 l.6 2.4 l-2 -1.3 l-2 1.3 l.6 -2.4 l-2 -1.8 l2.4 -.4 Z" fill="#FFF6C9" />
        </motion.g>

        {/* Mane — pastel rainbow sweeping down the neck */}
        {MANE.map((c, i) => (
          <motion.path key={i}
            d={`M ${34 - i * 2} ${36 + i * 2} Q ${24 - i} ${48 + i * 2} ${30 - i} ${62 + i * 3}`}
            fill="none" stroke={c} strokeWidth={6 - i} strokeLinecap="round"
            animate={{ d: [
              `M ${34 - i * 2} ${36 + i * 2} Q ${24 - i} ${48 + i * 2} ${30 - i} ${62 + i * 3}`,
              `M ${34 - i * 2} ${36 + i * 2} Q ${27 - i} ${46 + i * 2} ${33 - i} ${60 + i * 3}`,
            ] }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, repeatType: 'reverse' }} />
        ))}

        {/* Forelock between ears */}
        <path d="M40 40 Q 36 30 44 30 Q 40 36 46 38" fill={MANE[0]} opacity="0.9" />
      </motion.svg>
    </div>
  )
}
