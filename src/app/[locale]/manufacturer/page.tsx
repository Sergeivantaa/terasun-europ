import { getTranslations, setRequestLocale} from 'next-intl/server'
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
  setRequestLocale(locale)
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

      <div className="page-hero">
        <div className="container-page">
          <p className="stag">{t('eyebrow')}</p>
          <h1 className="stitle-xl">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>
      </div>

      {/* Manufacturer hero — light section */}
      <section className="section-light py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 shadow-md">
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
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E1E9] bg-[#EBF4FB] px-4 py-1.5 text-xs text-[#245A85] mb-5 font-medium">
                🏭 {MANUFACTURER.address}
              </div>
              <h2 className="text-2xl font-bold text-[#132238] mb-2">{MANUFACTURER.name}</h2>
              <a href={MANUFACTURER.website} target="_blank" rel="noopener noreferrer" className="text-[#245A85] text-sm hover:text-[#1A4470] transition-colors block mb-4 font-medium">{MANUFACTURER.website} ↗</a>
              <p className="text-[#132238] text-sm leading-relaxed mb-4">{t('desc1')}</p>
              <p className="text-[#4A5B6D] text-sm leading-relaxed">{t('desc2')}</p>
            </div>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {['capacity', 'employees', 'countries', 'patents'].map(stat => (
              <div key={stat} className="bg-white border border-[#D8E1E9] rounded-xl p-5 text-center shadow-sm">
                <p className="text-2xl font-black text-[#245A85] mb-1">{t(`stats.${stat}.value`)}</p>
                <p className="text-[#4A5B6D] text-xs">{t(`stats.${stat}.label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — dark navy section */}
      <section className="section-dark py-16">
        <div className="container-page">
          <h2 className="text-xl font-bold text-white mb-10">{t('timelineTitle')}</h2>
          <div className="relative max-w-2xl">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-6">
              {timeline.map(key => (
                <div key={key} className="flex gap-6 items-start">
                  <div className="relative z-10 w-8 h-8 shrink-0 rounded-full bg-[#245A85]/30 border border-[#5CA4D6]/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#5CA4D6]" />
                  </div>
                  <div className="pb-2">
                    <p className="text-[#5CA4D6] text-xs font-bold mb-1">{t(`timeline.${key}.year`)}</p>
                    <h3 className="text-white font-semibold text-sm mb-1">{t(`timeline.${key}.title`)}</h3>
                    <p className="text-[#B8CADE] text-sm">{t(`timeline.${key}.body`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important note */}
      <section className="section-alt py-12">
        <div className="container-page max-w-3xl">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 mb-8">
            <h2 className="text-base font-bold text-[#132238] mb-3">{t('noteTitle')}</h2>
            <p className="text-[#4A5B6D] text-sm leading-relaxed mb-2">{t('noteText')}</p>
            <p className="text-xs text-[#6B7A8D]">Terasun Europe is not the manufacturer of Terasun products.</p>
          </div>
          <div className="text-center">
            <Link href={navHref('/certifications')} className="btn-primary px-8 py-3">View certifications</Link>
          </div>
        </div>
      </section>
    </>
  )
}
