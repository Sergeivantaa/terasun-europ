import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.gallery' })
  const url = `${SITE_URL}/${locale}/gallery`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/gallery`]))
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

const GALLERY_IMAGES = [
  { src: 'https://terasun-europe.eu/imgs/gallery/gallery1.jpg', alt: 'Terasun fiber cement facade project' },
  { src: 'https://terasun-europe.eu/imgs/gallery/gallery2.jpg', alt: 'Fiber cement interior wall cladding' },
  { src: 'https://terasun-europe.eu/imgs/gallery/gallery3.jpg', alt: 'Terasun board roofing application' },
  { src: 'https://terasun-europe.eu/imgs/gallery/gallery4.jpg', alt: 'Residential facade with fiber cement boards' },
  { src: 'https://terasun-europe.eu/imgs/gallery/gallery5.jpg', alt: 'Commercial building exterior cladding' },
  { src: 'https://terasun-europe.eu/imgs/gallery/gallery6.jpg', alt: 'Balcony flooring fiber cement' },
  { src: 'https://terasun-europe.eu/imgs/gallery/gallery7.jpg', alt: 'Facade system installation' },
  { src: 'https://terasun-europe.eu/imgs/gallery/gallery8.jpg', alt: 'Terasun board close-up texture' },
  { src: 'https://terasun-europe.eu/imgs/products/product1.jpeg', alt: 'Terasun TSM fiber cement board product shot' },
  { src: 'https://terasun-europe.eu/imgs/products/product2.jpeg', alt: 'Board thickness sample' },
  { src: 'https://terasun-europe.eu/imgs/products/product3.jpeg', alt: 'Board surface detail' },
  { src: 'https://terasun-europe.eu/imgs/products/product4.jpeg', alt: 'Stacked fiber cement boards' },
]

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gallery' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('gallery'), url: `${SITE_URL}/${locale}/gallery` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{t('eyebrow')}</p>
          <h1 className="stitle">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-xl bg-card ${i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto md:h-72' : 'aspect-square'}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading={i < 4 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm mb-6">{t('cta')}</p>
          <Link href={navHref('/contact')} className="btn-primary px-8 py-3">Request product samples</Link>
        </div>
      </section>
    </>
  )
}
