import { useRef, useState } from 'react'
import type { InputVector } from '../hooks/useInputRef'

const MAX_RADIUS = 45

export default function TouchJoystick({ inputRef }: { inputRef: React.MutableRefObject<InputVector> }) {
  const baseRef = useRef<HTMLDivElement>(null)
  const pointerId = useRef<number | null>(null)
  const [stick, setStick] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const updateFromEvent = (clientX: number, clientY: number) => {
    const base = baseRef.current
    if (!base) return
    const rect = base.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let dx = clientX - cx
    let dy = clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist > MAX_RADIUS) {
      dx = (dx / dist) * MAX_RADIUS
      dy = (dy / dist) * MAX_RADIUS
    }
    setStick({ x: dx, y: dy })
    // Screen up (negative dy) should move the frog "up" (away, -z).
    const nx = dx / MAX_RADIUS
    const nz = dy / MAX_RADIUS
    const len = Math.hypot(nx, nz)
    if (len > 1) {
      inputRef.current.x = nx / len
      inputRef.current.z = nz / len
    } else {
      inputRef.current.x = nx
      inputRef.current.z = nz
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    pointerId.current = e.pointerId
    setActive(true)
    ;(e.target as Element).setPointerCapture(e.pointerId)
    updateFromEvent(e.clientX, e.clientY)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) return
    updateFromEvent(e.clientX, e.clientY)
  }
  const release = (e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) return
    pointerId.current = null
    setActive(false)
    setStick({ x: 0, y: 0 })
    inputRef.current.x = 0
    inputRef.current.z = 0
  }

  return (
    <div
      ref={baseRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      style={{
        position: 'fixed',
        left: 28,
        bottom: 28,
        width: 110,
        height: 110,
        borderRadius: '50%',
        background: 'rgba(255, 248, 232, 0.35)',
        border: '2px solid rgba(255, 248, 232, 0.7)',
        touchAction: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        boxShadow: active ? '0 0 18px rgba(255,255,255,0.5)' : 'none',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: 'rgba(255, 250, 240, 0.9)',
          border: '2px solid rgba(120, 90, 60, 0.5)',
          transform: `translate(${stick.x}px, ${stick.y}px)`,
          transition: active ? 'none' : 'transform 0.15s ease-out',
        }}
      />
    </div>
  )
}
