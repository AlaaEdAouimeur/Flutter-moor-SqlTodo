import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Apartment from './Apartment'
import Frog from './Frog'
import Lighting from './Lighting'
import DustMotes from './DustMotes'
import { resolveCollisions } from './collisions'
import { FROG_RADIUS, OBSTACLES, START_POSITION } from './layout'
import type { InputVector } from '../hooks/useInputRef'

const SPEED = 3.1
const CAMERA_OFFSET = new THREE.Vector3(0, 6.2, 6.5)

export default function Game({ inputRef }: { inputRef: React.MutableRefObject<InputVector> }) {
  const frogGroup = useRef<THREE.Group>(null)
  const position = useRef(new THREE.Vector2(START_POSITION[0], START_POSITION[1]))
  const facing = useRef(Math.PI)
  const [moving, setMoving] = useState(false)
  const { camera } = useThree()
  const cameraInitialized = useRef(false)

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    const { x, z } = inputRef.current
    const isMoving = x !== 0 || z !== 0

    if (isMoving) {
      const tmp = {
        x: position.current.x + x * SPEED * dt,
        z: position.current.y + z * SPEED * dt,
      }
      resolveCollisions(tmp, FROG_RADIUS, OBSTACLES)
      position.current.set(tmp.x, tmp.z)

      const targetFacing = Math.atan2(x, z)
      let delta = targetFacing - facing.current
      delta = ((delta + Math.PI) % (Math.PI * 2)) - Math.PI
      facing.current += delta * Math.min(1, dt * 10)
    }

    if (isMoving !== moving) setMoving(isMoving)

    const group = frogGroup.current
    if (group) {
      group.position.x = position.current.x
      group.position.z = position.current.y
      group.rotation.y = facing.current
    }

    // Third-person follow camera with a gentle isometric-storybook angle.
    const desired = new THREE.Vector3(position.current.x, 0, position.current.y).add(CAMERA_OFFSET)
    if (!cameraInitialized.current) {
      camera.position.copy(desired)
      cameraInitialized.current = true
    } else {
      camera.position.lerp(desired, Math.min(1, dt * 3.5))
    }
    camera.lookAt(position.current.x, 0.4, position.current.y)
  })

  return (
    <>
      <Lighting />
      <Apartment />
      <DustMotes />
      <Frog ref={frogGroup} moving={moving} speed={1} />
    </>
  )
}
