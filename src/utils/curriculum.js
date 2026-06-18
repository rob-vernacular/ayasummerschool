// Selects today's 3 required activities based on sequencing rules

export function selectDailyActivities(activityLog, progress) {
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  const todayDone = activityLog.filter(a => a.completed_at?.slice(0, 10) === today).map(a => a.activity_type)
  const yesterdayDone = activityLog.filter(a => a.completed_at?.slice(0, 10) === yesterday).map(a => a.activity_type)

  const dayNumber = progress?.days_active || 1
  const mathUnlocked = progress?.math_unlocked || dayNumber >= 7

  // 4-day rotation base
  const rotation = ['phonics', 'sightwords', 'reading', 'writing']
  const cycleDay = (dayNumber - 1) % 4

  const activities = []
  const used = new Set(todayDone)

  // Always include at least one reading or sightwords
  const needsReadingOrWords = !used.has('reading') && !used.has('sightwords')

  // Priority: follow rotation, skip yesterday's types if possible
  const priority = [
    rotation[cycleDay],
    rotation[(cycleDay + 1) % 4],
    rotation[(cycleDay + 2) % 4],
    rotation[(cycleDay + 3) % 4],
  ]

  // Weight phonics 2x if level < 3
  if (progress?.phonics_level < 3) {
    priority.unshift('phonics')
  }

  for (const type of priority) {
    if (activities.length >= 3) break
    if (used.has(type)) continue
    // Don't repeat yesterday's first activity if we can avoid it
    if (activities.length === 0 && yesterdayDone[0] === type && priority.length > 4) continue
    activities.push(type)
    used.add(type)
  }

  // Guarantee reading or sightwords
  if (needsReadingOrWords && !activities.includes('reading') && !activities.includes('sightwords')) {
    const replace = activities.length === 3 ? 2 : activities.length - 1
    activities[replace] = 'reading'
  }

  // Fill to 3
  const allTypes = ['phonics', 'sightwords', 'reading', 'writing']
  for (const t of allTypes) {
    if (activities.length >= 3) break
    if (!activities.includes(t)) activities.push(t)
  }

  // Optional 4th slot: math if unlocked
  const optional = mathUnlocked ? 'math' : null

  return { required: activities.slice(0, 3), optional, completed: todayDone }
}

export function getActivityLabel(type) {
  const labels = {
    phonics: 'Phonics',
    sightwords: 'Sight Words',
    reading: 'Reading',
    writing: 'Writing',
    math: 'Math',
  }
  return labels[type] || type
}

export function getActivityColor(type) {
  const colors = {
    phonics: 'bg-coral',
    sightwords: 'bg-sky',
    reading: 'bg-grass',
    writing: 'bg-ocean',
    math: 'bg-gold',
  }
  return colors[type] || 'bg-gray-400'
}

export function getActivityEmoji(type) {
  const emojis = { phonics: '🔤', sightwords: '👁️', reading: '📖', writing: '✏️', math: '🔢' }
  return emojis[type] || '📚'
}
