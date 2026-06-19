import { motion } from 'framer-motion'

/* ============================================================================
   Stitch — original blue alien companion (not a reproduction of any character).
   A single SVG component driven by a `pose` prop. Ten expressive poses, each
   composed from shared anatomy parts (ears, eyes, mouth, arms, legs) so the
   character stays consistent while the expression changes.

   Poses: idle | happy | excited | sad | thinking | wave | dance | celebrate
          | reading | writing
   Props: pose, size (px, default 200), className
   ========================================================================== */

const C = {
  body:      '#6C84C8',   // periwinkle blue-grey
  shadow:    '#41568F',   // deep shade
  light:     '#A8BCE8',   // highlight
  innerEar:  '#C68FA8',   // mauve inner ear
  belly:     '#C7E7F0',   // pale cyan belly / muzzle
  iris:      '#2E78C2',   // thin blue eye rim
  pupil:     '#0E1830',   // near-black eye
  nose:      '#16223E',   // dark navy nose
  mouth:     '#16223E',
  tongue:    '#FF7B96',
  tooth:     '#FFFFFF',
  blush:     '#FF9EB5',
}

/* ---- Per-pose configuration ------------------------------------------------ */
const POSES = {
  idle:      { eyes: 'open',     mouth: 'smile',   ears: 'up',    arms: 'down',   body: 'anim-breathe' },
  happy:     { eyes: 'squint',   mouth: 'grin',    ears: 'perk',  arms: 'up',     body: 'anim-bounce-in', blush: true },
  excited:   { eyes: 'wide',     mouth: 'open',    ears: 'perk',  arms: 'up',     body: 'anim-jump',      blush: true },
  sad:       { eyes: 'sad',      mouth: 'frown',   ears: 'droop', arms: 'down',   body: '', slump: true },
  thinking:  { eyes: 'upleft',   mouth: 'neutral', ears: 'up',    arms: 'chin',   body: '' },
  wave:      { eyes: 'open',     mouth: 'smile',   ears: 'up',    arms: 'wave',   body: 'anim-breathe' },
  dance:     { eyes: 'squint',   mouth: 'grin',    ears: 'perk',  arms: 'out',    body: 'anim-stitch-dance', blush: true },
  celebrate: { eyes: 'closed',   mouth: 'bigGrin', ears: 'perk',  arms: 'up',     body: 'anim-jump',      blush: true },
  reading:   { eyes: 'down',     mouth: 'neutral', ears: 'flat',  arms: 'book',   body: 'anim-breathe' },
  writing:   { eyes: 'focus',    mouth: 'focus',   ears: 'flat',  arms: 'pencil', body: '' },
}

/* ---- Eyes ------------------------------------------------------------------ */
function Eye({ cx, cy, state }) {
  // Happy / closed eyes are drawn as upward arcs (joyful squint)
  if (state === 'squint' || state === 'closed') {
    return (
      <path
        d={`M ${cx - 15} ${cy + 3} Q ${cx} ${cy - 14} ${cx + 15} ${cy + 3}`}
        fill="none" stroke={C.pupil} strokeWidth="5" strokeLinecap="round"
      />
    )
  }

  // Pupil offset for directional looks
  let dx = 0, dy = 0, scleraRy = 19
  if (state === 'upleft') { dx = -4; dy = -5 }
  if (state === 'down' || state === 'focus') { dy = 5 }
  if (state === 'sad') { dy = 4; scleraRy = 16 }
  if (state === 'wide') { scleraRy = 22 }

  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="16" ry={scleraRy} fill="#fff" />
      {state === 'sad' && (
        <path d={`M ${cx - 17} ${cy - 14} Q ${cx} ${cy - 22} ${cx + 17} ${cy - 14}`}
          fill={C.body} stroke="none" />
      )}
      {/* thin blue rim */}
      <ellipse cx={cx + dx} cy={cy + dy} rx="13" ry={Math.min(16, scleraRy - 1)} fill={C.iris} />
      {/* big near-black eye */}
      <ellipse cx={cx + dx} cy={cy + dy + 0.5} rx="11.5" ry={Math.min(14.5, scleraRy - 2.5)} fill={C.pupil} />
      {/* highlights */}
      <circle cx={cx + dx + 3.5} cy={cy + dy - 5} r="3.4" fill="#fff" />
      <circle cx={cx + dx - 3.5} cy={cy + dy + 4} r="1.7" fill="#fff" opacity="0.7" />
    </g>
  )
}

