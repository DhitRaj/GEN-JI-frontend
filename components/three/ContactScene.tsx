"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, useScroll, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating Communication Orbs
function CommunicationOrbs() {
  const scroll = useScroll();

  const orbs = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35,
        -20 - Math.random() * 30,
      ],
      scale: Math.random() * 1.8 + 0.8,
      color: i % 5 === 0 ? "#3b82f6" : i % 5 === 1 ? "#8b5cf6" : i % 5 === 2 ? "#ec4899" : i % 5 === 3 ? "#06b6d4" : "#10b981",
      speed: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    <group>
      {orbs.map((orb, i) => (
        <CommunicationOrb key={i} {...orb} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function CommunicationOrb({ position, scale, color, speed, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.position.y = position[1] + Math.sin(time * speed + index) * 3;
    meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.7 + index) * 2;
    meshRef.current.rotation.y += 0.01 * speed;

    const showStart = 0.1;
    const showEnd = 0.9;
    let opacity = 0;

    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 4);
      const fadeOut = Math.min(1, (showEnd - offset) * 4);
      opacity = Math.min(fadeIn, fadeOut);
    }

    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity * 0.75;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position as any} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0}
          emissive={color}
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

// Connection Lines Network
function ConnectionNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const connections = useMemo(() => {
    const points = Array.from({ length: 15 }).map(() => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 30,
      z: -25 - Math.random() * 15,
    }));

    const lines: any[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const distance = Math.sqrt(
          Math.pow(points[i].x - points[j].x, 2) +
          Math.pow(points[i].y - points[j].y, 2) +
          Math.pow(points[i].z - points[j].z, 2)
        );
        if (distance < 20) {
          lines.push({
            start: points[i],
            end: points[j],
            color: i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#8b5cf6" : "#ec4899",
          });
        }
      }
    }
    return { points, lines };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.position.y = -offset * 12;

    const showStart = 0.3;
    const showEnd = 0.8;
    let opacity = 0;

    if (offset > showStart && offset < showEnd) {
      const fadeIn = Math.min(1, (offset - showStart) * 5);
      const fadeOut = Math.min(1, (showEnd - offset) * 5);
      opacity = Math.min(fadeIn, fadeOut);
    }

    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Line && child.material instanceof THREE.Material) {
        child.material.opacity = opacity * 0.6;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {connections.lines.map((line, i) => {
        const points = [
          new THREE.Vector3(line.start.x, line.start.y, line.start.z),
          new THREE.Vector3(line.end.x, line.end.y, line.end.z),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <primitive key={i} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: line.color, transparent: true, opacity: 0 }))} />
        );
      })}
      {connections.points.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={2}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

// Message Bubbles
function MessageBubbles() {
  const scroll = useScroll();

  const bubbles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 25,
        -30 - Math.random() * 20,
      ],
      type: i % 3, // Different bubble shapes
      color: i % 4 === 0 ? "#3b82f6" : i % 4 === 1 ? "#8b5cf6" : i % 4 === 2 ? "#ec4899" : "#06b6d4",
    }));
  }, []);

  return (
    <group>
      {bubbles.map((bubble, i) => (
        <MessageBubble key={i} {...bubble} index={i} scroll={scroll} />
      ))}
    </group>
  );
}

function MessageBubble({ position, type, color, index, scroll }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    meshRef.current.rotation.x = time * 0.3 + index;
    meshRef.current.rotation.z = time * 0.2 + index;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.6 + index) * 2;

    const showStart = 0.5;
    let opacity = 0;

    if (offset > showStart) {
      opacity = Math.min(1, (offset - showStart) * 3);
    }

    if (meshRef.current.material instanceof THREE.Material) {
      meshRef.current.material.opacity = opacity * 0.7;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 0: return <capsuleGeometry args={[0.4, 0.8, 16, 32]} />;
      case 1: return <boxGeometry args={[1, 0.6, 0.3]} />;
      case 2: return <sphereGeometry args={[0.5, 16, 16]} />;
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
        emissiveIntensity={1.3}
        metalness={0.85}
        roughness={0.15}
      />
    </mesh>
  );
}

// Particle System
function ContactParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  const particles = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 90;

      const color = new THREE.Color();
      const hue = Math.random() * 0.5 + 0.5;
      color.setHSL(hue, 0.85, 0.65);
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

    particlesRef.current.rotation.y = time * 0.06;
    particlesRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    particlesRef.current.position.y = -offset * 18;
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
        size={0.14}
        vertexColors
        transparent
        opacity={0.65}
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

    light1Ref.current.position.x = Math.sin(time * 0.5) * 18;
    light1Ref.current.position.z = Math.cos(time * 0.5) * 18;
    
    light2Ref.current.position.x = Math.cos(time * 0.7) * 14;
    light2Ref.current.position.y = Math.sin(time * 0.7) * 14;

    light3Ref.current.position.z = Math.sin(time * 0.6) * 16;
    light3Ref.current.position.x = Math.cos(time * 0.6) * 16;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[12, 18, 10]} intensity={1.3} castShadow />
      <pointLight ref={light1Ref} position={[-18, 10, -12]} intensity={2.2} color="#3b82f6" />
      <pointLight ref={light2Ref} position={[18, -10, -12]} intensity={2.2} color="#ec4899" />
      <pointLight ref={light3Ref} position={[0, 12, -18]} intensity={2} color="#8b5cf6" />
      <spotLight
        position={[0, 22, 5]}
        angle={0.45}
        penumbra={1}
        intensity={1.2}
        color="#06b6d4"
      />
    </>
  );
}

export default function ContactScene() {
  return (
    <group>
      <Lights />
      <Stars radius={110} depth={55} count={3500} factor={4.5} saturation={0} fade speed={0.5} />
      
      <CommunicationOrbs />
      <ConnectionNetwork />
      <MessageBubbles />
      <ContactParticles />
      
      <Sparkles
        count={280}
        scale={60}
        size={1.9}
        speed={0.35}
        opacity={0.55}
        color="#3b82f6"
      />
    </group>
  );
}
