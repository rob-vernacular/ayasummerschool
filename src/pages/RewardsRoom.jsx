import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TopBar from '../components/layout/TopBar'
import Stitch from '../components/characters/Stitch'
import SpeechBubble from '../components/ui/SpeechBubble'
import TropicalBackground from '../components/world/TropicalBackground'
import { LockIcon, StarIcon } from '../components/icons'
import { useProfile } from '../hooks/useProfile'
import { useProgress } from '../hooks/useProgress'
import { getRewards, getWritingSubmissions } from '../lib/db'
import { REWARDS } from '../data/rewards'

const TABS = ['Trophies', 'Outfits', 'Sticker Book', 'Story Book']

function LockedTile({ children }) {
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 flex items-center justify-center"><LockIcon size={28} color="rgba(255,255,255,0.8)" /></div>
    </div>
  )
}

function TrophySection({ unlocked }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {REWARDS.trophies.map(t => {
        const isUnlocked = unlocked.some(r => r.reward_id === t.id)
        return (
          <motion.div key={t.id}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl text-center
              ${isUnlocked ? 'bg-gold/25 border-2 border-gold anim-glow' : 'glass'}`}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <span className="text-4xl">{isUnlocked ? t.emoji : <LockIcon size={34} color="rgba(255,255,255,0.7)" />}</span>
            <span className="font-fredoka text-sm text-white text-shadow-soft">{t.name}</span>
            {!isUnlocked && <span className="font-nunito text-xs text-white/60">{t.description}</span>}
          </motion.div>
        )
      })}
    </div>
  )
}

function OutfitsSection({ unlocked }) {
  const allOutfits = [...REWARDS.outfits, ...REWARDS.backgrounds]
  return (
    <div className="grid grid-cols-2 gap-3">
      {allOutfits.map(item => {
        const isUnlocked = unlocked.some(r => r.reward_id === item.id)
        return (
          <motion.div key={item.id}
            className={`flex items-center gap-3 p-4 rounded-2xl
              ${isUnlocked ? 'bg-sky/25 border-2 border-sky' : 'glass'}`}>
            <span className="text-4xl shrink-0">{isUnlocked ? item.emoji : <LockIcon size={30} color="rgba(255,255,255,0.7)" />}</span>
            <div>
              <div className="font-fredoka text-base text-white text-shadow-soft">{item.name}</div>
              {!isUnlocked && <div className="font-nunito text-xs text-white/60">{item.description}</div>}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function StickerBook({ unlocked }) {
  const stickers = Array.from({ length: 40 }, (_, i) => ({
    id: `sticker_${i+1}`,
    emoji: ['⭐','🌟','💫','🎉','🏆','🎯','🌈','❤️','🦄','🐟','🌊','🏖️','🎨','📚','✏️','🔢','🔤','🎵','🌸','🦋'][i % 20]
  }))
  return (
    <div>
      <p className="font-nunito font-700 text-white/85 text-sm mb-4 text-shadow-soft">
        {unlocked.filter(r => r.reward_type === 'sticker').length} / 40 stickers collected
      </p>
      <div className="grid grid-cols-5 gap-3 glass-strong rounded-3xl p-4">
        {stickers.map((s, i) => {
          const has = unlocked.some(r => r.reward_id === s.id)
          return (
            <motion.div key={s.id}
              className={`aspect-square flex items-center justify-center rounded-xl text-3xl
                ${has ? 'bg-gold/30 border-2 border-gold' : 'bg-white/10 border border-dashed border-white/30 text-white/30'}`}
              animate={has ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.5, delay: i * 0.02 }}>
              {has ? s.emoji : ''}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function StoryBook({ profileId, name }) {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!profileId) return
    getWritingSubmissions(profileId).then(data => { setStories(data || []); setLoading(false) })
  }, [profileId])

  if (loading) return <div className="text-center py-8 font-fredoka text-white text-xl text-shadow-soft">Loading stories...</div>

  if (!stories.length) return (
    <div className="text-center py-12">
      <span className="text-6xl">📖</span>
      <p className="font-fredoka text-2xl text-white mt-4 text-shadow-soft">No stories yet!</p>
      <p className="font-nunito font-600 text-white/80 mt-2">Complete writing activities to fill your story book.</p>
    </div>
  )

  return (
    <div>
      {selected ? (
        <div>
          <button onClick={() => setSelected(null)} className="font-fredoka text-white text-lg mb-4 text-shadow-soft">← Back to books</button>
          <div className="rounded-3xl p-6 shadow-card min-h-[200px]" style={{ background: 'linear-gradient(160deg,#FFFDF6,#FBF3DD)', border: '3px solid #E0CE96' }}>
            <p className="font-nunito text-sm text-midnight/50 mb-2">{new Date(selected.created_at).toLocaleDateString()}</p>
            <p className="font-nunito text-sm text-ocean italic mb-3">{selected.prompt}</p>
            <p className="reading-text text-midnight whitespace-pre-wrap">{selected.content}</p>
            <p className="font-fredoka text-right text-ocean mt-4">— by {name}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {stories.map((s, i) => (
            <motion.button key={s.id}
              className="text-left rounded-2xl p-4 shadow-card"
              style={{ background: 'linear-gradient(160deg,#FFFDF6,#FBF3DD)', border: '2px solid #E0CE96' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }} onClick={() => setSelected(s)}>
              <div className="text-2xl mb-2">📄</div>
              <p className="font-fredoka text-sm text-ocean leading-tight line-clamp-2">{s.prompt || 'My Story'}</p>
              <p className="font-nunito text-xs text-midnight/50 mt-1">{new Date(s.created_at).toLocaleDateString()}</p>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function RewardsRoom() {
  const { profile } = useProfile()
  const { progress } = useProgress()
  const [rewards, setRewards] = useState([])
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (!profile) return
    getRewards(profile.id).then(r => setRewards(r || []))
  }, [profile?.id])

  const name = profile?.display_name || 'Friend'

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0"><TropicalBackground variant="twilight" showSand={false} /></div>

      <div className="relative z-20"><TopBar profile={profile} progress={progress} showBack backRoute="/home" title="Rewards Room" /></div>

      <div className="relative z-10 flex-1 p-4 overflow-auto">
        {/* Stitch + bubble */}
        <div className="flex items-end gap-2 mb-5">
          <div className="shrink-0 anim-float-slow"><Stitch pose="happy" size={100} /></div>
          <SpeechBubble className="mb-4 flex-1" tail="left">
            <p className="font-nunito font-700 text-[15px] text-midnight">
              Look at everything you earned, {name}! <span className="inline-flex align-middle"><StarIcon size={16} /></span> {rewards.length} rewards!
            </p>
          </SpeechBubble>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {TABS.map((t, i) => (
            <button key={t}
              className={`font-fredoka text-base px-4 py-2 rounded-xl whitespace-nowrap transition-all
                ${tab === i ? 'bg-gold text-[#6b4a12] shadow-md' : 'glass text-white'}`}
              onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>

        {tab === 0 && <TrophySection unlocked={rewards} />}
        {tab === 1 && <OutfitsSection unlocked={rewards} />}
        {tab === 2 && <StickerBook unlocked={rewards} />}
        {tab === 3 && <StoryBook profileId={profile?.id} name={name} />}
      </div>
    </div>
  )
}
