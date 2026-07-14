import { getTranslations } from 'next-intl/server'
import { SITE_URL, DOWNLOAD_BASE } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import { certifications } from '@/data/certifications'
import JsonLd from '@/components/seo/JsonLd'
import { organizationSchema, productSchema, breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.certifications' })
  const url = `${SITE_URL}/${locale}/certifications`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/certifications`]))
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function CertificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'certifications' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={productSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('certifications'), url: `${SITE_URL}/${locale}/certifications` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{t('eyebrow')}</p>
          <h1 className="stitle">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {certifications.map(cert => (
            <div key={cert.key} className="card-gold p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-3xl">{cert.icon}</div>
                {cert.priority && (
                  <span className="cert-badge">{t(`${cert.key}.badge`)}</span>
                )}
              </div>
              <div>
                <h2 className="font-bold text-white text-lg mb-1">{t(`${cert.key}.label`)}</h2>
                <p className="text-gold2 text-sm font-mono mb-3">{cert.ref}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`${cert.key}.desc`)}</p>
              </div>
              {cert.downloadSlug && (
                <a
                  href={`${DOWNLOAD_BASE}/${cert.downloadSlug}`}
                  className="mt-auto btn-secondary text-xs py-2 px-4 self-start"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download certificate ↗
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Declaration of Performance */}
        <div className="rounded-2xl border border-gold-border bg-gold/5 p-8 md:p-10 mb-12">
          <div className="max-w-3xl">
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">{t('dop.eyebrow')}</p>
            <h2 className="text-2xl font-bold text-white mb-3">{t('dop.title')}</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{t('dop.text')}</p>
            <a href={navHref('/downloads')} className="btn-primary text-sm py-2.5 px-6">{t('dop.cta')}</a>
          </div>
        </div>

        {/* Not manufacturer note */}
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-gray-400 text-center">
          Terasun Europe is the Authorised European Representative for Zhejiang Terasun Air Duct Co., Ltd. Terasun Europe is not the manufacturer of Terasun products.
        </div>
      </section>
    </>
  )
}
