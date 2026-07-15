import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL, MANUFACTURER } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { organizationSchema, breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.manufacturer' })
  const url = `${SITE_URL}/${locale}/manufacturer`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/manufacturer`]))
  hreflang['x-default'] = `${SITE_URL}/en/manufacturer`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function ManufacturerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'manufacturer' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  const timeline = ['founded', 'iso', 'expansion', 'europe', 'eta', 'epd']

  return (
    <>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('manufacturer'), url: `${SITE_URL}/${locale}/manufacturer` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{t('eyebrow')}</p>
          <h1 className="stitle">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>

        {/* Manufacturer hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-card">
            <Image
              src="https://terasun-europe.eu/imgs/manufacturer/factory.jpg"
              alt="Zhejiang Terasun Air Duct Co., Ltd. factory in China"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-gray-400 mb-5">
              🏭 {MANUFACTURER.address}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{MANUFACTURER.name}</h2>
            <a href={MANUFACTURER.website} target="_blank" rel="noopener noreferrer" className="text-gold text-sm hover:text-gold2 transition-colors block mb-4">{MANUFACTURER.website} ↗</a>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{t('desc1')}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{t('desc2')}</p>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {['capacity', 'employees', 'countries', 'patents'].map(stat => (
            <div key={stat} className="card-gold p-5 text-center">
              <p className="text-2xl font-black text-gold2 mb-1">{t(`stats.${stat}.value`)}</p>
              <p className="text-gray-400 text-xs">{t(`stats.${stat}.label`)}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-8">{t('timelineTitle')}</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {timeline.map(key => (
                <div key={key} className="flex gap-6 items-start">
                  <div className="relative z-10 w-8 h-8 shrink-0 rounded-full bg-gold/20 border border-gold-border flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                  <div className="pb-2">
                    <p className="text-gold text-xs font-bold mb-1">{t(`timeline.${key}.year`)}</p>
                    <h3 className="text-white font-semibold text-sm mb-1">{t(`timeline.${key}.title`)}</h3>
                    <p className="text-gray-400 text-sm">{t(`timeline.${key}.body`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dark box — important note */}
        <div className="rounded-2xl bg-darker border border-border p-8 md:p-10 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">{t('noteTitle')}</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">{t('noteText')}</p>
          <p className="text-xs text-gray-500">Terasun Europe is not the manufacturer of Terasun products.</p>
        </div>

        <div className="text-center">
          <Link href={navHref('/certifications')} className="btn-primary px-8 py-3">View certifications</Link>
        </div>
      </section>
    </>
  )
}
