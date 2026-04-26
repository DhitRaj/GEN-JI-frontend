import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gen-ji.me';

  const staticRoutes = [
    { path: '',          priority: 1.0, changeFrequency: 'daily'   as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly'  as const },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly'  as const },
    { path: '/blog',     priority: 0.9, changeFrequency: 'daily'   as const },
    { path: '/contact',  priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about',    priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const blogPosts = [
    { slug: 'how-much-does-website-cost-india-2026',    date: '2026-04-20' },
    { slug: 'best-tech-stack-for-startups-2026',        date: '2026-04-15' },
    { slug: 'react-vs-nextjs-which-to-choose-2026',     date: '2026-04-10' },
    { slug: 'nodejs-backend-scaling-best-practices',    date: '2026-04-05' },
    { slug: 'seo-for-web-developers-complete-guide',    date: '2026-03-30' },
    { slug: 'web-performance-optimization-checklist-2026', date: '2026-03-25' },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
