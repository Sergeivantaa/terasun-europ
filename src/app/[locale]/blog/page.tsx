import { getTranslations } from 'next-intl/server'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const url = `${SITE_URL}/${locale}/blog`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/blog`]))
  return {
    title: 'Blog — Terasun Europe',
    description: 'Articles, guides and news about fiber cement boards for European construction professionals.',
    alternates: { canonical: url, languages: hreflang },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Blog', url: `${SITE_URL}/${locale}/blog` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Knowledge base</p>
          <h1 className="stitle">Blog & Resources</h1>
          <p className="ssub max-w-2xl">Articles, technical guides and news about fiber cement construction for European professionals.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-white mb-3">Coming soon</h2>
          <p className="text-gray-400 text-sm">We are preparing in-depth articles on fiber cement installation, design, and building regulations across Europe.</p>
        </div>
      </section>
    </>
  )
}
