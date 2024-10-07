import React, { ComponentPropsWithoutRef, ElementRef, useRef } from 'react'

import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type Props = { avatarUrl: string } & ComponentPropsWithoutRef<'group'>

type GLTFResult = {
  materials: {
    Photo: THREE.MeshStandardMaterial
    White: THREE.MeshStandardMaterial
    material_0: THREE.MeshStandardMaterial
  }
  nodes: {
    Object_4: THREE.Mesh
    Object_6: THREE.Mesh
    Object_8: THREE.Mesh
  }
} & GLTF

export const PhotoFrame = ({ avatarUrl, ...rest }: Props) => {
  const { materials, nodes } = useGLTF('/models/photo_frame.glb') as unknown as GLTFResult
  const group = useRef<ElementRef<'group'>>(null)
  const avatar = useTexture(avatarUrl)

  return (
    <group ref={group} {...rest} dispose={null}>
      <group name={'Sketchfab_Scene'}>
        <group name={'Sketchfab_model'} rotation={[-Math.PI / 2, 0, 0]}>
          <group name={'root'}>
            <group name={'GLTF_SceneRootNode'} rotation={[Math.PI / 2, 0, 0]}>
              <group name={'Obj_PhotoFrame_2'}>
                <mesh
                  castShadow
                  // @ts-ignore
                  geometry={nodes.Object_4.geometry}
                  // @ts-ignore
                  material={materials.White}
                  name={'Object_4'}
                  receiveShadow
                />
              </group>
              <group
                name={'Obj_PhotoFrame001_3'}
                position={[-0.008, 0.025, -0.007]}
                rotation={[0, 0, 0.576]}
              >
                <mesh
                  castShadow
                  // @ts-ignore
                  geometry={nodes.Object_6.geometry}
                  // @ts-ignore
                  material={materials.material_0}
                  name={'Object_6'}
                  receiveShadow
                />
              </group>
              <group name={'Obj_Photo_4'}>
                <mesh
                  castShadow
                  // @ts-ignore
                  geometry={nodes.Object_8.geometry}
                  // @ts-ignore
                  material={materials.Photo}
                  name={'Object_8'}
                  receiveShadow
                >
                  <meshPhongMaterial map={avatar} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/photo_frame.glb')