/* ---- Mouth ----------------------------------------------------------------- */
function Mouth({ type }) {
  const cx = 100, y = 112
  switch (type) {
    case 'grin':
      return (
        <g>
          <path d={`M ${cx - 22} ${y} Q ${cx} ${y + 22} ${cx + 22} ${y}
                    Q ${cx} ${y + 6} ${cx - 22} ${y} Z`} fill={C.mouth} />
          <path d={`M ${cx - 16} ${y + 1} L ${cx + 16} ${y + 1} L ${cx + 13} ${y + 6}
                    L ${cx - 13} ${y + 6} Z`} fill={C.tooth} />
        </g>
      )
    case 'bigGrin':
      return (
        <g>
          <path d={`M ${cx - 27} ${y - 2} Q ${cx} ${y + 30} ${cx + 27} ${y - 2}
                    Q ${cx} ${y + 4} ${cx - 27} ${y - 2} Z`} fill={C.mouth} />
          <path d={`M ${cx - 20} ${y} L ${cx + 20} ${y} L ${cx + 16} ${y + 7}
                    L ${cx - 16} ${y + 7} Z`} fill={C.tooth} />
          <ellipse cx={cx} cy={y + 16} rx="9" ry="6" fill={C.tongue} />
        </g>
      )
    case 'open':
      return (
        <g>
          <ellipse cx={cx} cy={y + 6} rx="14" ry="16" fill={C.mouth} />
          <ellipse cx={cx} cy={y + 13} rx="7" ry="6" fill={C.tongue} />
        </g>
      )
    case 'frown':
      return <path d={`M ${cx - 18} ${y + 12} Q ${cx} ${y - 2} ${cx + 18} ${y + 12}`}
        fill="none" stroke={C.mouth} strokeWidth="4.5" strokeLinecap="round" />
    case 'neutral':
      return <path d={`M ${cx - 14} ${y + 4} Q ${cx} ${y + 8} ${cx + 14} ${y + 4}`}
        fill="none" stroke={C.mouth} strokeWidth="4.5" strokeLinecap="round" />
    case 'focus':
      return (
        <g>
          <path d={`M ${cx - 12} ${y + 3} Q ${cx} ${y + 8} ${cx + 12} ${y + 3}`}
            fill="none" stroke={C.mouth} strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx={cx + 12} cy={y + 8} rx="6" ry="5" fill={C.tongue} />
        </g>
      )
    case 'smile':
    default:
      return (
        <g>
          <path d={`M ${cx - 18} ${y} Q ${cx} ${y + 18} ${cx + 18} ${y}`}
            fill="none" stroke={C.mouth} strokeWidth="4.5" strokeLinecap="round" />
          <path d={`M ${cx - 9} ${y + 6} L ${cx + 9} ${y + 6} L ${cx + 7} ${y + 9}
                    L ${cx - 7} ${y + 9} Z`} fill={C.tooth} />
        </g>
      )
  }
}

/* ---- Ear — large, rounded, swept up-and-out with mauve inner lining -------- */
function Ear({ side, state }) {
  const mirror = side === 'left' ? 1 : -1   // left = viewer-left
  // Outward lean of the ear (degrees from vertical). Bigger = more swept/drooped.
  const rot = { up: 26, perk: 12, droop: 60, flat: 82 }[state] ?? 26
  const bx = 100 + mirror * 24    // base sits on top of the head
  const by = 48
  return (
    <g transform={`rotate(${mirror * rot} ${bx} ${by})`}>
      {/* outer ear — broad rounded paddle with a wide domed top */}
      <path
        d={`M ${bx - 22} ${by + 4}
            C ${bx - 33} ${by - 30}, ${bx - 31} ${by - 66}, ${bx - 14} ${by - 78}
            Q ${bx + mirror * 2} ${by - 90}, ${bx + 16} ${by - 76}
            C ${bx + 31} ${by - 64}, ${bx + 31} ${by - 30}, ${bx + 20} ${by + 6} Z`}
        fill={C.body} stroke={C.shadow} strokeWidth="2.5" strokeLinejoin="round"
      />
      {/* mauve inner lining (fills most of the ear) */}
      <path
        d={`M ${bx - 13} ${by}
            C ${bx - 22} ${by - 28}, ${bx - 20} ${by - 56}, ${bx - 7} ${by - 65}
            Q ${bx + mirror * 1} ${by - 73}, ${bx + 9} ${by - 64}
            C ${bx + 20} ${by - 55}, ${bx + 20} ${by - 28}, ${bx + 13} ${by + 1} Z`}
        fill={C.innerEar}
      />
      {/* small notch on the viewer-right ear, like the reference */}
      {side === 'right' && (
        <path d={`M ${bx + 26} ${by - 46} q -10 6 0 11`} fill={C.shadow} opacity="0.9" />
      )}
    </g>
  )
}

