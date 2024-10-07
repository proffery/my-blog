import { ElementRef, ReactNode, forwardRef } from 'react'

import { useIsMobile } from '@/common/hooks/use-is-mobile'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

type Props = {
  children?: ReactNode
}

export const AvatarCamera = forwardRef<ElementRef<'group'>, Props>(({ children }: Props, ref) => {
  const isMobile = useIsMobile()

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
})
