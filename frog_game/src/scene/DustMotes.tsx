import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 60

export default function DustMotes() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: 2.5 + Math.random() * 3,
        y: Math.random() * 2.4,
        z: 2 + Math.random() * 3,
        speed: 0.15 + Math.random() * 0.25,
        offset: Math.random() * Math.PI * 2,
        radius: 0.3 + Math.random() * 0.6,
      })),
    []
  )

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.elapsedTime
    seeds.forEach((s, i) => {
      const y = (s.y + t * s.speed) % 2.4
      const x = s.x + Math.sin(t * 0.3 + s.offset) * s.radius
      const z = s.z + Math.cos(t * 0.25 + s.offset) * s.radius
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(0.012 + 0.006 * Math.sin(t + s.offset))
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#fff3d0" emissive="#fff3d0" emissiveIntensity={1.2} transparent opacity={0.7} />
    </instancedMesh>
  )
}
