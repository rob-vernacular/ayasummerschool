import { motion } from 'framer-motion'

// Original SVG illustration of a blue alien creature — not a reproduction of any existing character
const StitchSVG = ({ pose = 'idle' }) => {
  const bodyColor = '#4A90D9'
  const darkBlue = '#2C5F8A'
  const lightBlue = '#7FB8E8'
  const noseColor = '#1a3a5c'

  const expressions = {
    idle: { mouthPath: 'M 38 68 Q 50 74 62 68', eyeScale: 1 },
    happy: { mouthPath: 'M 34 66 Q 50 78 66 66', eyeScale: 1.1 },
    sad: { mouthPath: 'M 38 72 Q 50 66 62 72', eyeScale: 0.9 },
    dance: { mouthPath: 'M 34 66 Q 50 78 66 66', eyeScale: 1.15 },
    wave: { mouthPath: 'M 36 67 Q 50 76 64 67', eyeScale: 1 },
  }

  const { mouthPath, eyeScale } = expressions[pose] || expressions.idle

  const idleAnim = pose === 'idle' ? {
    scaleY: [1, 1.02, 1],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  } : {}

  const happyAnim = pose === 'happy' ? {
    scale: [1, 1.08, 1],
    rotate: [0, -3, 3, 0],
    transition: { duration: 0.5 }
  } : {}

  const danceAnim = pose === 'dance' ? {
    rotate: [-5, 5, -5, 5, 0],
    scale: [1, 1.05, 1, 1.05, 1],
    transition: { duration: 1, repeat: Infinity }
  } : {}

  const waveAnim = pose === 'wave' ? {} : {}

  const bodyAnim = { ...idleAnim, ...happyAnim, ...danceAnim }

  return (
    <motion.svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg" {...bodyAnim}>
      {/* Left ear */}
      <motion.ellipse cx="20" cy="30" rx="12" ry="8"
        fill={bodyColor} stroke={darkBlue} strokeWidth="1.5"
        transform="rotate(-30, 20, 30)"
        animate={pose === 'happy' || pose === 'dance' ? { rotate: [-30, -20, -30] } : { rotate: -30 }}
        transition={{ duration: 0.5, repeat: pose === 'dance' ? Infinity : 0 }}
      />
      {/* Right ear */}
      <motion.ellipse cx="80" cy="30" rx="12" ry="8"
        fill={bodyColor} stroke={darkBlue} strokeWidth="1.5"
        transform="rotate(30, 80, 30)"
        animate={pose === 'happy' || pose === 'dance' ? { rotate: [30, 20, 30] } : { rotate: 30 }}
        transition={{ duration: 0.5, repeat: pose === 'dance' ? Infinity : 0 }}
      />
      {/* Ear inner marks */}
      <line x1="16" y1="26" x2="14" y2="33" stroke={noseColor} strokeWidth="1" opacity="0.5" transform="rotate(-30, 16, 26)" />
      <line x1="84" y1="26" x2="86" y2="33" stroke={noseColor} strokeWidth="1" opacity="0.5" transform="rotate(30, 84, 26)" />

      {/* Body */}
      <ellipse cx="50" cy="75" rx="30" ry="28" fill={bodyColor} stroke={darkBlue} strokeWidth="1.5" />

      {/* Head */}
      <ellipse cx="50" cy="52" rx="28" ry="26" fill={bodyColor} stroke={darkBlue} strokeWidth="1.5" />

      {/* Head markings */}
      <ellipse cx="50" cy="58" rx="14" ry="10" fill={lightBlue} opacity="0.4" />

      {/* Left eye */}
      <motion.g animate={{ scaleY: eyeScale }}>
        <ellipse cx="39" cy="48" rx="9" ry="10" fill="white" />
        <ellipse cx="40" cy="49" rx="6" ry="7" fill="#1a1a2e" />
        <ellipse cx="41" cy="47" rx="3" ry="3.5" fill="#2244aa" />
        <circle cx="43" cy="46" r="2" fill="white" />
        {/* Blink */}
      </motion.g>

      {/* Right eye */}
      <motion.g animate={{ scaleY: eyeScale }}>
        <ellipse cx="61" cy="48" rx="9" ry="10" fill="white" />
        <ellipse cx="62" cy="49" rx="6" ry="7" fill="#1a1a2e" />
        <ellipse cx="63" cy="47" rx="3" ry="3.5" fill="#2244aa" />
        <circle cx="65" cy="46" r="2" fill="white" />
      </motion.g>

      {/* Nose */}
      <ellipse cx="50" cy="60" rx="5" ry="3.5" fill={noseColor} />
      <ellipse cx="50" cy="59" rx="3.5" ry="2" fill="#2a5a8a" opacity="0.5" />

      {/* Mouth */}
      <motion.path d={mouthPath} fill="none" stroke={noseColor} strokeWidth="2.5" strokeLinecap="round"
        animate={{ d: mouthPath }} transition={{ duration: 0.3 }}
      />

      {/* Cheek blush */}
      {(pose === 'happy' || pose === 'dance') && (
        <>
          <ellipse cx="30" cy="58" rx="5" ry="3" fill="#ff9eb5" opacity="0.4" />
          <ellipse cx="70" cy="58" rx="5" ry="3" fill="#ff9eb5" opacity="0.4" />
        </>
      )}

      {/* Left arm */}
      <motion.ellipse cx="22" cy="75" rx="8" ry="12" fill={bodyColor} stroke={darkBlue} strokeWidth="1.5"
        transform="rotate(-20, 22, 75)"
        animate={pose === 'wave' ? { rotate: [-20, 30, -20, 30, -20], x: [-2, 2, -2, 2, 0] } : { rotate: -20 }}
        transition={{ duration: 0.6, repeat: pose === 'wave' ? 3 : 0 }}
      />

      {/* Right arm */}
      <ellipse cx="78" cy="75" rx="8" ry="12" fill={bodyColor} stroke={darkBlue} strokeWidth="1.5"
        transform="rotate(20, 78, 75)" />

      {/* Legs */}
      <ellipse cx="40" cy="99" rx="10" ry="8" fill={bodyColor} stroke={darkBlue} strokeWidth="1.5" />
      <ellipse cx="60" cy="99" rx="10" ry="8" fill={bodyColor} stroke={darkBlue} strokeWidth="1.5" />

      {/* Body spots */}
      <circle cx="50" cy="78" r="3" fill={darkBlue} opacity="0.3" />
      <circle cx="42" cy="84" r="2" fill={darkBlue} opacity="0.25" />
      <circle cx="58" cy="84" r="2" fill={darkBlue} opacity="0.25" />
    </motion.svg>
  )
}

export default function Stitch({ pose = 'idle', size = 120, className = '' }) {
  return (
    <div style={{ width: size, height: size * 1.1 }} className={`select-none ${className}`}>
      <StitchSVG pose={pose} />
    </div>
  )
}
