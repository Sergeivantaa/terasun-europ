import { getTranslations, setRequestLocale} from 'next-intl/server'
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
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.certifications' })
  const url = `${SITE_URL}/${locale}/certifications`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/certifications`]))
  hreflang['x-default'] = `${SITE_URL}/en/certifications`
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
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={productSchema(locale)} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('certifications'), url: `${SITE_URL}/${locale}/certifications` },
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {certifications.map(cert => (
              <div key={cert.key} className="bg-white border border-[#D8E1E9] rounded-2xl p-6 flex flex-col gap-4 shadow-sm card-lift">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {cert.icon}
                  </div>
                  {cert.priority && (
                    <span className="cert-badge-light">{t(`${cert.key}.badge`)}</span>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-[#132238] text-lg mb-1">{t(`${cert.key}.label`)}</h2>
                  <p className="text-[#245A85] text-sm font-mono font-semibold mb-3">{cert.ref}</p>
                  <p className="text-[#4A5B6D] text-sm leading-relaxed">{t(`${cert.key}.desc`)}</p>
                </div>
                {cert.downloadSlug && (
                  <a
                    href={`${DOWNLOAD_BASE}/${cert.downloadSlug}`}
                    className="mt-auto btn-outline-accent text-xs py-2 px-4 self-start"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download ↗
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Declaration of Performance */}
          <div className="rounded-2xl bg-[#0F2742] p-8 md:p-10 mb-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-3 text-[#5CA4D6]">{t('dop.eyebrow')}</p>
              <h2 className="text-2xl font-bold text-white mb-3">{t('dop.title')}</h2>
              <p className="text-[#B8CADE] text-sm leading-relaxed mb-6">{t('dop.text')}</p>
              <a href={navHref('/downloads')} className="btn-primary">{t('dop.cta')}</a>
            </div>
          </div>

          {/* Not manufacturer note */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-800 text-center">
            Terasun Europe is the Authorised European Representative for Zhejiang Terasun Air Duct Co., Ltd. Terasun Europe is not the manufacturer of Terasun products.
          </div>
        </div>
      </section>
    </>
  )
}
