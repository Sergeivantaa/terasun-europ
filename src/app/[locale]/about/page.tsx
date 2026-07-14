import { getTranslations } from 'next-intl/server'
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
  const t = await getTranslations({ locale, namespace: 'meta.about' })
  const url = `${SITE_URL}/${locale}/about`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/about`]))
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
      <JsonLd data={organizationSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('about'), url: `${SITE_URL}/${locale}/about` },
      ])} />

      <section className="container-page py-12 md:py-16">
        {/* Header */}
        <div className="stag mb-16">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{t('eyebrow')}</p>
          <h1 className="stitle">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>

        {/* Who we are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-border bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold uppercase tracking-wider mb-6">
              {t('statusTitle')}
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-4">{t('statusText')}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{t('body')}</p>
            <div className="text-sm text-gray-400 space-y-1">
              <p>📍 {CONTACT.address}, {CONTACT.city}</p>
              <p>📧 <a href={`mailto:${CONTACT.email}`} className="text-gold2 hover:text-white transition-colors">{CONTACT.email}</a></p>
              <p>📞 <a href={`tel:${CONTACT.phone}`} className="hover:text-white transition-colors">{CONTACT.phoneDisplay}</a></p>
              <p>🏢 VAT: {CONTACT.vat}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {authCards.map(card => (
              <div key={card.key} className="card-gold p-5">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-white text-sm mb-2">{auth(`cards.${card.key}.title`)}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{auth(`cards.${card.key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Not manufacturer disclaimer */}
        <div className="rounded-2xl border border-yellow-700/40 bg-yellow-950/20 p-8 mb-12">
          <h2 className="text-lg font-bold text-yellow-300 mb-3">{t('disclaimerTitle')}</h2>
          <p className="text-yellow-200/80 text-sm leading-relaxed">{t('disclaimerText')}</p>
          <Link href={navHref('/manufacturer')} className="inline-block mt-4 text-sm text-yellow-300 hover:text-white underline">
            Learn about Zhejiang Terasun Air Duct Co., Ltd. →
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href={navHref('/contact')} className="btn-primary px-8 py-3">Contact us</Link>
        </div>
      </section>
    </>
  )
}
