import { getTranslations, setRequestLocale} from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
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
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const posts = getBlogPosts(locale).length > 0
    ? getBlogPosts(locale)
    : getBlogPosts('en')

  const [featured, ...rest] = posts

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Blog', url: `${SITE_URL}/${locale}/blog` },
      ])} />

      {/* Header */}
      <section className="bg-[#F4F7FA] border-b border-[#D8E1E9] py-14 md:py-20">
        <div className="container-page">
          <p className="stag mb-3">Knowledge base</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#132238] leading-tight mb-4 max-w-2xl">
            Technical guides &amp; resources for fiber cement construction
          </h1>
          <p className="text-[#4A5B6D] text-lg max-w-2xl leading-relaxed">
            In-depth articles for architects, contractors, and distributors working with CE-certified fiber cement board across Europe.
          </p>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-[#D8E1E9] bg-white p-12 text-center">
            <p className="text-[#4A5B6D]">Articles coming soon.</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link href={`/${locale}/blog/${featured.slug}`}
                className="group block mb-10 bg-white border border-[#D8E1E9] rounded-2xl overflow-hidden hover:border-[#5CA4D6]/50 hover:shadow-lg transition-all duration-300">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[16/9] md:aspect-auto bg-[#EBF4FB]">
                    {featured.coverImage && (
                      <Image
                        src={featured.coverImage.startsWith('http') ? featured.coverImage : `https://terasun-europe.eu${featured.coverImage}`}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-none" />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-[10px] font-bold tracking-widest text-[#245A85] uppercase mb-3">Featured</span>
                    {featured.tags && (
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {featured.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] font-bold tracking-wider text-[#245A85] uppercase border border-[#245A85]/25 bg-[#EBF4FB] rounded px-2 py-0.5">{tag}</span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-xl md:text-2xl font-black text-[#132238] leading-tight mb-3 group-hover:text-[#245A85] transition-colors">{featured.title}</h2>
                    <p className="text-[#4A5B6D] text-sm leading-relaxed mb-4">{featured.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8B9AAD]">{new Date(featured.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="text-sm font-semibold text-[#245A85] group-hover:translate-x-1 transition-transform inline-block">Read article →</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest of posts */}
            {rest.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}
                    className="group flex flex-col bg-white border border-[#D8E1E9] rounded-xl overflow-hidden hover:border-[#5CA4D6]/50 hover:shadow-md transition-all duration-200">
                    {post.coverImage && (
                      <div className="relative aspect-[16/9] bg-[#EBF4FB] shrink-0">
                        <Image
                          src={post.coverImage.startsWith('http') ? post.coverImage : `https://terasun-europe.eu${post.coverImage}`}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2 mb-3 flex-wrap">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] font-bold tracking-wider text-[#245A85] uppercase border border-[#245A85]/25 bg-[#EBF4FB] rounded px-2 py-0.5">{tag}</span>
                          ))}
                        </div>
                      )}
                      <h2 className="font-bold text-[#132238] text-base leading-snug mb-2 group-hover:text-[#245A85] transition-colors flex-1">{post.title}</h2>
                      <p className="text-[#4A5B6D] text-sm leading-relaxed line-clamp-2 mb-4">{post.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#EDF2F7]">
                        <span className="text-xs text-[#8B9AAD]">{new Date(post.publishedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                        <span className="text-xs font-semibold text-[#245A85]">Read →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Topic navigator */}
        <div className="mt-16 pt-10 border-t border-[#D8E1E9]">
          <p className="text-[10px] font-bold tracking-widest text-[#245A85] uppercase mb-5">Browse by topic</p>
          <div className="flex flex-wrap gap-3">
            {['Fire protection', 'Wet rooms', 'Facade systems', 'CE certification', 'Underfloor heating', 'Technical comparison', 'Specifiers guide'].map(topic => (
              <span key={topic} className="text-sm bg-[#F4F7FA] border border-[#D8E1E9] text-[#4A5B6D] px-4 py-2 rounded-full cursor-default hover:border-[#5CA4D6]/50 hover:bg-[#EBF4FB] transition-colors">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
