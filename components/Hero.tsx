"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.home-hero-glass',
        { autoAlpha: 0, y: 24, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: 'power2.out' }
      );

      gsap.from(".home-hero-item", {
        autoAlpha: 0,
        y: 36,
        filter: 'blur(8px)',
        duration: 1.2,
        stagger: 0.14,
        ease: "power4.out",
        delay: 0.12,
        clearProps: 'filter',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-hero" aria-label="Homepage hero">
      <div className="home-hero-inner">
        <div className="home-hero-glass">
          <p className="home-hero-item home-eyebrow">GEN-JI DIGITAL STUDIO</p>

          <h1 className="home-hero-item home-title">Build Fast. Look Premium. Convert Better.</h1>

          <p className="home-hero-item home-subtitle">
            High-performance websites and apps with clean UX, strong code, and clear business impact.
          </p>

          <div className="home-hero-item home-actions">
            <Link href="/projects" className="home-btn home-btn-primary">
              Explore Portfolio
            </Link>
            <Link href="/contact" className="home-btn home-btn-secondary">
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}