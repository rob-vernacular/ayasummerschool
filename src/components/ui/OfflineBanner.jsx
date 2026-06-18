import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { flushWriteQueue } from '../../lib/db'

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false)
      flushWriteQueue()
    }
    const handleOffline = () => setOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && navigator.onLine) flushWriteQueue()
    })
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <AnimatePresence>
      {offline && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-midnight text-sand
            font-nunito text-sm px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          <span>📡</span>
          <span>Playing offline — your progress will sync soon.</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
