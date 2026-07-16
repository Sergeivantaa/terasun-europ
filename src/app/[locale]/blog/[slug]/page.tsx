import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { getBlogPost, getBlogPosts, getBlogSlugs } from '@/lib/content'
import { setRequestLocale } from 'next-intl/server'
import BlogRenderer from '@/components/blog/BlogRenderer'

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
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const post = getBlogPost(slug, locale)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: 'Terasun Europe', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Terasun Europe', url: SITE_URL },
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    ...(post.coverImage && { image: `${SITE_URL}${post.coverImage}` }),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${locale}/blog/${slug}` },
  }

  const faqSchema = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  } : null

  // Related posts
  const allPosts = getBlogPosts('en')
  const relatedPosts = post.relatedSlugs
    ? allPosts.filter(p => post.relatedSlugs!.includes(p.slug) && p.slug !== slug)
    : allPosts.filter(p => p.slug !== slug).slice(0, 3)

  const readingTime = Math.ceil(post.body.split(' ').length / 200)

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/${locale}` },
        { name: 'Blog', url: `${SITE_URL}/${locale}/blog` },
        { name: post.title, url: `${SITE_URL}/${locale}/blog/${slug}` },
      ])} />
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero */}
      {post.coverImage && (
        <div className="relative w-full h-64 md:h-80 bg-[#0C1929] overflow-hidden">
          <Image
            src={post.coverImage.startsWith('http') ? post.coverImage : `https://terasun-europe.eu${post.coverImage}`}
            alt={post.title}
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1929] to-transparent" />
        </div>
      )}

      <div className="container-page py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 max-w-5xl">

          {/* Main content */}
          <article>
            <Link href={`/${locale}/blog`} className="text-sm text-[#245A85] hover:text-[#132238] transition-colors mb-6 inline-flex items-center gap-1 font-medium">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              Blog & Resources
            </Link>

            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold tracking-wider text-[#245A85] uppercase border border-[#245A85]/30 bg-[#EBF4FB] rounded px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-black text-[#132238] leading-tight mb-4">{post.title}</h1>
            <p className="text-[#4A5B6D] text-lg leading-relaxed mb-4">{post.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8B9AAD] mb-10 pb-8 border-b border-[#D8E1E9]">
              <span>{new Date(post.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              {post.author && <span className="flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {post.author}
              </span>}
              <span>{readingTime} min read</span>
            </div>

            <BlogRenderer body={post.body} locale={locale} faq={post.faq} downloads={post.downloads} />

            {/* Final CTA */}
            <div className="mt-14 pt-8 border-t border-[#D8E1E9] grid sm:grid-cols-3 gap-4">
              <Link href={`/${locale}/contact`}
                className="flex flex-col items-start gap-2 bg-[#EBF4FB] border border-[#5CA4D6]/30 rounded-xl p-5 hover:border-[#5CA4D6]/60 transition-colors group">
                <span className="text-[10px] font-bold tracking-widest text-[#245A85] uppercase">Sample</span>
                <span className="font-bold text-[#132238] text-sm group-hover:text-[#245A85] transition-colors">Request free sample →</span>
              </Link>
              <Link href={`/${locale}/contact`}
                className="flex flex-col items-start gap-2 bg-[#132238] rounded-xl p-5 hover:bg-[#0C1929] transition-colors group">
                <span className="text-[10px] font-bold tracking-widest text-[#5CA4D6] uppercase">Quote</span>
                <span className="font-bold text-white text-sm">Request quotation →</span>
              </Link>
              <Link href={`/${locale}/distributors`}
                className="flex flex-col items-start gap-2 bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-5 hover:border-[#245A85]/40 transition-colors group">
                <span className="text-[10px] font-bold tracking-widest text-[#245A85] uppercase">Partner</span>
                <span className="font-bold text-[#132238] text-sm group-hover:text-[#245A85] transition-colors">Become distributor →</span>
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Cert quick facts */}
            <div className="bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-5 sticky top-24">
              <p className="text-[10px] font-bold tracking-widest text-[#245A85] uppercase mb-4">Terasun TSM — key certifications</p>
              {[
                { label: 'CE Marking', val: '1023-CPR-1565 P' },
                { label: 'ETA', val: '24/0895' },
                { label: 'EPD', val: 'EPD-IES-0018268' },
                { label: 'Fire (E120)', val: 'Wall assembly · 12 mm' },
                { label: 'Standard', val: 'EN 12467' },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between gap-2 py-2 border-b border-[#D8E1E9] last:border-0">
                  <span className="text-xs text-[#6B7A8D]">{label}</span>
                  <span className="text-xs font-bold text-[#132238] text-right">{val}</span>
                </div>
              ))}
              <Link href={`/${locale}/downloads`} className="mt-4 text-xs font-semibold text-[#245A85] hover:text-[#1A4470] flex items-center gap-1">
                Download certificates →
              </Link>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#245A85] uppercase mb-3">Related articles</p>
                <div className="space-y-3">
                  {relatedPosts.slice(0, 4).map(p => (
                    <Link key={p.slug} href={`/${locale}/blog/${p.slug}`}
                      className="block bg-white border border-[#D8E1E9] rounded-lg p-4 hover:border-[#5CA4D6]/50 transition-colors">
                      <p className="text-sm font-semibold text-[#132238] leading-snug hover:text-[#245A85]">{p.title}</p>
                      <p className="text-xs text-[#8B9AAD] mt-1">{new Date(p.publishedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}
