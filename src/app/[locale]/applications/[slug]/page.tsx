import { getTranslations, setRequestLocale} from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import { applications } from '@/data/applications'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.flatMap(locale =>
    applications.map(app => ({ locale, slug: app.slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  if (!applications.find(a => a.slug === slug)) return notFound()
  const t = await getTranslations({ locale, namespace: 'applications' })
  const url = `${SITE_URL}/${locale}/applications/${slug}`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/applications/${slug}`]))
  hreflang['x-default'] = `${SITE_URL}/en/applications/${slug}`
  return {
    title: t(`${slug}.metaTitle`),
    description: t(`${slug}.metaDesc`),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t(`${slug}.metaTitle`), description: t(`${slug}.metaDesc`), url, type: 'website' },
  }
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const app = applications.find(a => a.slug === slug)
  if (!app) notFound()

  const t = await getTranslations({ locale, namespace: 'applications' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('applications'), url: `${SITE_URL}/${locale}/applications` },
        { name: t(`${slug}.title`), url: `${SITE_URL}/${locale}/applications/${slug}` },
      ])} />

      <section className="container-page py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-8 flex gap-2 items-center flex-wrap">
          <Link href={navHref('')} className="hover:text-[#132238] transition-colors">{bc('home')}</Link>
          <span>/</span>
          <Link href={navHref('/applications')} className="hover:text-[#132238] transition-colors">{bc('applications')}</Link>
          <span>/</span>
          <span className="text-[#132238]">{t(`${slug}.title`)}</span>
        </nav>

        <div className="stag mb-12">
          <div className="text-5xl mb-4">{app.icon}</div>
          <h1 className="stitle">{t(`${slug}.h1`)}</h1>
          <p className="ssub max-w-2xl">{t(`${slug}.lead`)}</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-[#4A5B6D] text-base leading-relaxed">{t(`${slug}.body1`)}</p>
            <p className="text-[#4A5B6D] text-sm leading-relaxed">{t(`${slug}.body2`)}</p>

            {/* Features */}
            <div>
              <h2 className="text-lg font-bold text-[#132238] mb-4">{t(`${slug}.featuresTitle`)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1,2,3,4,5,6].map(n => (
                  <div key={n} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <span className="text-accent font-bold text-sm mt-0.5">✓</span>
                    <p className="text-sm text-[#4A5B6D]">{t(`${slug}.feature${n}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card-gold p-6">
              <h3 className="font-bold text-[#132238] mb-4">{t('sidebarSpecs')}</h3>
              <div className="space-y-3">
                {app.tags.map(tag => (
                  <div key={tag} className="flex justify-between text-sm border-b border-[#D8E1E9] pb-2">
                    <span className="text-[#6B7A8D] text-xs">{t(`tags.${tag}`)}</span>
                    <span className="text-[#132238] font-medium">{t(`${slug}.spec_${tag}`)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-gold p-6">
              <h3 className="font-bold text-[#132238] mb-3">{t('sidebarQuote')}</h3>
              <p className="text-[#4A5B6D] text-xs mb-4">{t('sidebarQuoteDesc')}</p>
              <Link href={navHref('/contact')} className="btn-primary text-sm py-2 px-4 w-full text-center block">Request quotation</Link>
            </div>
          </aside>
        </div>

        {/* Image gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[1,2,3].map(n => (
            <div key={n} className="relative aspect-video rounded-xl overflow-hidden bg-card">
              <Image
                src={`https://terasun-europe.eu/imgs/applications/${slug}-${n}.jpg`}
                alt={`${t(`${slug}.title`)} example ${n}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Related applications */}
        <div>
          <h2 className="text-lg font-bold text-[#132238] mb-6">{t('otherApps')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {applications.filter(a => a.slug !== slug).slice(0, 3).map(other => (
              <Link key={other.slug} href={navHref(`/applications/${other.slug}`)} className="card-gold p-4 flex items-center gap-3 hover:border-accent/60 transition-colors group">
                <span className="text-2xl">{other.icon}</span>
                <span className="text-sm text-[#4A5B6D] group-hover:text-[#132238] transition-colors font-medium">{t(`${other.slug}.title`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
