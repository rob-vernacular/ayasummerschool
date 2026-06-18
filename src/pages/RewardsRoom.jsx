import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import Stitch from '../components/characters/Stitch'
import { useProfile } from '../hooks/useProfile'
import { useProgress } from '../hooks/useProgress'
import { getRewards, getWritingSubmissions } from '../lib/db'
import { REWARDS } from '../data/rewards'

const TABS = ['Trophies', 'Outfits', 'Sticker Book', 'Story Book']

function TrophySection({ unlocked }) {
  const all = REWARDS.trophies
  return (
    <div className="grid grid-cols-3 gap-4">
      {all.map(t => {
        const isUnlocked = unlocked.some(r => r.reward_id === t.id)
        return (
          <motion.div key={t.id}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl text-center
              ${isUnlocked ? 'bg-gold/20 border-2 border-gold' : 'bg-gray-100 opacity-50'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-4xl">{isUnlocked ? t.emoji : '🔒'}</span>
            <span className="font-fredoka text-sm text-midnight">{t.name}</span>
            {!isUnlocked && <span className="font-nunito text-xs text-midnight/50">{t.description}</span>}
          </motion.div>
        )
      })}
    </div>
  )
}

function OutfitsSection({ unlocked }) {
  const allOutfits = [...REWARDS.outfits, ...REWARDS.backgrounds]
  return (
    <div className="grid grid-cols-2 gap-4">
      {allOutfits.map(item => {
        const isUnlocked = unlocked.some(r => r.reward_id === item.id)
        return (
          <motion.div key={item.id}
            className={`flex items-center gap-3 p-4 rounded-2xl
              ${isUnlocked ? 'bg-sky/20 border-2 border-sky' : 'bg-gray-100 opacity-50'}`}
          >
            <span className="text-4xl">{isUnlocked ? item.emoji : '🔒'}</span>
            <div>
              <div className="font-fredoka text-base text-midnight">{item.name}</div>
              {!isUnlocked && <div className="font-nunito text-xs text-midnight/50">{item.description}</div>}
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
      <p className="font-nunito text-midnight/60 text-sm mb-4">
        {unlocked.filter(r => r.reward_type === 'sticker').length} / 40 stickers collected
      </p>
      <div className="grid grid-cols-5 gap-3">
        {stickers.map((s, i) => {
          const has = unlocked.some(r => r.reward_id === s.id)
          return (
            <motion.div key={s.id}
              className={`aspect-square flex items-center justify-center rounded-xl text-3xl
                ${has ? 'bg-gold/20 border-2 border-gold' : 'bg-gray-100'}`}
              animate={has ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, delay: i * 0.02 }}
            >
              {has ? s.emoji : '?'}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function StoryBook({ profileId }) {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!profileId) return
    getWritingSubmissions(profileId).then(data => {
      setStories(data || [])
      setLoading(false)
    })
  }, [profileId])

  if (loading) return <div className="text-center py-8 font-fredoka text-ocean text-xl">Loading stories...</div>

  if (!stories.length) return (
    <div className="text-center py-12">
      <span className="text-6xl">📖</span>
      <p className="font-fredoka text-2xl text-ocean mt-4">No stories yet!</p>
      <p className="font-nunito text-midnight/60 mt-2">Complete writing activities to fill your story book.</p>
    </div>
  )

  return (
    <div>
      {selected ? (
        <div>
          <button onClick={() => setSelected(null)}
            className="font-fredoka text-ocean text-lg mb-4 flex items-center gap-2">
            ← Back to books
          </button>
          <div className="bg-sand rounded-3xl p-6 shadow-inner min-h-[200px]">
            <p className="font-nunito text-sm text-midnight/50 mb-2">
              {new Date(selected.created_at).toLocaleDateString()}
            </p>
            <p className="font-nunito text-sm text-ocean italic mb-3">{selected.prompt}</p>
            <p className="font-nunito text-lg text-midnight leading-relaxed whitespace-pre-wrap">{selected.content}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {stories.map((s, i) => (
            <motion.button key={s.id}
              className="text-left bg-sand rounded-2xl p-4 shadow-md border-2 border-sky/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(s)}
            >
              <div className="text-2xl mb-2">📄</div>
              <p className="font-fredoka text-sm text-ocean leading-tight line-clamp-2">{s.prompt || 'My Story'}</p>
              <p className="font-nunito text-xs text-midnight/50 mt-1">
                {new Date(s.created_at).toLocaleDateString()}
              </p>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function RewardsRoom() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { progress } = useProgress()
  const [rewards, setRewards] = useState([])
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (!profile) return
    getRewards(profile.id).then(r => setRewards(r || []))
  }, [profile?.id])

  return (
    <div className="min-h-screen bg-sand flex flex-col">
      <TopBar
        profile={profile}
        progress={progress}
        showBack
        backRoute="/home"
        title="🏆 Rewards Room"
      />

      <div className="flex-1 p-4 overflow-auto">
        {/* Header with Stitch */}
        <div className="flex items-center gap-4 mb-6">
          <Stitch pose="happy" size={80} />
          <div>
            <h1 className="font-fredoka text-2xl text-ocean">Your Rewards!</h1>
            <p className="font-nunito text-midnight/60 text-sm">
              {rewards.length} {rewards.length === 1 ? 'reward' : 'rewards'} collected
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {TABS.map((t, i) => (
            <button key={t}
              className={`font-fredoka text-base px-4 py-2 rounded-xl whitespace-nowrap transition-all
                ${tab === i ? 'bg-ocean text-white shadow-md' : 'bg-white text-midnight/60 border border-gray-200'}`}
              onClick={() => setTab(i)}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 0 && <TrophySection unlocked={rewards} />}
        {tab === 1 && <OutfitsSection unlocked={rewards} />}
        {tab === 2 && <StickerBook unlocked={rewards} />}
        {tab === 3 && <StoryBook profileId={profile?.id} />}
      </div>
    </div>
  )
}
