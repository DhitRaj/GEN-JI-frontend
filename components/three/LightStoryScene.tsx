"use client";

import { useMemo, useRef } from "react";
import { Sparkles, Stars, Float, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function windowFade(offset: number, start: number, end: number) {
  if (offset <= start || offset >= end) return 0;
  const mid = (start + end) / 2;
  if (offset <= mid) return (offset - start) / (mid - start);
  return 1 - (offset - mid) / (end - mid);
}

function setGroupOpacity(root: THREE.Object3D | null, opacity: number) {
  if (!root) return;
  root.traverse((node) => {
    const mesh = node as THREE.Mesh;
    if (!mesh.material) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach((mat) => {
      const material = mat as THREE.Material & { opacity?: number; transparent?: boolean };
      material.transparent = true;
      if (typeof material.opacity === "number") material.opacity = opacity;
    });
  });
}

export default function LightStoryScene() {
  const scroll = useScroll();

  const discoverRef = useRef<THREE.Group>(null);
  const buildRef = useRef<THREE.Group>(null);
  const launchRef = useRef<THREE.Group>(null);
  const growthRef = useRef<THREE.Group>(null);

  const networkLines = useMemo(() => {
    const lines: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < 14; i++) {
      const a = new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5, -15 + (Math.random() - 0.5) * 4);
      const b = new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5, -15 + (Math.random() - 0.5) * 4);
      lines.push([a, b]);
    }
    return lines;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const offset = scroll.offset;

    const vDiscover = windowFade(offset, 0.0, 0.28);
    const vBuild = windowFade(offset, 0.2, 0.5);
    const vLaunch = windowFade(offset, 0.42, 0.74);
    const vGrowth = windowFade(offset, 0.65, 1.0);

    if (discoverRef.current) {
      discoverRef.current.rotation.y = t * 0.4;
      discoverRef.current.position.y = Math.sin(t * 0.7) * 0.25;
    }
    if (buildRef.current) {
      buildRef.current.rotation.y = Math.sin(t * 0.45) * 0.2;
      buildRef.current.position.x = Math.sin(t * 0.35) * 0.4;
    }
    if (launchRef.current) {
      launchRef.current.position.y = Math.sin(t * 1.2) * 0.45;
      launchRef.current.rotation.z = Math.sin(t * 0.8) * 0.08;
    }
    if (growthRef.current) {
      growthRef.current.rotation.y = t * 0.15;
      growthRef.current.position.x = Math.sin(t * 0.25) * 0.3;
    }

    setGroupOpacity(discoverRef.current, vDiscover);
    setGroupOpacity(buildRef.current, vBuild);
    setGroupOpacity(launchRef.current, vLaunch);
    setGroupOpacity(growthRef.current, vGrowth);
  });

  return (
    <group>
      <ambientLight intensity={0.75} />
      <directionalLight position={[8, 12, 8]} intensity={1.3} color="#ffffff" />
      <pointLight position={[-6, 5, 6]} intensity={1.1} color="#93c5fd" />
      <pointLight position={[7, -2, 5]} intensity={1.0} color="#c4b5fd" />

      <Stars radius={120} depth={40} count={1500} factor={2} saturation={0.4} fade speed={0.3} />
      <Sparkles count={220} scale={40} size={3} speed={0.22} color="#93c5fd" />

      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.7}>
        <group ref={discoverRef} position={[0, 0, -8]}>
          <mesh>
            <icosahedronGeometry args={[2.2, 1]} />
            <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.35} roughness={0.2} metalness={0.35} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.6, 0.08, 20, 180]} />
            <meshStandardMaterial color="#bfdbfe" emissive="#93c5fd" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[3.2, 1.1, 0]}>
            <sphereGeometry args={[0.35, 24, 24]} />
            <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[-3, -1.2, -0.5]}>
            <sphereGeometry args={[0.28, 24, 24]} />
            <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={0.45} />
          </mesh>
        </group>
      </Float>

      <group ref={buildRef} position={[0, -0.4, -11]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, i * 0.9 - 1.3, 0]} rotation={[0, i * 0.15, 0]}>
            <boxGeometry args={[3.4 - i * 0.38, 0.56, 2.1 - i * 0.24]} />
            <meshStandardMaterial
              color={["#dbeafe", "#bfdbfe", "#a5b4fc", "#c4b5fd"][i]}
              emissive={["#bfdbfe", "#93c5fd", "#818cf8", "#a78bfa"][i]}
              emissiveIntensity={0.2}
              roughness={0.28}
              metalness={0.3}
            />
          </mesh>
        ))}
      </group>

      <group ref={launchRef} position={[0, 0, -13]}>
        <mesh position={[0, 0.4, 0]}>
          <coneGeometry args={[1.05, 3.2, 20]} />
          <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={0.3} roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, -1.8, 0]}>
          <cylinderGeometry args={[0.34, 0.72, 1.2, 20]} />
          <meshStandardMaterial color="#38bdf8" emissive="#22d3ee" emissiveIntensity={0.32} />
        </mesh>
        <mesh position={[0, -2.7, 0]}>
          <sphereGeometry args={[0.58, 20, 20]} />
          <meshStandardMaterial color="#f0f9ff" emissive="#67e8f9" emissiveIntensity={0.65} />
        </mesh>
      </group>

      <group ref={growthRef} position={[0, 0.3, -15]}>
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i / 10) * Math.PI * 2) * 3.8,
              Math.cos((i / 10) * Math.PI * 2) * 2.2,
              Math.sin((i / 10) * Math.PI) * 1.6,
            ]}
          >
            <sphereGeometry args={[0.26, 20, 20]} />
            <meshStandardMaterial color="#c4b5fd" emissive="#a78bfa" emissiveIntensity={0.45} />
          </mesh>
        ))}

        {networkLines.map(([a, b], i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#93c5fd" transparent opacity={0.45} />
          </line>
        ))}
      </group>
    </group>
  );
}

