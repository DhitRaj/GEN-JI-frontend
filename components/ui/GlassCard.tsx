"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/30 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-[24px]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-10 left-1/4 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-12 right-1/4 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

