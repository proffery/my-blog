import { Suspense } from 'react'

import { constants } from '@/common/constants/constants'
import { useWidth } from '@/common/hooks/use-width'
import { FilmRoll } from '@/components/models/film-roll/film-roll'
import { CanvasLoader } from '@/components/ui/canvas-loader/canvas-loader'
import { InitializationLoaderCamera } from '@/components/ui/initialization-loader/initialization-loader-camera'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import clsx from 'clsx'
import { Leva, useControls } from 'leva'

import s from './initialization-loader.module.scss'

export const InitializationLoader = () => {
  const classNames = {
    background: clsx(s.background),
    canvas: clsx(s.canvas),
    loader: clsx(s.loader),
  }

  const width = useWidth()

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
      {/*<Leva />*/}
      <Canvas className={classNames.canvas}>
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 25]} />
          <InitializationLoaderCamera>
            <FilmRoll
              position={isMobile ? mobile.position : desktop.position}
              // @ts-ignore
              rotation={isMobile ? mobile.rotation : desktop.rotation}
              scale={isMobile ? mobile.scale : desktop.scale}

              // position={[x.positionX, x.positionY, x.positionZ]}
              // rotation={[x.rotationX, x.rotationY, x.rotationZ]}
              // scale={x.scale}
            />
          </InitializationLoaderCamera>
          <ambientLight intensity={1} />
          <directionalLight intensity={0.5} position={[-10, -10, 10]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
