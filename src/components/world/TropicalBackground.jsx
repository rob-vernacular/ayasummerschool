/* ============================================================================
   TropicalBackground — the layered world the whole app lives inside.
   Sky + sun + drifting clouds, swaying palms, a 3-layer animated ocean, and a
   warm sand beach. Pure SVG/CSS, fixed behind content. Variants retint the
   sky/ocean so each child's chosen "world" feels different.

   Props:
     variant   'beach' | 'ocean' | 'sunset' | 'twilight'   (default 'beach')
     showSand  boolean  (default true)  — show the beach strip
     children  optional foreground content rendered above the scene
   ========================================================================== */

const VARIANTS = {
  beach:    { skyTop: '#87CEEB', skyBottom: '#C8E6F5', sun: true,  oceanFront: '#4FC3F7' },
  ocean:    { skyTop: '#4FC3F7', skyBottom: '#1B6CA8', sun: false, oceanFront: '#2196F3' },
  sunset:   { skyTop: '#FFB07C', skyBottom: '#FF8E72', sun: true,  oceanFront: '#FF8E53' },
  twilight: { skyTop: '#5B3A9B', skyBottom: '#7B1FA2', sun: false, oceanFront: '#4FC3F7' },
  grove:    { skyTop: '#9CD67D', skyBottom: '#2E7D32', sun: true,  oceanFront: '#3FA34D' },
  cave:     { skyTop: '#7E57C2', skyBottom: '#4A148C', sun: false, oceanFront: '#5E35B1' },
  island:   { skyTop: '#FFD56B', skyBottom: '#F57F17', sun: true,  oceanFront: '#FFB300' },
}

function Cloud({ style, scale = 1 }) {
  return (
    <svg width={120 * scale} height={50 * scale} viewBox="0 0 120 50" className="absolute" style={style} aria-hidden="true">
      <g fill="#fff" opacity="0.9">
        <ellipse cx="40" cy="32" rx="26" ry="18" />
        <ellipse cx="64" cy="26" rx="22" ry="20" />
        <ellipse cx="86" cy="34" rx="22" ry="15" />
        <rect x="30" y="32" width="64" height="16" rx="8" />
      </g>
    </svg>
  )
}

function PalmTree({ flip = false, style }) {
  return (
    <div className="absolute" style={{ bottom: '26%', zIndex: 1, transform: flip ? 'scaleX(-1)' : 'none', ...style }} aria-hidden="true">
    <svg width="140" height="230" viewBox="0 0 150 240" className="anim-palm-sway block"
      style={{ transformOrigin: 'bottom center' }} aria-hidden="true">
      {/* trunk */}
      <path d="M70 240 C66 180 60 130 74 70 C76 64 84 64 86 72 C74 130 80 180 86 240 Z"
        fill="#6B4423" stroke="#5A3A1E" strokeWidth="2" />
      {[...Array(5)].map((_, i) => (
        <line key={i} x1="68" y1={210 - i * 28} x2="86" y2={206 - i * 28} stroke="#5A3A1E" strokeWidth="2" opacity="0.5" />
      ))}
      {/* fronds */}
      <g fill="#2D5A27" stroke="#234A1F" strokeWidth="1.5">
        <path d="M80 70 C40 50 18 56 6 74 C30 60 56 64 80 76 Z" />
        <path d="M80 70 C52 36 30 30 12 36 C40 36 62 50 82 72 Z" />
        <path d="M80 70 C92 32 116 24 138 32 C108 34 90 50 84 72 Z" />
        <path d="M80 70 C116 52 140 58 150 78 C124 64 100 66 82 78 Z" />
        <path d="M80 70 C74 34 80 14 96 4 C86 28 86 50 86 72 Z" />
      </g>
      <g fill="#3A6B33">
        <circle cx="78" cy="66" r="5" />
        <circle cx="86" cy="70" r="4" />
        <circle cx="72" cy="70" r="3.5" />
      </g>
    </svg>
    </div>
  )
}

function Hibiscus({ size = 90, petal = '#FF6FA5', center = '#FFD54A', style, sway = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="absolute anim-palm-sway"
      style={{ transformOrigin: 'bottom center', animationDelay: `${sway}s`, ...style }} aria-hidden="true">
      {[0, 72, 144, 216, 288].map(a => (
        <g key={a} transform={`rotate(${a} 50 52)`}>
          <path d="M50 52 C 26 38, 26 8, 50 6 C 74 8, 74 38, 50 52 Z" fill={petal} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          <path d="M50 52 C 40 40, 40 18, 50 14 C 60 18, 60 40, 50 52 Z" fill="#fff" opacity="0.18" />
        </g>
      ))}
      <circle cx="50" cy="52" r="12" fill={center} />
      <circle cx="50" cy="52" r="6" fill="#fff" opacity="0.45" />
      {/* stamen */}
      <path d="M50 52 q 8 -20 18 -28" stroke={center} strokeWidth="3" fill="none" strokeLinecap="round" />
      {[0,1,2,3,4].map(i => <circle key={i} cx={60 + i * 2.2} cy={30 - i * 4} r="2.2" fill="#FFB300" />)}
    </svg>
  )
}

