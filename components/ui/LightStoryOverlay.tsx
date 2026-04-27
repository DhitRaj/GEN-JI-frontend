"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../Footer";

const StoryCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[2rem] border border-slate-200/80 bg-white/70 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

export default function LightStoryOverlay() {
  return (
    <div className="w-full text-slate-900">
      <section className="flex h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-6xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-700"
          >
            Light Mode Story Experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mb-6 text-5xl font-black leading-[0.96] md:text-7xl"
          >
            A Live 3D Story Of
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 bg-clip-text text-transparent"> Product Delivery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22 }}
            className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl"
          >
            Scroll to move through each chapter. The 3D scene reacts like a live system, from discovery to launch and growth.
          </motion.p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
          <StoryCard>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">Chapter 01</p>
            <h2 className="mb-4 text-3xl font-black">Discovery in Motion</h2>
            <p className="text-slate-600">
              We map business goals, user intent, and system constraints. This stage aligns your roadmap before code starts.
            </p>
          </StoryCard>
          <StoryCard>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">Chapter 02</p>
            <h2 className="mb-4 text-3xl font-black">Architecture and Build</h2>
            <p className="text-slate-600">
              We design reusable UI blocks, backend workflows, and scalable modules so your product grows without rework.
            </p>
          </StoryCard>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
          <StoryCard>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">Chapter 03</p>
            <h2 className="mb-4 text-3xl font-black">Launch Dynamics</h2>
            <p className="text-slate-600">
              We tune performance, accessibility, and reliability so your release feels fast, stable, and production-ready.
            </p>
          </StoryCard>
          <StoryCard>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">Chapter 04</p>
            <h2 className="mb-4 text-3xl font-black">Growth Network</h2>
            <p className="text-slate-600">
              After launch, we optimize flows, improve conversion paths, and scale infrastructure based on real user behavior.
            </p>
          </StoryCard>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mx-auto w-full max-w-4xl">
          <StoryCard className="text-center">
            <h2 className="mb-4 text-4xl font-black md:text-6xl">
              Ready For Your
              <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent"> 3D Product Story?</span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
              We can build this same cinematic interaction style for your real product content, not just visuals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-8 py-4 font-bold text-white shadow-xl"
                >
                  Start Project
                  <FaArrowRight />
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-slate-300 bg-white px-8 py-4 font-bold text-slate-800"
                >
                  View Work
                </motion.button>
              </Link>
            </div>
          </StoryCard>
        </div>
      </section>

      <div className="min-h-screen w-full bg-transparent">
        <Footer />
      </div>
    </div>
  );
}

