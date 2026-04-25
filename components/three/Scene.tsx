"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, Text, Environment, Float, Sparkles, useScroll } from "@react-three/drei";
import * as THREE from "three";
import City from "./City";
import CameraRig from "./Camera";
import HeroOverlay from "../ui/HeroOverlay";
import Navbar from "../Navbar";
import { Suspense } from "react";

function BackgroundController() {
  const scroll = useScroll();
  useFrame((state) => {
    const offset = scroll.offset;
    // Shift from light water to deep ocean blue
    const colorA = new THREE.Color("#f0f9ff"); // Very light sky/water blue
    const colorB = new THREE.Color("#dbeafe"); // Light blue
    const colorC = new THREE.Color("#60a5fa"); // Deep blue
    
    let targetColor;
    if (offset < 0.3) {
      targetColor = colorA.lerp(colorB, offset * (1/0.3));
    } else {
      targetColor = colorB.lerp(colorC, (offset - 0.3) * (1/0.7));
    }
    
    state.scene.background = targetColor;
    if (state.scene.fog) {
      state.scene.fog.color = targetColor;
    }
  });
  return null;
}

export default function Scene() {
  return (
    <div className="h-screen w-full bg-[#f0f9ff] overflow-hidden fixed inset-0">
      {/* FLOATING NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-[100] p-4 pointer-events-none">
        <div className="pointer-events-auto max-w-7xl mx-auto">
          <Navbar />
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 20], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#f0f9ff"]} />
        <fog attach="fog" args={["#f0f9ff", 10, 100]} />
        
        <Suspense fallback={null}>
          <Environment preset="night" />
          
          <ScrollControls pages={7} damping={0.3}>
            <BackgroundController />
            <Scroll>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 20, 5]} intensity={1.5} color="#ffffff" castShadow />
              
              <City />
              <CameraRig />

              <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
                <Text position={[0, 0, -15]} fontSize={12} color="#1e293b" textAlign="center" maxWidth={30}>
                  GENJI
                  <meshStandardMaterial emissive="#60a5fa" emissiveIntensity={0.5} toneMapped={false} />
                </Text>
              </Float>
              
              <Sparkles count={400} scale={60} size={3} speed={0.5} color="#60a5fa" />
            </Scroll>

            <Scroll html style={{ width: '100vw' }}>
              <div className="w-full">
                <HeroOverlay />
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
