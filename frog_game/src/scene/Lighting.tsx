export default function Lighting() {
  return (
    <>
      <hemisphereLight args={['#fff3d6', '#6b8f57', 0.65]} />
      <ambientLight intensity={0.25} color="#ffe9c7" />
      {/* warm "sunlight" streaming through the bedroom window */}
      <directionalLight
        position={[3.9, 4.5, 8]}
        intensity={1.1}
        color="#ffe2ab"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-far={20}
      />
      {/* soft fill from the kitchen window */}
      <pointLight position={[-3.9, 2.2, 3]} intensity={0.35} color="#ffd9a0" distance={6} />
      <fog attach="fog" args={['#f4e6c9', 8, 26]} />
    </>
  )
}
