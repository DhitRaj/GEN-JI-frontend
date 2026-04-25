import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gen-ji.me';
  
  // Define your static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/contact',
    '/designs',
    '/features',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
