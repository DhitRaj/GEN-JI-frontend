"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, useScroll, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating Service Icons/Cubes
function ServiceCubes() {
  const scroll = useScroll();

  const cubes = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        -20 - Math.random() * 30,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 1.5 + 0.5,
      color: i % 5 === 0 ? "#3b82f6" : i % 5 === 1 ? "#8b5cf6" : i % 5 === 2 ? "#ec4899" : i % 5 === 3 ? "#f59e0b" : "#10b981",
      speed: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <group>
      {cubes.map((cube, i) => (
        <ServiceCube key={i} {...cube} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function ServiceCube({ position, rotation, scale, color, speed, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.01 * speed;
    meshRef.current.position.y = position[1] + Math.sin(time * speed + index) * 2;

    const showStart = 0.1;
    const showEnd = 0.9;
    let opacity = 0;

    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 5);
      const fadeOut = Math.min(1, (showEnd - offset) * 5);
      opacity = Math.min(fadeIn, fadeOut);
    }

    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity * 0.8;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position as any}
      rotation={rotation as any}
      scale={scale}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Rotating Gears/Cogs
function RotatingGears() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.z = time * 0.5;
    groupRef.current.position.y = -offset * 10;

    const showStart = 0.3;
    const showEnd = 0.7;
    let opacity = 0;

    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 5);
      const fadeOut = Math.min(1, (showEnd - offset) * 5);
      opacity = Math.min(fadeIn, fadeOut);
    }

    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = opacity;
      }
    });
  });

  const gears = [
    { radius: 5, teeth: 12, color: "#3b82f6", position: [0, 0, -25] },
    { radius: 3, teeth: 8, color: "#8b5cf6", position: [8, 5, -25] },
    { radius: 4, teeth: 10, color: "#ec4899", position: [-7, -6, -25] },
  ];

  return (
    <group ref={groupRef}>
      {gears.map((gear, i) => (
        <mesh key={i} position={gear.position as any}>
          <torusGeometry args={[gear.radius, 0.5, 16, gear.teeth]} />
          <meshStandardMaterial
            color={gear.color}
            transparent
            opacity={0}
            emissive={gear.color}
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Tool Icons Floating
function ToolIcons() {
  const scroll = useScroll();

  const tools = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        -30 - Math.random() * 15,
      ],
      type: i % 4, // 0: sphere, 1: cone, 2: torus, 3: octahedron
      color: i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#10b981" : "#3b82f6",
    }));
  }, []);

  return (
    <group>
      {tools.map((tool, i) => (
        <ToolIcon key={i} {...tool} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function ToolIcon({ position, type, color, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x = time * 0.5 + index;
    meshRef.current.rotation.y = time * 0.3 + index;
    meshRef.current.position.y = position[1] + Math.sin(time + index) * 1.5;

    const showStart = 0.5;
    let opacity = 0;

    if (offset > showStart) {
      opacity = Math.min(1, (offset - showStart) * 3);
    }

    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 0: return <sphereGeometry args={[0.5, 16, 16]} />;
      case 1: return <coneGeometry args={[0.5, 1, 16]} />;
      case 2: return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
      case 3: return <octahedronGeometry args={[0.6, 0]} />;
      default: return <sphereGeometry args={[0.5, 16, 16]} />;
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
        emissiveIntensity={1.2}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

// Particle System
function ServiceParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const color = new THREE.Color();
      const hue = Math.random() * 0.6;
      color.setHSL(hue, 0.8, 0.6);
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

    particlesRef.current.rotation.y = time * 0.04;
    particlesRef.current.position.y = -offset * 20;
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
        size={0.12}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Lighting
function Lights() {
  const scroll = useScroll();
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!light1Ref.current || !light2Ref.current) return;
    const time = state.clock.elapsedTime;

    light1Ref.current.position.x = Math.sin(time * 0.5) * 15;
    light1Ref.current.position.z = Math.cos(time * 0.5) * 15;
    
    light2Ref.current.position.x = Math.cos(time * 0.7) * 12;
    light2Ref.current.position.y = Math.sin(time * 0.7) * 12;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight ref={light1Ref} position={[-15, 10, -10]} intensity={1.5} color="#3b82f6" />
      <pointLight ref={light2Ref} position={[15, -10, -10]} intensity={1.5} color="#ec4899" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        color="#8b5cf6"
      />
    </>
  );
}

export default function ServicesScene() {
  return (
    <group>
      <Lights />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      
      <ServiceCubes />
      <RotatingGears />
      <ToolIcons />
      <ServiceParticles />
      
      <Sparkles
        count={250}
        scale={55}
        size={1.8}
        speed={0.3}
        opacity={0.5}
        color="#3b82f6"
      />
    </group>
  );
}
