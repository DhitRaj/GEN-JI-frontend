"use client";

import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import HeroOverlay from "./ui/HeroOverlay";

const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center text-white font-black text-6xl tracking-tighter uppercase">
      GENJI SYSTEM
    </div>
  )
});

export default function SpidermanHero({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <Scene>
        <div className="relative">
          <HeroOverlay />
          <div className="mt-[100vh]">
             {children}
          </div>
        </div>
      </Scene>
    </div>
  );
}
