import { ElementRef, ReactNode, forwardRef, useRef } from 'react'

import { constants } from '@/common/constants/constants'
import { useWidth } from '@/common/hooks/use-width'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

type Props = {
  children?: ReactNode
}

export const InitializationLoaderCamera = forwardRef<ElementRef<'group'>, Props>(
  ({ children }: Props, ref) => {
    const width = useWidth()
    const isMobile = width <= constants.mobileWidth
    const cameraRef = useRef<any>(null)

    useFrame((state, delta) => {
      // @ts-ignore
      easing.damp3(state.camera.position, [0, 0, 25], 0.25, delta)
      if (!isMobile) {
        // @ts-ignore
        easing.dampE(
          // @ts-ignore
          state.camera.position,
          [-(5 * state.pointer.x) / 2, -(5 * state.pointer.y) / 2, 20],
          0.25,
          delta
        )
      }
    })

    return (
      <group ref={ref} scale={1}>
        {children}
      </group>
    )
  }
)
