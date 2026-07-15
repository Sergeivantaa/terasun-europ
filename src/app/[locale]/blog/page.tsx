import { getTranslations, setRequestLocale} from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { getBlogPosts } from '@/lib/content'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.blog' })
  const url = `${SITE_URL}/${locale}/blog`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/blog`]))
  hreflang['x-default'] = `${SITE_URL}/en/blog`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const posts = getBlogPosts(locale).length > 0
    ? getBlogPosts(locale)
    : getBlogPosts('en')  // fallback to English posts

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Blog', url: `${SITE_URL}/${locale}/blog` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Knowledge base</p>
          <h1 className="stitle">Blog & Resources</h1>
          <p className="ssub max-w-2xl">Articles, technical guides and news about fiber cement construction for European professionals.</p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="card-gold p-6 flex flex-col hover:border-gold/60 transition-colors"
              >
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-bold tracking-wider text-gold uppercase border border-gold/30 rounded px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-white font-bold text-base leading-snug mb-2">{post.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.description}</p>
                <div className="mt-4 text-xs text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-xl font-bold text-white mb-3">Coming soon</h2>
            <p className="text-gray-400 text-sm">We are preparing in-depth articles on fiber cement installation, design, and building regulations across Europe.</p>
          </div>
        )}
      </section>
    </>
  )
}
