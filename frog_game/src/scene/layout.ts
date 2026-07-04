export interface Obstacle {
  id: string
  x: number
  z: number
  width: number
  depth: number
  height: number
  y?: number
  color: string
  wall?: boolean
}

// A cozy one-bedroom apartment: a living room / kitchenette on the west side
// and a separate bedroom on the east side, joined by an open doorway.
// All units are meters, XZ ground plane, +z points toward the viewer/camera.

export const WALL_HEIGHT = 2.6
const WALL_THICKNESS = 0.3

export const OBSTACLES: Obstacle[] = [
  // --- outer walls ---
  { id: 'wall-west', x: -6.15, z: 0, width: WALL_THICKNESS, depth: 10.6, height: WALL_HEIGHT, color: '#e8d9bd', wall: true },
  { id: 'wall-east', x: 6.15, z: 0, width: WALL_THICKNESS, depth: 10.6, height: WALL_HEIGHT, color: '#e8d9bd', wall: true },
  { id: 'wall-south', x: 0, z: -5.15, width: 12.6, depth: WALL_THICKNESS, height: WALL_HEIGHT, color: '#e8d9bd', wall: true },
  { id: 'wall-north', x: 0, z: 5.15, width: 12.6, depth: WALL_THICKNESS, height: WALL_HEIGHT, color: '#e0cfae', wall: true },

  // --- divider wall between living room and bedroom, with a doorway gap ---
  { id: 'divider-a', x: 1, z: -3.075, width: WALL_THICKNESS, depth: 4.15, height: WALL_HEIGHT, color: '#e8d9bd', wall: true },
  { id: 'divider-b', x: 1, z: 3.075, width: WALL_THICKNESS, depth: 4.15, height: WALL_HEIGHT, color: '#e8d9bd', wall: true },

  // --- living room / kitchenette furniture ---
  { id: 'counter', x: -3.9, z: 4.55, width: 4.2, depth: 0.7, height: 0.9, color: '#c9a877' },
  { id: 'fridge', x: -5.7, z: 4.2, width: 0.9, depth: 0.9, height: 1.7, color: '#f2ede1' },
  { id: 'dining-table', x: -1.4, z: 1.9, width: 1.1, depth: 1.1, height: 0.75, color: '#b6875a' },
  { id: 'sofa', x: -4.6, z: -1.9, width: 2.4, depth: 1.0, height: 0.75, color: '#8fae6d' },
  { id: 'coffee-table', x: -4.6, z: -0.2, width: 1.1, depth: 0.6, height: 0.4, color: '#a9805a' },
  { id: 'bookshelf', x: -5.75, z: -3.8, width: 0.6, depth: 1.4, height: 1.8, color: '#9c7248' },
  { id: 'plant-living', x: -0.6, z: -4.4, width: 0.55, depth: 0.55, height: 1.1, color: '#5c8a52' },

  // --- bedroom furniture ---
  { id: 'bed', x: 3.9, z: 4.0, width: 2.6, depth: 2.0, height: 0.6, color: '#e79aa8' },
  { id: 'nightstand', x: 2.2, z: 4.35, width: 0.6, depth: 0.6, height: 0.55, color: '#c9a877' },
  { id: 'wardrobe', x: 5.7, z: -2.6, width: 0.7, depth: 1.8, height: 1.9, color: '#9c7248' },
  { id: 'desk', x: 2.0, z: -3.9, width: 1.3, depth: 0.65, height: 0.75, color: '#b6875a' },
  { id: 'plant-bedroom', x: 5.4, z: 4.6, width: 0.5, depth: 0.5, height: 1.0, color: '#5c8a52' },
]

export const FROG_RADIUS = 0.32
export const START_POSITION: [number, number] = [-3, -3]
export const DOORWAY = { x: 1, minZ: -1, maxZ: 1 }
