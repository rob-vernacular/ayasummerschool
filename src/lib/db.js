import { supabase } from './supabase'

// ── Cache helpers ──────────────────────────────────────────────────────────
const cacheKey = (profileId, type) => `cache_${profileId}_${type}`
const queueKey = 'write_queue'

function setCache(profileId, type, data) {
  try { localStorage.setItem(cacheKey(profileId, type), JSON.stringify(data)) } catch {}
}
function getCache(profileId, type) {
  try { const v = localStorage.getItem(cacheKey(profileId, type)); return v ? JSON.parse(v) : null } catch { return null }
}
function enqueueWrite(op) {
  try {
    const q = JSON.parse(localStorage.getItem(queueKey) || '[]')
    q.push({ ...op, timestamp: Date.now() })
    localStorage.setItem(queueKey, JSON.stringify(q))
  } catch {}
}

export async function flushWriteQueue() {
  try {
    const q = JSON.parse(localStorage.getItem(queueKey) || '[]')
    if (!q.length) return
    const remaining = []
    for (const op of q) {
      try {
        if (op.table === 'upsert') {
          await supabase.from(op.from).upsert(op.data)
        } else if (op.table === 'update') {
          await supabase.from(op.from).update(op.data).eq('id', op.id)
        } else if (op.table === 'insert') {
          await supabase.from(op.from).insert(op.data)
        }
      } catch { remaining.push(op) }
    }
    localStorage.setItem(queueKey, JSON.stringify(remaining))
  } catch {}
}

// ── Profiles ───────────────────────────────────────────────────────────────
export async function getAllProfiles() {
  try {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at')
    if (error) throw error
    setCache('global', 'profiles', data)
    return data
  } catch {
    return getCache('global', 'profiles') || []
  }
}

export async function createProfile(username, displayName, avatarColor, backgroundSkin) {
  const { data, error } = await supabase.from('profiles').insert({
    username,
    display_name: displayName,
    avatar_color: avatarColor,
    background_skin: backgroundSkin,
  }).select().single()
  if (error) throw error

  await supabase.from('progress').insert({ profile_id: data.id })
  await supabase.from('settings').insert({ profile_id: data.id })
  return data
}

export async function getProfile(profileId) {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', profileId).single()
    if (error) throw error
    setCache(profileId, 'profile', data)
    return data
  } catch {
    return getCache(profileId, 'profile')
  }
}

export async function updateProfile(profileId, updates) {
  try {
    const { error } = await supabase.from('profiles').update(updates).eq('id', profileId)
    if (error) throw error
  } catch {
    enqueueWrite({ table: 'update', from: 'profiles', data: updates, id: profileId })
  }
}

// ── Progress ───────────────────────────────────────────────────────────────
export async function getProgress(profileId) {
  try {
    const { data, error } = await supabase.from('progress').select('*').eq('profile_id', profileId).single()
    if (error) throw error
    setCache(profileId, 'progress', data)
    return data
  } catch {
    return getCache(profileId, 'progress') || {
      profile_id: profileId, xp: 0, level: 1, streak_current: 0,
      streak_longest: 0, phonics_level: 1, reading_fp_level: 'C',
      writing_level: 1, math_unlocked: false
    }
  }
}

export async function updateProgress(profileId, updates) {
  try {
    const { error } = await supabase.from('progress').update(updates).eq('profile_id', profileId)
    if (error) throw error
    const cached = getCache(profileId, 'progress') || {}
    setCache(profileId, 'progress', { ...cached, ...updates })
  } catch {
    enqueueWrite({ table: 'update', from: 'progress', data: updates, id: profileId })
  }
}

export async function incrementXP(profileId, amount) {
  const progress = await getProgress(profileId)
  const newXP = (progress?.xp || 0) + amount
  await updateProgress(profileId, { xp: newXP })
  return newXP
}

// ── Activity logging ───────────────────────────────────────────────────────
export async function logActivity(profileId, activityType, activityId, score, xpEarned, durationSeconds) {
  const record = {
    profile_id: profileId,
    activity_type: activityType,
    activity_id: activityId,
    score,
    xp_earned: xpEarned,
    duration_seconds: durationSeconds,
    completed_at: new Date().toISOString(),
  }
  let attempts = 0
  while (attempts < 3) {
    try {
      const { error } = await supabase.from('activity_log').insert(record)
      if (!error) return
      throw error
    } catch {
      attempts++
      if (attempts === 3) enqueueWrite({ table: 'insert', from: 'activity_log', data: record })
    }
  }
}

