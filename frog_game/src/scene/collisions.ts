import { Obstacle } from './layout'

export interface Vec2 {
  x: number
  z: number
}

// Pushes `pos` out of any overlapping obstacle using circle-vs-AABB resolution.
// Runs a couple of passes so corner cases (two obstacles at once) settle nicely.
export function resolveCollisions(pos: Vec2, radius: number, obstacles: Obstacle[]) {
  for (let pass = 0; pass < 2; pass++) {
    for (const obs of obstacles) {
      const minX = obs.x - obs.width / 2
      const maxX = obs.x + obs.width / 2
      const minZ = obs.z - obs.depth / 2
      const maxZ = obs.z + obs.depth / 2

      const closestX = Math.min(Math.max(pos.x, minX), maxX)
      const closestZ = Math.min(Math.max(pos.z, minZ), maxZ)

      const dx = pos.x - closestX
      const dz = pos.z - closestZ
      const distSq = dx * dx + dz * dz

      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq)
        if (dist < 1e-5) {
          // Center is exactly inside the box; push out along the shallowest axis.
          const penLeft = pos.x - minX
          const penRight = maxX - pos.x
          const penTop = pos.z - minZ
          const penBottom = maxZ - pos.z
          const minPen = Math.min(penLeft, penRight, penTop, penBottom)
          if (minPen === penLeft) pos.x = minX - radius
          else if (minPen === penRight) pos.x = maxX + radius
          else if (minPen === penTop) pos.z = minZ - radius
          else pos.z = maxZ + radius
        } else {
          const overlap = radius - dist
          pos.x += (dx / dist) * overlap
          pos.z += (dz / dist) * overlap
        }
      }
    }
  }
}
