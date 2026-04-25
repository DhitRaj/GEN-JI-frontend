"use client";

import { useGLTF, useAnimations, useScroll, Html } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Spiderman() {
  const group = useRef<THREE.Group>(null);
  const [loadError, setLoadError] = useState(false);
  
  const gltf = useGLTF("/models/spiderman.glb", true, undefined, (e) => {
    console.error("3D Load Error:", e);
    setLoadError(true);
  });

  const { scene, animations } = gltf || { scene: null, animations: [] };
  const { actions, names } = useAnimations(animations, group);
  const scroll = useScroll();

  useEffect(() => {
    if (actions && names.length > 0) {
      actions[names[0]]?.play();
    }
  }, [actions, names]);

  useFrame((state) => {
    if (!group.current) return;
    const offset = scroll.offset;

    // Cinematic Swing Path
    group.current.position.z = -offset * 80; 
    group.current.position.y = 2 + Math.sin(offset * Math.PI * 4) * 4; 
    group.current.position.x = Math.sin(offset * Math.PI * 2) * 10; 

    group.current.rotation.z = Math.sin(offset * Math.PI * 4) * 0.8;
    group.current.rotation.y = Math.PI + Math.sin(offset * Math.PI * 2) * 1.5;
    group.current.rotation.x = Math.sin(offset * Math.PI * 8) * 0.2;
  });

  return (
    <group ref={group}>
      {scene ? (
        <primitive object={scene} scale={3} />
      ) : (
        <mesh scale={[0.5, 0.5, 0.5]}>
          <sphereGeometry />
          <meshBasicMaterial color="red" wireframe opacity={0.1} transparent />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/models/spiderman.glb", true);
