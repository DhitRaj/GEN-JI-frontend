"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Float, useScroll } from "@react-three/drei";
import * as THREE from "three";

function WaterFloor() {
  const reflectorRef = useRef<any>(null!);
  
  return (
    <group position={[0, -18, -150]}>
      {/* THE GLASS SURFACE */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <planeGeometry args={[200, 1000]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.15} 
          metalness={0.9} 
          roughness={0.05} 
          transmission={0.9} 
          thickness={2}
        />
      </mesh>

      {/* THE REFLECTIVE WATER */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 1000]} />
        <MeshReflectorMaterial
          ref={reflectorRef}
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#bfdbfe" // Slightly more blue
          metalness={0.8}
          mirror={1}
        />
      </mesh>
    </group>
  );
}

function Bubbles() {
  const count = 150; // Increased
  const positions = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      pos: [(Math.random() - 0.5) * 60, -30, (Math.random() - 0.5) * 500 - 100],
      speed: Math.random() * 0.05 + 0.03,
      scale: Math.random() * 0.15 + 0.05,
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child: any, i) => {
      child.position.y += positions[i].speed;
      if (child.position.y > 30) child.position.y = -30;
      child.position.x += Math.sin(state.clock.elapsedTime + i) * 0.01;
    });
  });

  return (
    <group ref={groupRef}>
      {positions.map((p, i) => (
        <mesh key={i} position={p.pos as any} scale={p.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.4} 
            transmission={0.95} 
            thickness={1} 
            roughness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function FishShoal() {
  const fishData = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({ // Doubled
      pos: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 30,
        -i * 6 - 20,
      ],
      color: i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#38bdf8" : "#93c5fd",
      scale: Math.random() * 0.5 + 0.5,
    }));
  }, []);

  return (
    <group>
      {fishData.map((f, i) => (
        <Fish key={i} pos={f.pos} color={f.color} scale={f.scale} />
      ))}
    </group>
  );
}

function Fish({ pos, color, scale }: { pos: any, color: string, scale: number }) {
  const mesh = useRef<THREE.Group>(null!);
  const speed = useMemo(() => Math.random() * 0.02 + 0.01, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.position.x = pos[0] + Math.sin(time * 0.4 + offset) * 15;
    mesh.current.position.z = pos[2] + Math.cos(time * 0.3 + offset) * 20;
    mesh.current.rotation.y = Math.atan2(Math.cos(time * 0.4 + offset), 1) + Math.PI/2;
    mesh.current.position.y = pos[1] + Math.sin(time * 0.2 + offset) * 5;
  });

  return (
    <group ref={mesh} position={pos} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.25, 1, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, 0, 0.6]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.05, 0.5, 0.4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function SeaweedGroup() {
  const plants = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({ // Doubled
      pos: [
        (Math.random() - 0.5) * 100,
        -18, 
        -i * 10 - 30,
      ],
      scale: Math.random() * 0.8 + 0.5,
      color: i % 2 === 0 ? "#2dd4bf" : "#14b8a6",
    }));
  }, []);

  return (
    <group>
      {plants.map((p, i) => (
        <Seaweed key={i} pos={p.pos as any} scale={p.scale} color={p.color} />
      ))}
    </group>
  );
}

function Seaweed({ pos, scale, color }: { pos: any, scale: number, color: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.z = Math.sin(time * 0.4 + pos[0]) * 0.2;
    mesh.current.rotation.x = Math.cos(time * 0.3 + pos[2]) * 0.15;
  });

  return (
    <mesh ref={mesh} position={pos} scale={scale}>
      <cylinderGeometry args={[0.05, 0.4, 25, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
}

function SeaBed() {
  const rocks = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      pos: [(Math.random() - 0.5) * 120, -18.5, -i * 8 - 20],
      size: [Math.random() * 3 + 1, Math.random() * 1.5 + 0.5, Math.random() * 3 + 1],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
    }));
  }, []);

  const corals = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      pos: [(Math.random() - 0.5) * 80, -18, -i * 15 - 40],
      color: i % 3 === 0 ? "#f472b6" : i % 3 === 1 ? "#fbbf24" : "#f87171",
    }));
  }, []);

  return (
    <group>
      {rocks.map((r, i) => (
        <mesh key={i} position={r.pos as any} rotation={r.rot as any}>
          <dodecahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#475569" roughness={1} />
        </mesh>
      ))}
      {corals.map((c, i) => (
        <mesh key={i} position={c.pos as any}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

function GodRays() {
  const rays = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      pos: [(Math.random() - 0.5) * 100, 50, (Math.random() - 0.5) * 200 - 100],
      rot: [0, 0, (Math.random() - 0.5) * 0.5],
      scale: [Math.random() * 10 + 5, 200, 1],
    }));
  }, []);

  return (
    <group>
      {rays.map((r, i) => (
        <mesh key={i} position={r.pos as any} rotation={r.rot as any}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.05} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function City() {
  const dust = useMemo(() => {
    return Array.from({ length: 300 }).map((_, i) => ({
      pos: [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 600 - 100,
      ],
      size: Math.random() * 0.08 + 0.03,
    }));
  }, []);

  return (
    <group>
      {/* REMOVED FLOATING BOXES AND RINGS AS REQUESTED (FALTU REMOVAL) */}
      
      {dust.map((d, i) => (
        <mesh key={i} position={d.pos}>
          <sphereGeometry args={[d.size, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}
      
      <GodRays />
      <WaterFloor />
      <Bubbles />
      <FishShoal />
      <SeaweedGroup />
      <SeaBed />

      <ambientLight intensity={0.5} />
      <pointLight position={[0, 40, -50]} intensity={500} color="#60a5fa" />
      <spotLight position={[0, 50, 0]} angle={0.5} penumbra={1} intensity={1000} color="#ffffff" castShadow />
      <directionalLight position={[-20, 50, -20]} intensity={2} color="#38bdf8" />
    </group>
  );
}
