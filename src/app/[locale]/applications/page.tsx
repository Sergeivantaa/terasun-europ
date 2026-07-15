import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import { applications } from '@/data/applications'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.applications' })
  const url = `${SITE_URL}/${locale}/applications`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/applications`]))
  hreflang['x-default'] = `${SITE_URL}/en/applications`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function ApplicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'applications' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('applications'), url: `${SITE_URL}/${locale}/applications` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{t('eyebrow')}</p>
          <h1 className="stitle">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {applications.map(app => (
            <Link
              key={app.slug}
              href={navHref(`/applications/${app.slug}`)}
              className="group card-gold p-6 flex flex-col gap-4 hover:border-gold transition-colors"
            >
              <div className="text-4xl">{app.icon}</div>
              <div>
                <h2 className="text-white font-bold text-lg mb-2 group-hover:text-gold2 transition-colors">
                  {t(`${app.slug}.title`)}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {t(`${app.slug}.summary`)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {app.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-400 border border-border">
                      {t(`tags.${tag}`)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-gold text-sm font-semibold mt-auto group-hover:translate-x-1 transition-transform">
                Learn more →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center rounded-2xl border border-border bg-card p-10">
          <h2 className="text-xl font-bold text-white mb-3">{t('ctaTitle')}</h2>
          <p className="text-gray-400 text-sm mb-6">{t('ctaText')}</p>
          <Link href={navHref('/contact')} className="btn-primary px-8 py-3">Request project consultation</Link>
        </div>
      </section>
    </>
  )
}
