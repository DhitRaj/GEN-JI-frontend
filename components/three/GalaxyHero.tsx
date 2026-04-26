"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, useScroll, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

// Galaxy Background that changes with scroll
function DynamicGalaxy() {
  const starsRef = useRef<any>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!starsRef.current) return;
    const offset = scroll.offset;
    
    // Rotate galaxy based on scroll
    starsRef.current.rotation.y = offset * Math.PI * 2;
    starsRef.current.rotation.x = offset * Math.PI;
  });

  return (
    <group ref={starsRef}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
}

// Section 1: Nebula with Central Sphere
function NebulaSection() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.scale.setScalar(1 + Math.sin(time) * 0.1);
    
    // Fade out after first section
    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = Math.max(0, 1 - offset * 3);
    }
  });

  return (
    <group>
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
      
      {/* Nebula clouds */}
      <NebulaClouds />
      
      {/* Rotating Rings */}
      <RotatingRings />
    </group>
  );
}

function NebulaClouds() {
  const clouds = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        -15 - Math.random() * 10,
      ],
      scale: Math.random() * 5 + 3,
      color: i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#ec4899" : "#06b6d4",
    }));
  }, []);

  return (
    <group>
      {clouds.map((cloud, i) => (
        <NebulaCloud key={i} {...cloud} index={i} />
      ))}
    </group>
  );
}

function NebulaCloud({ position, scale, color, index }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.z = time * 0.1 * (index % 2 === 0 ? 1 : -1);
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 2;
    
    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = Math.max(0, 0.3 - offset * 1.5);
    }
  });

  return (
    <mesh ref={meshRef} position={position as any} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

function RotatingRings() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.x = time * 0.3;
    groupRef.current.rotation.y = time * 0.2;
    
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = time * (0.5 + i * 0.1);
    });

    // Fade out
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = Math.max(0, 0.6 - offset * 2);
      }
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

// Section 2: Asteroid Field
function AsteroidField() {
  const scroll = useScroll();
  
  const asteroids = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        -30 - Math.random() * 20,
      ],
      scale: Math.random() * 2 + 0.5,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      speed: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <group>
      {asteroids.map((asteroid, i) => (
        <Asteroid key={i} {...asteroid} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function Asteroid({ position, scale, rotation, speed, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.01 * speed;
    
    // Show between offset 0.2 and 0.5
    const showStart = 0.2;
    const showEnd = 0.5;
    let opacity = 0;
    
    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 5);
      const fadeOut = Math.min(1, (showEnd - offset) * 5);
      opacity = Math.min(fadeIn, fadeOut);
    }
    
    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position as any}
      scale={scale}
      rotation={rotation as any}
      castShadow
    >
      <dodecahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#64748b"
        transparent
        opacity={0}
        roughness={0.8}
        metalness={0.3}
      />
    </mesh>
  );
}

// Section 3: Cosmic Energy Waves
function CosmicWaves() {
  const scroll = useScroll();
  
  const waves = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      radius: 5 + i * 2,
      color: i % 2 === 0 ? "#06b6d4" : "#8b5cf6",
    }));
  }, []);

  return (
    <group>
      {waves.map((wave, i) => (
        <CosmicWave key={i} {...wave} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function CosmicWave({ radius, color, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.z = time * 0.5 + index * 0.2;
    
    // Show between offset 0.4 and 0.7
    const showStart = 0.4;
    const showEnd = 0.7;
    let opacity = 0;
    
    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 5);
      const fadeOut = Math.min(1, (showEnd - offset) * 5);
      opacity = Math.min(fadeIn, fadeOut) * 0.4;
    }
    
    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.05, 16, 100]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0}
        emissive={color}
        emissiveIntensity={1}
      />
    </mesh>
  );
}

// Section 4: Black Hole Effect
function BlackHole() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 * 5;
      const radius = (i / count) * 20;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !particlesRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.z = time * 0.5;
    particlesRef.current.rotation.z = -time * 0.3;
    
    // Show between offset 0.6 and 0.9
    const showStart = 0.6;
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
    if (particlesRef.current.material instanceof THREE.PointsMaterial) {
      particlesRef.current.material.opacity = opacity;
    }
  });

  return (
    <group position={[0, 0, -25]}>
      {/* Black hole center */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0}
          emissive="#8b5cf6"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Accretion disk */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#ec4899"
          transparent
          opacity={0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Section 5: Supernova Explosion
function Supernova() {
  const scroll = useScroll();
  
  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = Math.random() * 15;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.1, 1, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    // Show after offset 0.8
    const showStart = 0.8;
    let opacity = 0;
    let scale = 0;
    
    if (offset > showStart) {
      const progress = (offset - showStart) * 5;
      opacity = Math.min(1, progress);
      scale = progress * 2;
    }
    
    particlesRef.current.scale.setScalar(scale);
    
    if (particlesRef.current.material instanceof THREE.PointsMaterial) {
      particlesRef.current.material.opacity = opacity;
    }
  });

  return (
    <points ref={particlesRef} position={[0, 0, -30]}>
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
        size={0.3}
        vertexColors
        transparent
        opacity={0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Lighting Setup
function Lights() {
  const scroll = useScroll();
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!light1Ref.current || !light2Ref.current) return;
    const offset = scroll.offset;
    
    // Change light colors based on section
    if (offset < 0.25) {
      light1Ref.current.color.setHex(0x8b5cf6); // Purple
      light2Ref.current.color.setHex(0xec4899); // Pink
    } else if (offset < 0.5) {
      light1Ref.current.color.setHex(0x64748b); // Gray
      light2Ref.current.color.setHex(0x475569); // Dark gray
    } else if (offset < 0.75) {
      light1Ref.current.color.setHex(0x06b6d4); // Cyan
      light2Ref.current.color.setHex(0x8b5cf6); // Purple
    } else {
      light1Ref.current.color.setHex(0xec4899); // Pink
      light2Ref.current.color.setHex(0xf59e0b); // Orange
    }
  });

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
      <pointLight ref={light1Ref} position={[-10, -10, -10]} intensity={1} />
      <pointLight ref={light2Ref} position={[10, 10, 10]} intensity={1} />
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

export default function GalaxyHero() {
  return (
    <group>
      <Lights />
      <DynamicGalaxy />
      
      {/* Section 1: Nebula (0-0.2) */}
      <NebulaSection />
      
      {/* Section 2: Asteroids (0.2-0.5) */}
      <AsteroidField />
      
      {/* Section 3: Cosmic Waves (0.4-0.7) */}
      <CosmicWaves />
      
      {/* Section 4: Black Hole (0.6-0.9) */}
      <BlackHole />
      
      {/* Section 5: Supernova (0.8+) */}
      <Supernova />
      
      {/* Always visible sparkles */}
      <Sparkles
        count={300}
        scale={60}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#ffffff"
      />
    </group>
  );
}
