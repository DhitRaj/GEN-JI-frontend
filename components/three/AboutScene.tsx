"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, useScroll, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating DNA Helix
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const helixPoints = useMemo(() => {
    const points = [];
    const segments = 50;
    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 4;
      const radius = 3;
      points.push({
        pos1: [Math.cos(t) * radius, i * 0.5 - 12, Math.sin(t) * radius],
        pos2: [Math.cos(t + Math.PI) * radius, i * 0.5 - 12, Math.sin(t + Math.PI) * radius],
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.position.y = -offset * 10;
    
    // Fade based on scroll
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = Math.max(0, 1 - offset * 2);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -15]}>
      {helixPoints.map((point, i) => (
        <group key={i}>
          {/* Strand 1 */}
          <mesh position={point.pos1 as any}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.5}
              transparent
              opacity={1}
            />
          </mesh>
          {/* Strand 2 */}
          <mesh position={point.pos2 as any}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.5}
              transparent
              opacity={1}
            />
          </mesh>
          {/* Connecting bar */}
          {i % 3 === 0 && (
            <mesh position={[0, i * 0.5 - 12, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 6, 8]} />
              <meshStandardMaterial
                color="#8b5cf6"
                transparent
                opacity={0.6}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// Floating Books/Knowledge Cubes
function KnowledgeCubes() {
  const scroll = useScroll();

  const cubes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        -20 - Math.random() * 15,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 1.5 + 0.5,
      color: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#06b6d4" : "#8b5cf6",
    }));
  }, []);

  return (
    <group>
      {cubes.map((cube, i) => (
        <KnowledgeCube key={i} {...cube} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function KnowledgeCube({ position, rotation, scale, color, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.position.y = position[1] + Math.sin(time + index) * 1;

    // Show between offset 0.2 and 0.6
    const showStart = 0.2;
    const showEnd = 0.6;
    let opacity = 0;

    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 5);
      const fadeOut = Math.min(1, (showEnd - offset) * 5);
      opacity = Math.min(fadeIn, fadeOut) * 0.8;
    }

    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position as any}
      rotation={rotation as any}
      scale={scale}
    >
      <boxGeometry args={[1, 1.5, 0.3]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
}

// Network Nodes (Team Connection)
function NetworkNodes() {
  const scroll = useScroll();

  const nodes = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        -25 - Math.random() * 10,
      ],
      connections: Math.floor(Math.random() * 3) + 1,
    }));
  }, []);

  return (
    <group>
      {nodes.map((node, i) => (
        <NetworkNode key={i} {...node} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function NetworkNode({ position, connections, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.5;

    // Show between offset 0.5 and 0.8
    const showStart = 0.5;
    const showEnd = 0.8;
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
    <mesh ref={meshRef} position={position as any}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color="#06b6d4"
        transparent
        opacity={0}
        emissive="#06b6d4"
        emissiveIntensity={1}
      />
    </mesh>
  );
}

// Orbiting Values (Core Values)
function OrbitingValues() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.y = time * 0.3;

    // Show between offset 0.7 and 1.0
    const showStart = 0.7;
    let opacity = 0;

    if (offset > showStart) {
      opacity = Math.min(1, (offset - showStart) * 3);
    }

    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = opacity;
      }
    });
  });

  const orbitRadius = 8;
  const values = [
    { angle: 0, color: "#10b981" },
    { angle: (Math.PI * 2) / 3, color: "#06b6d4" },
    { angle: (Math.PI * 4) / 3, color: "#8b5cf6" },
  ];

  return (
    <group ref={groupRef} position={[0, 0, -30]}>
      {/* Center core */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial
          color="#ffffff"
          transparent
          opacity={0}
          distort={0.3}
          speed={2}
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Orbiting values */}
      {values.map((value, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(value.angle) * orbitRadius,
            0,
            Math.sin(value.angle) * orbitRadius,
          ]}
        >
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color={value.color}
            transparent
            opacity={0}
            emissive={value.color}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitRadius, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0}
          emissive="#ffffff"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// Particle Background
function ParticleBackground() {
  const particlesRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const color = new THREE.Color();
      const hue = Math.random() * 0.3 + 0.4; // Green to cyan range
      color.setHSL(hue, 0.7, 0.6);
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

    particlesRef.current.rotation.y = time * 0.03;
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
        size={0.1}
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

  useFrame(() => {
    if (!light1Ref.current || !light2Ref.current) return;
    const offset = scroll.offset;

    // Transition from green to cyan to purple
    if (offset < 0.33) {
      light1Ref.current.color.setHex(0x10b981); // Green
      light2Ref.current.color.setHex(0x06b6d4); // Cyan
    } else if (offset < 0.66) {
      light1Ref.current.color.setHex(0x06b6d4); // Cyan
      light2Ref.current.color.setHex(0x8b5cf6); // Purple
    } else {
      light1Ref.current.color.setHex(0x8b5cf6); // Purple
      light2Ref.current.color.setHex(0x10b981); // Green
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight ref={light1Ref} position={[-15, 10, -10]} intensity={1.5} />
      <pointLight ref={light2Ref} position={[15, -10, -10]} intensity={1.5} />
      <spotLight
        position={[0, 20, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
      />
    </>
  );
}

export default function AboutScene() {
  return (
    <group>
      <Lights />
      
      {/* Rotating star field */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Section 1: DNA Helix (0-0.3) */}
      <DNAHelix />
      
      {/* Section 2: Knowledge Cubes (0.2-0.6) */}
      <KnowledgeCubes />
      
      {/* Section 3: Network Nodes (0.5-0.8) */}
      <NetworkNodes />
      
      {/* Section 4: Orbiting Values (0.7-1.0) */}
      <OrbitingValues />
      
      {/* Always visible particles */}
      <ParticleBackground />
      
      {/* Sparkles */}
      <Sparkles
        count={200}
        scale={50}
        size={1.5}
        speed={0.2}
        opacity={0.4}
        color="#10b981"
      />
    </group>
  );
}
