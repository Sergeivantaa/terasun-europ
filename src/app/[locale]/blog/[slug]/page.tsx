import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { getBlogPost, getBlogSlugs } from '@/lib/content'
import { setRequestLocale } from 'next-intl/server'

export function generateStaticParams() {
  const slugs = getBlogSlugs()
  return locales.flatMap(locale =>
    slugs.map(slug => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const post = getBlogPost(slug, locale)
  if (!post) return { title: 'Not found' }
  const url = `${SITE_URL}/${locale}/blog/${slug}`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/blog/${slug}`]))
  hreflang['x-default'] = `${SITE_URL}/en/blog/${slug}`
  return {
    title: `${post.title} | Terasun Europe`,
    description: post.description,
    alternates: { canonical: url, languages: hreflang },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: post.coverImage ? [{ url: `${SITE_URL}${post.coverImage}` }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = getBlogPost(slug, locale)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: 'Terasun Europe' },
    publisher: { '@type': 'Organization', name: 'Terasun Europe', url: SITE_URL },
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    ...(post.coverImage && { image: `${SITE_URL}${post.coverImage}` }),
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/${locale}` },
        { name: 'Blog', url: `${SITE_URL}/${locale}/blog` },
        { name: post.title, url: `${SITE_URL}/${locale}/blog/${slug}` },
      ])} />
      <JsonLd data={articleSchema} />

      <article className="container-page py-12 md:py-16 max-w-3xl">
        <Link href={`/${locale}/blog`} className="text-sm text-[#245A85] hover:text-[#132238] transition-colors mb-8 inline-block font-medium">
          ← Back to blog
        </Link>

        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold tracking-wider text-accent uppercase border border-accent/30 rounded px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-black text-[#132238] leading-tight mb-4">{post.title}</h1>
        <p className="text-[#4A5B6D] text-base leading-relaxed mb-2">{post.description}</p>
        <div className="text-xs text-gray-500 mb-8 flex gap-4">
          <span>{new Date(post.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          {post.author && <span>{post.author}</span>}
        </div>

        <div className="prose max-w-none text-[#4A5B6D] leading-relaxed space-y-4">
          {post.body.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-[#132238] mt-8 mb-3">{block.slice(3)}</h2>
            if (block.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-[#132238] mt-6 mb-2">{block.slice(4)}</h3>
            if (block.startsWith('- ') || block.includes('\n- ')) {
              const items = block.split('\n').filter(l => l.startsWith('- '))
              return <ul key={i} className="list-disc list-inside space-y-1">{items.map((item, j) => <li key={j}>{item.slice(2)}</li>)}</ul>
            }
            if (block.startsWith('**') && block.endsWith('**')) {
              return <p key={i} className="font-semibold text-[#132238]">{block.slice(2, -2)}</p>
            }
            return <p key={i}>{block}</p>
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href={`/${locale}/contact`} className="btn-primary">
            Request a quotation
          </Link>
        </div>
      </article>
    </>
  )
}
