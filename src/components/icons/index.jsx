/* ============================================================================
   Icon system — clean, rounded, friendly SVG icons. No emoji as UI.
   Every icon accepts { size, className, color, title }. Stroke-based icons use
   `color` for stroke; filled icons (Star, Flame, Trophy) use it for fill.
   ========================================================================== */

function Svg({ size = 24, className = '', title, children, viewBox = '0 0 24 24', ...rest }) {
  return (
    <svg
      width={size} height={size} viewBox={viewBox}
      className={className} role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true} aria-label={title}
      xmlns="http://www.w3.org/2000/svg" {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  )
}

const stroke = (color, w = 2) => ({
  fill: 'none', stroke: color, strokeWidth: w,
  strokeLinecap: 'round', strokeLinejoin: 'round',
})

/* ---- Activity icons -------------------------------------------------------- */
export function PhonicsIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <text x="3.5" y="17" fontFamily="Fredoka One, sans-serif" fontSize="13" fontWeight="700" fill={color}>A</text>
      <path d="M13 12 q2 -4 4 0 q2 4 4 0" {...stroke(color, 2)} />
      <circle cx="13" cy="6" r="1.6" fill={color} />
      <path d="M14.4 6 V3.2 l2.2 -.8 V5" {...stroke(color, 1.8)} />
    </Svg>
  )
}

export function SightWordsIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <path d="M2 12 C5 6 19 6 22 12 C19 18 5 18 2 12 Z" {...stroke(color, 2)} />
      <circle cx="12" cy="12" r="3.4" {...stroke(color, 2)} />
      <circle cx="12" cy="12" r="1" fill={color} />
    </Svg>
  )
}

export function ReadingIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <path d="M12 6 C9.5 4.2 5.5 4.2 3 5.2 V19 C5.5 18 9.5 18 12 19.8 C14.5 18 18.5 18 21 19 V5.2 C18.5 4.2 14.5 4.2 12 6 Z" {...stroke(color, 2)} />
      <path d="M12 6 V19.8" {...stroke(color, 2)} />
      <path d="M16.5 4 V9 l1.6 -1.2 L19.7 9 V4" {...stroke(color, 1.6)} fill={color} fillOpacity="0.25" />
    </Svg>
  )
}

export function WritingIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <path d="M5 19 L7 13 L16 4 L20 8 L11 17 L5 19 Z" {...stroke(color, 2)} />
      <path d="M14 6 L18 10" {...stroke(color, 2)} />
      <path d="M5.5 4.5 l.6 1.4 l1.4 .6 l-1.4 .6 l-.6 1.4 l-.6 -1.4 l-1.4 -.6 l1.4 -.6 Z" fill={color} />
    </Svg>
  )
}

export function MathIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <text x="2" y="16" fontFamily="Fredoka One, sans-serif" fontSize="11" fontWeight="700" fill={color}>1</text>
      <path d="M9 12 h4 M11 10 v4" {...stroke(color, 1.8)} />
      <text x="15" y="16" fontFamily="Fredoka One, sans-serif" fontSize="11" fontWeight="700" fill={color}>3</text>
      <path d="M7 19 h10" {...stroke(color, 1.8)} />
    </Svg>
  )
}

/* ---- Reward / status icons ------------------------------------------------- */
export function StarIcon({ color = '#FFD700', stroke: sc, ...p }) {
  return (
    <Svg {...p}>
      <path d="M12 2.5 l2.9 5.9 l6.5 .9 l-4.7 4.6 l1.1 6.5 l-5.8 -3 l-5.8 3 l1.1 -6.5 l-4.7 -4.6 l6.5 -.9 Z"
        fill={color} stroke={sc || 'rgba(0,0,0,0.12)'} strokeWidth="1" strokeLinejoin="round" />
    </Svg>
  )
}

export function FlameIcon({ color = '#FF6B6B', ...p }) {
  return (
    <Svg {...p}>
      <path d="M12 2.5 C13 6 17 7.5 17 12.5 a5 5 0 0 1 -10 0 C7 9.5 9 9 9.5 6.5 C11 8 11 9.5 12 9.5 C12.8 9.5 13 7.5 12 2.5 Z"
        fill={color} />
      <path d="M12 21 a3 3 0 0 1 -3 -3 c0 -2 1.5 -2.5 1.8 -4 C11.5 15 11.5 16 12.5 16 c.8 0 1 -1 .6 -2.2 C14.5 14.6 15 16.2 15 18 a3 3 0 0 1 -3 3 Z"
        fill="#FFD700" />
    </Svg>
  )
}