export async function getTodaysActivities(profileId) {
  const today = new Date().toISOString().slice(0, 10)
  try {
    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('profile_id', profileId)
      .gte('completed_at', `${today}T00:00:00`)
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

export async function getRecentSessions(profileId, limit = 30) {
  try {
    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('profile_id', profileId)
      .order('completed_at', { ascending: false })
      .limit(limit)
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

// ── Sight words ────────────────────────────────────────────────────────────
export async function getSightWordMastery(profileId) {
  try {
    const { data, error } = await supabase
      .from('sight_word_mastery')
      .select('*')
      .eq('profile_id', profileId)
    if (error) throw error
    setCache(profileId, 'sightwords', data)
    return data || []
  } catch {
    return getCache(profileId, 'sightwords') || []
  }
}

export async function updateSightWord(profileId, word, correct) {
  try {
    const { data: existing } = await supabase
      .from('sight_word_mastery')
      .select('*')
      .eq('profile_id', profileId)
      .eq('word', word)
      .single()

    if (existing) {
      const correct_count = existing.correct_count + (correct ? 1 : 0)
      const attempt_count = existing.attempt_count + 1
      const mastered = correct_count >= 3
      await supabase
        .from('sight_word_mastery')
        .update({ correct_count, attempt_count, mastered, last_seen: new Date().toISOString() })
        .eq('id', existing.id)
    } else {
      await supabase.from('sight_word_mastery').insert({
        profile_id: profileId,
        word,
        correct_count: correct ? 1 : 0,
        attempt_count: 1,
        mastered: false,
        last_seen: new Date().toISOString(),
      })
    }
  } catch {
    enqueueWrite({ table: 'insert', from: 'sight_word_mastery', data: { profile_id: profileId, word, correct } })
  }
}

export async function getMasteredWords(profileId) {
  try {
    const { data, error } = await supabase
      .from('sight_word_mastery')
      .select('word')
      .eq('profile_id', profileId)
      .eq('mastered', true)
    if (error) throw error
    return (data || []).map(r => r.word)
  } catch {
    const cached = getCache(profileId, 'sightwords') || []
    return cached.filter(r => r.mastered).map(r => r.word)
  }
}

// ── Writing ────────────────────────────────────────────────────────────────
export async function saveWritingSubmission(profileId, prompt, content) {
  const record = { profile_id: profileId, prompt, content, created_at: new Date().toISOString() }
  let attempts = 0
  while (attempts < 3) {
    try {
      const { error } = await supabase.from('writing_submissions').insert(record)
      if (!error) return
      throw error
    } catch {
      attempts++
      if (attempts === 3) enqueueWrite({ table: 'insert', from: 'writing_submissions', data: record })
    }
  }
}

export async function getWritingSubmissions(profileId) {
  try {
    const { data, error } = await supabase
      .from('writing_submissions')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

// ── Rewards ────────────────────────────────────────────────────────────────
export async function getRewards(profileId) {
  try {
    const { data, error } = await supabase.from('rewards').select('*').eq('profile_id', profileId)
    if (error) throw error
    setCache(profileId, 'rewards', data)
    return data || []
  } catch {
    return getCache(profileId, 'rewards') || []
  }
}

export async function unlockReward(profileId, rewardType, rewardId) {
  try {
    await supabase.from('rewards').insert({
      profile_id: profileId,
      reward_type: rewardType,
      reward_id: rewardId,
      unlocked_at: new Date().toISOString(),
    })
  } catch {
    enqueueWrite({ table: 'insert', from: 'rewards', data: { profile_id: profileId, reward_type: rewardType, reward_id: rewardId } })
  }
}

export async function hasReward(profileId, rewardType, rewardId) {
  try {
    const { data } = await supabase
      .from('rewards')
      .select('id')
      .eq('profile_id', profileId)
      .eq('reward_type', rewardType)
      .eq('reward_id', rewardId)
      .single()
    return !!data
  } catch {
    return false
  }
}

// ── Sessions ───────────────────────────────────────────────────────────────
export async function logSession(profileId, xpEarned, activitiesCompleted, durationSeconds) {
  try {
    await supabase.from('sessions').insert({
      profile_id: profileId,
      xp_earned: xpEarned,
      activities_completed: activitiesCompleted,
      duration_seconds: durationSeconds,
      session_date: new Date().toISOString().slice(0, 10),
    })
  } catch {
    enqueueWrite({ table: 'insert', from: 'sessions', data: { profile_id: profileId, xp_earned: xpEarned } })
  }
}

export async function getSessionHistory(profileId, days = 30) {
  const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('profile_id', profileId)
      .gte('session_date', since)
      .order('session_date', { ascending: true })
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

// ── Settings ───────────────────────────────────────────────────────────────
export async function getSettings(profileId) {
  try {
    const { data, error } = await supabase.from('settings').select('*').eq('profile_id', profileId).single()
    if (error) throw error
    setCache(profileId, 'settings', data)
    return data || {}
  } catch {
    return getCache(profileId, 'settings') || { sound_enabled: true }
  }
}

export async function updateSettings(profileId, updates) {
  try {
    const { error } = await supabase.from('settings').update(updates).eq('profile_id', profileId)
    if (error) throw error
    const cached = getCache(profileId, 'settings') || {}
    setCache(profileId, 'settings', { ...cached, ...updates })
  } catch {
    enqueueWrite({ table: 'update', from: 'settings', data: updates, id: profileId })
  }
}
