import { motion } from 'framer-motion'

/* ============================================================================
   Stitch — original blue-grey alien companion (an original stylized SVG, not a
   trace of any existing artwork). Rebuilt for correct proportions: very large
   round head (~60% of height), huge near-black eyes, wide flat nose, big
   wide-based ears with mauve inner lining, short stocky body.

   `pose` prop drives 10 poses. viewBox 0 0 200 240.
   ========================================================================== */

const C = {
  body:      '#4A5C8A',
  shadow:    '#2E3D6B',
  light:     '#6B7DB3',
  belly:     '#8B9DC3',
  earOut:    '#3A4A7A',
  earIn:     '#C4A0C0',
  nose:      '#1A1A2E',
  eye:       '#0A0A0A',
  mouth:     '#1A1A2E',
  claw:      '#2E3D6B',
  tongue:    '#E8788F',
  tooth:     '#FFFFFF',
  blush:     '#D98AA6',
}

const POSES = {
  idle:      { ears: 0.12, eyes: 'open',   mouth: 'smile',   arms: 'down',   legs: 'stand', headTilt: 4,  anim: 'anim-breathe' },
  happy:     { ears: 0,    eyes: 'squint', mouth: 'grin',    arms: 'up',     legs: 'stand', headTilt: 0,  anim: 'anim-bounce-in', blush: true },
  excited:   { ears: 0,    eyes: 'wide',   mouth: 'o',       arms: 'spread', legs: 'jump',  headTilt: 0,  anim: 'anim-jump',      blush: true },
  sad:       { ears: 1,    eyes: 'down',   mouth: 'frown',   arms: 'down',   legs: 'stand', headTilt: 0,  slump: true },
  thinking:  { ears: 0.45, eyes: 'upleft', mouth: 'neutral', arms: 'chin',   legs: 'stand', headTilt: -4 },
  wave:      { ears: 0.06, eyes: 'open',   mouth: 'smile',   arms: 'wave',   legs: 'stand', headTilt: 3,  anim: 'anim-breathe' },
  dance:     { ears: 0,    eyes: 'squint', mouth: 'grin',    arms: 'spread', legs: 'dance', headTilt: 0,  anim: 'anim-stitch-dance', blush: true },
  celebrate: { ears: 0,    eyes: 'closed', mouth: 'bigGrin', arms: 'up',     legs: 'jump',  headTilt: 0,  anim: 'anim-jump',      blush: true },
  reading:   { ears: 0.5,  eyes: 'down',   mouth: 'neutral', arms: 'book',   legs: 'sit',   headTilt: 0,  anim: 'anim-breathe' },
  writing:   { ears: 0.5,  eyes: 'down',   mouth: 'focus',   arms: 'pencil', legs: 'stand', headTilt: 0 },
}

/* ---- Ear: large, broad base, pointed tip, splayed outward; droop 0..1 ----- */
function Ear({ side, droop }) {
  // Canonical LEFT ear (points up-and-out to the left); right is mirrored.
  const bx = 74, by = 52            // base pivot on the head dome
  const rot = -(14 + droop * 58)    // splayed outward at rest, drops flat when sad
  const ear = (
    <g transform={`rotate(${rot} ${bx} ${by})`}>
      <path d="M 94 50 C 78 22, 50 -2, 28 -6 C 19 -7.5, 17 4, 25 17 C 42 41, 62 55, 80 62 Z"
        fill={C.earOut} stroke={C.shadow} strokeWidth="2" strokeLinejoin="round" />
      <path d="M 86 48 C 72 24, 50 8, 35 6 C 28 5, 27 12, 34 23 C 48 43, 63 53, 75 58 Z"
        fill={C.earIn} />
    </g>
  )
  return side === 'left' ? ear : <g transform="translate(200,0) scale(-1,1)">{ear}</g>
}

/* ---- Eye: huge near-black oval, inward top tilt, white highlights --------- */
function Eye({ cx, cy, side, state }) {
  const mir = side === 'left' ? 1 : -1

  if (state === 'squint' || state === 'closed') {
    return (
      <path d={`M ${cx - 20} ${cy + 4} Q ${cx} ${cy - 16} ${cx + 20} ${cy + 4}`}
        fill="none" stroke={C.eye} strokeWidth="6" strokeLinecap="round" />
    )
  }

  let rx = 21, ry = 25, dx = 0, dy = 0, lid = 0
  if (state === 'wide')   { rx = 23; ry = 26 }
  if (state === 'down')   { dy = 4; lid = 9 }
  if (state === 'upleft') { dx = -3; dy = -4 }

  return (
    <g transform={`rotate(${mir * 11} ${cx} ${cy})`}>
      {/* thin lighter ring */}
      <ellipse cx={cx} cy={cy} rx={rx + 1.8} ry={ry + 1.8} fill={C.light} opacity="0.8" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={C.eye} />
      {/* upper eyelid for downcast look */}
      {lid > 0 && <path d={`M ${cx - rx - 2} ${cy - 4} Q ${cx} ${cy - ry - 4} ${cx + rx + 2} ${cy - 4} L ${cx + rx + 2} ${cy - ry} L ${cx - rx - 2} ${cy - ry} Z`} fill={C.body} />}
      {/* highlights — large upper, tiny lower */}
      <ellipse cx={cx + 6 + dx} cy={cy - 9 + dy} rx="5" ry="6.5" fill="#fff" />
      <circle cx={cx + 2 + dx} cy={cy + 5 + dy} r="2.4" fill="#fff" />
    </g>
  )
}

