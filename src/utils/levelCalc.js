export const LEVELS = [
  { level: 1, xp: 0,    title: "Stitch's New Friend" },
  { level: 2, xp: 200,  title: "Beach Explorer" },
  { level: 3, xp: 500,  title: "Island Adventurer" },
  { level: 4, xp: 900,  title: "Ocean Champion" },
  { level: 5, xp: 1400, title: "Star Reader" },
  { level: 6, xp: 2000, title: "Super Speller" },
  { level: 7, xp: 2700, title: "Story Master" },
  { level: 8, xp: 3500, title: "Grade 2 Ready!" },
  { level: 9, xp: 4500, title: "the Incredible" },
  { level: 10, xp: 6000, title: "Ohana Champion" },
]

export function getLevelForXP(xp) {
  let current = LEVELS[0]
  for (const l of LEVELS) {
    if (xp >= l.xp) current = l
    else break
  }
  return current
}

export function getNextLevel(currentLevel) {
  return LEVELS.find(l => l.level === currentLevel + 1) || null
}

export function getXPProgress(xp) {
  const current = getLevelForXP(xp)
  const next = getNextLevel(current.level)
  if (!next) return { current, next: null, progress: 100, xpInLevel: 0, xpNeeded: 0 }
  const xpInLevel = xp - current.xp
  const xpNeeded = next.xp - current.xp
  const progress = Math.round((xpInLevel / xpNeeded) * 100)
  return { current, next, progress, xpInLevel, xpNeeded }
}

export function getLevelTitle(level, displayName = '') {
  const l = LEVELS.find(lvl => lvl.level === level)
  if (!l) return ''
  if (level === 9) return `${displayName} ${l.title}`
  return l.title
}
