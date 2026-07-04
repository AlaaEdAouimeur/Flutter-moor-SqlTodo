import { useEffect, useRef } from 'react'

export interface InputVector {
  x: number
  z: number
}

const KEY_MAP: Record<string, keyof typeof heldKeysTemplate> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

const heldKeysTemplate = { up: false, down: false, left: false, right: false }

// Shared mutable input vector, written by keyboard arrow keys and/or the
// on-screen touch joystick. Read every frame in the game loop -- kept as a
// ref (not state) so held keys don't trigger React re-renders.
export function useInputRef() {
  const inputRef = useRef<InputVector>({ x: 0, z: 0 })
  const held = useRef({ ...heldKeysTemplate })

  useEffect(() => {
    const updateFromKeys = () => {
      const h = held.current
      let x = (h.right ? 1 : 0) - (h.left ? 1 : 0)
      let z = (h.down ? 1 : 0) - (h.up ? 1 : 0)
      const len = Math.hypot(x, z)
      if (len > 0) {
        x /= len
        z /= len
      }
      inputRef.current.x = x
      inputRef.current.z = z
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const key = KEY_MAP[e.key]
      if (!key) return
      e.preventDefault()
      held.current[key] = true
      updateFromKeys()
    }
    const onKeyUp = (e: KeyboardEvent) => {
      const key = KEY_MAP[e.key]
      if (!key) return
      held.current[key] = false
      updateFromKeys()
    }
    const onBlur = () => {
      held.current = { ...heldKeysTemplate }
      updateFromKeys()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return inputRef
}
