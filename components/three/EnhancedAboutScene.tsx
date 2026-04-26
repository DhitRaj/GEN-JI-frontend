"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, useScroll, Stars, MeshDistortMaterial, Trail } from "@react-three/drei";
import * as THREE from "three";

// Cinematic Camera Movement
function CinematicCamera() {
  const scroll = useScroll();
  
  useFrame((state) => {
    const offset = scroll.offset;
    
    // Smooth camera movement like a movie
    state.camera.position.x = Math.sin(offset * Math.PI) * 5;
    state.camera.position.y = offset * 10 - 5;
    state.camera.position.z = 30 - offset * 15;
    state.camera.lookAt(0, offset * 5, -10);
  });
  
  return null;
}

// Animated DNA Helix with Glow
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const helixPoints = useMemo(() => {
    const points = [];
    const segments = 80;
    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 6;
      const radius = 4;
      points.push({
        pos1: [Math.cos(t) * radius, i * 0.4 - 16, Math.sin(t) * radius],
        pos2: [Math.cos(t + Math.PI) * radius, i * 0.4 - 16, Math.sin(t + Math.PI) * radius],
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.y = time * 0.3 + offset * Math.PI;
    groupRef.current.position.y = -offset * 15;
    groupRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1);
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = Math.max(0, 1 - offset * 2.5);
        const pulse = Math.sin(time * 2 + i * 0.1) * 0.5 + 0.5;
        if ('emissiveIntensity' in child.material) {
          (child.material as any).emissiveIntensity = pulse * 2;
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -20]}>
      {helixPoints.map((point, i) => (
        <group key={i}>
          {/* Strand 1 */}
          <mesh position={point.pos1 as any}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={2}
              transparent
              opacity={1}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Strand 2 */}
          <mesh position={point.pos2 as any}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={2}
              transparent
              opacity={1}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Connecting bars with glow */}
          {i % 2 === 0 && (
            <mesh position={[0, i * 0.4 - 16, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.08, 0.08, 8, 8]} />
              <meshStandardMaterial
                color="#8b5cf6"
                emissive="#8b5cf6"
                emissiveIntensity={1.5}
                transparent
                opacity={0.8}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// Floating Holographic Books
function HolographicBooks() {
  const scroll = useScroll();

  const books = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 25,
        -25 - Math.random() * 20,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 2 + 0.8,
      color: i % 4 === 0 ? "#10b981" : i % 4 === 1 ? "#06b6d4" : i % 4 === 2 ? "#8b5cf6" : "#ec4899",
      speed: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    <group>
      {books.map((book, i) => (
        <HolographicBook key={i} {...book} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function HolographicBook({ position, rotation, scale, color, speed, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x += 0.008 * speed;
    meshRef.current.rotation.y += 0.008 * speed;
    meshRef.current.position.y = position[1] + Math.sin(time * speed + index) * 2;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.5 * speed + index) * 1;

    // Glow pulsing
    const pulse = Math.sin(time * 2 + index) * 0.5 + 0.5;
    glowRef.current.scale.setScalar(1 + pulse * 0.3);

    const showStart = 0.15;
    const showEnd = 0.65;
    let opacity = 0;

    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 5);
      const fadeOut = Math.min(1, (showEnd - offset) * 5);
      opacity = Math.min(fadeIn, fadeOut);
    }

    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity * 0.9;
    }
    if (glowRef.current.material instanceof THREE.Material) {
      glowRef.current.material.opacity = opacity * 0.3;
    }
  });

  return (
    <group>
      {/* Glow effect */}
      <mesh ref={glowRef} position={position as any}>
        <boxGeometry args={[1.2, 1.7, 0.35]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Book */}
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
          emissiveIntensity={0.8}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

// Neural Network Visualization
function NeuralNetwork() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  const network = useMemo(() => {
    const nodes = [];
    const layers = 5;
    const nodesPerLayer = 8;
    
    for (let layer = 0; layer < layers; layer++) {
      for (let node = 0; node < nodesPerLayer; node++) {
        const angle = (node / nodesPerLayer) * Math.PI * 2;
        const radius = 8 + layer * 2;
        nodes.push({
          position: [
            Math.cos(angle) * radius,
            (layer - 2) * 3,
            Math.sin(angle) * radius - 30,
          ],
          connections: Math.floor(Math.random() * 3) + 1,
        });
      }
    }
    return nodes;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.y = time * 0.2;
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const pulse = Math.sin(time * 3 + i * 0.2) * 0.5 + 0.5;
        child.scale.setScalar(0.8 + pulse * 0.4);
      }
    });

    const showStart = 0.45;
    const showEnd = 0.85;
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

  return (
    <group ref={groupRef}>
      {network.map((node, i) => (
        <mesh key={i} position={node.position as any}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial
            color="#06b6d4"
            transparent
            opacity={0}
            emissive="#06b6d4"
            emissiveIntensity={2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Orbiting Core Values with Rings
function CoreValuesOrbit() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.y = time * 0.4;
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;

    const showStart = 0.7;
    let opacity = 0;
    let scale = 0;

    if (offset > showStart) {
      const progress = (offset - showStart) * 3;
      opacity = Math.min(1, progress);
      scale = Math.min(1, progress);
    }

    groupRef.current.scale.setScalar(scale);
    
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = opacity;
      }
    });
  });

  const orbitRadius = 10;
  const values = [
    { angle: 0, color: "#10b981" },
    { angle: (Math.PI * 2) / 3, color: "#06b6d4" },
    { angle: (Math.PI * 4) / 3, color: "#8b5cf6" },
  ];

  return (
    <group ref={groupRef} position={[0, 0, -40]}>
      {/* Central core with distortion */}
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <MeshDistortMaterial
            color="#ffffff"
            transparent
            opacity={0}
            distort={0.5}
            speed={3}
            emissive="#ffffff"
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Orbiting value crystals */}
      {values.map((value, i) => (
        <Float key={i} speed={2 + i} rotationIntensity={0.5} floatIntensity={1}>
          <mesh
            position={[
              Math.cos(value.angle) * orbitRadius,
              Math.sin(i * 2) * 2,
              Math.sin(value.angle) * orbitRadius,
            ]}
          >
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial
              color={value.color}
              transparent
              opacity={0}
              emissive={value.color}
              emissiveIntensity={1.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Multiple orbit rings */}
      {[orbitRadius, orbitRadius * 1.2, orbitRadius * 1.4].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, 0, i * 0.3]}>
          <torusGeometry args={[radius, 0.08, 16, 100]} />
          <meshStandardMaterial
            color={["#10b981", "#06b6d4", "#8b5cf6"][i]}
            transparent
            opacity={0}
            emissive={["#10b981", "#06b6d4", "#8b5cf6"][i]}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Enhanced Particle System
function EnhancedParticles() {
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
      const hue = Math.random() * 0.3 + 0.4;
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

    particlesRef.current.rotation.y = time * 0.05;
    particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
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

// Dynamic Lighting System
function DynamicLights() {
  const scroll = useScroll();
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const light3Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!light1Ref.current || !light2Ref.current || !light3Ref.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    // Animate light positions
    light1Ref.current.position.x = Math.sin(time * 0.5) * 20;
    light1Ref.current.position.z = Math.cos(time * 0.5) * 20;
    
    light2Ref.current.position.x = Math.cos(time * 0.7) * 15;
    light2Ref.current.position.y = Math.sin(time * 0.7) * 15;
    
    // Change colors based on scroll
    if (offset < 0.25) {
      light1Ref.current.color.setHex(0x10b981);
      light2Ref.current.color.setHex(0x06b6d4);
      light3Ref.current.color.setHex(0x8b5cf6);
    } else if (offset < 0.5) {
      light1Ref.current.color.setHex(0x06b6d4);
      light2Ref.current.color.setHex(0x8b5cf6);
      light3Ref.current.color.setHex(0xec4899);
    } else if (offset < 0.75) {
      light1Ref.current.color.setHex(0x8b5cf6);
      light2Ref.current.color.setHex(0xec4899);
      light3Ref.current.color.setHex(0x10b981);
    } else {
      light1Ref.current.color.setHex(0xec4899);
      light2Ref.current.color.setHex(0x10b981);
      light3Ref.current.color.setHex(0x06b6d4);
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <pointLight ref={light1Ref} position={[-15, 10, -10]} intensity={2} distance={50} />
      <pointLight ref={light2Ref} position={[15, -10, -10]} intensity={2} distance={50} />
      <pointLight ref={light3Ref} position={[0, 15, -20]} intensity={1.5} distance={40} />
      <spotLight
        position={[0, 25, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#ffffff"
        castShadow
      />
    </>
  );
}

export default function EnhancedAboutScene() {
  return (
    <group>
      <CinematicCamera />
      <DynamicLights />
      
      {/* Rotating star field */}
      <Stars radius={120} depth={60} count={4000} factor={5} saturation={0} fade speed={0.8} />
      
      {/* Section 1: DNA Helix (0-0.25) */}
      <DNAHelix />
      
      {/* Section 2: Holographic Books (0.15-0.65) */}
      <HolographicBooks />
      
      {/* Section 3: Neural Network (0.45-0.85) */}
      <NeuralNetwork />
      
      {/* Section 4: Core Values (0.7-1.0) */}
      <CoreValuesOrbit />
      
      {/* Enhanced particles */}
      <EnhancedParticles />
      
      {/* Sparkles with color variation */}
      <Sparkles
        count={300}
        scale={60}
        size={2}
        speed={0.4}
        opacity={0.6}
        color="#10b981"
      />
      <Sparkles
        count={200}
        scale={50}
        size={1.5}
        speed={0.3}
        opacity={0.5}
        color="#06b6d4"
      />
    </group>
  );
}
