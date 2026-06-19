import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllProfiles, createProfile } from '../lib/db'
import { setActiveProfileId } from '../lib/session'
import Stitch from '../components/characters/Stitch'
import TropicalBackground from '../components/world/TropicalBackground'
import SpeechBubble from '../components/ui/SpeechBubble'
import { FlameIcon, ArrowRightIcon } from '../components/icons'

const AVATAR_COLORS = ['#FF6B6B','#FFD700','#4FC3F7','#56C271','#c4b5fd','#f9a8d4','#1B6CA8','#ff9f43']
const BACKGROUNDS = [
  { id: 'tropical_beach', label: 'Tropical Beach', variant: 'beach' },
  { id: 'ocean_world',    label: 'Ocean World',    variant: 'ocean' },
  { id: 'rainbow_sky',    label: 'Rainbow Sky',    variant: 'twilight' },
]

function MiniScene({ variant }) {
  return (
    <div className="relative w-full h-16 rounded-2xl overflow-hidden border-2 border-white/60">
      <TropicalBackground variant={variant} showSand />
    </div>
  )
}

function ProfileCard({ profile, index, onSelect }) {
  return (
    <motion.button
      className="flex-shrink-0 w-40 rounded-3xl overflow-hidden shadow-card active:scale-95"
      whileHover={{ scale: 1.05, rotate: -1 }}
      whileTap={{ scale: 0.93 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 220, damping: 18 }}
      onClick={() => onSelect(profile.id)}
    >
      {/* Top — avatar */}
      <div className="h-28 flex items-center justify-center anim-float"
        style={{ background: `linear-gradient(135deg, ${profile.avatar_color || '#4FC3F7'}, ${profile.avatar_color || '#1B6CA8'}cc)`,
                 animationDelay: `${index * 0.3}s` }}>
        <div className="w-16 h-16 rounded-full bg-white/30 border-2 border-white/70 flex items-center justify-center
          text-white text-3xl font-fredoka shadow-inner">
          {(profile.display_name || 'A')[0].toUpperCase()}
        </div>
      </div>
      {/* Bottom — frosted name plate */}
      <div className="glass-strong px-3 py-3 flex flex-col items-center gap-1">
        <span className="font-fredoka text-lg text-midnight leading-tight text-center truncate w-full">
          {profile.display_name}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-nunito text-xs font-700 text-midnight/70 bg-white/60 px-2 py-0.5 rounded-full">
            Level {profile.level || 1}
          </span>
          {profile.streak_current > 0 && (
            <span className="flex items-center gap-1 text-xs font-700 text-coral-dark">
              <FlameIcon size={14} /> {profile.streak_current}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

function NewProfileFlow({ onComplete, onCancel }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [color, setColor] = useState(AVATAR_COLORS[0])
  const [bg, setBg] = useState(BACKGROUNDS[0].id)
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!name.trim()) return
    setLoading(true)
    try {
      const profile = await createProfile(name.trim().toLowerCase().replace(/\s+/g, '_'), name.trim(), color, bg)
      onComplete(profile.id)
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <motion.div className="fixed inset-0 bg-midnight/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="bg-cream rounded-4xl p-7 max-w-md w-full shadow-float"
        initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>

        <div className="flex justify-center gap-2 mb-5">
          {[1,2,3].map(s => (
            <div key={s} className={`h-2.5 rounded-full transition-all ${s === step ? 'w-7 bg-ocean' : s < step ? 'w-2.5 bg-grass' : 'w-2.5 bg-black/10'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="text-center">
            <div className="flex justify-center mb-2"><Stitch pose="wave" size={120} /></div>
            <h2 className="font-fredoka text-3xl text-ocean mb-5">What's your name?</h2>
            <input
              type="text" value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(2)}
              placeholder="Type your name..."
              className="w-full text-center font-fredoka text-2xl bg-white border-3 border-coral rounded-2xl px-4 py-4 mb-6
                focus:outline-none focus:border-ocean text-midnight"
              autoFocus maxLength={20}
            />
            <button
              className={`btn-primary w-full flex items-center justify-center gap-2 ${!name.trim() ? 'opacity-50' : ''}`}
              disabled={!name.trim()} onClick={() => setStep(2)}>
              Next <ArrowRightIcon size={22} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h2 className="font-fredoka text-3xl text-ocean mb-1">Pick your color, {name}!</h2>
            <p className="font-nunito text-midnight/60 mb-5">Choose your avatar color</p>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {AVATAR_COLORS.map(c => (
                <motion.button key={c}
                  className={`w-full aspect-square rounded-2xl border-4 shadow-md transition-all
                    ${color === c ? 'border-midnight scale-110' : 'border-white'}`}
                  style={{ backgroundColor: c }}
                  whileTap={{ scale: 0.9 }} onClick={() => setColor(c)} />
              ))}
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary flex-1" onClick={() => setStep(3)}>Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="font-fredoka text-3xl text-ocean mb-1">Pick your world!</h2>
            <p className="font-nunito text-midnight/60 mb-4">Choose your background</p>
            <div className="flex flex-col gap-3 mb-6">
              {BACKGROUNDS.map(b => (
                <motion.button key={b.id}
                  className={`flex items-center gap-4 p-2 pr-4 rounded-2xl border-3 transition-all
                    ${bg === b.id ? 'border-ocean bg-sky/10' : 'border-black/10 bg-white'}`}
                  whileTap={{ scale: 0.97 }} onClick={() => setBg(b.id)}>
                  <div className="w-24"><MiniScene variant={b.variant} /></div>
                  <span className="font-fredoka text-lg text-midnight">{b.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => setStep(2)}>← Back</button>
              <button className={`btn-gold flex-1 ${loading ? 'opacity-70' : ''}`} disabled={loading} onClick={handleCreate}>
                {loading ? 'Creating...' : "Let's Go!"}
              </button>
            </div>
          </div>
        )}

        <button className="w-full mt-3 text-center font-nunito text-sm text-midnight/40 py-2" onClick={onCancel}>Cancel</button>
      </motion.div>
    </motion.div>
  )
}

export default function ProfileSelection() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getAllProfiles().then(data => {
      setProfiles(data || [])
      setLoading(false)
    })
  }, [])

  const handleSelect = (id) => {
    setActiveProfileId(id)
    navigate('/home')
  }

  const handleNewComplete = (id) => {
    setActiveProfileId(id)
    navigate('/onboarding')
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <TropicalBackground variant="beach" />

      {/* Stitch greeter */}
      <div className="relative z-10 flex flex-col items-center pt-10 px-6">
        <div className="anim-float-slow"><Stitch pose="wave" size={150} /></div>
        <SpeechBubble className="mt-1 max-w-[300px]" tail="bottom">
          <span className="font-fredoka text-lg text-midnight">Who's playing today?</span>
        </SpeechBubble>
        <p className="font-nunito font-700 text-white/90 text-shadow-soft mt-3">Tap your name to start!</p>
      </div>

      {/* Profile cards */}
      <div className="relative z-10 flex-1 mt-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-white font-fredoka text-2xl animate-pulse text-shadow-soft">Loading players...</div>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto px-6 pb-6 min-h-[260px] items-center">
            {profiles.map((p, i) => (
              <ProfileCard key={p.id} profile={p} index={i} onSelect={handleSelect} />
            ))}

            {/* New player */}
            <motion.button
              className="flex-shrink-0 flex flex-col items-center justify-center gap-3 w-40 min-h-[180px]
                rounded-3xl border-3 border-dashed border-white/70 glass text-white active:scale-95"
              whileTap={{ scale: 0.93 }} whileHover={{ scale: 1.04 }}
              onClick={() => setShowNew(true)}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: profiles.length * 0.08 }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/20 border-2 border-white/60 text-4xl font-fredoka">+</div>
              <span className="font-fredoka text-base text-center text-shadow-soft">Add Player</span>
            </motion.button>
          </div>
        )}
      </div>

      <div className="relative z-10 pb-6 text-center">
        <p className="font-fredoka text-white/70 text-sm text-shadow-soft">Aya's Summer School</p>
      </div>

      {showNew && <NewProfileFlow onComplete={handleNewComplete} onCancel={() => setShowNew(false)} />}
    </div>
  )
}
