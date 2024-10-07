'use client'
import { Suspense } from 'react'

import avatarDefault from '@/assets/images/default-avatar.png'
import { constants } from '@/common/constants/constants'
import { useWidth } from '@/common/hooks/use-width'
import { PhotoFrame } from '@/components/models/photo-frame/photo-frame'
import { AvatarCamera } from '@/components/ui/avatar/avatar-camera'
import { CanvasLoader } from '@/components/ui/canvas-loader/canvas-loader'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import { Leva, useControls } from 'leva'

import s from './avatar.module.scss'

type Props = {
  className?: string
  size?: 'large' | 'small'
  url?: string
}

export const Avatar = ({ className, size = 'small', url }: Props) => {
  const classNames = {
    canvas: clsx(s.canvas),
    container: clsx(s.container, s[size], className),
    image: clsx(s.image, s[size], url && s.withImage),
  }

  const width = useWidth()

  const isMobile = width <= constants.mobileWidth
  const { desktop, mobile } = constants.avatarCoordinates

  // const x = useControls('InitializationLoader', {
  //   positionX: { max: 50, min: -50, value: 0 },
  //   positionY: { max: 50, min: -50, value: 0 },
  //   positionZ: { max: 50, min: -50, value: 0 },
  //   rotationX: { max: 5, min: -5, value: 0 },
  //   rotationY: { max: 5, min: -5, value: 0 },
  //   rotationZ: { max: 5, min: -5, value: 0 },
  //   scale: { max: 10, min: -10, value: 1 },
  // })

  return (
    <div className={classNames.container}>
      {/*<Leva />*/}
      <Canvas className={classNames.canvas}>
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 25]} />
          <PhotoFrame
            avatarUrl={url ? url : avatarDefault.src}
            // position={[x.positionX, x.positionY, x.positionZ]}
            // rotation={[x.rotationX, x.rotationY, x.rotationZ]}
            // scale={x.scale}
            position={isMobile ? mobile.position : desktop.position}
            // @ts-ignore
            rotation={isMobile ? mobile.rotation : desktop.rotation}
            scale={isMobile ? mobile.scale : desktop.scale}
          />
          <ambientLight intensity={1} />
          <directionalLight intensity={3} position={[-1, 1, 5]} />
        </Suspense>
        {size === 'large' && <AvatarCamera />}
        {size === 'large' && (
          <OrbitControls enableZoom={false} maxAzimuthAngle={Math.PI / 4} maxPolarAngle={Math.PI} />
        )}
      </Canvas>
    </div>
  )
}
