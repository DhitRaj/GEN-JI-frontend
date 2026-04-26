"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

export default function CameraRig() {
  const scroll = useScroll();

  useFrame((state) => {
    // Linear dolly shot from Z=20 to Z=-220
    // Total distance = 240 units
    const offset = scroll.offset;
    // Total distance increased to 300 units for deeper feel
    const targetZ = 20 - (offset * 300);
    
    // Dynamic FOV for a "warp" effect as you scroll faster
    // Standard FOV is 35, increases to 60 at the end
    const targetFOV = 35 + (offset * 25);
    const perspCamera = state.camera as THREE.PerspectiveCamera;
    perspCamera.fov = THREE.MathUtils.lerp(perspCamera.fov, targetFOV, 0.1);
    perspCamera.updateProjectionMatrix();

    // Smooth lerping for cinematic feel
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.08
    );

    // Subtle side-to-side drift + breathing
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 2 + (Math.sin(offset * Math.PI) * 5);
    state.camera.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 1 + (offset * 2);

    // Look slightly ahead with a dynamic tilt
    const lookAtZ = targetZ - 60;
    const tilt = Math.sin(offset * Math.PI) * 0.2;
    state.camera.lookAt(tilt * 10, -tilt * 5, lookAtZ);
    state.camera.rotation.z = tilt * 0.5; // Add a slight roll
  });

  return null;
}