export function TrophyIcon({ color = '#FFD700', ...p }) {
  return (
    <Svg {...p}>
      <path d="M7 4 H17 V9 a5 5 0 0 1 -10 0 Z" fill={color} stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      <path d="M7 5 H4 a3 3 0 0 0 3 4" {...stroke(color, 2)} />
      <path d="M17 5 H20 a3 3 0 0 1 -3 4" {...stroke(color, 2)} />
      <path d="M12 14 V17 M9 20 H15 M10 17 H14 V20 H10 Z" fill={color} stroke="rgba(0,0,0,0.12)" strokeWidth="1" strokeLinejoin="round" />
    </Svg>
  )
}

export function LockIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" {...stroke(color, 2)} />
      <path d="M8 10.5 V8 a4 4 0 0 1 8 0 V10.5" {...stroke(color, 2)} />
      <circle cx="12" cy="15" r="1.4" fill={color} />
      <path d="M12 16 v2" {...stroke(color, 2)} />
    </Svg>
  )
}

export function CheckIcon({ color = '#fff', circle = true, ...p }) {
  return (
    <Svg {...p}>
      {circle && <circle cx="12" cy="12" r="10" {...stroke(color, 2)} />}
      <path d="M7.5 12.5 L10.5 15.5 L16.5 8.5" {...stroke(color, 2.4)} />
    </Svg>
  )
}

export function BackIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="10" {...stroke(color, 2)} />
      <path d="M13.5 8 L9.5 12 L13.5 16" {...stroke(color, 2.2)} />
    </Svg>
  )
}

/* ---- UI chrome icons ------------------------------------------------------- */
export function SoundOnIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <path d="M4 9 H7 L11 5 V19 L7 15 H4 Z" {...stroke(color, 2)} />
      <path d="M15 9 a4 4 0 0 1 0 6 M17.5 7 a7 7 0 0 1 0 10" {...stroke(color, 2)} />
    </Svg>
  )
}

export function SoundOffIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <path d="M4 9 H7 L11 5 V19 L7 15 H4 Z" {...stroke(color, 2)} />
      <path d="M15 9 L20 15 M20 9 L15 15" {...stroke(color, 2)} />
    </Svg>
  )
}

export function MenuIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <path d="M4 7 H20 M4 12 H20 M4 17 H20" {...stroke(color, 2.2)} />
    </Svg>
  )
}

export function PeopleIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <circle cx="9" cy="8" r="3" {...stroke(color, 2)} />
      <path d="M3.5 19 a5.5 5.5 0 0 1 11 0" {...stroke(color, 2)} />
      <path d="M16 6 a3 3 0 0 1 0 6 M16.5 13.5 a5.5 5.5 0 0 1 4 5.5" {...stroke(color, 2)} />
    </Svg>
  )
}

export function HomeIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <path d="M4 11 L12 4 L20 11" {...stroke(color, 2)} />
      <path d="M6 10 V20 H18 V10" {...stroke(color, 2)} />
      <path d="M10 20 V14 H14 V20" {...stroke(color, 2)} />
    </Svg>
  )
}

export function SparkleIcon({ color = '#FFD700', ...p }) {
  return (
    <Svg {...p}>
      <path d="M12 3 C12.6 8 14 9.4 19 10 C14 10.6 12.6 12 12 17 C11.4 12 10 10.6 5 10 C10 9.4 11.4 8 12 3 Z" fill={color} />
    </Svg>
  )
}

export function ArrowRightIcon({ color = '#fff', ...p }) {
  return (
    <Svg {...p}>
      <path d="M5 12 H18 M13 7 L18 12 L13 17" {...stroke(color, 2.2)} />
    </Svg>
  )
}

/* ---- Lookup helper for activity types ------------------------------------- */
export const ACTIVITY_ICONS = {
  phonics: PhonicsIcon,
  sightwords: SightWordsIcon,
  reading: ReadingIcon,
  writing: WritingIcon,
  math: MathIcon,
}

export function ActivityIcon({ type, ...props }) {
  const Cmp = ACTIVITY_ICONS[type] || PhonicsIcon
  return <Cmp {...props} />
}
