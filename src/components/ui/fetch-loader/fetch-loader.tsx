import { Suspense } from 'react'

import { constants } from '@/common/constants/constants'
import { useIsMobile } from '@/common/hooks/use-is-mobile'
import { FilmRoll } from '@/components/models/film-roll/film-roll'
import { CanvasLoader } from '@/components/ui/canvas-loader/canvas-loader'
import { Center, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'

import s from './fetch-loader.module.scss'

export const FetchLoader = () => {
  const classNames = {
    canvas: clsx(s.canvas),
    container: clsx(s.container),
    loader: clsx(s.loader, s.loading),
  }
  const isMobile = useIsMobile()
  const { desktop, mobile } = constants.fetchLoaderModelCoordinates

  return (
    <div className={classNames.loader}>
      <div className={classNames.container}>
        <Canvas className={classNames.canvas}>
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 25]} />
            <FilmRoll
              position={isMobile ? mobile.position : desktop.position}
              // @ts-ignore
              rotation={isMobile ? mobile.rotation : desktop.rotation}
              scale={isMobile ? mobile.scale : desktop.scale}
            />
            <ambientLight intensity={1} />
            <directionalLight intensity={4} position={[-4, 0.5, 0]} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
