'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

// Website Services Data
const WEBSITE_SERVICES = {
  'E-commerce': {
    platforms: ['Shopify', 'WooCommerce', 'Custom (Next.js)'],
    requirements: ['Payment gateway', 'Admin panel', 'Product DB'],
    features: ['Orders', 'Inventory', 'Users', 'Analytics'],
  },
  'Company Portfolio': {
    platforms: ['Next.js', 'WordPress', 'Sanity CMS'],
    requirements: ['SEO optimized', 'Blog system', 'Contact forms'],
    features: ['Projects', 'Team', 'Services', 'Testimonials'],
  },
  'SaaS': {
    platforms: ['Next.js + Node.js', 'React + Express', 'Custom Stack'],
    requirements: ['Authentication', 'Subscriptions', 'API'],
    features: ['Dashboard', 'Users', 'Analytics', 'Integrations'],
  },
  'Blog': {
    platforms: ['Ghost', 'WordPress', 'Next.js + Sanity'],
    requirements: ['Multi-author', 'SEO', 'Newsletter'],
    features: ['Posts', 'Categories', 'Comments', 'Search'],
  },
  'Landing Page': {
    platforms: ['Next.js', 'Webflow', 'Custom'],
    requirements: ['High conversion', 'Fast loading', 'Mobile ready'],
    features: ['Hero', 'CTA', 'Forms', 'Analytics'],
  },
};

// App Services Data
const APP_SERVICES = {
  'Android App': {
    platforms: ['React Native', 'Flutter', 'Native Kotlin'],
    panels: ['User App', 'Admin Panel', 'Analytics'],
    features: ['Auth', 'Push notifications', 'Offline mode', 'GPS'],
  },
  'iOS App': {
    platforms: ['React Native', 'Flutter', 'Native Swift'],
    panels: ['User App', 'Admin Panel', 'Analytics'],
    features: ['Auth', 'Push notifications', 'Offline mode', 'GPS'],
  },
  'Web App': {
    platforms: ['React', 'Next.js', 'Vue.js'],
    panels: ['User Dashboard', 'Admin Panel', 'Vendor Panel'],
    features: ['Real-time', 'WebSockets', 'Charts', 'Export'],
  },
  'Hybrid App': {
    platforms: ['React Native', 'Flutter', 'Ionic'],
    panels: ['User App', 'Admin Panel', 'Support'],
    features: ['Cross-platform', 'Native feel', 'Offline', 'Sync'],
  },
};

