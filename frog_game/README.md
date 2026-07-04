# Froggy's Apartment 🐸

A cute, Ghibli-inspired 3D game built with React Three Fiber. A little frog explores a
cozy one-bedroom apartment — kitchenette, living room, and bedroom — bathed in warm,
painterly light with drifting dust motes.

## Controls

- **Arrow keys** (`↑ ↓ ← →`) to hop around the apartment.
- **Touch**: an on-screen joystick appears automatically on touch devices (bottom-left)
  for moving the frog.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build

```bash
npm run build
npm run preview
```

## Tech

- [Vite](https://vitejs.dev/) + React + TypeScript
- [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber) and
  [`@react-three/drei`](https://github.com/pmndrs/drei)
- Procedurally modeled frog and furniture (no external 3D assets) with circle-vs-AABB
  collision against the apartment's walls and furniture.
