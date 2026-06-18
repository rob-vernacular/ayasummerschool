import { useState, useEffect, useCallback } from 'react'
import { getProgress, updateProgress, incrementXP } from '../lib/db'
import { getActiveProfileId } from '../lib/session'
import { getLevelForXP } from '../utils/levelCalc'
import { XP_VALUES } from './useXP'

export function useProgress() {
  const [progress, setProgress] = useState(null)
  const [leveledUp, setLeveledUp] = useState(null)
  const profileId = getActiveProfileId()

  const refresh = useCallback(async () => {
    if (!profileId) return
    const data = await getProgress(profileId)
    setProgress(data)
  }, [profileId])

  useEffect(() => { refresh() }, [refresh])

  // addXP(activityType, perfect) — accepts string type or raw number
  const addXP = useCallback(async (activityType, perfect = false) => {
    if (!profileId || !progress) return
    const amount = typeof activityType === 'number'
      ? activityType
      : (XP_VALUES[activityType] || 0) + (perfect ? XP_VALUES.perfect_bonus : 0)
    const oldLevel = getLevelForXP(progress.xp).level
    const newXP = await incrementXP(profileId, amount)
    const newLevel = getLevelForXP(newXP).level
    if (newLevel > oldLevel) setLeveledUp(newLevel)
    setProgress(p => ({ ...p, xp: newXP, level: newLevel }))
    return newXP
  }, [profileId, progress])

  const clearLevelUp = () => setLeveledUp(null)

  return { progress, refresh, addXP, leveledUp, clearLevelUp }
}
