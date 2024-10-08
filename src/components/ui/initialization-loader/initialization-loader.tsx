import { ElementRef, Suspense, useEffect, useRef, useState } from 'react'

import { constants } from '@/common/constants/constants'
import { useIsMobile } from '@/common/hooks/use-is-mobile'
import { Camera } from '@/components/models/camera/camera'
import { CanvasLoader } from '@/components/ui/canvas-loader/canvas-loader'
import { Center, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'

import s from './initialization-loader.module.scss'

export type Props = {
  isTouched: boolean
  setIsTouched: (isTouched: boolean) => void
}

export const InitializationLoader = ({ isTouched, setIsTouched }: Props) => {
  const isMobile = useIsMobile()
  const [showAnimation, setShowAnimation] = useState(false)
  const classNames = {
    background: clsx(s.background, showAnimation && s.animation),
  }

  const audioRef = useRef<ElementRef<'audio'>>(null)

  const play = async () => {
    if (audioRef.current) {
      await audioRef.current.play()
    }
  }

  useEffect(() => {
    const timout1 = setTimeout(() => {
      setShowAnimation(true)
    }, 2700)
    const timout2 = setTimeout(() => {
      setShowAnimation(false)
      play()
    }, 2800)

    return () => {
      clearTimeout(timout1)
      clearTimeout(timout2)
    }
  }, [isTouched])

  const { desktop, mobile } = constants.initializationLoaderModelCoordinates

  return (
    <div className={classNames.background}>
      <audio id={'audio'} ref={audioRef} src={'/sounds/click.wav'} />

      <Canvas
        onMouseDown={() => setIsTouched(!isTouched)}
        onTouchMove={() => setIsTouched(!isTouched)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 25]} />
          <Center>
            {!showAnimation && (
              <Camera
                position={isMobile ? mobile.position : desktop.position}
                // @ts-ignore
                rotation={isMobile ? mobile.rotation : desktop.rotation}
                scale={isMobile ? mobile.scale : desktop.scale}
              />
            )}
          </Center>

          <ambientLight intensity={4} />
          <directionalLight intensity={4} position={[-5, 5, -5]} />
        </Suspense>
        <OrbitControls enableZoom={false} maxAzimuthAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}
