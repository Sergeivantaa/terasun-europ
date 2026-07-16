import { getTranslations, setRequestLocale} from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.logistics' })
  const url = `${SITE_URL}/${locale}/logistics`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/logistics`]))
  hreflang['x-default'] = `${SITE_URL}/en/logistics`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function LogisticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'logistics' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  const steps = ['order', 'production', 'quality', 'shipping', 'customs', 'delivery']

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('logistics'), url: `${SITE_URL}/${locale}/logistics` },
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

        {/* Supply chain steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <div key={step} className="card-gold p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-accent/20 border border-[#D8E1E9] flex items-center justify-center text-accent font-bold text-sm shrink-0">
                  {i + 1}
                </span>
                <h3 className="font-bold text-white">{t(`steps.${step}.title`)}</h3>
              </div>
              <p className="text-[#4A5B6D] text-sm leading-relaxed">{t(`steps.${step}.body`)}</p>
            </div>
          ))}
        </div>

        {/* Lead times */}
        <div className="rounded-2xl border border-[#D8E1E9] bg-white p-8 mb-12">
          <h2 className="text-xl font-bold text-[#132238] mb-6">{t('leadTimesTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {['stock', 'production', 'custom'].map(lt => (
              <div key={lt} className="text-center">
                <p className="text-3xl font-black text-sky mb-1">{t(`leadTimes.${lt}.value`)}</p>
                <p className="text-white text-sm font-semibold mb-1">{t(`leadTimes.${lt}.label`)}</p>
                <p className="text-[#4A5B6D] text-xs">{t(`leadTimes.${lt}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Incoterms */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#132238] mb-4">{t('incotermsTitle')}</h2>
          <div className="flex flex-wrap gap-3">
            {['EXW', 'FOB', 'CFR', 'CIF', 'DAP', 'DDP'].map(term => (
              <span key={term} className="cert-badge text-sm px-4 py-1.5">{term}</span>
            ))}
          </div>
          <p className="text-[#4A5B6D] text-sm mt-3">{t('incotermsNote')}</p>
        </div>

        <div className="text-center">
          <Link href={navHref('/contact')} className="btn-primary px-8 py-3">Request freight quotation</Link>
        </div>
        </div>
      </section>
    </>
  )
}
