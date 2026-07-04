import { useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Game from './scene/Game'
import TouchJoystick from './components/TouchJoystick'
import { useInputRef } from './hooks/useInputRef'

export default function App() {
  const inputRef = useInputRef()
  const [showHint, setShowHint] = useState(true)
  const [isTouch, setIsTouch] = useState(false)
  const [progress, setProgress] = useState({ count: 0, total: 0 })
  const handleProgress = useCallback((count: number, total: number) => {
    setProgress((prev) => (prev.count === count && prev.total === total ? prev : { count, total }))
  }, [])

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    const t = setTimeout(() => setShowHint(false), 6000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <style>{`
        @keyframes frog-glow {
          0%, 100% { box-shadow: 0 4px 18px rgba(255, 210, 120, 0.6); }
          50% { box-shadow: 0 4px 30px rgba(255, 210, 120, 0.95); }
        }
      `}</style>
      <Canvas
        shadows
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        camera={{ fov: 42, near: 0.1, far: 60 }}
        onPointerDown={() => setShowHint(false)}
      >
        <color attach="background" args={['#f4e6c9']} />
        <Game inputRef={inputRef} onProgress={handleProgress} />
      </Canvas>

      {isTouch && <TouchJoystick inputRef={inputRef} />}

      {progress.total > 0 && (
        <div
          style={{
            position: 'fixed',
            top: 18,
            right: 18,
            background: 'rgba(58, 42, 26, 0.72)',
            color: '#fff6e6',
            padding: '8px 16px',
            borderRadius: 12,
            fontSize: 15,
            pointerEvents: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          }}
        >
          ✨ {progress.count} / {progress.total}
        </div>
      )}

      {progress.total > 0 && progress.count === progress.total && (
        <div
          style={{
            position: 'fixed',
            top: 70,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 233, 168, 0.92)',
            color: '#4a3624',
            padding: '10px 20px',
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 600,
            pointerEvents: 'none',
            textAlign: 'center',
            boxShadow: '0 4px 18px rgba(255, 210, 120, 0.6)',
            animation: 'frog-glow 2.2s ease-in-out infinite',
          }}
        >
          The room is glowing! 🐸✨
        </div>
      )}

      {showHint && (
        <div
          style={{
            position: 'fixed',
            top: 18,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(58, 42, 26, 0.72)',
            color: '#fff6e6',
            padding: '10px 18px',
            borderRadius: 14,
            fontSize: 15,
            letterSpacing: 0.2,
            pointerEvents: 'none',
            textAlign: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          }}
        >
          🐸 Hop around with the arrow keys{isTouch ? ' or the joystick' : ''}!
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          bottom: 10,
          right: 14,
          fontSize: 11,
          color: 'rgba(58,42,26,0.55)',
          pointerEvents: 'none',
        }}
      >
        Froggy&apos;s Apartment
      </div>
    </div>
  )
}
