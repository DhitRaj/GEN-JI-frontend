"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Suspense } from "react";
import GalaxyHero from "./GalaxyHero";
import ModernOverlay from "../ui/ModernOverlay";
import Navbar from "../Navbar";

export default function ModernScene() {
  return (
    <div className="h-screen w-full overflow-hidden fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* FLOATING NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-[100] p-4 pointer-events-none">
        <div className="pointer-events-auto max-w-7xl mx-auto">
          <Navbar />
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 30], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0f172a"]} />
        <fog attach="fog" args={["#0f172a", 20, 80]} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={5.5} damping={0.25}>
            <Scroll>
              <GalaxyHero />
            </Scroll>

            <Scroll html style={{ width: '100vw' }}>
              <div className="w-full">
                <ModernOverlay />
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
