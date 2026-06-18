import { useState, useEffect, useCallback } from 'react'
import { getActiveProfileId } from '../lib/session'
import { getProfile } from '../lib/db'

export function useProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const profileId = getActiveProfileId()

  const refresh = useCallback(async () => {
    if (!profileId) { setLoading(false); return }
    const data = await getProfile(profileId)
    setProfile(data)
    setLoading(false)
  }, [profileId])

  useEffect(() => { refresh() }, [refresh])

  return { profile, loading, profileId, refresh }
}
