import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllProfiles, createProfile } from '../lib/db'
import { setActiveProfileId } from '../lib/session'
import Stitch from '../components/characters/Stitch'

const AVATAR_COLORS = ['#FF6B6B','#FFD700','#4FC3F7','#56C271','#c4b5fd','#f9a8d4','#1B6CA8','#ff9f43']
const BACKGROUNDS = [
  { id: 'tropical_beach', label: 'Tropical Beach', emoji: '🏖️', bg: 'from-sky-400 to-blue-600' },
  { id: 'ocean_world',    label: 'Ocean World',    emoji: '🌊', bg: 'from-blue-600 to-indigo-800' },
  { id: 'rainbow_sky',    label: 'Rainbow Sky',    emoji: '🌈', bg: 'from-pink-400 to-purple-600' },
]

function ProfileCard({ profile, onSelect }) {
  return (
    <motion.button
      className="flex-shrink-0 flex flex-col items-center gap-3 bg-white rounded-3xl p-5 shadow-lg w-44 min-h-[200px] active:scale-95"
      whileTap={{ scale: 0.93 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onSelect(profile.id)}
    >
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-fredoka shadow-md"
        style={{ backgroundColor: profile.avatar_color || '#4FC3F7' }}>
        {(profile.display_name || 'A')[0].toUpperCase()}
      </div>
      <span className="font-fredoka text-xl text-midnight leading-tight text-center">
        {profile.display_name}
      </span>
      <span className="font-nunito text-sm text-midnight/60 bg-sand px-3 py-1 rounded-full">
        Level {profile.level || 1}
      </span>
      {profile.streak_current > 0 && (
        <span className="text-sm">🔥 {profile.streak_current} days</span>
      )}
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
    <motion.div className="fixed inset-0 bg-midnight/80 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="bg-cloud rounded-4xl p-8 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.8 }} animate={{ scale: 1 }}>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {[1,2,3].map(s => (
            <div key={s} className={`w-3 h-3 rounded-full transition-colors ${s === step ? 'bg-ocean' : s < step ? 'bg-grass' : 'bg-gray-200'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="text-center">
            <div className="flex justify-center mb-4"><Stitch pose="wave" size={100} /></div>
            <h2 className="font-fredoka text-3xl text-ocean mb-6">What is your name?</h2>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(2)}
              placeholder="Type your name..."
              className="w-full text-center font-fredoka text-2xl border-3 border-sky rounded-2xl px-4 py-4 mb-6
                focus:outline-none focus:border-ocean text-midnight"
              autoFocus
              maxLength={20}
            />
            <motion.button
              className={`w-full bg-ocean text-white font-fredoka text-xl py-4 rounded-2xl
                ${!name.trim() ? 'opacity-50' : ''}`}
              disabled={!name.trim()}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(2)}
            >Next →</motion.button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h2 className="font-fredoka text-3xl text-ocean mb-2">Pick your color, {name}!</h2>
            <p className="font-nunito text-midnight/60 mb-6">Choose your avatar color</p>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {AVATAR_COLORS.map(c => (
                <motion.button key={c}
                  className={`w-full aspect-square rounded-2xl border-4 transition-all
                    ${color === c ? 'border-midnight scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button className="flex-1 border-2 border-gray-200 font-fredoka text-lg py-3 rounded-2xl text-midnight/60"
                onClick={() => setStep(1)}>← Back</button>
              <motion.button className="flex-1 bg-ocean text-white font-fredoka text-lg py-3 rounded-2xl"
                whileTap={{ scale: 0.95 }} onClick={() => setStep(3)}>Next →</motion.button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="font-fredoka text-3xl text-ocean mb-2">Pick your world!</h2>
            <p className="font-nunito text-midnight/60 mb-4">Choose your background theme</p>
            <div className="flex flex-col gap-3 mb-6">
              {BACKGROUNDS.map(b => (
                <motion.button key={b.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-3 transition-all
                    ${bg === b.id ? 'border-ocean bg-sky/10' : 'border-gray-200'}`}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setBg(b.id)}
                >
                  <span className="text-3xl">{b.emoji}</span>
                  <span className="font-fredoka text-xl text-midnight">{b.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="flex-1 border-2 border-gray-200 font-fredoka text-lg py-3 rounded-2xl text-midnight/60"
                onClick={() => setStep(2)}>← Back</button>
              <motion.button
                className={`flex-1 bg-grass text-white font-fredoka text-lg py-3 rounded-2xl ${loading ? 'opacity-70' : ''}`}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                onClick={handleCreate}
              >{loading ? '⏳ Creating...' : "Let's Go! 🚀"}</motion.button>
            </div>
          </div>
        )}

        <button className="w-full mt-3 text-center font-nunito text-sm text-midnight/40 py-2"
          onClick={onCancel}>Cancel</button>
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
    <div className="min-h-screen bg-gradient-to-b from-sky to-ocean flex flex-col">
      {/* Header */}
      <div className="flex justify-center pt-12 pb-6">
        <Stitch pose="wave" size={140} />
      </div>

      <div className="text-center px-6 mb-8">
        <h1 className="font-fredoka text-4xl text-white drop-shadow-lg">Who's playing today?</h1>
        <p className="font-nunito text-white/80 mt-2 text-lg">Tap your name to start!</p>
      </div>

      {/* Profile cards */}
      <div className="flex-1 px-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-white font-fredoka text-2xl animate-pulse">Loading players...</div>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 justify-start min-h-[220px] items-center">
            {profiles.map((p, i) => (
              <ProfileCard key={p.id} profile={p} onSelect={handleSelect} />
            ))}

            {/* New player card */}
            <motion.button
              className="flex-shrink-0 flex flex-col items-center justify-center gap-3
                bg-white/20 border-3 border-white/50 rounded-3xl p-5 w-44 min-h-[200px]
                text-white hover:bg-white/30 active:scale-95"
              whileTap={{ scale: 0.93 }}
              onClick={() => setShowNew(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: profiles.length * 0.1 }}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center
                bg-white/20 border-3 border-white/50 text-5xl">+</div>
              <span className="font-fredoka text-lg text-center">New Player</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Bottom wave decoration */}
      <div className="pb-8 text-center">
        <p className="font-nunito text-white/60 text-sm">🌊 Aya's Summer School 🌊</p>
      </div>

      {showNew && (
        <NewProfileFlow
          onComplete={handleNewComplete}
          onCancel={() => setShowNew(false)}
        />
      )}
    </div>
  )
}
