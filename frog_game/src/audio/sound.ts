let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext || (window as any).webkitAudioContext
  if (!Ctor) return null
  if (!ctx) ctx = new Ctor()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freqStart: number, freqEnd: number, start: number, duration: number, peakGain: number, type: OscillatorType = 'sine') {
  const audio = getCtx()
  if (!audio) return
  const now = audio.currentTime + start
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freqStart, now)
  osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), now + duration)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(peakGain, now + duration * 0.25)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  osc.connect(gain).connect(audio.destination)
  osc.start(now)
  osc.stop(now + duration + 0.02)
}

// A tiny "boing" for each hop.
export function playRibbit() {
  tone(340, 170, 0, 0.13, 0.18)
}

// A bright two-note chime for collecting a firefly.
export function playChime() {
  tone(880, 880, 0, 0.09, 0.16)
  tone(1320, 1320, 0.08, 0.16, 0.14)
}

// A short ascending arpeggio for completing the collection.
export function playFanfare() {
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((f, i) => tone(f, f, i * 0.11, 0.22, 0.16))
}
