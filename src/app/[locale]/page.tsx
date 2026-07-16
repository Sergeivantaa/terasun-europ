import type { Metadata } from 'next'
import { getTranslations, setRequestLocale} from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import JsonLd from '@/components/seo/JsonLd'
import { organizationSchema, webSiteSchema, productSchema } from '@/lib/structured-data'
import { SITE_URL, CONTACT, PRODUCT, FINNBUILD, MANUFACTURER } from '@/lib/constants'
import { routing } from '@/i18n/routing'

type Props = { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.home' })
  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}`])),
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      siteName: 'Terasun Europe',
      images: [{ url: `${SITE_URL}/imgs/products/product1.jpeg`, width: 1200, height: 900 }],
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  }
}

// HERO_CERTS labels are rendered inline with translation calls below

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })
  const tabs = await getTranslations({ locale, namespace: 'trustBar' })
  const about = await getTranslations({ locale, namespace: 'about' })
  const auth = await getTranslations({ locale, namespace: 'authorised' })
  const nav = await getTranslations({ locale, namespace: 'nav' })
  const home = await getTranslations({ locale, namespace: 'home' })
  const apps = await getTranslations({ locale, namespace: 'applications' })
  const certs = await getTranslations({ locale, namespace: 'certifications' })

  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={[organizationSchema(locale), webSiteSchema(locale), productSchema(locale)]} />

      {/* ── HERO ── */}
      <section className="relative bg-darker overflow-hidden" id="top">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-darker to-dark opacity-80 pointer-events-none" aria-hidden="true" />
        <div className="container-page relative py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-4">
                {t('eyebrow')}
              </p>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
                {t('h1Line1')}<br/>
                <em className="not-italic text-gold2">{t('h1Line2Emphasis')}</em>{' '}
                {t('h1Line2')}<br/>
                {t('h1Line3')}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                {t('sub')}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href={navHref('/contact')} className="btn-primary">
                  {t('btnQuote')}
                </Link>
                <Link href={navHref('/downloads')} className="btn-secondary">
                  {t('btnDownloads')}
                </Link>
                <Link href={navHref('/contact')} className="btn-secondary">
                  {t('btnContact')}
                </Link>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t('note')}<br/>
                {t('noteManufacturer')}
              </p>
            </div>

            {/* Cert grid */}
            <div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: certs('ce.label'),    val: PRODUCT.ce,        note: certs('ce.badge') },
                  { label: certs('eta.label'),   val: PRODUCT.eta,       note: certs('eta.badge') },
                  { label: home('certLabelFire'), val: PRODUCT.fireClass, note: PRODUCT.fireReport },
                  { label: certs('epd.label'),   val: PRODUCT.epd,       note: certs('epd.badge') },
                ].map((c) => (
                  <div key={c.val} className="bg-card-dark border border-border-dark rounded-lg p-4">
                    <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">{c.label}</div>
                    <div className="text-sm font-bold text-gold2 mb-1">{c.val}</div>
                    <div className="text-[11px] text-gray-500">{c.note}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-gray-500">{t('tagline')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="bg-white border-y border-gray-200 overflow-x-auto" role="list" aria-label="Certifications summary">
        <div className="container-page py-3 flex items-center gap-6 min-w-max">
          {(tabs.raw('items') as string[]).map((item: string) => (
            <div key={item} role="listitem" className="flex items-center gap-2 text-xs font-medium text-gray-600 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true"/>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT (condensed) ── */}
      <section className="bg-white py-16 lg:py-20" id="about">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="stag">{about('stag')}</p>
              <h2 className="stitle">{about('title')}</h2>
              <div className="rule" aria-hidden="true"/>
              <div className="space-y-6">
                {(about.raw('points') as {title:string;text:string}[]).map((p) => (
                  <div key={p.title} className="flex gap-4">
                    <span className="text-gold font-bold mt-0.5 shrink-0">—</span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{p.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="stag">{about('missionStag')}</p>
              <p className="text-base text-gray-600 leading-relaxed mb-6">{about('missionText')}</p>
              <div className="bg-gold-light border border-gold-border rounded-lg p-5 mb-6">
                <h3 className="text-sm font-bold text-amber-900 mb-2">{about('statusTitle')}</h3>
                <p className="text-sm text-amber-800 leading-relaxed">{about('statusText')}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-page border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-black text-gold">{about('stat1Num')}</div>
                  <div className="text-xs text-gray-500 mt-1">{about('stat1Label')}</div>
                </div>
                <div className="bg-page border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-black text-gold">{about('stat2Num')}</div>
                  <div className="text-xs text-gray-500 mt-1">{about('stat2Label')}</div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://terasun-europe.eu/imgs/LK_luottamusmerkki_Luottamusmerkki-3-vuotta.png"
                  alt="Luotettava Kumppani trust mark"
                  width={180}
                  height={96}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTHORISED REP ── */}
      <section className="bg-page py-16 lg:py-20" id="authorised">
        <div className="container-page">
          <p className="stag">{auth('stag')}</p>
          <h2 className="stitle">{auth('title')}</h2>
          <div className="rule" aria-hidden="true"/>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(auth.raw('cards') as Record<string, {title:string;body:string;cta?:string}>).map((card) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
                {card.cta && (
                  <Link href={navHref('/contact')} className="inline-block mt-3 text-xs font-semibold text-gold hover:text-amber-700 transition-colors">
                    {card.cta} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT HIGHLIGHT ── */}
      <section className="bg-dark py-16 lg:py-20" id="product">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="stag">{home('productStag')}</p>
              <h2 className="stitle">{home('productTitle')}</h2>
              <div className="rule" aria-hidden="true"/>
              <p className="text-base leading-relaxed mb-6" style={{color:'var(--body-color)'}}>
                {home('productDesc')}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: home('labelWeight'), val: `${PRODUCT.weightKgM2} kg/m²` },
                  { label: home('labelThickness'), val: `${PRODUCT.thickness} mm` },
                  { label: home('labelSize'), val: `${PRODUCT.width}×${PRODUCT.length}` },
                ].map((s) => (
                  <div key={s.label} className="bg-card-dark border border-border-dark rounded-lg p-3 text-center">
                    <div className="text-base font-bold text-gold2">{s.val}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href={navHref('/products')} className="btn-primary text-sm">{home('btnSpecs')} →</Link>
                <Link href={navHref('/certifications')} className="btn-secondary text-sm">{nav('certifications')}</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Image
                src="https://terasun-europe.eu/imgs/products/product1.jpeg"
                alt="Terasun TSM fiber cement board"
                width={600}
                height={450}
                className="rounded-lg object-cover w-full col-span-2"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MANUFACTURER ── */}
      <section className="bg-white py-16 lg:py-20" id="manufacturer">
        <div className="container-page">
          <p className="stag">{home('mfrStag')}</p>
          <h2 className="stitle">{MANUFACTURER.name}</h2>
          <div className="rule" aria-hidden="true"/>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { label: home('labelFounded'), val: MANUFACTURER.founded },
              { label: home('labelCountry'), val: MANUFACTURER.country },
              { label: home('labelWebsite'), val: MANUFACTURER.websiteDisplay, href: MANUFACTURER.website },
            ].map((s) => (
              <div key={s.label} className="bg-page border border-gray-200 rounded-lg p-5">
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                {s.href
                  ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-gold hover:text-amber-700 transition-colors">{s.val}</a>
                  : <div className="text-base font-semibold text-gray-900">{s.val}</div>
                }
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {home('mfrNote')}{' '}
            <Link href={navHref('/manufacturer')} className="text-gold hover:text-amber-700 transition-colors">{nav('manufacturer')} →</Link>
          </p>
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section className="bg-page py-16 lg:py-20" id="applications">
        <div className="container-page">
          <p className="stag">{home('appStag')}</p>
          <h2 className="stitle">{home('appTitle')}</h2>
          <div className="rule" aria-hidden="true"/>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '🏗️', slug: 'facade-systems',    tags: ['Ventilated', 'All climates'] },
              { icon: '🔥', slug: 'fire-protection',   tags: ['E 120', 'EI 90', 'EW 120'] },
              { icon: '🚿', slug: 'wet-rooms',         tags: ['Mapei', 'Schönox'] },
              { icon: '🏢', slug: 'commercial-buildings', tags: ['Interior', 'Exterior'] },
              { icon: '🏭', slug: 'steel-frame',       tags: ['Industrial', '400/600 mm'] },
              { icon: '🏠', slug: 'residential',       tags: ['Timber frame'] },
            ].map((app) => (
              <Link key={app.slug} href={navHref(`/applications/${app.slug}`)} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gold/60 hover:shadow-md transition-all group">
                <div className="text-2xl mb-3">{app.icon}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-gold transition-colors">{apps(`${app.slug}.title`)}</h3>
                <div className="flex flex-wrap gap-1">
                  {app.tags.map((tag) => (
                    <span key={tag} className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <Link href={navHref('/applications')} className="btn-secondary text-sm">
            {home('btnAllApps')} →
          </Link>
        </div>
      </section>

      {/* ── CERTIFICATIONS HIGHLIGHTS ── */}
      <section className="bg-darker py-16 lg:py-20" id="certifications">
        <div className="container-page">
          <p className="stag">{home('certStag')}</p>
          <h2 className="stitle">{home('certTitle')}</h2>
          <div className="rule" aria-hidden="true"/>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: '🏷️', label: home('certLabelCE'),   ref: PRODUCT.ce },
              { icon: '📋', label: home('certLabelETA'),  ref: PRODUCT.eta },
              { icon: '📄', label: home('certLabelFire'), ref: PRODUCT.fireClass },
              { icon: '🌿', label: home('certLabelEPD'),  ref: PRODUCT.epd },
            ].map((c) => (
              <div key={c.ref} className="bg-card-dark border border-border-dark rounded-lg p-4">
                <div className="text-xl mb-2">{c.icon}</div>
                <div className="text-xs text-gray-500 mb-1">{c.label}</div>
                <div className="text-sm font-bold text-gold2">{c.ref}</div>
              </div>
            ))}
          </div>
          <Link href={navHref('/certifications')} className="btn-secondary text-sm">{home('btnAllCerts')} →</Link>
        </div>
      </section>

      {/* ── DISTRIBUTORS CTA ── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-page">
          <div className="bg-dark border border-border-dark rounded-xl p-8 lg:p-12 text-center">
            <p className="stag text-center">{home('distStag')}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{home('distTitle')}</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
              {home('distDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Germany', 'Netherlands', 'France', 'Poland', 'Czech Republic', 'Spain', 'Italy', 'Austria'].map((c) => (
                <span key={c} className="text-xs bg-card-dark text-gray-400 px-3 py-1.5 rounded-full">{c} — {home('distCountryLabel')}</span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={navHref('/distributors')} className="btn-primary">{home('btnPartnership')} →</Link>
              <Link href={navHref('/contact')} className="btn-secondary">{nav('contact')}</Link>
            </div>
            <div className="mt-8 pt-6 border-t border-border-dark">
              <p className="text-sm font-semibold text-gold2 mb-1">{home('finnbuildLabel')}</p>
              <p className="text-sm text-gray-400">{home('finnbuildDesc')} · {FINNBUILD.dates} · {FINNBUILD.venue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="bg-darker py-16 lg:py-20" id="contact">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="stag">{home('ctaStag')}</p>
              <h2 className="stitle">{home('ctaTitle')}</h2>
              <div className="rule" aria-hidden="true"/>
              <p className="text-gray-400 leading-relaxed mb-6">
                {home('ctaDesc')}
              </p>
              <Link href={navHref('/contact')} className="btn-primary">
                {home('btnOpenForm')} →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { label: home('labelEmail'),    val: CONTACT.email,       href: `mailto:${CONTACT.email}` },
                { label: home('labelPhone'),    val: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
                { label: home('labelLocation'), val: CONTACT.location,     href: undefined },
              ].map((c) => (
                <div key={c.label} className="bg-card-dark border border-border-dark rounded-lg p-4 flex items-center gap-4">
                  <div className="text-xs font-bold tracking-wider text-gray-500 uppercase w-16 shrink-0">{c.label}</div>
                  {c.href
                    ? <a href={c.href} className="text-sm text-white hover:text-gold2 transition-colors">{c.val}</a>
                    : <span className="text-sm text-white">{c.val}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
