import { getTranslations, setRequestLocale} from 'next-intl/server'
import Image from 'next/image'
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
  const t = await getTranslations({ locale, namespace: 'meta.products' })
  const url = `${SITE_URL}/${locale}/products`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/products`]))
  hreflang['x-default'] = `${SITE_URL}/en/products`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'products' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={productSchema(locale)} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('products'), url: `${SITE_URL}/${locale}/products` },
      ])} />

      {/* Page hero band */}
      <div className="page-hero">
        <div className="container-page">
          <p className="stag">{t('eyebrow')}</p>
          <h1 className="stitle-xl">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>
      </div>

      {/* Hero split — image + key specs */}
      <section className="section-light py-16 lg:py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-xl">
              <Image
                src="https://terasun-europe.eu/imgs/products/product1.jpeg"
                alt="Terasun TSM fiber cement board"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">{t('name')}</h2>
              <p className="text-accent font-semibold text-sm mb-5">{t('tagline')}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">{t('desc')}</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {products.technicalSpecs.slice(0, 6).map(spec => (
                  <div key={spec.key} className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                    <p className="text-slate-500 text-xs mb-0.5">{t(`specs.${spec.key}`)}</p>
                    <p className="text-slate-900 text-sm font-bold">{spec.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link href={navHref('/technical-data')} className="btn-primary">Full specifications</Link>
                <Link href={navHref('/contact')} className="btn-secondary">Request quotation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thicknesses */}
      <section className="section-alt py-14">
        <div className="container-page">
          <div className="rule" />
          <h2 className="stitle">{t('thicknessTitle')}</h2>
          <p className="text-gray-500 text-sm mb-6">{t('thicknessNote')}</p>
          <div className="flex flex-wrap gap-3">
            {products.thicknessesAll.map(th => {
              const isPrimary = th === products.primaryThickness
              return (
                <div key={th} className={`text-sm font-bold rounded-lg px-5 py-2.5 border ${
                  isPrimary
                    ? 'bg-accent/10 border-accent/40 text-accent'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  {th} mm{isPrimary && <span className="ml-1.5 text-[10px] font-black text-accent">★ CE</span>}
                </div>
              )
            })}
          </div>
          <p className="text-xs text-slate-400 mt-4">★ Primary documented thickness — CE marked, ETA 24/0895, EPD declared weight 9.96 kg/m².</p>
        </div>
      </section>

      {/* Board formats */}
      <section className="section-light py-14">
        <div className="container-page">
          <div className="rule" />
          <h2 className="stitle">{t('formatsTitle')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.boardFormats.map(fmt => (
              <div key={fmt.size} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-slate-800 font-bold text-sm mb-1">{fmt.size}</p>
                {fmt.note && <p className="text-slate-400 text-xs">{fmt.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Composition */}
      <section className="section-alt py-14">
        <div className="container-page max-w-3xl">
          <div className="rule" />
          <h2 className="stitle">{t('compositionTitle')}</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-gray-600 text-sm leading-relaxed">{products.compositionFull}</p>
          </div>
        </div>
      </section>

      {/* Image gallery */}
      <section className="section-light py-14">
        <div className="container-page">
          <div className="rule" />
          <h2 className="stitle">{t('galleryTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-sm card-lift">
                <Image
                  src={`https://terasun-europe.eu/imgs/products/product${n}.jpeg`}
                  alt={`Terasun fiber cement board ${n}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-16">
        <div className="container-page text-center">
          <p className="stag">Get Started</p>
          <h2 className="stitle-xl max-w-2xl mx-auto">Ready to specify TSM board?</h2>
          <p className="ssub mx-auto text-center">Request samples, technical data sheets, or a project quotation.</p>
          <Link href={navHref('/contact')} className="btn-primary px-8 py-3">Request quotation</Link>
        </div>
      </section>
    </>
  )
}
