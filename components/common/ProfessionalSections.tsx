'use client';

import { motion } from 'framer-motion';
import { SectionCard, SectionHeader } from './SectionCard';

export function OurServicesSection() {
  const services = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Modern, scalable web applications built with cutting-edge technologies. From startups to enterprises, we deliver high-performance solutions.',
      features: ['React & Next.js', 'Node.js Backend', 'Database Design', 'API Development', 'Performance Optimization'],
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android. Seamless user experience across all devices.',
      features: ['React Native', 'Flutter', 'Native Development', 'Push Notifications', 'Offline Support'],
    },
    {
      icon: '⚙️',
      title: 'SaaS & Dashboards',
      description: 'Complex web applications, admin panels, and business automation tools. Designed for scale and reliability.',
      features: ['Real-time Analytics', 'User Management', 'Role-based Access', 'Data Visualization', 'API Integration'],
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that prioritize user experience. Design that converts and engages.',
      features: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'Accessibility'],
    },
  ];

  return (
    <section className="relative z-20 py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="OUR SERVICES"
          title="What We Build"
          description="Comprehensive digital solutions tailored to your business needs. From concept to scale, we deliver excellence."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <SectionCard
              key={i}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              variant={i % 2 === 0 ? 'default' : 'highlight'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutGenJiSection() {
  return (
    <section className="relative z-20 py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="ABOUT GEN-JI"
          title="Who We Are"
          description="A team of passionate developers, designers, and strategists committed to building next-generation digital experiences."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: '🎯',
              title: 'Our Mission',
              description: 'Transform ideas into powerful digital products that drive business growth and create lasting impact.',
            },
            {
              icon: '💡',
              title: 'Our Vision',
              description: 'To be the most trusted digital partner for startups and enterprises seeking innovation and excellence.',
            },
            {
              icon: '🚀',
              title: 'Our Values',
              description: 'Quality, transparency, collaboration, and continuous innovation in everything we do.',
            },
          ].map((item, i) => (
            <SectionCard
              key={i}
              icon={item.icon}
              title={item.title}
              description={item.description}
              variant="dark"
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">50+ Projects Delivered</h3>
          <p className="text-slate-300 text-lg mb-6">
            We've helped startups and enterprises build digital products that scale. Our team brings expertise in web development, mobile apps, and cloud architecture.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '50+', label: 'Projects' },
              { num: '30+', label: 'Clients' },
              { num: '99%', label: 'Success Rate' },
              { num: '5 yrs', label: 'Experience' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">{stat.num}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function OurPortfolioSection() {
  const projects = [
    { title: 'E-Commerce Platform', tags: ['Web', 'React', 'Node.js'], image: '🛍️' },
    { title: 'Mobile Delivery App', tags: ['App', 'React Native', 'Firebase'], image: '📦' },
    { title: 'SaaS Dashboard', tags: ['Web', 'Next.js', 'PostgreSQL'], image: '📊' },
    { title: 'AI Chat System', tags: ['AI', 'Python', 'WebSocket'], image: '🤖' },
    { title: 'Real-time Analytics', tags: ['Web', 'React', 'D3.js'], image: '📈' },
    { title: 'Booking Platform', tags: ['Web', 'Next.js', 'Stripe'], image: '📅' },
  ];

  return (
    <section className="relative z-20 py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="OUR PORTFOLIO"
          title="Featured Projects"
          description="A showcase of our best work. Real projects, real results, real impact."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-cyan-500/50 transition-all cursor-pointer group"
            >
              <motion.div
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.15 }}
                className="text-6xl md:text-7xl mb-6 inline-block"
              >
                {project.image}
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertKnowledgeSection() {
  return (
    <section className="relative z-20 py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="EXPERT KNOWLEDGE"
          title="Web Dev Blog"
          description="Expert guides and practical insights on web development, performance optimization, and scalable software delivery."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '📚',
              title: '6+ Articles',
              description: 'In-depth guides covering web development best practices, architecture patterns, and real-world solutions.',
            },
            {
              icon: '📝',
              title: '2-3 Posts/Week',
              description: 'Regular updates on latest technologies, industry trends, and practical development tips.',
            },
            {
              icon: '📖',
              title: '1500+ Words Each',
              description: 'Comprehensive, well-researched articles that provide actionable insights and deep knowledge.',
            },
          ].map((item, i) => (
            <SectionCard
              key={i}
              icon={item.icon}
              title={item.title}
              description={item.description}
              variant={i === 1 ? 'highlight' : 'default'}
            />
          ))}
        </div>

        <motion.div className="mt-12 text-center">
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Read Our Blog →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export function GetInTouchSection() {
  return (
    <section className="relative z-20 py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="GET IN TOUCH"
          title="Ready to Build?"
          description="Ready to bring your vision to life? Let us discuss your project requirements and build something extraordinary together."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: '⚡',
              title: 'Quick Response',
              description: 'Within 24 hours',
              features: ['Fast turnaround', 'Dedicated support', 'Clear communication'],
            },
            {
              icon: '🎯',
              title: 'Tailored Solutions',
              description: 'Custom execution plan',
              features: ['Personalized approach', 'Flexible timeline', 'Scalable architecture'],
            },
            {
              icon: '🚀',
              title: 'Fast Delivery',
              description: 'Agile implementation',
              features: ['Sprint-based', 'Regular updates', 'Quality assurance'],
            },
          ].map((item, i) => (
            <SectionCard
              key={i}
              icon={item.icon}
              title={item.title}
              subtitle={item.description}
              description={item.features.join(' • ')}
              variant={i === 1 ? 'highlight' : 'default'}
            />
          ))}
        </div>

        <motion.div className="text-center">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,229,255,0.8)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg font-bold text-lg text-white hover:shadow-2xl transition-all"
          >
            Start Your Project →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