function BigLeaf({ size = 150, color = '#2D5A27', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className="absolute" style={style} aria-hidden="true">
      <path d="M60 116 C 14 96, 8 36, 60 6 C 112 36, 106 96, 60 116 Z" fill={color} stroke="#234A1F" strokeWidth="2" />
      <path d="M60 116 V 14" stroke="#234A1F" strokeWidth="2.5" fill="none" opacity="0.6" />
      {[30, 50, 70, 90].map(y => (
        <g key={y} stroke="#234A1F" strokeWidth="1.6" opacity="0.5" fill="none">
          <path d={`M60 ${y} Q 40 ${y - 6} 26 ${y + 8}`} />
          <path d={`M60 ${y} Q 80 ${y - 6} 94 ${y + 8}`} />
        </g>
      ))}
      {/* split notches for a monstera feel */}
      <path d="M60 116 C 30 96 24 60 30 40 L 36 44 C 32 64 40 92 60 110 Z" fill="#3A6B33" opacity="0.5" />
    </svg>
  )
}

function Monstera({ size = 150, color = '#2D5A27', style }) {
  // Single evenodd path: outer leaf + inner holes (fenestrations) that show
  // the background through, regardless of what's behind.
  const d = [
    'M60 128 C 16 112 6 56 30 22 C 42 4 78 4 90 22 C 114 56 104 112 60 128 Z',
    // left fenestrations (teardrops toward midrib)
    'M50 38 q -16 3 -21 15 q 15 1 24 -8 Z',
    'M48 64 q -20 3 -25 15 q 17 1 27 -8 Z',
    'M50 90 q -17 3 -21 13 q 14 1 24 -7 Z',
    // right fenestrations
    'M70 38 q 16 3 21 15 q -15 1 -24 -8 Z',
    'M72 64 q 20 3 25 15 q -17 1 -27 -8 Z',
    'M70 90 q 17 3 21 13 q -14 1 -24 -7 Z',
  ].join(' ')
  return (
    <svg width={size} height={size} viewBox="0 0 120 130" className="absolute anim-palm-sway"
      style={{ transformOrigin: 'bottom center', ...style }} aria-hidden="true">
      <path d={d} fillRule="evenodd" fill={color} stroke="#234A1F" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 128 V18" stroke="#234A1F" strokeWidth="2.5" fill="none" opacity="0.55" />
      {[34, 56, 80, 102].map(y => (
        <g key={y} stroke="#234A1F" strokeWidth="1.5" opacity="0.45" fill="none">
          <path d={`M60 ${y} q -16 -5 -28 4`} />
          <path d={`M60 ${y} q 16 -5 28 4`} />
        </g>
      ))}
    </svg>
  )
}

function Foliage() {
  return (
    <>
      {/* Big leaves draping from the top corners */}
      <Monstera size={185} color="#2E7D32" style={{ top: -64, left: -54, transform: 'rotate(146deg)' }} />
      <BigLeaf  size={120} color="#3A6B33" style={{ top: -34, left: 40, transform: 'rotate(120deg)' }} />
      <Monstera size={170} color="#2E7D32" style={{ top: -58, right: -50, transform: 'rotate(-146deg)' }} />
      <BigLeaf  size={110} color="#3A6B33" style={{ top: -30, right: 38, transform: 'rotate(-120deg)' }} />

      {/* Bottom-left bloom cluster — tucked into the corner */}
      <div className="absolute left-0 bottom-0" style={{ zIndex: 2 }}>
        <Monstera size={150} color="#2E7D32" style={{ bottom: -34, left: -48, transform: 'rotate(34deg)' }} />
        <BigLeaf  size={104} color="#3A8C3E" style={{ bottom: -18, left: 18, transform: 'rotate(8deg)' }} />
        <Hibiscus size={104} petal="#FF5E8A" center="#FFD54A" style={{ bottom: -14, left: -24 }} sway={0} />
        <Hibiscus size={78}  petal="#FFB13C" center="#E8552B" style={{ bottom: 40, left: 18 }} sway={0.6} />
        <Hibiscus size={62}  petal="#B86BD6" center="#FFE08A" style={{ bottom: 84, left: -6 }} sway={1.1} />
        <Hibiscus size={52}  petal="#FFD23C" center="#E8552B" style={{ bottom: -8, left: 52 }} sway={1.6} />
      </div>

      {/* Bottom-right bloom cluster — tucked into the corner */}
      <div className="absolute right-0 bottom-0" style={{ zIndex: 2 }}>
        <Monstera size={150} color="#2E7D32" style={{ bottom: -34, right: -48, transform: 'rotate(-34deg)' }} />
        <BigLeaf  size={104} color="#3A8C3E" style={{ bottom: -18, right: 18, transform: 'rotate(-8deg)' }} />
        <Hibiscus size={100} petal="#FF8A3C" center="#FFE36B" style={{ bottom: -12, right: -24 }} sway={0.3} />
        <Hibiscus size={76}  petal="#FF5E8A" center="#FFD54A" style={{ bottom: 42, right: 18 }} sway={0.9} />
        <Hibiscus size={60}  petal="#B86BD6" center="#FFE08A" style={{ bottom: 86, right: -4 }} sway={1.3} />
        <Hibiscus size={52}  petal="#FFD23C" center="#E8552B" style={{ bottom: -8, right: 52 }} sway={1.8} />
      </div>
    </>
  )
}

