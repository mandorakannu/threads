import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://threads.mandorakannu.tech',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://threads.mandorakannu.tech/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://threads.mandorakannu.tech/contact',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://threads.mandorakannu.tech/profile',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.5,
    },
    {
      url: 'https://threads.mandorakannu.tech/new-thread',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}