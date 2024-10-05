import { ElementRef, Suspense, useEffect, useRef, useState } from 'react'

import { constants } from '@/common/constants/constants'
import { useWidth } from '@/common/hooks/use-width'
import { FilmRoll } from '@/components/models/film-roll/film-roll'
import { CanvasLoader } from '@/components/ui/canvas-loader/canvas-loader'
import { Center, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import { Leva, useControls } from 'leva'

import s from './initialization-loader.module.scss'

export type Props = {
  isTouched: boolean
  setIsTouched: (isTouched: boolean) => void
}

export const InitializationLoader = ({ isTouched, setIsTouched }: Props) => {
  const width = useWidth()
  const [showAnimation, setShowAnimation] = useState(false)
  const classNames = {
    background: clsx(s.background, showAnimation && s.animation),
    canvas: clsx(s.canvas),
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
    }, 2500)
    const timout2 = setTimeout(() => {
      setShowAnimation(false)
      play()
    }, 2700)

    return () => {
      clearTimeout(timout1)
      clearTimeout(timout2)
    }
  }, [isTouched])

  const isMobile = width <= constants.mobileWidth
  const { desktop, mobile } = constants.initializationLoaderCoordinates

  // const x = useControls('InitializationLoader', {
  //   positionX: { max: 10, min: -10, value: 1 },
  //   positionY: { max: 10, min: -10, value: 1 },
  //   positionZ: { max: 10, min: -10, value: 1 },
  //   rotationX: { max: 10, min: -10, value: 5 },
  //   rotationY: { max: 10, min: -10, value: 5 },
  //   rotationZ: { max: 10, min: -10, value: 5 },
  //   scale: { max: 50, min: 0, value: 25 },
  // })

  return (
    <div className={classNames.background}>
      <audio id={'audio'} ref={audioRef} src={'/sounds/click.wav'} />
      {/*<Leva />*/}
      <Canvas
        className={classNames.canvas}
        onMouseDown={() => setIsTouched(!isTouched)}
        onTouchMove={() => setIsTouched(!isTouched)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 25]} />
          <Center>
            {!showAnimation && (
              <FilmRoll
                position={isMobile ? mobile.position : desktop.position}
                // @ts-ignore
                rotation={isMobile ? mobile.rotation : desktop.rotation}
                scale={isMobile ? mobile.scale : desktop.scale}
                // position={[x.positionX, x.positionY, x.positionZ]}
                // rotation={[x.rotationX, x.rotationY, x.rotationZ]}
                // scale={x.scale}
              />
            )}
          </Center>

          <ambientLight intensity={1} />
          <directionalLight intensity={4} position={[-4, 0.5, 0]} />
        </Suspense>
        <OrbitControls maxAzimuthAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}
