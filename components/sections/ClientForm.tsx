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
    <section id="contact" className="py-20 md:py-24">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="section-title">Let us talk about your build</h2>
            <p className="section-lead max-w-2xl mx-auto">
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
            <aside className="card h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Why clients choose us</p>
              <h3 className="text-2xl font-bold mt-3">A smoother path from idea to delivery.</h3>
              <ul className="mt-5 space-y-4 text-slate-600 leading-relaxed">
                <li>Clear communication and weekly project updates.</li>
                <li>Modern architecture designed for scale and speed.</li>
                <li>Security-first delivery with production-ready standards.</li>
              </ul>
              <div className="mt-6 glass-chip rounded-2xl p-4 border border-blue-100/70">
                <p className="text-sm text-blue-700 font-semibold">Average first response: under 24 hours</p>
              </div>
            </aside>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card space-y-5 h-full">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Project brief</p>
                  <h3 className="text-2xl font-bold mt-2">Tell us what you want to build.</h3>
                </div>
                <span className="glass-chip px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
                  Fast response, clear estimate
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-sm"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-sm"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Project requirement</label>
                <textarea
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border rounded-xl bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-sm resize-none"
                  placeholder="Describe scope, timeline, and expected outcome..."
                />
              </div>

              <button
                type="submit"
                disabled={loading || submitted}
                className="w-full md:w-auto btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? 'Submitted Successfully' : loading ? 'Sending...' : 'Send Requirement'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
