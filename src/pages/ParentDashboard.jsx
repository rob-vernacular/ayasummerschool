import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getSessionHistory, getMasteredWords, getRecentSessions, getProgress, getProfile, getAllProfiles, getSettings, updateSettings } from '../lib/db'
import { getActiveProfileId } from '../lib/session'
import { BackIcon } from '../components/icons'

const CORRECT_PIN = '1234'

function PINEntry({ onCorrect }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleDigit = (d) => {
    if (pin.length >= 4) return
    const next = pin + d
    setPin(next)
    if (next.length === 4) {
      if (next === CORRECT_PIN) {
        onCorrect()
      } else {
        setError(true)
        setTimeout(() => { setPin(''); setError(false) }, 1000)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(to bottom, #0D1B2A, #0D47A1)' }}>
      <h1 className="font-fredoka text-4xl text-white mb-2">Parent Dashboard</h1>
      <p className="font-nunito font-600 text-white/70 mb-8">Enter your 4-digit PIN</p>

      <div className="flex gap-4 mb-8">
        {[0,1,2,3].map(i => (
          <div key={i} className={`w-14 h-14 rounded-full border-3 flex items-center justify-center text-2xl
            ${error ? 'border-coral' : 'border-white/40'}
            ${pin.length > i ? 'bg-white' : 'bg-white/10'}`}>
            {pin.length > i ? '●' : ''}
          </div>
        ))}
      </div>

      {error && <p className="font-nunito text-coral mb-4">Wrong PIN. Try again.</p>}

      <div className="grid grid-cols-3 gap-4 max-w-xs w-full">
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((d, i) => (
          <motion.button key={i}
            className={`h-16 rounded-2xl font-fredoka text-2xl
              ${d === '' ? '' : 'bg-white/20 text-white hover:bg-white/30'}`}
            whileTap={d !== '' ? { scale: 0.9 } : {}}
            onClick={() => {
              if (d === '') return
              if (d === '⌫') setPin(p => p.slice(0, -1))
              else handleDigit(String(d))
            }}
          >{d}</motion.button>
        ))}
      </div>

      <p className="font-nunito text-white/30 text-xs mt-8">Default PIN: 1234</p>
    </div>
  )
}

function WeeklyChart({ sessions }) {
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000)
    const dateStr = d.toISOString().slice(0, 10)
    const dayXP = sessions.filter(s => s.session_date === dateStr).reduce((acc, s) => acc + (s.xp_earned || 0), 0)
    return { date: dateStr, label: d.toLocaleDateString('en', { weekday: 'short' }), xp: dayXP }
  })
  const maxXP = Math.max(...days.map(d => d.xp), 100)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      <h3 className="font-fredoka text-xl text-midnight mb-4">XP This Week</h3>
      <div className="flex items-end gap-2 h-32">
        {days.map(day => (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex-1 w-full flex items-end">
              <motion.div
                className="w-full bg-ocean rounded-t-md"
                style={{ minHeight: 4 }}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(4, (day.xp / maxXP) * 100)}%` }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
            </div>
            <span className="font-nunito text-xs text-midnight/50">{day.label}</span>
            {day.xp > 0 && <span className="font-fredoka text-xs text-ocean">{day.xp}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ParentDashboard() {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [allProfiles, setAllProfiles] = useState([])
  const [viewingId, setViewingId] = useState(getActiveProfileId())

  useEffect(() => {
    if (!authed) return
    loadData(viewingId)
    getAllProfiles().then(p => setAllProfiles(p || []))
  }, [authed, viewingId])

  const loadData = async (profileId) => {
    if (!profileId) return
    setLoading(true)
    const [progress, profile, sessions, mastered, recent] = await Promise.all([
      getProgress(profileId),
      getProfile(profileId),
      getSessionHistory(profileId, 7),
      getMasteredWords(profileId),
      getRecentSessions(profileId, 30),
    ])
    setData({ progress, profile, sessions, mastered, recent })
    setLoading(false)
  }

  if (!authed) return <PINEntry onCorrect={() => setAuthed(true)} />

  return (
    <div className="min-h-screen bg-sand flex flex-col">
      {/* Header */}
      <div className="text-white px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #0D1B2A, #1B6CA8)' }}>
        <motion.button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/15"
          whileTap={{ scale: 0.9 }} onClick={() => navigate('/home')} aria-label="Back"><BackIcon size={26} /></motion.button>
        <h1 className="font-fredoka text-2xl">Parent Dashboard</h1>
        <div className="w-12" />
      </div>

      {/* Profile switcher */}
      {allProfiles.length > 1 && (
        <div className="bg-white border-b px-4 py-3 flex gap-3 overflow-x-auto">
          {allProfiles.map(p => (
            <button key={p.id}
              className={`flex-shrink-0 font-fredoka text-base px-4 py-2 rounded-xl transition-all
                ${viewingId === p.id ? 'bg-ocean text-white' : 'bg-gray-100 text-midnight'}`}
              onClick={() => setViewingId(p.id)}>
              {p.display_name}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 p-4 overflow-auto">
        {loading && <div className="text-center py-8 font-fredoka text-ocean text-xl animate-pulse">Loading...</div>}

        {!loading && data && (
          <div className="flex flex-col gap-5">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <h2 className="font-fredoka text-2xl text-midnight mb-3">
                {data.profile?.display_name}'s Progress
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Level', value: data.progress?.level || 1, emoji: '⭐' },
                  { label: 'Total XP', value: data.progress?.xp || 0, emoji: '✨' },
                  { label: 'Streak', value: `${data.progress?.streak_current || 0} days`, emoji: '🔥' },
                  { label: 'Words Mastered', value: `${data.mastered?.length || 0} / 220`, emoji: '📖' },
                ].map(item => (
                  <div key={item.label} className="bg-sand rounded-xl p-3 text-center">
                    <div className="text-2xl">{item.emoji}</div>
                    <div className="font-fredoka text-xl text-midnight">{item.value}</div>
                    <div className="font-nunito text-xs text-midnight/50">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly chart */}
            <WeeklyChart sessions={data.sessions || []} />

            {/* Subject breakdown */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <h3 className="font-fredoka text-xl text-midnight mb-3">Subject Activity (Last 30 Sessions)</h3>
              {['phonics','sightwords','reading','writing','math'].map(type => {
                const count = (data.recent || []).filter(s => s.activity_type === type).length
                const labels = { phonics: 'Phonics', sightwords: 'Sight Words', reading: 'Reading', writing: 'Writing', math: 'Math' }
                const emojis = { phonics: '🔤', sightwords: '👁️', reading: '📖', writing: '✏️', math: '🔢' }
                return (
                  <div key={type} className="flex items-center gap-3 mb-2">
                    <span className="text-xl w-8">{emojis[type]}</span>
                    <span className="font-nunito text-sm text-midnight w-24">{labels[type]}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                      <motion.div
                        className="bg-ocean h-4 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, count * 10)}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <span className="font-fredoka text-sm text-midnight/60 w-8">{count}</span>
                  </div>
                )
              })}
            </div>

            {/* Mastered words */}
            {data.mastered?.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-md">
                <h3 className="font-fredoka text-xl text-midnight mb-3">
                  Mastered Sight Words ({data.mastered.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.mastered.map(w => (
                    <span key={w} className="bg-grass/20 text-grass font-nunito text-sm px-3 py-1 rounded-full">{w}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Recent sessions */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <h3 className="font-fredoka text-xl text-midnight mb-3">Recent Activity</h3>
              {data.recent?.slice(0, 10).map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <span className="text-lg">{({ phonics:'🔤', sightwords:'👁️', reading:'📖', writing:'✏️', math:'🔢' })[s.activity_type] || '📚'}</span>
                  <div className="flex-1">
                    <div className="font-nunito text-sm text-midnight capitalize">{s.activity_type}</div>
                    <div className="font-nunito text-xs text-midnight/40">
                      {new Date(s.completed_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-fredoka text-sm text-ocean">+{s.xp_earned} XP</div>
                    <div className="font-nunito text-xs text-midnight/40">{s.score}%</div>
                  </div>
                </div>
              ))}
              {(!data.recent || data.recent.length === 0) && (
                <p className="font-nunito text-midnight/50 text-sm text-center py-4">No activity yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
