import { getTranslations, setRequestLocale} from 'next-intl/server'
import { SITE_URL, DOWNLOAD_BASE } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import { products } from '@/data/products'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.downloads' })
  const url = `${SITE_URL}/${locale}/downloads`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/downloads`]))
  hreflang['x-default'] = `${SITE_URL}/en/downloads`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function DownloadsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'downloads' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })

  const docIcons: Record<string, string> = {
    pdf: '📄', xls: '📊', dwg: '📐', zip: '📦', default: '📋',
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('downloads'), url: `${SITE_URL}/${locale}/downloads` },
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

        {/* Login note */}
        <div className="rounded-xl border border-[#D8E1E9] bg-accent/5 p-5 mb-10 flex items-start gap-4">
          <span className="text-2xl">🔐</span>
          <div>
            <p className="text-white text-sm font-semibold mb-1">{t('authNote.title')}</p>
            <p className="text-[#4A5B6D] text-sm">{t('authNote.text')}</p>
          </div>
        </div>

        {/* Document list */}
        <div className="space-y-3">
          {products.downloadDocs.map(doc => {
            const ext = doc.slug.split('.').pop() ?? 'default'
            const icon = docIcons[ext] ?? docIcons.default
            return (
              <div key={doc.slug} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-[#D8E1E9] bg-white hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">{t(`docs.${doc.key}.name`)}</p>
                    <p className="text-[#6B7A8D] text-xs">{t(`docs.${doc.key}.desc`)} · {doc.size}</p>
                  </div>
                </div>
                <a
                  href={`${DOWNLOAD_BASE}/${doc.slug}`}
                  className="shrink-0 btn-secondary text-xs py-1.5 px-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download ↗
                </a>
              </div>
            )
          })}
        </div>

        <p className="text-xs text-gray-500 mt-8 text-center">
          Some documents require partner registration. Access is granted after account approval.
        </p>
        </div>
      </section>
    </>
  )
}
