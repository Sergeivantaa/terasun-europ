import { getTranslations, setRequestLocale} from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import { countries } from '@/data/countries'
import JsonLd from '@/components/seo/JsonLd'
import { localBusinessSchema, breadcrumbSchema, productSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.flatMap(locale =>
    countries.map(c => ({ locale, country: c.slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale, country } = await params
  setRequestLocale(locale)
  const c = countries.find(x => x.slug === country)
  if (!c) return notFound()
  const t = await getTranslations({ locale, namespace: 'markets' })
  const url = `${SITE_URL}/${locale}/markets/${country}`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/markets/${country}`]))
  hreflang['x-default'] = `${SITE_URL}/en/markets/${country}`
  return {
    title: t(`${country}.metaTitle`),
    description: t(`${country}.metaDesc`),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t(`${country}.metaTitle`), description: t(`${country}.metaDesc`), url, type: 'website' },
  }
}

export default async function MarketPage({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale, country } = await params
  const c = countries.find(x => x.slug === country)
  if (!c) notFound()

  const t = await getTranslations({ locale, namespace: 'markets' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={localBusinessSchema(c.name, c.slug, locale)} />
      <JsonLd data={productSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('markets'), url: `${SITE_URL}/${locale}/distributors` },
        { name: c.name, url: `${SITE_URL}/${locale}/markets/${country}` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{c.flag}</span>
            <span className="text-accent text-xs font-bold tracking-widest uppercase">{t('eyebrow')}</span>
          </div>
          <h1 className="stitle">{t(`${country}.h1`)}</h1>
          <p className="ssub max-w-2xl">{t(`${country}.lead`)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <p className="text-gray-300 text-base leading-relaxed mb-4">{t(`${country}.body1`)}</p>
            <p className="text-[#4A5B6D] text-sm leading-relaxed mb-6">{t(`${country}.body2`)}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {['certifications', 'delivery', 'support', 'partner'].map(key => (
                <div key={key} className="card-gold p-4">
                  <h3 className="text-[#132238] font-semibold text-sm mb-1">{t(`country_features.${key}.title`)}</h3>
                  <p className="text-[#4A5B6D] text-xs">{t(`country_features.${key}.body`)}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={navHref('/contact')} className="btn-primary px-6 py-2.5 text-sm">
                {t('ctaQuote')} — {c.name}
              </Link>
              <Link href={navHref('/distributors')} className="btn-secondary px-6 py-2.5 text-sm">
                {t('ctaPartner')}
              </Link>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="card-gold p-6">
              <h3 className="font-bold text-[#132238] mb-4">{t('marketInfo')}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Country</span>
                  <span className="text-[#132238] font-medium">{c.flag} {c.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={c.status === 'active' ? 'text-green-400' : c.status === 'open' ? 'text-blue-400' : 'text-accent'}>{c.status}</span>
                </div>
                {c.port && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Main port</span>
                    <span className="text-white">{c.port}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Other markets */}
            <div className="card-gold p-4">
              <h3 className="font-bold text-[#132238] text-sm mb-3">Other markets</h3>
              <div className="grid grid-cols-2 gap-2">
                {countries.filter(x => x.slug !== country).slice(0, 6).map(other => (
                  <Link key={other.slug} href={navHref(`/markets/${other.slug}`)} className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                    <span>{other.flag}</span>
                    <span>{other.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
