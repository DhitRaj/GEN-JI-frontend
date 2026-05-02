"use client";

import { motion } from "framer-motion";

export default function PageSkeleton() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-rose-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-72 w-72 rounded-full bg-rose-100 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-20 md:px-6">
        <div className="w-full rounded-3xl border border-slate-200 bg-rose-50/90 p-8 shadow-sm backdrop-blur md:p-10">
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-5 w-32 rounded-full bg-sky-100"
          />

          <div className="mt-6 space-y-3">
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.1 }}
              className="h-10 w-full max-w-2xl rounded-xl bg-slate-200"
            />
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }}
              className="h-10 w-full max-w-xl rounded-xl bg-slate-200"
            />
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: 0.15 * idx }}
                className={`h-24 rounded-2xl border ${idx % 2 === 0 ? "border-emerald-200 bg-emerald-50/70" : "border-rose-200 bg-rose-50/70"}`}
              />
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: 0.08 * idx }}
                className={`h-40 rounded-2xl border ${idx % 2 === 0 ? "border-slate-200 bg-slate-100" : "border-slate-200 bg-rose-50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}


