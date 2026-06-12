'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Shield, Zap } from 'lucide-react';
import SiteHeader from '../SiteHeader';
import Footer from '../Footer';

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SaaSHomepage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main>
        {/* ===== HERO SECTION ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="px-4 py-20 md:px-6 md:py-32"
        >
          <div className="mx-auto max-w-4xl text-center">
            {/* Subheading */}
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-4">
              For SaaS Founders
            </p>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Launch Your SaaS MVP in <span className="text-blue-600">8 Weeks</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Not 6 months. Not 12 months. <strong>8 weeks.</strong> We build production-ready SaaS MVPs so you can raise Series A on time.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="#book-call"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
              >
                Book Free Strategy Call
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-900 font-semibold rounded-lg hover:border-slate-400 transition"
              >
                See How It Works
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Fixed 8-week timeline</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>50% refund guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                <span>Production-ready code</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== PROBLEM SECTION ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="px-4 py-16 md:px-6 md:py-24 bg-slate-50"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              You're Facing a Problem
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Problem 1 */}
              <div className="bg-white p-8 rounded-lg border border-slate-200">
                <div className="text-4xl font-bold text-red-600 mb-4">6-12</div>
                <h3 className="text-xl font-semibold mb-3">Months to Hire</h3>
                <p className="text-slate-600">
                  Finding, interviewing, and onboarding developers takes forever. You don't have that time.
                </p>
              </div>

              {/* Problem 2 */}
              <div className="bg-white p-8 rounded-lg border border-slate-200">
                <div className="text-4xl font-bold text-red-600 mb-4">₹15-25L</div>
                <h3 className="text-xl font-semibold mb-3">Per Developer/Year</h3>
                <p className="text-slate-600">
                  Hiring full-time developers is expensive. You need to preserve runway for growth.
                </p>
              </div>

              {/* Problem 3 */}
              <div className="bg-white p-8 rounded-lg border border-slate-200">
                <div className="text-4xl font-bold text-red-600 mb-4">∞</div>
                <h3 className="text-xl font-semibold mb-3">Technical Debt Risk</h3>
                <p className="text-slate-600">
                  Hiring the wrong person means months of wasted time and code you'll have to rewrite.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== SOLUTION SECTION ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="px-4 py-16 md:px-6 md:py-24"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              The Solution: SaaS MVP Sprint
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-12 rounded-xl border border-blue-200 mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">What You Get</h3>
                  <ul className="space-y-4">
                    {[
                      'Production-ready SaaS MVP',
                      'React/Next.js frontend',
                      'Node.js backend',
                      'Database & authentication',
                      'Payment integration',
                      '30 days post-launch support',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6">The Timeline</h3>
                  <div className="space-y-4">
                    {[
                      { week: 'Week 1', task: 'Discovery & Strategy' },
                      { week: 'Weeks 2-7', task: 'Development Sprint' },
                      { week: 'Week 8', task: 'Launch & Deploy' },
                      { week: '+30 days', task: 'Support & Optimization' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-24 font-semibold text-blue-600">{item.week}</div>
                        <div className="text-slate-700">{item.task}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  name: 'Standard MVP',
                  price: '₹2,50,000',
                  desc: 'Simple CRUD app, basic auth, 1-2 integrations',
                },
                {
                  name: 'Complex MVP',
                  price: '₹4,00,000',
                  desc: 'Advanced features, multiple roles, complex workflows',
                  featured: true,
                },
                {
                  name: 'Enterprise MVP',
                  price: '₹6,00,000',
                  desc: 'Multiple integrations, advanced security, compliance',
                },
              ].map((tier, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-lg border-2 ${
                    tier.featured
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">{tier.price}</div>
                  <p className="text-slate-600 text-sm mb-4">{tier.desc}</p>
                  <Link
                    href="#book-call"
                    className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>

            {/* Guarantee */}
            <div className="bg-yellow-50 border-2 border-yellow-200 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Our Guarantee</h3>
              <p className="text-slate-700">
                If we don't deliver a working MVP in 8 weeks, you pay <strong>50% of the project cost</strong>. No questions asked. We're that confident in our process.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ===== HOW IT WORKS ===== */}
        <motion.section
          id="how-it-works"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="px-4 py-16 md:px-6 md:py-24 bg-slate-50"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              How It Works
            </h2>

            <div className="space-y-8">
              {[
                {
                  num: '1',
                  title: 'Book a Call',
                  desc: 'We understand your product, timeline, and goals. 30 minutes.',
                },
                {
                  num: '2',
                  title: 'Sign the Contract',
                  desc: 'Fixed price, fixed timeline, clear scope. No surprises.',
                },
                {
                  num: '3',
                  title: 'We Build',
                  desc: 'Our team works in sprints. You get weekly updates.',
                },
                {
                  num: '4',
                  title: 'You Launch',
                  desc: 'Production-ready code. We handle deployment and support.',
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== CASE STUDIES (PLACEHOLDER) ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="px-4 py-16 md:px-6 md:py-24"
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Recent Projects
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'TaskFlow',
                  desc: 'Project management SaaS for remote teams',
                  result: 'Launched in 8 weeks, raised ₹1Cr Series A',
                  tech: 'Next.js, Node.js, MongoDB',
                },
                {
                  name: 'DataViz Pro',
                  desc: 'Analytics dashboard for e-commerce',
                  result: 'Launched in 7 weeks, 500+ users in first month',
                  tech: 'React, Express, PostgreSQL',
                },
              ].map((project, i) => (
                <div key={i} className="bg-white p-8 rounded-lg border border-slate-200">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-slate-600 mb-4">{project.desc}</p>
                  <div className="bg-green-50 p-4 rounded mb-4 border border-green-200">
                    <p className="text-sm font-semibold text-green-900">Result:</p>
                    <p className="text-slate-700">{project.result}</p>
                  </div>
                  <p className="text-sm text-slate-500">Tech: {project.tech}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-600 mb-4">
                Building more case studies. Want to be next?
              </p>
              <Link
                href="#book-call"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ===== FAQ ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="px-4 py-16 md:px-6 md:py-24 bg-slate-50"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Common Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: 'How is 8 weeks possible?',
                  a: 'We focus on MVP scope only. No unnecessary features. We use proven tech stacks and processes. We work in sprints with daily standups.',
                },
                {
                  q: 'What if I need changes during development?',
                  a: 'Small changes are included. Major scope changes extend the timeline and cost. We discuss this upfront.',
                },
                {
                  q: 'Do you provide ongoing support?',
                  a: 'Yes, 30 days of post-launch support is included. After that, we offer maintenance packages starting at ₹50K/month.',
                },
                {
                  q: 'What if the MVP fails?',
                  a: 'We deliver a working product. If it fails in the market, that\'s a product problem, not a technical one. We can help iterate.',
                },
                {
                  q: 'Can you help with fundraising?',
                  a: 'We can help with technical due diligence, architecture reviews, and investor demos. We\'ve worked with founders raising Series A.',
                },
                {
                  q: 'What if I need to scale after launch?',
                  a: 'We build with scalability in mind. We can help you scale the infrastructure and add features as you grow.',
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-slate-200">
                  <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== FINAL CTA ===== */}
        <motion.section
          id="book-call"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
          className="px-4 py-16 md:px-6 md:py-24"
        >
          <div className="mx-auto max-w-3xl text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Launch Your SaaS?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Book a free 30-minute strategy call. No sales pitch. Just honest advice on how to build your MVP fast.
            </p>
            <Link
              href="https://calendly.com/gen-ji/saas-sprint"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-slate-100 transition"
            >
              Book Free Call
            </Link>
            <p className="text-sm mt-6 opacity-75">
              Or email us: <strong>founders@gen-ji.me</strong>
            </p>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
