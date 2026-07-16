import { getTranslations, setRequestLocale} from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL, DOWNLOAD_BASE } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.installation' })
  const url = `${SITE_URL}/${locale}/installation`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/installation`]))
  hreflang['x-default'] = `${SITE_URL}/en/installation`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function InstallationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'installation' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  const features = ['tools', 'cutting', 'fastening', 'joints', 'weather', 'finishing']

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('installation'), url: `${SITE_URL}/${locale}/installation` },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map(feat => (
            <div key={feat} className="card-gold p-6">
              <div className="text-3xl mb-3">{t(`features.${feat}.icon`)}</div>
              <h3 className="font-bold text-[#132238] mb-2">{t(`features.${feat}.title`)}</h3>
              <p className="text-[#4A5B6D] text-sm leading-relaxed">{t(`features.${feat}.body`)}</p>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="rounded-2xl border border-[#D8E1E9] bg-accent/5 p-8 md:p-10 mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#132238] mb-2">{t('downloadTitle')}</h2>
            <p className="text-[#132238] text-sm">{t('downloadText')}</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href={`${DOWNLOAD_BASE}/installation-guide`} className="btn-primary text-sm py-2.5 px-5" target="_blank" rel="noopener noreferrer">
              Download guide ↗
            </a>
            <Link href={navHref('/contact')} className="btn-secondary text-sm py-2.5 px-5">
              Technical support
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  )
}
