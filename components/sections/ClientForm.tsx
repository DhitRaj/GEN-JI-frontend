'use client';

import { useState } from 'react';
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
    <section id="contact" className="py-2">
      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Why clients choose us</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">A smoother path from idea to delivery.</h3>
          <ul className="mt-5 space-y-3 text-slate-700">
            <li>Clear communication and weekly project updates.</li>
            <li>Modern architecture designed for scale and speed.</li>
            <li>Security-first delivery with production-ready standards.</li>
          </ul>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-medium text-slate-700">Average first response: under 24 hours</p>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Project brief</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Tell us what you want to build.</h3>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
              Fast response, clear estimate
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone (optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Project requirement</label>
            <textarea
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              required
              rows={6}
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
              placeholder="Describe scope, timeline, and expected outcome..."
            />
          </div>

          <button
            type="submit"
            disabled={loading || submitted}
            className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitted ? 'Submitted Successfully' : loading ? 'Sending...' : 'Send Requirement'}
          </button>
        </form>
      </div>
    </section>
  );
}

