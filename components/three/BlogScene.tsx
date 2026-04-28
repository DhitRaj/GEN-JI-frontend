"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, useScroll, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingWords() {
  const scroll = useScroll();
  const items = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 40,
        -18 - Math.random() * 30,
      ] as [number, number, number],
      scale: Math.random() * 1.6 + 0.6,
      color:
        i % 6 === 0 ? "#a855f7" :
        i % 6 === 1 ? "#06b6d4" :
        i % 6 === 2 ? "#ec4899" :
        i % 6 === 3 ? "#f59e0b" :
        i % 6 === 4 ? "#10b981" : "#6366f1",
      speed: Math.random() * 0.4 + 0.2,
    }));
  }, []);

  return (
    <group>
      {items.map((item, i) => (
        <FloatingCard key={i} {...item} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function FloatingCard({ position, scale, color, speed, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x += 0.006 * speed;
    meshRef.current.rotation.y += 0.009 * speed;
    meshRef.current.position.y = position[1] + Math.sin(time * speed + index) * 2.5;
    meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.6 + index) * 1.2;

    const showStart = 0.05;
    const showEnd = 0.95;
    let opacity = 0;
    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 4);
      const fadeOut = Math.min(1, (showEnd - offset) * 4);
      opacity = Math.min(fadeIn, fadeOut) * 0.65;
    }
    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity;
    }
  });

  const geometry = useMemo(() => {
    const shapes = [
      <planeGeometry key="plane" args={[2.5, 1.5]} />,
      <boxGeometry key="box" args={[1, 1, 0.1]} />,
      <octahedronGeometry key="octa" args={[0.7, 0]} />,
      <torusGeometry key="torus" args={[0.5, 0.15, 16, 32]} />,
    ];
    return shapes[index % shapes.length];
  }, [index]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0}
        emissive={color}
        emissiveIntensity={0.9}
        metalness={0.85}
        roughness={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function OrbitingRings() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.x = time * 0.15;
    groupRef.current.rotation.y = time * 0.25;
    groupRef.current.position.y = -offset * 14;

    const showStart = 0.2;
    const showEnd = 0.85;
    let opacity = 0;
    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 5);
      const fadeOut = Math.min(1, (showEnd - offset) * 5);
      opacity = Math.min(fadeIn, fadeOut) * 0.55;
    }
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {[
        { r: 7,  tube: 0.25, color: "#a855f7", pos: [0, 0, -28] as [number,number,number] },
        { r: 11, tube: 0.2,  color: "#06b6d4", pos: [0, 0, -28] as [number,number,number] },
        { r: 15, tube: 0.15, color: "#ec4899", pos: [0, 0, -28] as [number,number,number] },
      ].map((ring, i) => (
        <mesh key={i} position={ring.pos}>
          <torusGeometry args={[ring.r, ring.tube, 32, 100]} />
          <meshStandardMaterial
            color={ring.color}
            transparent
            opacity={0}
            emissive={ring.color}
            emissiveIntensity={1.3}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function BlogParticles() {
  const ref = useRef<THREE.Points>(null);
  const scroll = useScroll();

  const { positions, colors } = useMemo(() => {
    const count = 1400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 95;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 95;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 95;
      const c = new THREE.Color();
      c.setHSL(Math.random() * 0.6 + 0.6, 0.85, 0.65);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y = time * 0.05;
    ref.current.rotation.x = Math.sin(time * 0.25) * 0.15;
    ref.current.position.y = -scroll.offset * 22;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={colors.length / 3}    array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.13} vertexColors transparent opacity={0.65} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Lights() {
  const l1 = useRef<THREE.PointLight>(null);
  const l2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (l1.current) { l1.current.position.x = Math.sin(t * 0.5) * 18; l1.current.position.z = Math.cos(t * 0.5) * 18; }
    if (l2.current) { l2.current.position.x = Math.cos(t * 0.7) * 14; l2.current.position.y = Math.sin(t * 0.7) * 14; }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[12, 18, 10]} intensity={1.2} castShadow />
      <pointLight ref={l1} position={[-18, 10, -12]} intensity={2.2} color="#a855f7" />
      <pointLight ref={l2} position={[18, -10, -12]} intensity={2.2} color="#06b6d4" />
      <spotLight position={[0, 22, 5]} angle={0.45} penumbra={1} intensity={1.2} color="#ec4899" />
    </>
  );
}

export default function BlogScene() {
  return (
    <group>
      <Lights />
      <Stars radius={115} depth={58} count={3800} factor={4.5} saturation={0} fade speed={0.5} />
      <FloatingWords />
      <OrbitingRings />
      <BlogParticles />
      <Sparkles count={260} scale={62} size={1.8} speed={0.35} opacity={0.55} color="#a855f7" />
    </group>
  );
}
