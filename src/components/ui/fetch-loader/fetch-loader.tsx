import { Suspense } from 'react'

import { constants } from '@/common/constants/constants'
import { useWidth } from '@/common/hooks/use-width'
import { FilmRoll } from '@/components/models/film-roll/film-roll'
import { CanvasLoader } from '@/components/ui/canvas-loader/canvas-loader'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'

import s from './fetch-loader.module.scss'

type Props = {
  loading?: boolean
}

export const FetchLoader = ({ loading = false }: Props) => {
  const classNames = {
    loader: clsx(s.loader, loading && s.loading),
  }
  const width = useWidth()
  const isMobile = width <= constants.mobileWidth
  const { desktop, mobile } = constants.linearLoaderCoordinates

  return (
    <div className={classNames.loader}>
      <Canvas>
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 25]} />
          <FilmRoll
            position={isMobile ? mobile.position : desktop.position}
            // @ts-ignore
            rotation={isMobile ? mobile.rotation : desktop.rotation}
            scale={isMobile ? mobile.scale : desktop.scale}
            // position={[x.positionX, x.positionY, x.positionZ]}
            // rotation={[x.rotationX, x.rotationY, x.rotationZ]}
            // scale={x.scale}
          />
          <ambientLight intensity={1} />
          <directionalLight intensity={4} position={[-4, 0.5, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
