import { getTranslations, setRequestLocale } from 'next-intl/server'
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
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.technicalData' })
  const url = `${SITE_URL}/${locale}/technical-data`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/technical-data`]))
  hreflang['x-default'] = `${SITE_URL}/en/technical-data`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function TechnicalDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'products' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={productSchema(locale)} />
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

        {/* Certified properties table */}
        <div className="overflow-x-auto mb-16">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/40">
                <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Property</th>
                <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Value</th>
                <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Standard / Reference</th>
              </tr>
            </thead>
            <tbody>
              {products.technicalSpecs.map((spec, i) => (
                <tr key={spec.key} className={`border-b border-border ${i % 2 !== 0 ? 'bg-card/40' : ''}`}>
                  <td className="py-3 px-4 text-gray-300 font-medium">{t(`specs.${spec.key}`)}</td>
                  <td className="py-3 px-4 text-white font-bold">{spec.value}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">
                    <span>{spec.standard ?? '—'}</span>
                    {spec.note && <span className="block text-gray-600 mt-0.5">{spec.note}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Thickness range */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-3">{t('thicknessTitle')}</h2>
          <p className="text-gray-400 text-sm mb-6">{t('thicknessNote')}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/40">
                  <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Thickness</th>
                  <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Declared weight</th>
                  <th className="text-left py-3 px-4 text-gold text-xs font-bold uppercase tracking-wider">Availability / data</th>
                </tr>
              </thead>
              <tbody>
                {products.thicknessesAll.map((th, i) => {
                  const isPrimary = th === products.primaryThickness
                  return (
                    <tr key={th} className={`border-b border-border ${i % 2 !== 0 ? 'bg-card/40' : ''} ${isPrimary ? 'ring-1 ring-inset ring-gold/20' : ''}`}>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${isPrimary ? 'text-gold2' : 'text-white'}`}>{th} mm</span>
                        {isPrimary && (
                          <span className="ml-2 text-[10px] font-bold tracking-wider text-gold bg-gold/10 border border-gold/30 rounded px-1.5 py-0.5 uppercase">Primary</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {isPrimary
                          ? <span className="font-bold text-white">{products.primaryWeightKgM2} kg/m²</span>
                          : <span className="text-gray-500 text-xs italic">On request</span>
                        }
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-500">
                        {isPrimary
                          ? 'CE marked · ETA 24/0895 · EPD-IES-0018268 · Fire tested'
                          : 'Available — technical data on request'
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-600 mt-4">
            The E 120 / EI 90 / EW 120 fire classification applies to the tested wall assembly using 12 mm TSM boards only (test report FIRES-CR-284-25-AUPE).
            CE marking, ETA 24/0895 and EPD-IES-0018268 reference the 12 mm × 1200 mm × 2400 mm board.
            For all other thicknesses, contact us for technical data.
          </p>
        </div>

        {/* Composition note */}
        <div className="rounded-xl border border-border bg-card p-6 mb-12">
          <h2 className="text-base font-bold text-white mb-2">{t('compositionTitle')}</h2>
          <p className="text-gray-300 text-sm leading-relaxed">{products.compositionFull}</p>
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={navHref('/downloads')} className="btn-primary px-8 py-3">Download technical datasheet</Link>
          <Link href={navHref('/certifications')} className="btn-secondary px-8 py-3">View certifications</Link>
          <Link href={navHref('/contact')} className="btn-secondary px-8 py-3">Request data for other thicknesses</Link>
        </div>
      </section>
    </>
  )
}