/* ---- Mouth ---------------------------------------------------------------- */
function Mouth({ type }) {
  const cx = 100, y = 138
  switch (type) {
    case 'grin':
      return (
        <g>
          <path d={`M ${cx - 26} ${y} Q ${cx} ${y + 24} ${cx + 26} ${y} Q ${cx} ${y + 8} ${cx - 26} ${y} Z`} fill={C.mouth} />
          <path d={`M ${cx - 18} ${y + 1} L ${cx + 18} ${y + 1} L ${cx + 14} ${y + 7} L ${cx - 14} ${y + 7} Z`} fill={C.tooth} />
        </g>
      )
    case 'bigGrin':
      return (
        <g>
          <path d={`M ${cx - 30} ${y - 2} Q ${cx} ${y + 32} ${cx + 30} ${y - 2} Q ${cx} ${y + 6} ${cx - 30} ${y - 2} Z`} fill={C.mouth} />
          <path d={`M ${cx - 22} ${y} L ${cx + 22} ${y} L ${cx + 17} ${y + 8} L ${cx - 17} ${y + 8} Z`} fill={C.tooth} />
          <ellipse cx={cx} cy={y + 17} rx="9" ry="6" fill={C.tongue} />
        </g>
      )
    case 'o':
      return (
        <g>
          <ellipse cx={cx} cy={y + 6} rx="13" ry="15" fill={C.mouth} />
          <ellipse cx={cx} cy={y + 12} rx="7" ry="6" fill={C.tongue} />
        </g>
      )
    case 'frown':
      return <path d={`M ${cx - 16} ${y + 10} Q ${cx} ${y - 4} ${cx + 16} ${y + 10}`} fill="none" stroke={C.mouth} strokeWidth="4.5" strokeLinecap="round" />
    case 'neutral':
      return <path d={`M ${cx - 13} ${y + 3} Q ${cx} ${y + 8} ${cx + 13} ${y + 3}`} fill="none" stroke={C.mouth} strokeWidth="4.5" strokeLinecap="round" />
    case 'focus':
      return (
        <g>
          <path d={`M ${cx - 11} ${y + 2} Q ${cx} ${y + 7} ${cx + 11} ${y + 2}`} fill="none" stroke={C.mouth} strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx={cx + 12} cy={y + 7} rx="6" ry="5" fill={C.tongue} />
        </g>
      )
    case 'smile':
    default:
      return (
        <path d={`M ${cx - 17} ${y} Q ${cx} ${y + 16} ${cx + 17} ${y}`} fill="none" stroke={C.mouth} strokeWidth="4.5" strokeLinecap="round" />
      )
  }
}

function Claws({ x, y, mir = 1 }) {
  x = Number(x); y = Number(y)
  return (
    <g stroke={C.claw} strokeWidth="2" strokeLinecap="round">
      <line x1={x} y1={y} x2={x - mir * 3} y2={y + 6} />
      <line x1={x + mir * 5} y1={y} x2={x + mir * 4} y2={y + 7} />
      <line x1={x + mir * 10} y1={y} x2={x + mir * 11} y2={y + 6} />
    </g>
  )
}

