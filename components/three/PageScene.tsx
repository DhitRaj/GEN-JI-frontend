"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment, useScroll } from "@react-three/drei";
import * as THREE from "three";
import AboutScene from "./AboutScene";
import EnhancedAboutScene from "./EnhancedAboutScene";
import { Suspense } from "react";
import Navbar from "../Navbar";

function BackgroundController({ theme }: { theme: 'about' | 'default' }) {
  const scroll = useScroll();
  useFrame((state) => {
    const offset = scroll.offset;
    
    // Always use dark gradient
    const colorA = new THREE.Color("#0f172a"); // Dark slate
    const colorB = new THREE.Color("#1e1b4b"); // Dark purple
    const colorC = new THREE.Color("#0f172a"); // Back to dark slate
    
    let targetColor;
    if (offset < 0.5) {
      targetColor = colorA.clone().lerp(colorB, offset * 2);
    } else {
      targetColor = colorB.clone().lerp(colorC, (offset - 0.5) * 2);
    }
    
    state.scene.background = targetColor;
    if (state.scene.fog) {
      state.scene.fog.color = targetColor;
    }
  });
  return null;
}

interface PageSceneProps {
  children: React.ReactNode;
  title: string;
  pages?: number;
  theme?: 'about' | 'default';
}

export default function PageScene({ children, title, pages = 4, theme = 'default' }: PageSceneProps) {
  const bgColor = theme === 'about' ? "#0f172a" : "#f0f9ff";
  
  return (
    <div className={`h-screen w-full overflow-hidden fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`}>
      {/* FLOATING NAVBAR - FIXED ON TOP */}
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
        <color attach="background" args={["#0f172a"]} />
        <fog attach="fog" args={["#0f172a", 10, 100]} />
        
        <Suspense fallback={null}>
          <Environment preset={theme === 'about' ? 'night' : 'sunset'} />
          
          <ScrollControls pages={pages} damping={0.3}>
            <BackgroundController theme={theme} />
            <Scroll>
              {theme === 'about' ? (
                <EnhancedAboutScene />
              ) : (
                <>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 20, 5]} intensity={1.5} color="#ffffff" castShadow />
                </>
              )}
            </Scroll>

            <Scroll html style={{ width: '100vw' }}>
              <div className="relative w-full overflow-x-hidden flex flex-col items-center">
                {children}
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
