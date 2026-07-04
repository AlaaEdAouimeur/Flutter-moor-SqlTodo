import { forwardRef, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { playRibbit } from '../audio/sound'

export interface FrogHandle {
  group: THREE.Group | null
}

const BODY_COLOR = '#7cb66a'
const BELLY_COLOR = '#eef2c8'
const DARK_GREEN = '#548a4a'

const Frog = forwardRef<THREE.Group, { moving: boolean; speed: number }>(function Frog(
  { moving, speed },
  ref
) {
  const hopPhase = useRef(0)
  const prevBounce = useRef(0)
  const blinkTimer = useRef(2)
  const leftEye = useRef<THREE.Mesh>(null)
  const rightEye = useRef<THREE.Mesh>(null)
  const bodyGroup = useRef<THREE.Group>(null)
  const legFL = useRef<THREE.Group>(null)
  const legFR = useRef<THREE.Group>(null)
  const legBL = useRef<THREE.Group>(null)
  const legBR = useRef<THREE.Group>(null)

  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: BODY_COLOR, flatShading: true, roughness: 0.85 }),
    []
  )

  useFrame((_, dt) => {
    const body = bodyGroup.current
    if (!body) return

    if (moving) {
      hopPhase.current += dt * (4 + speed * 2.2)
      const bounce = Math.max(0, Math.sin(hopPhase.current))
      if (prevBounce.current <= 0.01 && bounce > 0.01) playRibbit()
      prevBounce.current = bounce
      body.position.y = 0.28 + bounce * 0.22
      const squash = 1 - bounce * 0.18
      body.scale.set(1 + bounce * 0.12, squash, 1 + bounce * 0.12)

      const legSwing = Math.sin(hopPhase.current) * 0.5
      if (legFL.current) legFL.current.rotation.x = legSwing
      if (legFR.current) legFR.current.rotation.x = -legSwing
      if (legBL.current) legBL.current.rotation.x = -legSwing * 0.7
      if (legBR.current) legBR.current.rotation.x = legSwing * 0.7
    } else {
      hopPhase.current = 0
      prevBounce.current = 0
      const idle = Math.sin(performance.now() * 0.0015) * 0.02
      body.position.y = THREE.MathUtils.lerp(body.position.y, 0.28 + idle, 0.1)
      body.scale.set(
        THREE.MathUtils.lerp(body.scale.x, 1, 0.15),
        THREE.MathUtils.lerp(body.scale.y, 1, 0.15),
        THREE.MathUtils.lerp(body.scale.z, 1, 0.15)
      )
      for (const leg of [legFL.current, legFR.current, legBL.current, legBR.current]) {
        if (leg) leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x, 0, 0.15)
      }
    }

    // Occasional cute blink.
    blinkTimer.current -= dt
    const blinking = blinkTimer.current < 0.12
    const eyeScaleY = blinking ? 0.08 : 1
    if (leftEye.current) leftEye.current.scale.y = eyeScaleY
    if (rightEye.current) rightEye.current.scale.y = eyeScaleY
    if (blinkTimer.current < 0) blinkTimer.current = 2.5 + Math.random() * 2
  })

  return (
    <group ref={ref}>
      <group ref={bodyGroup} position={[0, 0.28, 0]}>
        {/* body */}
        <mesh material={material} castShadow>
          <sphereGeometry args={[0.34, 16, 12]} />
        </mesh>
        {/* belly */}
        <mesh position={[0, -0.08, 0.18]} castShadow>
          <sphereGeometry args={[0.24, 14, 10]} />
          <meshStandardMaterial color={BELLY_COLOR} flatShading roughness={0.9} />
        </mesh>
        {/* eyes (bulging, cute & big) */}
        <group position={[0, 0.28, 0.2]}>
          <mesh position={[-0.16, 0.05, 0.08]}>
            <sphereGeometry args={[0.14, 12, 10]} />
            <meshStandardMaterial color={BODY_COLOR} flatShading />
          </mesh>
          <mesh position={[0.16, 0.05, 0.08]}>
            <sphereGeometry args={[0.14, 12, 10]} />
            <meshStandardMaterial color={BODY_COLOR} flatShading />
          </mesh>
          <mesh ref={leftEye} position={[-0.16, 0.08, 0.19]}>
            <sphereGeometry args={[0.075, 10, 8]} />
            <meshStandardMaterial color="#2b2b2b" />
          </mesh>
          <mesh ref={rightEye} position={[0.16, 0.08, 0.19]}>
            <sphereGeometry args={[0.075, 10, 8]} />
            <meshStandardMaterial color="#2b2b2b" />
          </mesh>
          <mesh position={[-0.13, 0.12, 0.24]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.19, 0.12, 0.24]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* legs */}
        <group ref={legFL} position={[-0.22, -0.12, 0.2]}>
          <mesh position={[0, -0.08, 0.05]} castShadow>
            <capsuleGeometry args={[0.07, 0.12, 4, 6]} />
            <meshStandardMaterial color={DARK_GREEN} flatShading />
          </mesh>
        </group>
        <group ref={legFR} position={[0.22, -0.12, 0.2]}>
          <mesh position={[0, -0.08, 0.05]} castShadow>
            <capsuleGeometry args={[0.07, 0.12, 4, 6]} />
            <meshStandardMaterial color={DARK_GREEN} flatShading />
          </mesh>
        </group>
        <group ref={legBL} position={[-0.24, -0.1, -0.18]}>
          <mesh position={[0, -0.1, -0.05]} castShadow>
            <capsuleGeometry args={[0.09, 0.16, 4, 6]} />
            <meshStandardMaterial color={DARK_GREEN} flatShading />
          </mesh>
        </group>
        <group ref={legBR} position={[0.24, -0.1, -0.18]}>
          <mesh position={[0, -0.1, -0.05]} castShadow>
            <capsuleGeometry args={[0.09, 0.16, 4, 6]} />
            <meshStandardMaterial color={DARK_GREEN} flatShading />
          </mesh>
        </group>
      </group>
    </group>
  )
})

export default Frog