function StitchSVG({ pose }) {
  const cfg = POSES[pose] || POSES.idle
  const slumpY = cfg.slump ? 8 : 0

  const renderArms = () => {
    const arm = (cxA, cyA, rot, k) => (
      <g key={k} transform={`rotate(${rot} ${cxA} ${cyA})`}>
        <ellipse cx={cxA} cy={cyA} rx="14" ry="22" fill={C.body} stroke={C.shadow} strokeWidth="2" />
        <ellipse cx={cxA} cy={cyA + 14} rx="11" ry="10" fill={C.light} opacity="0.5" />
      </g>
    )
    switch (cfg.arms) {
      case 'up':
        return (<>
          <g transform="rotate(38 46 175)">{arm(40, 150, 0, 'l')}<Claws x="33" y="126" mir={1} /></g>
          <g transform="rotate(-38 154 175)">{arm(160, 150, 0, 'r')}<Claws x="153" y="126" mir={-1} /></g>
        </>)
      case 'spread':
        return (<>
          <ellipse cx="34" cy="178" rx="22" ry="13" fill={C.body} stroke={C.shadow} strokeWidth="2" transform="rotate(-18 34 178)" />
          <ellipse cx="166" cy="178" rx="22" ry="13" fill={C.body} stroke={C.shadow} strokeWidth="2" transform="rotate(18 166 178)" />
        </>)
      case 'wave':
        return (<>
          {arm(42, 182, -14, 'l')}
          <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
            animate={{ rotate: [12, -22, 12, -22, 12] }} transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.4 }}>
            {arm(160, 150, 0, 'r')}<Claws x="153" y="126" mir={-1} />
          </motion.g>
        </>)
      case 'chin':
        return (<>
          {arm(40, 184, -10, 'l')}
          <g transform="rotate(46 150 178)">{arm(150, 158, 0, 'r')}</g>
          <ellipse cx="120" cy="150" rx="12" ry="10" fill={C.body} stroke={C.shadow} strokeWidth="2" />
        </>)
      case 'book':
        return (<>
          {arm(48, 178, 28, 'l')}
          {arm(152, 178, -28, 'r')}
        </>)
      case 'pencil':
        return (<>
          {arm(44, 184, -12, 'l')}
          <g transform="rotate(-30 150 178)">{arm(150, 166, 0, 'r')}</g>
        </>)
      case 'down':
      default:
        return (<>
          {arm(40, 182, -12, 'l')}<Claws x="32" y="202" mir={1} />
          {arm(160, 182, 12, 'r')}<Claws x="158" y="202" mir={-1} />
        </>)
    }
  }

  const renderLegs = () => {
    switch (cfg.legs) {
      case 'jump':
        return (<>
          <ellipse cx="76" cy="226" rx="18" ry="13" fill={C.body} stroke={C.shadow} strokeWidth="2" transform="rotate(-10 76 226)" />
          <ellipse cx="124" cy="226" rx="18" ry="13" fill={C.body} stroke={C.shadow} strokeWidth="2" transform="rotate(10 124 226)" />
        </>)
      case 'dance':
        return (<>
          <ellipse cx="74" cy="236" rx="18" ry="13" fill={C.body} stroke={C.shadow} strokeWidth="2" />
          <ellipse cx="128" cy="220" rx="18" ry="12" fill={C.body} stroke={C.shadow} strokeWidth="2" transform="rotate(24 128 220)" />
        </>)
      case 'sit':
        return (<>
          <ellipse cx="66" cy="232" rx="20" ry="12" fill={C.body} stroke={C.shadow} strokeWidth="2" />
          <ellipse cx="134" cy="232" rx="20" ry="12" fill={C.body} stroke={C.shadow} strokeWidth="2" />
        </>)
      case 'stand':
      default:
        return (<>
          <ellipse cx="76" cy="236" rx="19" ry="13" fill={C.body} stroke={C.shadow} strokeWidth="2" />
          <ellipse cx="124" cy="236" rx="19" ry="13" fill={C.body} stroke={C.shadow} strokeWidth="2" />
          <g stroke={C.claw} strokeWidth="2" strokeLinecap="round" opacity="0.8">
            <line x1="68" y1="240" x2="66" y2="232" /><line x1="76" y1="241" x2="76" y2="232" /><line x1="84" y1="240" x2="86" y2="232" />
            <line x1="116" y1="240" x2="114" y2="232" /><line x1="124" y1="241" x2="124" y2="232" /><line x1="132" y1="240" x2="134" y2="232" />
          </g>
        </>)
    }
  }

  const renderHeld = () => {
    if (cfg.arms === 'book') return (
      <g>
        <rect x="58" y="166" width="84" height="50" rx="4" fill="#fff" stroke={C.shadow} strokeWidth="2" />
        <line x1="100" y1="166" x2="100" y2="216" stroke={C.shadow} strokeWidth="2" />
        <rect x="58" y="166" width="84" height="50" rx="4" fill="none" stroke="#C98A3A" strokeWidth="3" />
        {[176,184,192,200].map(yy => <g key={yy}><line x1="64" y1={yy} x2="92" y2={yy} stroke="#9DB0C0" strokeWidth="1.6" /><line x1="108" y1={yy} x2="136" y2={yy} stroke="#9DB0C0" strokeWidth="1.6" /></g>)}
      </g>
    )
    if (cfg.arms === 'pencil') return (
      <g transform="rotate(-30 150 170)">
        <rect x="146" y="120" width="8" height="50" rx="2" fill="#FFC93C" stroke={C.shadow} strokeWidth="1.5" />
        <path d="M146 120 L150 108 L154 120 Z" fill="#F4A259" stroke={C.shadow} strokeWidth="1.2" />
        <path d="M148.5 113 L150 108 L151.5 113 Z" fill={C.nose} />
        <rect x="146" y="166" width="8" height="6" rx="1.5" fill="#FF7B96" />
      </g>
    )
    return null
  }

  return (
    <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
      <defs>
        <radialGradient id="stHead" cx="42%" cy="36%" r="72%">
          <stop offset="0%" stopColor={C.light} /><stop offset="68%" stopColor={C.body} /><stop offset="100%" stopColor={C.shadow} />
        </radialGradient>
        <radialGradient id="stBody" cx="42%" cy="32%" r="78%">
          <stop offset="0%" stopColor={C.light} /><stop offset="70%" stopColor={C.body} /><stop offset="100%" stopColor={C.shadow} />
        </radialGradient>
      </defs>

      <g className={cfg.anim || ''} transform={`translate(0 ${slumpY})`} style={{ transformOrigin: '100px 230px' }}>
        {/* legs + arms behind body */}
        {renderLegs()}
        {renderArms()}

        {/* body — short, wide, stocky */}
        <ellipse cx="100" cy="192" rx="64" ry="50" fill="url(#stBody)" stroke={C.shadow} strokeWidth="2.5" />
        <ellipse cx="100" cy="198" rx="42" ry="36" fill={C.belly} opacity="0.7" />
        {/* hint of the lower pair of arms tucked at the belly */}
        <path d="M44 188 q -8 10 2 22" fill="none" stroke={C.shadow} strokeWidth="2" opacity="0.4" />
        <path d="M156 188 q 8 10 -2 22" fill="none" stroke={C.shadow} strokeWidth="2" opacity="0.4" />

        {/* head group (tilts a touch by pose) */}
        <g transform={`rotate(${cfg.headTilt || 0} 100 96)`}>
          <Ear side="left" droop={cfg.ears} />
          <Ear side="right" droop={cfg.ears} />

          {/* huge round head */}
          <ellipse cx="100" cy="92" rx="80" ry="74" fill="url(#stHead)" stroke={C.shadow} strokeWidth="2.5" />
          {/* lighter lower-face patch */}
          <ellipse cx="100" cy="118" rx="54" ry="40" fill={C.belly} opacity="0.5" />

          {cfg.blush && (<>
            <ellipse cx="50" cy="120" rx="12" ry="7" fill={C.blush} opacity="0.5" />
            <ellipse cx="150" cy="120" rx="12" ry="7" fill={C.blush} opacity="0.5" />
          </>)}

          {/* eyes — the signature feature */}
          <Eye cx={68} cy={88} side="left" state={cfg.eyes} />
          <Eye cx={132} cy={88} side="right" state={cfg.eyes} />

          {/* wide flat nose with two nostrils */}
          <ellipse cx="100" cy="118" rx="17" ry="11" fill={C.nose} />
          <ellipse cx="93" cy="120" rx="3" ry="3.6" fill="#000" opacity="0.55" />
          <ellipse cx="107" cy="120" rx="3" ry="3.6" fill="#000" opacity="0.55" />
          <ellipse cx="95" cy="114" rx="4" ry="2.4" fill={C.light} opacity="0.5" />

          {/* philtrum + mouth */}
          <path d="M100 129 V134" stroke={C.nose} strokeWidth="2.5" strokeLinecap="round" />
          <Mouth type={cfg.mouth} />
        </g>

        {renderHeld()}
      </g>
    </svg>
  )
}

