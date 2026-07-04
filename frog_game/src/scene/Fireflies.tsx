import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SpriteSpot } from './layout'

function Sprite({ spot, collected }: { spot: SpriteSpot; collected: boolean }) {
  const group = useRef<THREE.Group>(null)
  const material = useRef<THREE.MeshStandardMaterial>(null)
  const burst = useRef(0)
  const [dead, setDead] = useState(false)

  useFrame((state, dtRaw) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(dtRaw, 0.05)
    const t = state.clock.elapsedTime

    if (!collected) {
      g.position.set(
        spot.x + Math.sin(t * 0.6 + spot.x) * 0.15,
        spot.y + Math.sin(t * 1.4 + spot.z) * 0.12,
        spot.z + Math.cos(t * 0.5 + spot.z) * 0.15
      )
      const pulse = 1 + Math.sin(t * 3 + spot.x) * 0.1
      g.scale.setScalar(pulse)
    } else {
      burst.current += dt * 2.4
      const fade = Math.max(0, 1 - burst.current)
      g.scale.setScalar(1 + burst.current * 2.2)
      g.position.y += dt * 1.1
      if (material.current) material.current.opacity = fade
      if (burst.current >= 1 && !dead) setDead(true)
    }
  })

  if (dead) return null

  return (
    <group ref={group} position={[spot.x, spot.y, spot.z]}>
      <mesh>
        <sphereGeometry args={[0.11, 10, 10]} />
        <meshStandardMaterial
          ref={material}
          color="#fff3c4"
          emissive="#ffe38a"
          emissiveIntensity={1.6}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  )
}

export default function Fireflies({ spots, collected }: { spots: SpriteSpot[]; collected: Set<string> }) {
  return (
    <>
      {spots.map((s) => (
        <Sprite key={s.id} spot={s} collected={collected.has(s.id)} />
      ))}
    </>
  )
}
