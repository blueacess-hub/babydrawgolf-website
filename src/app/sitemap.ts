import type { MetadataRoute } from 'next';

const baseUrl = 'https://babydrawgolf.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/memberships', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/trackman-io', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/24-7-indoor-golf-cypress', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/visit', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.8, changeFrequency: 'weekly' as const },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date('2026-08-30'),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
