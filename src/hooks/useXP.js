import { useCallback } from 'react'
import { incrementXP } from '../lib/db'
import { getActiveProfileId } from '../lib/session'

export const XP_VALUES = {
  phonics: 50,
  sightwords: 45,
  reading: 60,
  writing: 70,
  math: 40,
  perfect_bonus: 15,
  streak_bonus: 25,
  session_complete: 50,
}

export function useXP() {
  const profileId = getActiveProfileId()

  const awardXP = useCallback(async (activityType, perfect = false) => {
    if (!profileId) return 0
    const base = XP_VALUES[activityType] || 0
    const bonus = perfect ? XP_VALUES.perfect_bonus : 0
    const total = base + bonus
    await incrementXP(profileId, total)
    return total
  }, [profileId])

  return { awardXP, XP_VALUES }
}
