'use client'
import { Suspense } from 'react'

import avatarDefault from '@/assets/images/default-avatar.png'
import { constants } from '@/common/constants/constants'
import { useIsMobile } from '@/common/hooks/use-is-mobile'
import { PhotoFrame } from '@/components/models/photo-frame/photo-frame'
import { AvatarCamera } from '@/components/ui/avatar/avatar-camera'
import { CanvasLoader } from '@/components/ui/canvas-loader/canvas-loader'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'

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

  const isMobile = useIsMobile()

  const { desktop, mobile } = constants.avatarCoordinates

  return (
    <div className={classNames.container}>
      <Canvas className={classNames.canvas}>
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 25]} />
          <PhotoFrame
            avatarUrl={url ? url : avatarDefault.src}
            position={isMobile ? mobile.position : desktop.position}
            // @ts-ignore
            rotation={isMobile ? mobile.rotation : desktop.rotation}
            scale={isMobile ? mobile.scale : desktop.scale}
          />
          <ambientLight intensity={2} />
          <directionalLight intensity={5} position={[-2, -8, 2]} />
        </Suspense>
        {size === 'large' && <AvatarCamera />}
        {size === 'large' && (
          <OrbitControls enableZoom={false} maxAzimuthAngle={Math.PI / 4} maxPolarAngle={Math.PI} />
        )}
      </Canvas>
    </div>
  )
}
