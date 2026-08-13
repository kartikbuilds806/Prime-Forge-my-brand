import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://primeforge.agency';

  const routes = [
    '',
    '/services',
    '/projects',
    '/track',
    '/about',
    '/contact',
    '/start-a-project',
    '/book-a-call',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
