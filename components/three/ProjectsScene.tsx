"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, useScroll, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating Project Cards/Frames
function ProjectFrames() {
  const scroll = useScroll();

  const frames = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        -15 - Math.random() * 35,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: Math.random() * 2 + 1,
      color: i % 6 === 0 ? "#6366f1" : i % 6 === 1 ? "#8b5cf6" : i % 6 === 2 ? "#ec4899" : i % 6 === 3 ? "#f59e0b" : i % 6 === 4 ? "#10b981" : "#06b6d4",
      speed: Math.random() * 0.4 + 0.2,
    }));
  }, []);

  return (
    <group>
      {frames.map((frame, i) => (
        <ProjectFrame key={i} {...frame} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function ProjectFrame({ position, rotation, scale, color, speed, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x += 0.008 * speed;
    meshRef.current.rotation.y += 0.012 * speed;
    meshRef.current.position.y = position[1] + Math.sin(time * speed + index) * 2.5;
    meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.5 + index) * 1.5;

    const showStart = 0.05;
    const showEnd = 0.95;
    let opacity = 0;

    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 4);
      const fadeOut = Math.min(1, (showEnd - offset) * 4);
      opacity = Math.min(fadeIn, fadeOut);
    }

    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity * 0.7;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position as any}
      rotation={rotation as any}
      scale={scale}
    >
      <planeGeometry args={[2, 1.5]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Rotating Portfolio Rings
function PortfolioRings() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.x = time * 0.3;
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.position.y = -offset * 15;

    const showStart = 0.2;
    const showEnd = 0.8;
    let opacity = 0;

    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 5);
      const fadeOut = Math.min(1, (showEnd - offset) * 5);
      opacity = Math.min(fadeIn, fadeOut);
    }

    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = opacity * 0.6;
      }
    });
  });

  const rings = [
    { radius: 8, tube: 0.3, color: "#6366f1", position: [0, 0, -30] },
    { radius: 12, tube: 0.25, color: "#8b5cf6", position: [0, 0, -30] },
    { radius: 16, tube: 0.2, color: "#ec4899", position: [0, 0, -30] },
  ];

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={ring.position as any}>
          <torusGeometry args={[ring.radius, ring.tube, 32, 100]} />
          <meshStandardMaterial
            color={ring.color}
            transparent
            opacity={0}
            emissive={ring.color}
            emissiveIntensity={1.2}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating Tech Icons
function TechIcons() {
  const scroll = useScroll();

  const icons = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        -25 - Math.random() * 20,
      ],
      type: i % 5, // Different shapes
      color: i % 4 === 0 ? "#06b6d4" : i % 4 === 1 ? "#10b981" : i % 4 === 2 ? "#f59e0b" : "#ec4899",
    }));
  }, []);

  return (
    <group>
      {icons.map((icon, i) => (
        <TechIcon key={i} {...icon} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function TechIcon({ position, type, color, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x = time * 0.4 + index;
    meshRef.current.rotation.y = time * 0.6 + index;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + index) * 2;

    const showStart = 0.4;
    let opacity = 0;

    if (offset > showStart) {
      opacity = Math.min(1, (offset - showStart) * 2.5);
    }

    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity * 0.8;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 0: return <dodecahedronGeometry args={[0.6, 0]} />;
      case 1: return <octahedronGeometry args={[0.7, 0]} />;
      case 2: return <tetrahedronGeometry args={[0.8, 0]} />;
      case 3: return <icosahedronGeometry args={[0.6, 0]} />;
      case 4: return <boxGeometry args={[0.8, 0.8, 0.8]} />;
      default: return <sphereGeometry args={[0.6, 16, 16]} />;
    }
  }, [type]);

  return (
    <mesh ref={meshRef} position={position as any}>
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0}
        emissive={color}
        emissiveIntensity={1.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Particle System
function ProjectParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  const particles = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const color = new THREE.Color();
      const hue = Math.random() * 0.7 + 0.5;
      color.setHSL(hue, 0.9, 0.6);
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
    particlesRef.current.rotation.x = time * 0.03;
    particlesRef.current.position.y = -offset * 25;
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
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Dynamic Lighting
function Lights() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const light3Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!light1Ref.current || !light2Ref.current || !light3Ref.current) return;
    const time = state.clock.elapsedTime;

    light1Ref.current.position.x = Math.sin(time * 0.6) * 20;
    light1Ref.current.position.z = Math.cos(time * 0.6) * 20;
    
    light2Ref.current.position.x = Math.cos(time * 0.8) * 15;
    light2Ref.current.position.y = Math.sin(time * 0.8) * 15;

    light3Ref.current.position.z = Math.sin(time * 0.5) * 18;
    light3Ref.current.position.y = Math.cos(time * 0.5) * 18;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[15, 15, 8]} intensity={1.2} castShadow />
      <pointLight ref={light1Ref} position={[-20, 12, -15]} intensity={2} color="#6366f1" />
      <pointLight ref={light2Ref} position={[20, -12, -15]} intensity={2} color="#ec4899" />
      <pointLight ref={light3Ref} position={[0, 15, -20]} intensity={1.8} color="#8b5cf6" />
      <spotLight
        position={[0, 25, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#06b6d4"
      />
    </>
  );
}

export default function ProjectsScene() {
  return (
    <group>
      <Lights />
      <Stars radius={120} depth={60} count={4000} factor={5} saturation={0} fade speed={0.6} />
      
      <ProjectFrames />
      <PortfolioRings />
      <TechIcons />
      <ProjectParticles />
      
      <Sparkles
        count={300}
        scale={65}
        size={2}
        speed={0.4}
        opacity={0.6}
        color="#6366f1"
      />
    </group>
  );
}