function Wave({ color, opacity, duration, top, delay = 0 }) {
  // 200%-wide tiling path animated leftward for a seamless loop.
  return (
    <div className="absolute left-0 w-[200%] anim-wave" style={{ top, height: 70, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
        <path
          d="M0,30 C120,10 240,50 360,30 C480,10 600,50 720,30 C840,10 960,50 1080,30 C1200,10 1320,50 1440,30 L1440,70 L0,70 Z"
          fill={color} opacity={opacity}
        />
      </svg>
    </div>
  )
}

export default function TropicalBackground({ variant = 'beach', showSand = true, flowers = true, children, className = '' }) {
  const v = VARIANTS[variant] || VARIANTS.beach

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Layer 1 — sky */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${v.skyTop} 0%, ${v.skyBottom} 60%)` }} />

      {/* Sun */}
      {v.sun && (
        <div className="absolute" style={{ top: '5%', right: '8%' }}>
          <div className="absolute rounded-full anim-glow-sun"
            style={{ width: 150, height: 150, left: -40, top: -40,
              background: 'radial-gradient(circle, rgba(255,215,0,0.55) 0%, rgba(255,215,0,0) 70%)' }} />
          <div className="rounded-full" style={{ width: 70, height: 70, background: 'radial-gradient(circle at 40% 35%, #FFF3B0, #FFD700)' }} />
        </div>
      )}

      {/* Clouds */}
      <div className="absolute" style={{ top: '12%', left: '0', animation: 'cloud-drift 22s ease-in-out infinite alternate' }}>
        <Cloud style={{ left: '10%', top: 0 }} scale={1} />
      </div>
      <div className="absolute" style={{ top: '22%', left: '0', animation: 'cloud-drift 30s ease-in-out infinite alternate-reverse' }}>
        <Cloud style={{ left: '55%', top: 0 }} scale={0.7} />
      </div>
      <div className="absolute" style={{ top: '6%', left: '0', animation: 'cloud-drift 26s ease-in-out infinite alternate' }}>
        <Cloud style={{ left: '35%', top: 0 }} scale={0.55} />
      </div>

      {/* Layer 2 — palm trees */}
      <PalmTree style={{ left: -40 }} />
      <PalmTree flip style={{ right: -40 }} />

      {/* Layer 3 — ocean band (bottom third) */}
      <div className="absolute left-0 right-0 bottom-0" style={{ height: '34%' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${v.oceanFront} 0%, #0D47A1 100%)` }} />
        <Wave color="#1B6CA8" opacity={0.6} duration={8} top={-6} />
        <Wave color="#2196F3" opacity={0.7} duration={6} top={4} delay={-2} />
        <Wave color={v.oceanFront} opacity={0.9} duration={4} top={14} delay={-1} />
      </div>

      {/* Layer 4 — sand beach strip */}
      {showSand && (
        <div className="absolute left-0 right-0" style={{ bottom: '30%', height: 90 }}>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
            <path d="M0,28 C240,8 480,38 720,22 C960,8 1200,32 1440,18 L1440,90 L0,90 Z" fill="#F5DEB3" />
            <path d="M0,28 C240,8 480,38 720,22 C960,8 1200,32 1440,18 L1440,34 L0,38 Z" fill="#FFE9C2" opacity="0.7" />
          </svg>
          {/* sand grain texture */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(150,110,50,0.18) 1px, transparent 1.5px)',
            backgroundSize: '14px 14px', maskImage: 'linear-gradient(to bottom, transparent, black 40%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%)',
          }} />
        </div>
      )}

      {/* Layer 5 — lush flowers & leaves framing the corners */}
      {flowers && <Foliage />}

      {children}
    </div>
  )
}
