import { getTranslations, setRequestLocale} from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL, CONTACT } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import { countries } from '@/data/countries'
import JsonLd from '@/components/seo/JsonLd'
import { organizationSchema, breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.distributors' })
  const url = `${SITE_URL}/${locale}/distributors`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/distributors`]))
  hreflang['x-default'] = `${SITE_URL}/en/distributors`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function DistributorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'distributors' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  const statusColor = { hq: 'border-accent text-accent', active: 'border-green-600 text-green-400', open: 'border-blue-600 text-blue-400', available: 'border-[#D8E1E9] text-gray-500' }

  return (
    <>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('distributors'), url: `${SITE_URL}/${locale}/distributors` },
      ])} />

      <div className="page-hero">
        <div className="container-page">
          <p className="stag">{t('eyebrow')}</p>
          <h1 className="stitle-xl">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>
      </div>

      <section className="section-alt py-16">
        <div className="container-page">

        {/* Partnership benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {['margin', 'support', 'training', 'territory'].map(key => (
            <div key={key} className="card-gold p-5">
              <div className="text-2xl mb-3">{t(`benefits.${key}.icon`)}</div>
              <h3 className="font-bold text-[#132238] text-sm mb-2">{t(`benefits.${key}.title`)}</h3>
              <p className="text-[#4A5B6D] text-xs leading-relaxed">{t(`benefits.${key}.body`)}</p>
            </div>
          ))}
        </div>

        {/* Country grid */}
        <h2 className="text-xl font-bold text-[#132238] mb-6">{t('mapTitle')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
          {countries.map(country => (
            <Link
              key={country.slug}
              href={navHref(`/markets/${country.slug}`)}
              className={`flex items-center gap-2 p-3 rounded-lg border bg-white hover:bg-[#EBF4FB] transition-colors ${statusColor[country.status]}`}
            >
              <span className="text-lg">{country.flag}</span>
              <div>
                <p className="text-xs font-semibold text-[#132238]">{country.name}</p>
                <p className={`text-xs ${statusColor[country.status].split(' ')[1]}`}>{t(`status.${country.status}`)}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Apply CTA */}
        <div className="rounded-2xl border border-[#D8E1E9] bg-accent/5 p-8 md:p-10 text-center">
          <h2 className="text-2xl font-bold text-[#132238] mb-3">{t('ctaTitle')}</h2>
          <p className="text-[#132238] text-sm mb-6 max-w-xl mx-auto">{t('ctaText')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={navHref('/contact')} className="btn-primary px-8 py-3">{t('ctaApply')}</Link>
            <a href={`mailto:${CONTACT.email}`} className="btn-secondary px-8 py-3">{t('ctaEmail')}</a>
          </div>
        </div>
        </div>
      </section>
    </>
  )
}
