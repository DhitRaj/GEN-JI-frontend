"use client";

import Navbar from "../Navbar";

interface PageSceneProps {
  children: React.ReactNode;
  pages?: number;
  theme?: "about" | "default";
  scene?: React.ReactNode;
  environmentPreset?: "night" | "sunset" | "city" | "dawn" | "forest" | "lobby" | "park" | "studio" | "warehouse" | "apartment";
  fogNear?: number;
  fogFar?: number;
  bgFrom?: string;
  bgVia?: string;
  bgTo?: string;
}

export default function PageScene({
  children,
  bgFrom = "#0f172a",
}: PageSceneProps) {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: bgFrom }}>
      <div className="fixed top-0 left-0 w-full z-[100] p-4 pointer-events-none">
        <div className="pointer-events-auto max-w-7xl mx-auto">
          <Navbar />
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center pt-24">
        {children}
      </div>
    </div>
  );
}
