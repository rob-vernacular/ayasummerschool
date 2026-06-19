import { useCallback, useRef } from 'react'

/* Web Speech API helper — built into modern browsers, no external API, free,
   works offline. Graceful no-op when speechSynthesis is unavailable. */

export const speechSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window

function pickVoice() {
  if (!speechSupported) return null
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find(v =>
      v.lang === 'en-US' &&
      (v.name.includes('Samantha') || v.name.includes('Karen') ||
        v.name.includes('Moira') || v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('google us english'))
    ) || voices.find(v => v.lang === 'en-US') || voices[0] || null
  )
}

export function useSpeech() {
  const utteranceRef = useRef(null)

  const speak = useCallback((text, options = {}) => {
    if (!speechSupported || !text) return null
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(String(text))
    utterance.rate = options.rate ?? 0.85
    utterance.pitch = options.pitch ?? 1.1
    utterance.volume = options.volume ?? 1.0
    utterance.lang = 'en-US'

    const voice = pickVoice()
    if (voice) utterance.voice = voice

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    return utterance
  }, [])

  const stop = useCallback(() => {
    if (speechSupported) window.speechSynthesis.cancel()
  }, [])

  const speakWord = useCallback((word) => speak(word, { rate: 0.8, pitch: 1.1 }), [speak])
  const speakSentence = useCallback((sentence) => speak(sentence, { rate: 0.85, pitch: 1.0 }), [speak])
  const speakInstruction = useCallback((instruction) => speak(instruction, { rate: 0.9, pitch: 1.05 }), [speak])

  const speakLetter = useCallback((letter) => {
    const phoneticMap = {
      a: 'ah', b: 'buh', c: 'kuh', d: 'duh', e: 'eh', f: 'fuh', g: 'guh',
      h: 'huh', i: 'ih', j: 'juh', k: 'kuh', l: 'luh', m: 'muh', n: 'nuh',
      o: 'oh', p: 'puh', q: 'kwuh', r: 'ruh', s: 'suh', t: 'tuh', u: 'uh',
      v: 'vuh', w: 'wuh', x: 'ksuh', y: 'yuh', z: 'zuh',
    }
    const phonetic = phoneticMap[String(letter).toLowerCase()] || letter
    speak(phonetic, { rate: 0.7, pitch: 1.2 })
  }, [speak])

  return { speak, stop, speakWord, speakSentence, speakInstruction, speakLetter }
}