/* ---------------------------------------------------------------------------
   Optional custom artwork. Drop image files into  src/assets/stitch/  and they
   are used automatically (no other change needed):
     • a single  stitch.png  → used for every pose, OR
     • per-pose files named after the pose:  idle.png, happy.png, wave.png,
       excited.png, sad.png, thinking.png, dance.png, celebrate.png,
       reading.png, writing.png   (any missing pose falls back to stitch.png,
       then to the built-in SVG).
   Use transparent-background PNG/WebP. Only use artwork you have the right to use.
   --------------------------------------------------------------------------- */
const _customArt = import.meta.glob('../../assets/stitch/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' })
const ART = {}
for (const [path, url] of Object.entries(_customArt)) {
  const key = path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase()
  ART[key] = url
}
const ART_KEYS = Object.keys(ART)
function artFor(pose) {
  return ART[pose] || ART.default || ART.stitch || (ART_KEYS.length ? ART[ART_KEYS[0]] : null)
}

export default function Stitch({ pose = 'idle', size = 200, className = '' }) {
  const src = artFor(pose)
  return (
    <div style={{ width: size, height: size * 1.2 }} className={`select-none pointer-events-none ${className}`} aria-hidden="true">
      {src
        ? <img src={src} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        : <StitchSVG pose={pose} />}
    </div>
  )
}
