"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

type SphereConfig = {
  spherePosition: [number, number, number];
  sphereScale: number;
  orbitTarget: [number, number, number];
  cameraX: number;
};

function FloatingSphere({ spherePosition, sphereScale }: Pick<SphereConfig, 'spherePosition' | 'sphereScale'>) {
  const sphereRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!sphereRef.current) {
      return;
    }

    const time = state.clock.elapsedTime;
    sphereRef.current.rotation.x = time * 0.16;
    sphereRef.current.rotation.y = time * 0.3;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1.35} floatingRange={[-0.25, 0.25]}>
      <mesh ref={sphereRef} position={spherePosition} scale={sphereScale}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial color="#8b5cf6" wireframe emissive="#8b5cf6" emissiveIntensity={0.62} />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  const [config, setConfig] = useState<SphereConfig>({
    spherePosition: [2.95, 0.12, -0.2],
    sphereScale: 1.1,
    orbitTarget: [2.2, 0, 0],
    cameraX: -0.45,
  });

  useEffect(() => {
    const applyLayout = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setConfig({
          spherePosition: [0.15, 0.95, -0.35],
          sphereScale: 0.86,
          orbitTarget: [0.1, 0.45, 0],
          cameraX: 0,
        });
        return;
      }

      if (width < 1200) {
        setConfig({
          spherePosition: [2.2, 0.2, -0.26],
          sphereScale: 0.98,
          orbitTarget: [1.7, 0.08, 0],
          cameraX: -0.25,
        });
        return;
      }

      setConfig({
        spherePosition: [2.95, 0.12, -0.2],
        sphereScale: 1.1,
        orbitTarget: [2.2, 0, 0],
        cameraX: -0.45,
      });
    };

    applyLayout();
    window.addEventListener('resize', applyLayout);

    return () => window.removeEventListener('resize', applyLayout);
  }, []);

  return (
    <div className="home-scene">
      <Canvas camera={{ position: [config.cameraX, 0, 6], fov: 50 }} dpr={[1, 1.6]}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 2, 2]} intensity={1} />

        <Stars radius={120} depth={52} count={4500} factor={3.2} saturation={0} fade speed={0.26} />

        <FloatingSphere spherePosition={config.spherePosition} sphereScale={config.sphereScale} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.16}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.35}
          target={config.orbitTarget}
        />
      </Canvas>
    </div>
  );
}