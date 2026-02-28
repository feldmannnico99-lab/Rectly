import { useRef, useCallback } from 'react'
import ModelViewer from './ModelViewer'
import { useGLTF } from '@react-three/drei'

const BASE = import.meta.env.BASE_URL  // '/Rectly/' in prod, '/' in dev

const PHONE_MODELS = {
  de: {
    left:   `${BASE}models/iphone-de-left.glb`,
    center: `${BASE}models/iphone-de-center.glb`,
    right:  `${BASE}models/iphone-de-right.glb`,
  },
  en: {
    left:   `${BASE}models/iphone-en-left.glb`,
    center: `${BASE}models/iphone-en-center.glb`,
    right:  `${BASE}models/iphone-en-right.glb`,
  },
}

// Preload all models at module level
Object.values(PHONE_MODELS).forEach(lang =>
  Object.values(lang).forEach(path => useGLTF.preload(path))
)

const SCREENSHOT = `${BASE}images/app-screenshot.png`

export default function PhoneSlider({ lang = 'de' }) {
  const models = PHONE_MODELS[lang] ?? PHONE_MODELS.de

  // Shared ref read by ModelViewer's useFrame — zero React re-renders
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  const handleMouseDown = useCallback(() => { mouseRef.current.active = true  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!mouseRef.current.active) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current.x = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2)
    mouseRef.current.y = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)
  }, [])

  const handleMouseUp    = useCallback(() => { mouseRef.current.active = false }, [])
  const handleMouseLeave = useCallback(() => { mouseRef.current.active = false }, [])

  return (
    <div className="phone-slider-wrap">
      <div className="phone-slider-stage">

        {/* Left */}
        <div className="phone-display-item phone-display-left">
          <ModelViewer
            modelPath={models.left}
            screenshot={SCREENSHOT}
            spinTrigger={0}
            doIntroSpin={false}
          />
        </div>

        {/* Center — mouse controls the actual Three.js model rotation */}
        <div
          className="phone-display-item phone-display-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <ModelViewer
            modelPath={models.center}
            screenshot={SCREENSHOT}
            spinTrigger={0}
            doIntroSpin={false}
            mouseControl={mouseRef}
          />
        </div>

        {/* Right */}
        <div className="phone-display-item phone-display-right">
          <ModelViewer
            modelPath={models.right}
            screenshot={SCREENSHOT}
            spinTrigger={0}
            doIntroSpin={false}
          />
        </div>

      </div>
    </div>
  )
}
