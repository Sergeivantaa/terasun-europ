import { getTranslations, setRequestLocale} from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL, CONTACT } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { organizationSchema, breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.about' })
  const url = `${SITE_URL}/${locale}/about`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/about`]))
  hreflang['x-default'] = `${SITE_URL}/en/about`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  const auth = await getTranslations({ locale, namespace: 'authorised' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  const authCards = [
    { key: 'ce',   icon: '🏛️' },
    { key: 'rep',  icon: '🤝' },
    { key: 'docs', icon: '📋' },
    { key: 'mkt',  icon: '🌍' },
  ]

  return (
    <>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('about'), url: `${SITE_URL}/${locale}/about` },
      ])} />

      <div className="page-hero">
        <div className="container-page">
          <p className="stag">{t('eyebrow')}</p>
          <h1 className="stitle-xl">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>
      </div>

      <section className="section-light py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E1E9] bg-[#EBF4FB] px-4 py-1.5 text-xs font-bold text-[#245A85] uppercase tracking-wider mb-6">
                {t('statusTitle')}
              </div>
              <p className="text-[#132238] text-base leading-relaxed mb-4">{t('statusText')}</p>
              <p className="text-[#4A5B6D] text-sm leading-relaxed mb-6">{t('body')}</p>
              <div className="text-sm text-[#4A5B6D] space-y-2">
                <p>📍 {CONTACT.address}, {CONTACT.city}</p>
                <p>📧 <a href={`mailto:${CONTACT.email}`} className="text-[#245A85] hover:text-[#1A4470] transition-colors font-medium">{CONTACT.email}</a></p>
                <p>📞 <a href={`tel:${CONTACT.phone}`} className="text-[#132238] hover:text-[#245A85] transition-colors font-medium">{CONTACT.phoneDisplay}</a></p>
                <p>🏢 VAT: {CONTACT.vat}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {authCards.map(card => (
                <div key={card.key} className="bg-white border border-[#D8E1E9] rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF4FB] flex items-center justify-center text-xl mb-4">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-[#132238] text-sm mb-2">{auth(`cards.${card.key}.title`)}</h3>
                  <p className="text-[#4A5B6D] text-xs leading-relaxed">{auth(`cards.${card.key}.body`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Not manufacturer disclaimer */}
          <div className="rounded-2xl bg-[#0F2742] p-8 mb-12">
            <h2 className="text-lg font-bold text-white mb-3">{t('disclaimerTitle')}</h2>
            <p className="text-[#B8CADE] text-sm leading-relaxed mb-4">{t('disclaimerText')}</p>
            <Link href={navHref('/manufacturer')} className="inline-block text-sm text-[#5CA4D6] hover:text-white transition-colors underline">
              Learn about Zhejiang Terasun Air Duct Co., Ltd. →
            </Link>
          </div>

          <div className="text-center">
            <Link href={navHref('/contact')} className="btn-primary px-8 py-3">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
