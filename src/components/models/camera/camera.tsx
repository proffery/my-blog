import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type Props = { showAnimation?: boolean } & ComponentPropsWithoutRef<'group'>

type GLTFResult = {
  materials: {
    Kiev: THREE.MeshStandardMaterial
  }
  nodes: {
    Object_4: THREE.Mesh
  }
} & GLTF

export const Camera = forwardRef<ElementRef<'group'>, Props>((props: Props, ref) => {
  const { materials, nodes } = useGLTF('/models/camera.glb') as unknown as GLTFResult

  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        // @ts-ignore
        geometry={nodes.Object_4.geometry}
        // @ts-ignore
        material={materials.Kiev}
        receiveShadow
        rotation={[0, 0, 0]}
      />
    </group>
  )
})

useGLTF.preload('/models/camera.glb')
