/*
auto-generated by: https://github.com/react-spring/gltfjsx
author: 3DLadnik (https://sketchfab.com/3DLadnik)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/3d-printable-the-three-graces-58e0ae19e2984b86883edc41bf43415a
title: 3D Printable The Three Graces
*/

import React, { useMemo, useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import lerp from 'lerp'

export default function Model(props) {
  const group = useRef()
  const { scene, materials, nodes } = useLoader(GLTFLoader, '/graces-draco.glb', loader => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco-gltf/')
    loader.setDRACOLoader(dracoLoader)
  })

  useMemo(() => {
    materials['Scene_-_Root'].roughness = 0.9
    materials['Scene_-_Root'].metalness = 0.5
    materials['Scene_-_Root'].color.set('#474747')
    nodes['Node_3'].castShadow = true
    nodes['Node_3'].receiveShadow = true
  }, [materials])

  useFrame(({ clock, mouse }) => {
    group.current.rotation.y = lerp(group.current.rotation.y, mouse.x * (Math.PI / 5), 0.005)
  })

  return (
    <group {...props}>
      <group ref={group}>
        <primitive scale={[2, 1, 1]} rotation={[Math.PI / 7, 0, 0]} object={scene} dispose={null} />
        <Lights />
      </group>
    </group>
  )
}

function Lights() {
  const groupL = useRef()
  const groupR = useRef()
  const front = useRef()
  const back = useRef()

  useFrame(({ clock, mouse }) => {
    groupL.current.rotation.y = lerp(groupL.current.rotation.y, -mouse.x * (Math.PI / 2), 0.1)
    groupR.current.rotation.y = lerp(groupR.current.rotation.y, mouse.x * (Math.PI / 2), 0.1)
    front.current.position.x = lerp(front.current.position.x, mouse.x * 12, 0.5)
    front.current.position.y = lerp(front.current.position.y, 7 + mouse.y * 4, 0.5)
  })

  return (
    <>
      <group ref={groupL}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
        <pointLight position={[0, 7, 15]} distance={20} intensity={0} />
      </group>
      <spotLight
        castShadow
        ref={front}
        penumbra={1}
        angle={Math.PI / 3}
        position={[0, 0, 5]}
        distance={12}
        intensity={8}
        shadow-bias={-0.001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  )
}
