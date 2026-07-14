import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import { products } from '@/data/products'
import JsonLd from '@/components/seo/JsonLd'
import { productSchema, breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.technicalData' })
  const url = `${SITE_URL}/${locale}/technical-data`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/technical-data`]))
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function TechnicalDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'products' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={productSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('technicalData'), url: `${SITE_URL}/${locale}/technical-data` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{t('techEyebrow')}</p>
          <h1 className="stitle">{t('techH1')}</h1>
          <p className="ssub max-w-2xl">{t('techSub')}</p>
        </div>

        {/* Full spec table */}
        <div className="overflow-x-auto mb-16">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-border">
                <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Property</th>
                <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Value</th>
                <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Standard</th>
              </tr>
            </thead>
            <tbody>
              {products.technicalSpecs.map((spec, i) => (
                <tr key={spec.key} className={`border-b border-border ${i % 2 === 0 ? '' : 'bg-card/40'}`}>
                  <td className="py-3 px-4 text-gray-300 font-medium">{t(`specs.${spec.key}`)}</td>
                  <td className="py-3 px-4 text-white font-bold">{spec.value}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{spec.standard ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Thickness comparison */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">{t('thicknessTitle')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold-border">
                  <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Thickness</th>
                  <th className="text-right py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Weight kg/m²</th>
                  <th className="text-right py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Boards/pallet</th>
                  <th className="text-right py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">m²/pallet</th>
                </tr>
              </thead>
              <tbody>
                {products.thicknesses.map((th, i) => (
                  <tr key={th} className={`border-b border-border ${i % 2 === 0 ? '' : 'bg-card/40'}`}>
                    <td className="py-3 px-4 text-white font-bold">{th} mm</td>
                    <td className="py-3 px-4 text-gray-300 text-right">{(th * 1.4).toFixed(1)}</td>
                    <td className="py-3 px-4 text-gray-300 text-right">{Math.round(2000 / (th * 1.4 * 2.88))}</td>
                    <td className="py-3 px-4 text-gray-300 text-right">{(Math.round(2000 / (th * 1.4 * 2.88)) * 2.88).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={navHref('/downloads')} className="btn-primary px-8 py-3">Download technical datasheet</Link>
          <Link href={navHref('/certifications')} className="btn-secondary px-8 py-3">View certifications</Link>
        </div>
      </section>
    </>
  )
}
