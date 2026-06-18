import { useCallback, useRef } from 'react'

let audioCtx = null
function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}

function playNote(freq, duration, gain = 0.3, type = 'sine', startTime = null) {
  try {
    const ctx = getCtx()
    const t = startTime ?? ctx.currentTime
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    gainNode.gain.setValueAtTime(gain, t)
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + duration)
    osc.start(t)
    osc.stop(t + duration + 0.05)
  } catch {}
}

export function useSound(soundEnabled = true) {
  const enabledRef = useRef(soundEnabled)
  enabledRef.current = soundEnabled

  const correct = useCallback(() => {
    if (!enabledRef.current) return
    const ctx = getCtx()
    const t = ctx.currentTime
    playNote(523.25, 0.2, 0.3, 'sine', t)       // C
    playNote(659.25, 0.2, 0.3, 'sine', t + 0.2)  // E
  }, [])

  const wrong = useCallback(() => {
    if (!enabledRef.current) return
    playNote(200, 0.3, 0.3, 'sawtooth')
  }, [])

  const levelUp = useCallback(() => {
    if (!enabledRef.current) return
    const ctx = getCtx()
    const t = ctx.currentTime
    const notes = [523.25, 587.33, 659.25, 783.99, 880]
    notes.forEach((f, i) => playNote(f, 0.25, 0.3, 'sine', t + i * 0.15))
  }, [])

  const xpEarned = useCallback(() => {
    if (!enabledRef.current) return
    const ctx = getCtx()
    const t = ctx.currentTime
    const notes = [523, 659, 784, 1047]
    notes.forEach((f, i) => playNote(f, 0.1, 0.2, 'sine', t + i * 0.07))
  }, [])

  const streak = useCallback(() => {
    if (!enabledRef.current) return
    const ctx = getCtx()
    const t = ctx.currentTime
    ;[523.25, 659.25, 783.99].forEach((f, i) => playNote(f, 0.5, 0.25, 'sine', t + i * 0.01))
  }, [])

  const storyComplete = useCallback(() => {
    if (!enabledRef.current) return
    const ctx = getCtx()
    const t = ctx.currentTime
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50]
    notes.forEach((f, i) => playNote(f, 0.2, 0.25, 'sine', t + i * 0.1))
  }, [])

  const tap = useCallback(() => {
    if (!enabledRef.current) return
    playNote(880, 0.05, 0.15, 'sine')
  }, [])

  return { correct, wrong, levelUp, xpEarned, streak, storyComplete, tap }
}
