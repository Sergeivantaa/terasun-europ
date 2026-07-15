/**
 * CMS content adapter — the single import surface for all page content.
 *
 * Currently reads from static TypeScript data files in src/data/.
 * To integrate a headless CMS (Contentful, Sanity, Strapi, …), replace
 * the fetch functions below with API calls. The TypeScript interfaces are
 * the stable contract; page components never import from src/data/ directly.
 */

import { applications, type Application } from '@/data/applications'
import { certifications, type Certification } from '@/data/certifications'
import { countries, type Country } from '@/data/countries'
import { products } from '@/data/products'
import { faqKeys } from '@/data/faq'
import fs from 'fs'
import path from 'path'

// ─── Blog posts ───────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string
  locale: string
  title: string
  description: string
  publishedAt: string   // ISO 8601
  updatedAt?: string
  author?: string
  tags?: string[]
  coverImage?: string
  body: string          // Markdown
  draft?: boolean
}

export interface BlogPostMeta extends Omit<BlogPost, 'body'> {}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function readBlogPost(filePath: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as BlogPost
  } catch {
    return null
  }
}

export function getBlogPosts(locale = 'en'): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => readBlogPost(path.join(BLOG_DIR, f)))
    .filter((p): p is BlogPost => p !== null && !p.draft && p.locale === locale)
    .map(({ body: _body, ...meta }) => meta)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getBlogPost(slug: string, locale = 'en'): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${locale}-${slug}.json`)
  if (!fs.existsSync(filePath)) {
    // Fallback to English
    const fallback = path.join(BLOG_DIR, `en-${slug}.json`)
    if (!fs.existsSync(fallback)) return null
    return readBlogPost(fallback)
  }
  return readBlogPost(filePath)
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const post = readBlogPost(path.join(BLOG_DIR, f))
      return post?.slug
    })
    .filter((s): s is string => Boolean(s))
    .filter((s, i, arr) => arr.indexOf(s) === i)  // unique
}

// ─── Products ─────────────────────────────────────────────────────────────────

export { products }
export type { Application, Certification, Country }

// ─── Applications ─────────────────────────────────────────────────────────────

export function getApplications(): Application[] {
  return applications
}

export function getApplication(slug: string): Application | undefined {
  return applications.find((a) => a.slug === slug)
}

export function getApplicationSlugs(): string[] {
  return applications.map((a) => a.slug)
}

// ─── Certifications ───────────────────────────────────────────────────────────

export function getCertifications(): Certification[] {
  return certifications
}

// ─── Countries ────────────────────────────────────────────────────────────────

export function getCountries(): Country[] {
  return countries
}

export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug)
}

export function getCountrySlugs(): string[] {
  return countries.map((c) => c.slug)
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export { faqKeys }

// ─── Pages (CMS override layer) ───────────────────────────────────────────────

export interface PageOverride {
  /** Override any translation key for a specific page+locale combination */
  [key: string]: unknown
}

const PAGES_DIR = path.join(process.cwd(), 'content', 'pages')

export function getPageOverride(page: string, locale: string): PageOverride | null {
  const filePath = path.join(PAGES_DIR, `${locale}-${page}.json`)
  if (!fs.existsSync(filePath)) return null
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return null
  }
}
