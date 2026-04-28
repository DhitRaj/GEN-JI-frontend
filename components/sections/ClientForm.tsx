'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

type ClientFormData = {
  name: string;
  email: string;
  phone: string;
  requirement: string;
};

export default function ClientForm() {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    phone: '',
    requirement: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/clients/submit`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', requirement: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-10">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white">Let us talk about your build</h2>
            <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Share your requirements and our team will send a clear plan, timeline, and estimate.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <aside className="p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-[80px] shadow-2xl h-full relative overflow-hidden">
              {/* Oily effect */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/30 via-transparent to-purple-500/30 animate-pulse" />
                <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Why clients choose us</p>
                <h3 className="text-2xl font-bold mt-3 text-white">A smoother path from idea to delivery.</h3>
                <ul className="mt-5 space-y-4 text-slate-300 leading-relaxed">
                  <li>Clear communication and weekly project updates.</li>
                  <li>Modern architecture designed for scale and speed.</li>
                  <li>Security-first delivery with production-ready standards.</li>
                </ul>
                <div className="mt-6 rounded-2xl p-4 border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                  <p className="text-sm text-cyan-300 font-semibold">Average first response: under 24 hours</p>
                </div>
              </div>
            </aside>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-[80px] shadow-2xl space-y-5 h-full relative overflow-hidden">
              {/* Oily effect */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30 animate-pulse" />
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">Project brief</p>
                    <h3 className="text-2xl font-bold mt-2 text-white">Tell us what you want to build.</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-slate-300 border border-white/20 bg-white/5">
                    Fast response, clear estimate
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm backdrop-blur-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm backdrop-blur-sm"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm backdrop-blur-sm"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Project requirement</label>
                  <textarea
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border rounded-xl bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm resize-none backdrop-blur-sm"
                    placeholder="Describe scope, timeline, and expected outcome..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="w-full md:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-black uppercase tracking-widest hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitted ? 'Submitted Successfully' : loading ? 'Sending...' : 'Send Requirement'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
