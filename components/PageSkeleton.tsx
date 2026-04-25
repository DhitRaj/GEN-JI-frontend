"use client";

import { motion } from "framer-motion";

export default function PageSkeleton() {
  return (
    <main className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* BACKGROUND AURA */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* LOGO / TEXT PULSE */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1, 0.98] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-[0.3em] text-white uppercase mb-2">
            GENJI
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
        </motion.div>

        {/* PROGRESS BAR SIMULATION */}
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>

        <p className="text-white/30 text-xs font-mono tracking-[0.5em] uppercase animate-pulse">
          Initializing Engine
        </p>
      </div>

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute bottom-12 left-12">
        <div className="h-12 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
      </div>
      <div className="absolute top-12 right-12">
        <div className="h-12 w-[1px] bg-gradient-to-t from-white/20 to-transparent" />
      </div>
    </main>
  );
}