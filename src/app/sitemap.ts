import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
import { locales } from '@/i18n/routing'
import { countries } from '@/data/countries'
import { applications } from '@/data/applications'
import { SITE_URL } from '@/lib/constants'

type SitemapEntry = MetadataRoute.Sitemap[number]

function buildAlternates(path: string): SitemapEntry['alternates'] {
  return {
    languages: Object.fromEntries(
      locales.map((loc) => [loc, `${SITE_URL}/${loc}${path}`])
    ),
  }
}

const staticPages = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/manufacturer', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/products', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/applications', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/technical-data', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/installation', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/certifications', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/downloads', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/distributors', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/logistics', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/gallery', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.5, changeFrequency: 'weekly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // Static pages × all locales
  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: buildAlternates(page.path),
      })
    }
  }

  // Application sub-pages
  for (const app of applications) {
    const path = `/applications/${app.slug}`
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: buildAlternates(path),
      })
    }
  }

  // Country market pages
  for (const country of countries) {
    const path = `/markets/${country.slug}`
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: buildAlternates(path),
      })
    }
  }

  return entries
}
