import React, { ComponentPropsWithoutRef, ElementRef, forwardRef, useRef } from 'react'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type Props = ComponentPropsWithoutRef<'group'>

type GLTFResult = {
  materials: {
    Material_27: THREE.MeshStandardMaterial
  }
  nodes: {
    ['LP_roll_film_Material_#27_0']: THREE.Mesh
  }
} & GLTF

export const FilmRoll = (props: Props) => {
  const { materials, nodes } = useGLTF(
    '/models/35mm_film_roll/35mm_film_roll.glb'
  ) as unknown as GLTFResult

  const ref = useRef<any>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.01
    }
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          /* @ts-ignore */
          geometry={nodes['LP_roll_film_Material_#27_0'].geometry}
          /* @ts-ignore */
          material={materials.Material_27}
          receiveShadow
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/35mm_film_roll.glb')
