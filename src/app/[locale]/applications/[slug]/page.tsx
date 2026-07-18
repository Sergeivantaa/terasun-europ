import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import { applications } from '@/data/applications'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import SystemSpecTable from '@/components/sections/SystemSpecTable'
import TechDocsSection from '@/components/sections/TechDocsSection'
import { applicationDiagram } from '@/data/techDocs'

export function generateStaticParams() {
  return locales.flatMap(locale =>
    applications.map(app => ({ locale, slug: app.slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  if (!applications.find(a => a.slug === slug)) return notFound()
  const t = await getTranslations({ locale, namespace: 'applications' })
  const url = `${SITE_URL}/${locale}/applications/${slug}`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/applications/${slug}`]))
  hreflang['x-default'] = `${SITE_URL}/en/applications/${slug}`
  return {
    title: t(`${slug}.metaTitle`),
    description: t(`${slug}.metaDesc`),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t(`${slug}.metaTitle`), description: t(`${slug}.metaDesc`), url, type: 'website' },
  }
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const app = applications.find(a => a.slug === slug)
  if (!app) notFound()

  const t = await getTranslations({ locale, namespace: 'applications' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const navHref = (path: string) => `/${locale}${path}`

  const diagramType = applicationDiagram[slug]

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('applications'), url: `${SITE_URL}/${locale}/applications` },
        { name: t(`${slug}.title`), url: `${SITE_URL}/${locale}/applications/${slug}` },
      ])} />

      <section className="container-page py-10 md:py-14">

        {/* Breadcrumb */}
        <nav className="text-xs text-[#8B9AAD] mb-10 flex gap-2 items-center flex-wrap">
          <Link href={navHref('')} className="hover:text-[#132238] transition-colors">{bc('home')}</Link>
          <span>/</span>
          <Link href={navHref('/applications')} className="hover:text-[#132238] transition-colors">{bc('applications')}</Link>
          <span>/</span>
          <span className="text-[#132238] font-medium">{t(`${slug}.title`)}</span>
        </nav>

        {/* ── SECTION 1: Photo + System overview ──────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14 items-start">

          {/* Left: project photo */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8EEF4] shadow-sm">
            <Image
              src={`https://terasun-europe.eu/imgs/applications/${slug}-1.jpg`}
              alt={`${t(`${slug}.title`)} — Terasun TSM`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3">
              <p className="text-white text-xs font-medium">Terasun TSM — {t(`${slug}.title`)}</p>
            </div>
          </div>

          {/* Right: title, description, spec tags, CTA */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-bold text-[#5CA4D6] uppercase tracking-widest mb-2">
                {app.icon} {t(`${slug}.title`)}
              </p>
              <h1 className="text-2xl md:text-3xl font-black text-[#132238] leading-tight mb-3">
                {t(`${slug}.h1`)}
              </h1>
              <p className="text-[#4A5B6D] text-sm leading-relaxed">{t(`${slug}.body1`)}</p>
            </div>

            {/* Spec chips */}
            {app.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {app.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#EBF4FB] text-[#245A85] border border-[#C0DAEC] font-medium">
                    {t(`tags.${tag}`)}
                  </span>
                ))}
              </div>
            )}

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href={navHref('/contact')} className="btn-primary text-sm py-2.5 px-5">
                {t('sidebarQuote')}
              </Link>
              <Link href={navHref('/downloads')} className="btn-secondary text-sm py-2.5 px-5">
                {bc('downloads')}
              </Link>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: Spec table + secondary text ───────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14 items-start">

          {/* Spec table — verified data from ETA/DoP/CE */}
          {diagramType && (
            <SystemSpecTable type={diagramType} applicationSlug={slug} />
          )}

          {/* Features list */}
          <div>
            <h2 className="text-base font-black text-[#132238] mb-4">{t(`${slug}.featuresTitle`)}</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="flex items-start gap-3">
                  <span className="text-[#5CA4D6] font-bold text-sm shrink-0 mt-0.5">✓</span>
                  <p className="text-sm text-[#4A5B6D] leading-relaxed">{t(`${slug}.feature${n}`)}</p>
                </div>
              ))}
            </div>

            {/* Body 2 */}
            <p className="text-xs text-[#6B7A8D] leading-relaxed mt-6 border-t border-[#E8EEF4] pt-4">
              {t(`${slug}.body2`)}
            </p>
          </div>
        </div>

        {/* ── SECTION 3: System downloads ─────────────────────────────────── */}
        <TechDocsSection applicationSlug={slug} localePath={`/${locale}`} />

        {/* ── SECTION 4: Related applications ─────────────────────────────── */}
        <div className="mt-14 pt-10 border-t border-[#D8E1E9]">
          <h2 className="text-base font-bold text-[#132238] mb-5">{t('otherApps')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {applications.filter(a => a.slug !== slug).slice(0, 3).map(other => (
              <Link
                key={other.slug}
                href={navHref(`/applications/${other.slug}`)}
                className="card-gold p-4 flex items-center gap-3 hover:border-accent/60 transition-colors group"
              >
                <span className="text-2xl">{other.icon}</span>
                <span className="text-sm text-[#4A5B6D] group-hover:text-[#132238] transition-colors font-medium">
                  {t(`${other.slug}.title`)}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </section>
    </>
  )
}
