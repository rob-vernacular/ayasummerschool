import { useCallback } from 'react'
import { getProgress, updateProgress } from '../lib/db'
import { getActiveProfileId } from '../lib/session'

export function useStreak() {
  const profileId = getActiveProfileId()

  const checkAndUpdateStreak = useCallback(async () => {
    if (!profileId) return null
    const progress = await getProgress(profileId)
    const today = new Date().toISOString().slice(0, 10)
    const lastDate = progress?.streak_last_date

    let streak = progress?.streak_current || 0
    let longest = progress?.streak_longest || 0
    let message = null

    if (lastDate === today) {
      return { streak, longest, message: null }
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

    if (lastDate === yesterday) {
      streak += 1
      if (streak > longest) longest = streak
      message = streak >= 7 ? 'streak_milestone' : 'continued'
    } else if (lastDate) {
      streak = 1
      message = 'reset'
    } else {
      streak = 1
      message = 'started'
    }

    await updateProgress(profileId, {
      streak_current: streak,
      streak_longest: longest,
      streak_last_date: today,
    })

    return { streak, longest, message }
  }, [profileId])

  return { checkAndUpdateStreak }
}