export default function HomePageClient() {
  const [expandedWebsite, setExpandedWebsite] = useState<string | null>(null);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Navbar />
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-semibold mb-6">
              ✨ Digital Solutions Studio
            </span>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Build Digital Products
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                That Convert
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              We craft high-performance websites, mobile apps, and SaaS platforms for startups and enterprises. From concept to scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Start Your Project →
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 border border-purple-500/50 rounded-lg font-bold hover:bg-purple-500/10 transition-all"
              >
                View Our Work
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-slate-400">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">30+</div>
                <div className="text-sm text-slate-400">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">99%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Website Services Section */}
      <section className="py-20 px-4 md:px-6 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Website Solutions</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Click to expand and explore platforms, requirements & features
            </p>
          </motion.div>

          {/* Tree Structure */}
          <div className="space-y-2">
            {Object.keys(WEBSITE_SERVICES).map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Parent Item */}
                <div
                  onClick={() => setExpandedWebsite(expandedWebsite === service ? null : service)}
                  className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: expandedWebsite === service ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-purple-400 font-bold"
                    >
                      ▶
                    </motion.span>
                    <span className="font-bold text-lg">{service}</span>
                  </div>
                  <span className="text-sm text-slate-400 group-hover:text-purple-400 transition-colors">
                    {expandedWebsite === service ? 'Hide' : 'Show'} details
                  </span>
                </div>

                {/* Expanded Content - Tree Style */}
                <AnimatePresence>
                  {expandedWebsite === service && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 mt-2 space-y-2 border-l-2 border-purple-500/30 pl-4"
                    >
                      {/* Platforms */}
                      <div className="p-3 rounded-lg border border-purple-500/15 bg-purple-500/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-purple-400 font-bold">📦</span>
                          <span className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                            Platforms
                          </span>
                        </div>
                        <div className="ml-6 space-y-1">
                          {WEBSITE_SERVICES[service as keyof typeof WEBSITE_SERVICES].platforms.map(
                            (platform) => (
                              <div key={platform} className="text-sm text-slate-300 flex items-center gap-2">
                                <span className="text-purple-400">•</span>
                                {platform}
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="p-3 rounded-lg border border-cyan-500/15 bg-cyan-500/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                            Requirements
                          </span>
                        </div>
                        <div className="ml-6 space-y-1">
                          {WEBSITE_SERVICES[service as keyof typeof WEBSITE_SERVICES].requirements.map(
                            (req) => (
                              <div key={req} className="text-sm text-slate-300 flex items-center gap-2">
                                <span className="text-cyan-400">→</span>
                                {req}
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="p-3 rounded-lg border border-green-500/15 bg-green-500/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-400 font-bold">⭐</span>
                          <span className="text-sm font-bold text-green-400 uppercase tracking-wider">
                            Features
                          </span>
                        </div>
                        <div className="ml-6 flex flex-wrap gap-2">
                          {WEBSITE_SERVICES[service as keyof typeof WEBSITE_SERVICES].features.map(
                            (feature) => (
                              <span
                                key={feature}
                                className="px-2 py-1 rounded text-xs bg-green-500/10 border border-green-500/20 text-green-300"
                              >
                                {feature}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Services Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Mobile & Web Apps</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Click to expand and explore platforms, panels & features
            </p>
          </motion.div>

          {/* Tree Structure */}
          <div className="space-y-2">
            {Object.keys(APP_SERVICES).map((app, i) => (
              <motion.div
                key={app}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Parent Item */}
                <div
                  onClick={() => setExpandedApp(expandedApp === app ? null : app)}
                  className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: expandedApp === app ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-cyan-400 font-bold"
                    >
                      ▶
                    </motion.span>
                    <span className="font-bold text-lg">{app}</span>
                  </div>
                  <span className="text-sm text-slate-400 group-hover:text-cyan-400 transition-colors">
                    {expandedApp === app ? 'Hide' : 'Show'} details
                  </span>
                </div>

                {/* Expanded Content - Tree Style */}
                <AnimatePresence>
                  {expandedApp === app && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 mt-2 space-y-2 border-l-2 border-cyan-500/30 pl-4"
                    >
                      {/* Platforms */}
                      <div className="p-3 rounded-lg border border-cyan-500/15 bg-cyan-500/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-cyan-400 font-bold">📦</span>
                          <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                            Platforms
                          </span>
                        </div>
                        <div className="ml-6 space-y-1">
                          {APP_SERVICES[app as keyof typeof APP_SERVICES].platforms.map((platform) => (
                            <div key={platform} className="text-sm text-slate-300 flex items-center gap-2">
                              <span className="text-cyan-400">•</span>
                              {platform}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Panels */}
                      <div className="p-3 rounded-lg border border-purple-500/15 bg-purple-500/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-purple-400 font-bold">🎨</span>
                          <span className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                            Panels
                          </span>
                        </div>
                        <div className="ml-6 space-y-1">
                          {APP_SERVICES[app as keyof typeof APP_SERVICES].panels.map((panel) => (
                            <div key={panel} className="text-sm text-slate-300 flex items-center gap-2">
                              <span className="text-purple-400">→</span>
                              {panel}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="p-3 rounded-lg border border-green-500/15 bg-green-500/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-400 font-bold">⭐</span>
                          <span className="text-sm font-bold text-green-400 uppercase tracking-wider">
                            Features
                          </span>
                        </div>
                        <div className="ml-6 flex flex-wrap gap-2">
                          {APP_SERVICES[app as keyof typeof APP_SERVICES].features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 rounded text-xs bg-green-500/10 border border-green-500/20 text-green-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Let's transform your vision into reality. Get in touch with our team today.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Get Started →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
