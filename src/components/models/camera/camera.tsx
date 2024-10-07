import React, { ComponentPropsWithoutRef, ElementRef, useRef } from 'react'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type Props = ComponentPropsWithoutRef<'group'>

type GLTFResult = {
  materials: {
    Kiev: THREE.MeshStandardMaterial
  }
  nodes: {
    Object_4: THREE.Mesh
  }
} & GLTF

export const Camera = (props: Props) => {
  const { materials, nodes } = useGLTF('/models/camera.glb') as unknown as GLTFResult

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y -= 0.002
    }
  })
  const ref = useRef<ElementRef<'group'>>(null)

  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        // @ts-ignore
        geometry={nodes.Object_4.geometry}
        // @ts-ignore
        material={materials.Kiev}
        receiveShadow
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/camera.glb')
