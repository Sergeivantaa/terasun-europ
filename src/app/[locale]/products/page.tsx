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

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{t('eyebrow')}</p>
          <h1 className="stitle">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>

        {/* Hero product image + key specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-card">
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
            <h2 className="text-2xl font-bold text-white mb-2">{t('name')}</h2>
            <p className="text-gold text-sm font-semibold mb-4">{t('tagline')}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{t('desc')}</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {products.technicalSpecs.slice(0, 6).map(spec => (
                <div key={spec.key} className="rounded-lg bg-card border border-border p-3">
                  <p className="text-gray-500 text-xs mb-0.5">{t(`specs.${spec.key}`)}</p>
                  <p className="text-white text-sm font-bold">{spec.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link href={navHref('/technical-data')} className="btn-primary text-sm py-2.5 px-5">Full specifications</Link>
              <Link href={navHref('/contact')} className="btn-secondary text-sm py-2.5 px-5">Request quotation</Link>
            </div>
          </div>
        </div>

        {/* Thicknesses */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">{t('thicknessTitle')}</h2>
          <div className="flex flex-wrap gap-3">
            {products.thicknesses.map(th => (
              <div key={th} className="cert-badge text-base px-5 py-2">{th} mm</div>
            ))}
          </div>
        </div>

        {/* Board formats */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">{t('formatsTitle')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.boardFormats.map(fmt => (
              <div key={fmt.size} className="card-gold p-4 text-center">
                <p className="text-white font-bold text-sm mb-1">{fmt.size}</p>
                {fmt.note && <p className="text-gray-500 text-xs">{fmt.note}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Composition */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">{t('compositionTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.composition.map(c => (
              <div key={c.key} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                <span className="text-gold text-lg">•</span>
                <div>
                  <p className="text-white text-sm font-semibold">{t(`composition.${c.key}.name`)}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{t(`composition.${c.key}.detail`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image gallery */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">{t('galleryTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className="relative aspect-square rounded-xl overflow-hidden bg-card">
                <Image
                  src={`https://terasun-europe.eu/imgs/products/product${n}.jpeg`}
                  alt={`Terasun fiber cement board ${n}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href={navHref('/contact')} className="btn-primary px-8 py-3">Request product samples or quotation</Link>
        </div>
      </section>
    </>
  )
}
