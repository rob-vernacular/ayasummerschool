import { motion } from 'framer-motion'
import { ActivityIcon, ArrowRightIcon } from '../icons'
import { SUBJECT_THEME } from '../world/ActivityScene'

/* A frosted card for picking a game inside a module. */
export default function ActivityChooserCard({ subject, label, desc, index = 0, onClick }) {
  const theme = SUBJECT_THEME[subject] || SUBJECT_THEME.phonics
  return (
    <motion.button
      className="glass-strong rounded-3xl p-4 flex items-center gap-4 text-left w-full active:scale-[0.98] shadow-card"
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}
      whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }} onClick={onClick}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: theme.accent }}>
        <ActivityIcon type={subject} size={30} color="#fff" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-fredoka text-lg text-white text-shadow-soft leading-tight">{label}</div>
        <div className="font-nunito font-600 text-white/85 text-sm">{desc}</div>
      </div>
      <span className="shrink-0 text-white/90"><ArrowRightIcon size={26} /></span>
    </motion.button>
  )
}
