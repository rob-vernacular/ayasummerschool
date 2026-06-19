import { useState } from 'react'
import { motion } from 'framer-motion'
import Stitch from '../../components/characters/Stitch'
import ActivityScene from '../../components/world/ActivityScene'
import CompletionScreen from '../../components/ui/CompletionScreen'
import { ArrowRightIcon } from '../../components/icons'
import SpeakerButton from '../../components/ui/SpeakerButton'
import { useSound } from '../../hooks/useSound'
import { saveWritingSubmission } from '../../lib/db'

const PROMPTS = [
  { scene: '🏖️', text: 'Stitch found something on the beach today. What was it?' },
  { scene: '🌊', text: 'Stitch went swimming in the ocean. What did he see?' },
  { scene: '🦄', text: 'Luna the unicorn flew to a magical place. Where did she go?' },
  { scene: '🧽', text: 'SpongeBob made something special. What was it?' },
  { scene: '⭐', text: 'A star fell from the sky. What happened next?' },
  { scene: '🌈', text: 'Stitch, Luna, and SpongeBob went on an adventure. Where did they go?' },
  { scene: '🏰', text: 'Stitch built something amazing. What did he build?' },
  { scene: '🐢', text: 'Stitch met a baby turtle on the beach. What happened?' },
]

export default function StoryPrompt({ onComplete, profile }) {
  const [promptIndex] = useState(Math.floor(Math.random() * PROMPTS.length))
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const { storyComplete } = useSound(true)

  const prompt = PROMPTS[promptIndex]

  const handleSubmit = async () => {
    if (!text.trim() || saving) return
    setSaving(true)
    await saveWritingSubmission(profile.id, prompt.text, text.trim())
    storyComplete()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <CompletionScreen subject="writing" title="Amazing Story!" xp={70} buttonLabel="Collect 70 XP!"
        onCollect={() => onComplete(100, false)} />
    )
  }

  return (
    <ActivityScene
      subject="writing" title="Story Prompt" backRoute="/learn/writing"
      stitchPose="writing" stitchSize={96}
      message="I have a notebook for you! Write me a story.">

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {/* Prompt with scene */}
        <div className="glass rounded-2xl p-5 flex items-start gap-3">
          <span className="text-5xl shrink-0">{prompt.scene}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-fredoka text-lg text-white text-shadow-soft">Your Writing Prompt</h2>
              <SpeakerButton text={prompt.text} mode="sentence" size="sm" autoSpeak />
            </div>
            <p className="instruction-text text-white/95">{prompt.text}</p>
          </div>
        </div>

        {/* Notebook-paper writing area */}
        <div className="relative">
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            placeholder="Write your answer here... (1 or 2 sentences is great!)"
            className="w-full min-h-[180px] font-nunito text-xl text-midnight rounded-2xl p-4 resize-none
              focus:outline-none focus:border-ocean shadow-card leading-relaxed"
            style={{ lineHeight: '32px',
              background: 'repeating-linear-gradient(#FFFDF6, #FFFDF6 31px, #Bcdcef 32px)',
              border: '3px solid #D9C79a' }}
            maxLength={500} />
          <div className="absolute bottom-3 right-3 font-nunito text-xs text-midnight/40">{text.length}/500</div>
        </div>

        <motion.button
          className={`btn-primary w-full flex items-center justify-center gap-2 ${!text.trim() ? 'opacity-50' : ''}`}
          style={{ background: 'linear-gradient(135deg,#9C5FD0,#7B1FA2)' }}
          disabled={!text.trim() || saving}
          whileTap={{ scale: text.trim() ? 0.95 : 1 }} onClick={handleSubmit}>
          {saving ? 'Saving...' : <>Submit My Story! <ArrowRightIcon size={22} /></>}
        </motion.button>
      </div>
    </ActivityScene>
  )
}
