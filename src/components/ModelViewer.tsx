import { Suspense, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Stage, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const DISPLAY_Y  = Math.PI   // front face forward
const INTRO_SECS = 1.6
const NAV_SECS   = 0.85
const SWAY_AMP   = Math.PI / 14
const SWAY_FREQ  = 0.14

type MouseControl = { current: { x: number; y: number; active: boolean } }

export interface ModelViewerProps {
  modelPath:      string
  screenshot:     string
  spinTrigger?:   number
  doIntroSpin?:   boolean
  onSpinComplete?: () => void
  mouseControl?:  MouseControl
}

function IPhoneScene({
  modelPath,
  screenshot,
  spinTrigger = 0,
  doIntroSpin = true,
  onSpinComplete,
  mouseControl,
}: ModelViewerProps) {
  const { scene: baseScene } = useGLTF(modelPath)
  const scene = useMemo(() => baseScene.clone(true), [baseScene])

  const texture  = useTexture(screenshot)
  const groupRef = useRef<THREE.Group>(null)
  const meshRef  = useRef<THREE.Mesh | null>(null)

  const phase   = useRef<'intro' | 'idle' | 'spin'>(doIntroSpin ? 'intro' : 'idle')
  const elapsed = useRef(0)
  const smoothY = useRef(DISPLAY_Y)
  const smoothX = useRef(0)
  const mounted = useRef(false)

  useEffect(() => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
  }, [texture])

  useEffect(() => {
    scene.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return
      const mat = child.material as THREE.MeshStandardMaterial
      if (mat?.name === 'Display') {
        child.material = new THREE.MeshBasicMaterial({ map: texture })
        meshRef.current = child
      }
    })
  }, [scene]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    if (phase.current === 'idle') {
      phase.current = 'spin'
      elapsed.current = 0
    }
  }, [spinTrigger])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (phase.current === 'intro') {
      elapsed.current = Math.min(elapsed.current + delta, INTRO_SECS)
      const t = elapsed.current / INTRO_SECS
      const eased = 1 - Math.pow(1 - t, 3)
      groupRef.current.rotation.y = DISPLAY_Y + (1 - eased) * Math.PI * 2
      if (t >= 1) {
        groupRef.current.rotation.y = DISPLAY_Y
        smoothY.current = DISPLAY_Y
        phase.current = 'idle'
      }
      return
    }

    if (phase.current === 'spin') {
      elapsed.current = Math.min(elapsed.current + delta, NAV_SECS)
      const t = elapsed.current / NAV_SECS
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      groupRef.current.rotation.y = DISPLAY_Y + eased * Math.PI * 2
      if (t >= 1) {
        groupRef.current.rotation.y = DISPLAY_Y
        smoothY.current = DISPLAY_Y
        smoothX.current = 0
        phase.current = 'idle'
        onSpinComplete?.()
      }
      return
    }

    // Idle: mouse-driven 3D rotation OR gentle sway
    if (mouseControl?.current?.active) {
      // Full 360° Y rotation + ±26° X tilt from mouse position
      const tgtY = DISPLAY_Y + mouseControl.current.x * Math.PI
      const tgtX = mouseControl.current.y * -0.45
      smoothY.current = THREE.MathUtils.lerp(smoothY.current, tgtY, 0.12)
      smoothX.current = THREE.MathUtils.lerp(smoothX.current, tgtX, 0.12)
    } else {
      // Gentle autonomous sway, spring back to front on leave
      const swayTgt = DISPLAY_Y + Math.sin(state.clock.elapsedTime * SWAY_FREQ * Math.PI * 2) * SWAY_AMP
      smoothY.current = THREE.MathUtils.lerp(smoothY.current, swayTgt, 0.04)
      smoothX.current = THREE.MathUtils.lerp(smoothX.current, 0, 0.06)
    }
    groupRef.current.rotation.y = smoothY.current
    groupRef.current.rotation.x = smoothX.current
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

export function preloadModel(path: string) {
  useGLTF.preload(path)
}

export default function ModelViewer(props: ModelViewerProps) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      shadows
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Stage preset="rembrandt" intensity={0.7} environment="city" adjustCamera={0.6}>
          <IPhoneScene {...props} />
        </Stage>
      </Suspense>
    </Canvas>
  )
}