/* ---- Arm (held items + gestures handled per pose) -------------------------- */
function Claws({ x, y, mirror = 1 }) {
  x = Number(x); y = Number(y)
  return (
    <g stroke={C.shadow} strokeWidth="1.6" strokeLinecap="round">
      <line x1={x} y1={y} x2={x - mirror * 3} y2={y + 5} />
      <line x1={x + mirror * 4} y1={y} x2={x + mirror * 3} y2={y + 6} />
      <line x1={x + mirror * 8} y1={y} x2={x + mirror * 9} y2={y + 5} />
    </g>
  )
}

/* ============================================================================ */
function StitchSVG({ pose }) {
  const cfg = POSES[pose] || POSES.idle
  const slumpY = cfg.slump ? 8 : 0

  /* Arms vary the most by pose; render per arm-mode. */
  const renderArms = () => {
    switch (cfg.arms) {
      case 'up':
        return (
          <>
            <g transform="rotate(35 52 150)">
              <ellipse cx="44" cy="120" rx="13" ry="22" fill={C.body} stroke={C.shadow} strokeWidth="2.5" />
              <Claws x="40" y="100" mirror={1} />
            </g>
            <g transform="rotate(-35 148 150)">
              <ellipse cx="156" cy="120" rx="13" ry="22" fill={C.body} stroke={C.shadow} strokeWidth="2.5" />
              <Claws x="152" y="100" mirror={-1} />
            </g>
          </>
        )
      case 'out':
        return (
          <>
            <ellipse cx="36" cy="150" rx="22" ry="12" fill={C.body} stroke={C.shadow} strokeWidth="2.5" transform="rotate(-12 36 150)" />
            <ellipse cx="164" cy="150" rx="22" ry="12" fill={C.body} stroke={C.shadow} strokeWidth="2.5" transform="rotate(12 164 150)" />
          </>
        )
      case 'wave':
        return (
          <>
            <ellipse cx="42" cy="152" rx="13" ry="22" fill={C.body} stroke={C.shadow} strokeWidth="2.5" transform="rotate(-14 42 150)" />
            <motion.g
              style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
              animate={{ rotate: [10, -22, 10, -22, 10] }}
              transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.4 }}
            >
              <ellipse cx="158" cy="124" rx="13" ry="23" fill={C.body} stroke={C.shadow} strokeWidth="2.5" />
              <Claws x="154" y="104" mirror={-1} />
            </motion.g>
          </>
        )
      case 'chin':
        return (
          <>
            <ellipse cx="40" cy="156" rx="13" ry="20" fill={C.body} stroke={C.shadow} strokeWidth="2.5" transform="rotate(-10 40 152)" />
            {/* hand to chin */}
            <g transform="rotate(40 150 150)">
              <ellipse cx="150" cy="132" rx="12" ry="20" fill={C.body} stroke={C.shadow} strokeWidth="2.5" />
            </g>
            <ellipse cx="118" cy="118" rx="11" ry="9" fill={C.body} stroke={C.shadow} strokeWidth="2.5" />
          </>
        )
      case 'book':
        return (
          <>
            <ellipse cx="46" cy="150" rx="13" ry="18" fill={C.body} stroke={C.shadow} strokeWidth="2.5" transform="rotate(28 46 150)" />
            <ellipse cx="154" cy="150" rx="13" ry="18" fill={C.body} stroke={C.shadow} strokeWidth="2.5" transform="rotate(-28 154 150)" />
          </>
        )
      case 'pencil':
        return (
          <>
            <ellipse cx="44" cy="152" rx="13" ry="20" fill={C.body} stroke={C.shadow} strokeWidth="2.5" transform="rotate(-12 44 150)" />
            <g transform="rotate(-28 150 150)">
              <ellipse cx="150" cy="138" rx="12" ry="20" fill={C.body} stroke={C.shadow} strokeWidth="2.5" />
            </g>
          </>
        )
      case 'down':
      default:
        return (
          <>
            <ellipse cx="40" cy="152" rx="13" ry="22" fill={C.body} stroke={C.shadow} strokeWidth="2.5" transform="rotate(-12 40 150)" />
            <ellipse cx="160" cy="152" rx="13" ry="22" fill={C.body} stroke={C.shadow} strokeWidth="2.5" transform="rotate(12 160 150)" />
            <Claws x="34" y="170" mirror={1} />
            <Claws x="158" y="170" mirror={-1} />
          </>
        )
    }
  }

  /* Held props in front of the body */
  const renderHeld = () => {
    if (cfg.arms === 'book') {
      return (
        <g>
          <rect x="62" y="140" width="76" height="48" rx="4" fill="#fff" stroke={C.shadow} strokeWidth="2" />
          <line x1="100" y1="140" x2="100" y2="188" stroke={C.shadow} strokeWidth="2" />
          <rect x="62" y="140" width="76" height="48" rx="4" fill="none" stroke="#C98A3A" strokeWidth="3" />
          {[148, 156, 164, 172].map(yy => (
            <g key={yy}>
              <line x1="68" y1={yy} x2="94" y2={yy} stroke="#9DB0C0" strokeWidth="1.6" />
              <line x1="106" y1={yy} x2="132" y2={yy} stroke="#9DB0C0" strokeWidth="1.6" />
            </g>
          ))}
        </g>
      )
    }
    if (cfg.arms === 'pencil') {
      return (
        <g transform="rotate(-28 150 150)">
          <rect x="146" y="96" width="8" height="46" rx="2" fill="#FFC93C" stroke={C.shadow} strokeWidth="1.5" />
          <path d="M 146 96 L 150 86 L 154 96 Z" fill="#F4A259" stroke={C.shadow} strokeWidth="1.2" />
          <path d="M 148.5 90 L 150 86 L 151.5 90 Z" fill={C.pupil} />
          <rect x="146" y="138" width="8" height="6" rx="1.5" fill="#FF7B96" />
        </g>
      )
    }
    return null
  }

  return (
    <svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
      <defs>
        <radialGradient id="stitchBody" cx="40%" cy="32%" r="75%">
          <stop offset="0%" stopColor={C.light} />
          <stop offset="70%" stopColor={C.body} />
          <stop offset="100%" stopColor={C.shadow} />
        </radialGradient>
        <radialGradient id="stitchHead" cx="42%" cy="34%" r="72%">
          <stop offset="0%" stopColor={C.light} />
          <stop offset="72%" stopColor={C.body} />
          <stop offset="100%" stopColor={C.shadow} />
        </radialGradient>
      </defs>

      <g className={cfg.body} transform={`translate(0 ${slumpY})`} style={{ transformOrigin: '100px 200px' }}>
        {/* Ears (behind head) */}
        <Ear side="left" state={cfg.ears} />
        <Ear side="right" state={cfg.ears} />

        {/* Antenna nub */}
        <line x1="100" y1="30" x2="100" y2="18" stroke={C.shadow} strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="15" r="5" fill={C.light} stroke={C.shadow} strokeWidth="1.5" />

        {/* Legs / feet (behind body) */}
        <ellipse cx="74" cy="196" rx="18" ry="13" fill={C.body} stroke={C.shadow} strokeWidth="2.5" />
        <ellipse cx="126" cy="196" rx="18" ry="13" fill={C.body} stroke={C.shadow} strokeWidth="2.5" />
        <ellipse cx="74" cy="200" rx="11" ry="5" fill={C.belly} opacity="0.5" />
        <ellipse cx="126" cy="200" rx="11" ry="5" fill={C.belly} opacity="0.5" />

        {/* Arms behind/around body */}
        {renderArms()}

        {/* Body */}
        <ellipse cx="100" cy="150" rx="56" ry="48" fill="url(#stitchBody)" stroke={C.shadow} strokeWidth="2.5" />
        <ellipse cx="100" cy="158" rx="34" ry="34" fill={C.belly} opacity="0.6" />

        {/* Head */}
        <ellipse cx="100" cy="78" rx="62" ry="56" fill="url(#stitchHead)" stroke={C.shadow} strokeWidth="2.5" />
        {/* Face lighter patch */}
        <ellipse cx="100" cy="92" rx="40" ry="30" fill={C.belly} opacity="0.45" />

        {/* Blush */}
        {cfg.blush && (
          <>
            <ellipse cx="62" cy="96" rx="11" ry="7" fill={C.blush} opacity="0.55" />
            <ellipse cx="138" cy="96" rx="11" ry="7" fill={C.blush} opacity="0.55" />
          </>
        )}

        {/* Eyes */}
        <Eye cx={78} cy={74} state={cfg.eyes} />
        <Eye cx={122} cy={74} state={cfg.eyes} />

        {/* Nose — large, rounded, navy, with a soft highlight + philtrum line */}
        <path d="M 88 95 Q 100 86 112 95 Q 114 105 100 108 Q 86 105 88 95 Z" fill={C.nose} />
        <ellipse cx="96" cy="94" rx="3.5" ry="2.2" fill="#42557e" opacity="0.7" />
        <path d="M100 108 V112.5" stroke={C.nose} strokeWidth="2.5" strokeLinecap="round" />

        {/* Mouth */}
        <Mouth type={cfg.mouth} />

        {/* Held props in front */}
        {renderHeld()}
      </g>
    </svg>
  )
}

export default function Stitch({ pose = 'idle', size = 200, className = '' }) {
  return (
    <div
      style={{ width: size, height: size * 1.05 }}
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <StitchSVG pose={pose} />
    </div>
  )
}
