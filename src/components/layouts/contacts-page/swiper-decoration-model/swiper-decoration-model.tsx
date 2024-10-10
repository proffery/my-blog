import { ComponentPropsWithoutRef, ElementRef, Suspense, useRef } from 'react'

import { constants } from '@/common/constants/constants'
import { useIsMobile } from '@/common/hooks/use-is-mobile'
import { Camera } from '@/components/models/camera/camera'
import { CanvasLoader } from '@/components/ui/canvas-loader/canvas-loader'
import { useGSAP } from '@gsap/react'
import { Center, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import { gsap } from 'gsap'

import s from './swiper-decoration-model.module.scss'

export type Props = {
  showAnimation: boolean
} & ComponentPropsWithoutRef<'div'>

export const SwiperDecorationModel = ({ className, showAnimation, ...rest }: Props) => {
  const isMobile = useIsMobile()
  const classNames = {
    canvas: clsx(s.canvas),
    container: clsx(s.container, className),
  }

  const audioRef = useRef<ElementRef<'audio'>>(null)
  const modelRef = useRef<ElementRef<typeof Camera>>(null)

  const play = async () => {
    if (audioRef.current) {
      await audioRef.current.play()
    }
  }

  useGSAP(() => {
    if (modelRef.current) {
      showAnimation &&
        gsap.from(modelRef.current.rotation, {
          duration: 1,
          ease: 'power3',
          y: Math.PI / 2,
        })
    }
    showAnimation && play()
  }, [showAnimation])

  const { desktop, mobile } = constants.initializationLoaderModelCoordinates

  return (
    <div {...rest} className={classNames.container}>
      <audio id={'audio'} ref={audioRef} src={'/sounds/click.wav'} />
      <Canvas className={classNames.canvas}>
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 25]} />
          <Center>
            <Camera
              position={isMobile ? mobile.position : desktop.position}
              ref={modelRef}
              // @ts-ignore
              rotation={isMobile ? mobile.rotation : desktop.rotation}
              scale={isMobile ? mobile.scale : desktop.scale}
              showAnimation={showAnimation}
            />
          </Center>
          <ambientLight intensity={4} />
          <directionalLight intensity={2} position={[-1, 1, 2]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
