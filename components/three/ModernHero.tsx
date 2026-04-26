"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, useScroll, MeshDistortMaterial, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

// Floating Geometric Shapes
function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 50 - 20,
      ],
      scale: Math.random() * 2 + 0.5,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      speed: Math.random() * 0.5 + 0.2,
      type: Math.floor(Math.random() * 4), // 0: box, 1: sphere, 2: torus, 3: octahedron
    }));
  }, []);

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} index={i} />
      ))}
    </group>
  );
}

function FloatingShape({ position, scale, rotation, speed, type, index }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    // Rotation animation
    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.01 * speed;

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * speed + index) * 2;
    
    // Scroll-based movement
    meshRef.current.position.z = position[2] - offset * 30;
    
    // Fade out when scrolling
    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = 1 - offset * 2;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 0: return <boxGeometry args={[1, 1, 1]} />;
      case 1: return <sphereGeometry args={[0.5, 32, 32]} />;
      case 2: return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case 3: return <octahedronGeometry args={[0.6, 0]} />;
      default: return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [type]);

  const color = useMemo(() => {
    const colors = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"];
    return colors[index % colors.length];
  }, [index]);

  return (
    <mesh
      ref={meshRef}
      position={position as any}
      scale={scale}
      rotation={rotation as any}
      castShadow
    >
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.8}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// Animated Grid Floor
function GridFloor() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!meshRef.current) return;
    const offset = scroll.offset;
    meshRef.current.position.z = -offset * 50;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, -20]} receiveShadow>
      <planeGeometry args={[100, 200, 50, 100]} />
      <meshStandardMaterial
        color="#1e293b"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// Particle System
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    particlesRef.current.rotation.y = time * 0.05;
    particlesRef.current.position.z = -offset * 40;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Central Sphere with Distortion
function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.scale.setScalar(1 + Math.sin(time) * 0.1);
    
    // Move and fade on scroll
    meshRef.current.position.z = -offset * 20;
    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = Math.max(0, 1 - offset * 1.5);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0, -10]} castShadow>
        <sphereGeometry args={[3, 64, 64]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          transparent
          opacity={0.9}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

// Rotating Rings
function RotatingRings() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.x = time * 0.3;
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.position.z = -offset * 25;
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = time * (0.5 + i * 0.1);
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -15]}>
      {[4, 5, 6].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.1, 16, 100]} />
          <meshStandardMaterial
            color={["#ec4899", "#8b5cf6", "#06b6d4"][i]}
            transparent
            opacity={0.6}
            emissive={["#ec4899", "#8b5cf6", "#06b6d4"][i]}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Lighting Setup
function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ec4899" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#06b6d4"
      />
    </>
  );
}

export default function ModernHero() {
  return (
    <group>
      <Lights />
      <CentralSphere />
      <RotatingRings />
      <FloatingShapes />
      <GridFloor />
      <ParticleField />
      <Sparkles
        count={200}
        scale={50}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#8b5cf6"
      />
    </group>
  );
}
