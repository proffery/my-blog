import React, { ComponentPropsWithoutRef } from 'react'

import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type Props = { avatarUrl: string } & ComponentPropsWithoutRef<'group'>

type GLTFResult = {
  materials: {
    Frameblinn2SG: THREE.MeshStandardMaterial
    Framelambert79SG: THREE.MeshStandardMaterial
    initialShadingGroup: THREE.MeshStandardMaterial
  }
  nodes: {
    Object_3: THREE.Mesh
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
  }
} & GLTF

export const OldPhoto = ({ avatarUrl, ...rest }: Props) => {
  const { materials, nodes } = useGLTF('/models/old_photo/scene.gltf') as unknown as GLTFResult

  const avatar = useTexture(avatarUrl)

  return (
    <group {...rest} dispose={null}>
      <group position={[0.036, 0.119, 0]} rotation={[-Math.PI, 0, Math.PI / 2]} scale={0.01}>
        <mesh
          castShadow
          // @ts-ignore
          geometry={nodes.Object_4.geometry}
          // @ts-ignore
          material={materials['front.001']}
          receiveShadow
        >
          <meshPhongMaterial map={avatar} />
        </mesh>
        <mesh
          castShadow
          // @ts-ignore
          geometry={nodes.Object_5.geometry}
          // @ts-ignore
          material={materials['back.001']}
          receiveShadow
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/old_photo/scene.gltf')
