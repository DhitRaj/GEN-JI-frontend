export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  keywords: string[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-much-does-website-cost-india-2026',
    title: 'How Much Does a Website Cost in India? Complete 2026 Guide',
    excerpt:
      'A practical breakdown of website development pricing in India for landing pages, business sites, and custom web applications.',
    category: 'Industry Insights',
    readTime: '8 min read',
    publishedAt: '2026-04-20',
    keywords: [
      'website cost in India',
      'website development pricing India',
      'custom website budget India',
    ],
    sections: [
      {
        heading: 'Typical Price Ranges',
        paragraphs: [
          'Simple business websites usually cost less than custom product platforms because they need fewer custom workflows and integrations.',
          'As scope increases, pricing is mostly driven by backend complexity, design depth, performance work, and long-term maintenance requirements.',
        ],
      },
      {
        heading: 'What Increases Cost',
        paragraphs: [
          'Authentication, dashboards, payment systems, and custom admin panels increase both build time and QA time.',
          'A realistic budget should include hosting, analytics, security updates, and iteration cycles after launch.',
        ],
      },
    ],
  },
  {
    slug: 'best-tech-stack-for-startups-2026',
    title: 'Best Tech Stack for Startups in 2026: Complete Guide',
    excerpt:
      'How to choose a startup tech stack for speed, hiring availability, and long-term product scalability.',
    category: 'Technical Guide',
    readTime: '12 min read',
    publishedAt: '2026-04-15',
    keywords: ['startup tech stack', 'best tech stack 2026', 'startup web architecture'],
    sections: [
      {
        heading: 'Choose for Team Velocity',
        paragraphs: [
          'The right stack is the one your team can ship with quickly while maintaining quality over time.',
          'When deadlines are aggressive, proven tooling with strong documentation usually beats experimental choices.',
        ],
      },
      {
        heading: 'Think Beyond Launch',
        paragraphs: [
          'A good startup stack should support fast iteration today and predictable scaling tomorrow.',
          'Database design, deployment workflow, and observability should be decided early to avoid expensive rewrites.',
        ],
      },
    ],
  },
  {
    slug: 'react-vs-nextjs-which-to-choose-2026',
    title: 'React vs Next.js in 2026: Which Should You Choose?',
    excerpt:
      'A decision framework for choosing between React and Next.js based on SEO needs, performance goals, and product roadmap.',
    category: 'Technical Guide',
    readTime: '10 min read',
    publishedAt: '2026-04-10',
    keywords: ['React vs Next.js', 'Next.js SEO', 'frontend framework choice'],
    sections: [
      {
        heading: 'React Strengths',
        paragraphs: [
          'React is excellent for highly interactive applications where routing and rendering behavior need complete control.',
          'It remains a strong option for teams with existing architecture and custom build systems.',
        ],
      },
      {
        heading: 'When Next.js Wins',
        paragraphs: [
          'Next.js is usually the better default for content-heavy sites that need strong SEO, routing, and server rendering out of the box.',
          'Teams can move faster when framework conventions reduce setup overhead and production complexity.',
        ],
      },
    ],
  },
  {
    slug: 'nodejs-backend-scaling-best-practices',
    title: '7 Proven Node.js Backend Scaling Strategies for 2026',
    excerpt:
      'A practical guide to scaling Node.js backends with caching, queueing, profiling, and database optimization.',
    category: 'Technical Guide',
    readTime: '15 min read',
    publishedAt: '2026-04-05',
    keywords: ['Node.js scaling', 'backend performance', 'API scaling strategies'],
    sections: [
      {
        heading: 'Start With Measurements',
        paragraphs: [
          'Before scaling, baseline response times, throughput, and failure rates so improvements are measurable.',
          'Profiling helps identify whether your bottleneck is CPU, database, network, or third-party dependencies.',
        ],
      },
      {
        heading: 'Scale in Layers',
        paragraphs: [
          'Introduce caching for hot reads, queues for non-blocking work, and database indexing for high-volume queries.',
          'Horizontal scaling works best when each instance stays stateless and session handling is centralized.',
        ],
      },
    ],
  },
  {
    slug: 'seo-for-web-developers-complete-guide',
    title: 'SEO for Web Developers: The Complete 2026 Guide',
    excerpt:
      'A developer-focused SEO guide covering technical foundations, schema markup, Core Web Vitals, and crawlability.',
    category: 'Technical Guide',
    readTime: '18 min read',
    publishedAt: '2026-03-30',
    keywords: ['technical SEO for developers', 'schema markup guide', 'core web vitals'],
    sections: [
      {
        heading: 'Technical SEO Foundations',
        paragraphs: [
          'Search engines need discoverable URLs, clean internal links, canonicals, and valid sitemaps before content can rank reliably.',
          'Metadata quality and structured data improve relevance signals and can increase click-through rates.',
        ],
      },
      {
        heading: 'Performance and UX',
        paragraphs: [
          'Fast and stable pages improve user outcomes, and better user outcomes generally align with better search visibility.',
          'Optimize images, reduce blocking scripts, and monitor real-user metrics for continuous improvement.',
        ],
      },
    ],
  },
  {
    slug: 'web-performance-optimization-checklist-2026',
    title: 'Ultimate Web Performance Optimization Checklist 2026',
    excerpt:
      'A practical checklist to improve loading speed, interaction quality, and stability across devices.',
    category: 'Checklist',
    readTime: '14 min read',
    publishedAt: '2026-03-25',
    keywords: ['web performance checklist', 'website speed optimization', 'core web vitals checklist'],
    sections: [
      {
        heading: 'Asset and Delivery Optimization',
        paragraphs: [
          'Compress images, serve modern formats, and cache static assets aggressively using a CDN.',
          'Ship only required JavaScript and split bundles to avoid loading unnecessary code on first view.',
        ],
      },
      {
        heading: 'Runtime Optimization',
        paragraphs: [
          'Avoid heavy main-thread work, defer non-critical scripts, and reduce layout shifts with fixed dimensions.',
          'Track regressions in CI and production dashboards so performance quality stays stable as features grow.',
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
