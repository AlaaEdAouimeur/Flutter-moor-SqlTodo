import { OBSTACLES, WALL_HEIGHT } from './layout'

export default function Apartment() {
  return (
    <group>
      {/* floor: two-tone wood in living room + soft rug tone in bedroom */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.5, 0, 0]} receiveShadow>
        <planeGeometry args={[8.7, 10.3]} />
        <meshStandardMaterial color="#d8b78a" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.75, 0, 0]} receiveShadow>
        <planeGeometry args={[4.6, 10.3]} />
        <meshStandardMaterial color="#e6cba3" roughness={0.95} />
      </mesh>

      {/* soft rugs (decorative, no collision) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.6, 0.005, -1.3]}>
        <circleGeometry args={[1.3, 24]} />
        <meshStandardMaterial color="#e2946f" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.9, 0.005, 1.6]}>
        <circleGeometry args={[1.5, 24]} />
        <meshStandardMaterial color="#f3d9c4" roughness={1} />
      </mesh>

      {/* walls + furniture, driven by shared layout/collision data */}
      {OBSTACLES.map((obs) => (
        <mesh
          key={obs.id}
          position={[obs.x, (obs.y ?? 0) + obs.height / 2, obs.z]}
          castShadow={!obs.wall}
          receiveShadow
        >
          <boxGeometry args={[obs.width, obs.height, obs.depth]} />
          <meshStandardMaterial color={obs.color} flatShading roughness={obs.wall ? 0.95 : 0.8} />
        </mesh>
      ))}

      {/* window on the back (north) wall, above the bed, warm glow */}
      <mesh position={[3.9, 1.9, 5.02]}>
        <planeGeometry args={[1.6, 1.1]} />
        <meshStandardMaterial color="#ffe9b8" emissive="#ffdca0" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[3.9, 1.9, 5.02]}>
        <boxGeometry args={[1.7, 1.2, 0.06]} />
        <meshStandardMaterial color="#a9805a" wireframe />
      </mesh>

      {/* second window over the kitchen counter */}
      <mesh position={[-3.9, 1.9, 5.02]}>
        <planeGeometry args={[2.0, 1.0]} />
        <meshStandardMaterial color="#ffe9b8" emissive="#ffdca0" emissiveIntensity={0.55} />
      </mesh>

      {/* ceiling, dim so it doesn't box in the camera visually */}
      <mesh position={[0, WALL_HEIGHT, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13, 11]} />
        <meshStandardMaterial color="#3a3226" />
      </mesh>
    </group>
  )
}
