import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import DownloadCentre from '@/components/sections/DownloadCentre'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const url = `${SITE_URL}/${locale}/downloads`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/downloads`]))
  hreflang['x-default'] = `${SITE_URL}/en/downloads`
  return {
    title: 'Download Centre — Fiber Cement Board Technical Documents | Terasun',
    description: 'Download installation manuals, system guides, fire test reports, CE certificate, ETA 24/0895, EPD and CAD drawings for Terasun TSM fiber cement board.',
    alternates: { canonical: url, languages: hreflang },
    openGraph: {
      title: 'Download Centre — Terasun Fiber Cement Board Technical Documents',
      description: 'Free downloads: installation manual, CE certificate, ETA 24/0895, EPD. Partner login for system guides and fire test reports.',
      url, type: 'website',
    },
    keywords: 'fiber cement board download, cement board installation manual, ETA 24/0895 download, CE certificate cement board, fire test report download, EPD fiber cement board',
  }
}

export default async function DownloadsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('downloads'), url: `${SITE_URL}/${locale}/downloads` },
      ])} />

      <div className="page-hero">
        <div className="container-page">
          <p className="stag">Technical library</p>
          <h1 className="stitle-xl">Download Centre</h1>
          <p className="ssub max-w-2xl">
            Installation manuals, system guides, fire test reports, certifications, CAD drawings, and environmental declarations for Terasun TSM fiber cement board.
          </p>
        </div>
      </div>

      <DownloadCentre />
    </>
  )
}
