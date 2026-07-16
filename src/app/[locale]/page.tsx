import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import JsonLd from '@/components/seo/JsonLd'
import ScrollReveal from '@/components/ui/ScrollReveal'
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
      type: 'website', title: t('title'), description: t('description'),
      url: `${SITE_URL}/${locale}`, siteName: 'Terasun Europe',
      images: [{ url: `${SITE_URL}/imgs/products/product1.jpeg`, width: 1200, height: 900 }],
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  }
}

/* ── Application data with SVG icon keys ── */
const APP_SLUGS = [
  { slug: 'facade-systems',    icon: 'facade' },
  { slug: 'fire-protection',   icon: 'fire' },
  { slug: 'wet-rooms',         icon: 'wet' },
  { slug: 'commercial-buildings', icon: 'commercial' },
  { slug: 'steel-frame',       icon: 'steel' },
  { slug: 'residential',       icon: 'residential' },
] as const

/* ── Inline SVG icons for applications ── */
function AppIcon({ type }: { type: string }) {
  const cls = 'w-6 h-6 text-accent'
  switch (type) {
    case 'facade':     return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="1"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/><line x1="8" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="16" y2="21"/></svg>
    case 'fire':       return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2c0 6-6 8-6 14a6 6 0 0012 0c0-6-6-8-6-14z"/><path d="M12 12c0 3-2 4-2 6a2 2 0 004 0c0-2-2-3-2-6z"/></svg>
    case 'wet':        return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l-8 10h16L12 2z"/><rect x="4" y="12" width="16" height="10" rx="1"/><line x1="9" y1="12" x2="9" y2="22"/><line x1="15" y1="12" x2="15" y2="22"/></svg>
    case 'commercial': return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="17" rx="1"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="9" y1="4" x2="9" y2="21"/><rect x="13" y="14" width="4" height="7"/></svg>
    case 'steel':      return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 21V4l4-2 4 2 4-2 4 2v17"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
    case 'residential':return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 11L12 2l9 9"/><rect x="4" y="11" width="16" height="10" rx="1"/><rect x="9" y="15" width="6" height="6"/></svg>
    default: return null
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t     = await getTranslations({ locale, namespace: 'hero' })
  const tabs  = await getTranslations({ locale, namespace: 'trustBar' })
  const about = await getTranslations({ locale, namespace: 'about' })
  const auth  = await getTranslations({ locale, namespace: 'authorised' })
  const nav   = await getTranslations({ locale, namespace: 'nav' })
  const home  = await getTranslations({ locale, namespace: 'home' })
  const apps  = await getTranslations({ locale, namespace: 'applications' })
  const certs = await getTranslations({ locale, namespace: 'certifications' })

  const navHref = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={[organizationSchema(locale), webSiteSchema(locale), productSchema(locale)]} />

      {/* ══ HERO — split panel ══ */}
      <section className="relative bg-dark overflow-hidden" id="top" style={{ minHeight: '92vh' }}>
        {/* Subtle dot grid texture */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        {/* Product image — right panel, full bleed */}
        <div className="absolute top-0 right-0 w-full lg:w-[50%] h-full" aria-hidden="true">
          <Image
            src="https://terasun-europe.eu/imgs/products/product1.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient fade into navy on the left edge */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #0C1929 0%, rgba(12,25,41,0.85) 30%, rgba(12,25,41,0.3) 60%, transparent 100%)' }} />
          {/* Bottom overlay for mobile */}
          <div className="absolute inset-0 lg:hidden" style={{ background: 'rgba(8,15,26,0.75)' }} />
        </div>

        {/* Content */}
        <div className="container-page relative h-full">
          <div className="flex flex-col justify-center py-20 lg:py-0" style={{ minHeight: '92vh', maxWidth: '56%' }}>
            {/* Eyebrow badge */}
            <div className="animate-hero-1">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-accent uppercase border border-accent/30 bg-accent/10 rounded-full px-4 py-1.5 mb-6">
                {t('eyebrow')}
              </span>
            </div>

            {/* H1 */}
            <h1 className="animate-hero-2 font-black leading-[1.05] tracking-tight text-white mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
              {t('h1Line1')}<br/>
              <span className="text-accent">{t('h1Line2Emphasis')}</span>{' '}
              {t('h1Line2')}<br/>
              {t('h1Line3')}
            </h1>

            {/* Sub */}
            <p className="animate-hero-3 text-slate-300 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              {t('sub')}
            </p>

            {/* Cert strip */}
            <div className="animate-hero-3 flex flex-wrap gap-2 mb-8">
              {[
                { label: 'CE', val: PRODUCT.ce },
                { label: 'ETA', val: PRODUCT.eta },
                { label: 'EPD', val: PRODUCT.epd },
                { label: 'Fire', val: PRODUCT.fireClass },
              ].map((c) => (
                <div key={c.val} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                  <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">{c.label}</span>
                  <span className="text-[11px] font-bold text-sky">{c.val}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="animate-hero-4 flex flex-wrap gap-3 mb-8">
              <Link href={navHref('/contact')} className="btn-primary px-6 py-3 text-sm">
                {t('btnQuote')}
              </Link>
              <Link href={navHref('/downloads')} className="btn-secondary px-6 py-3 text-sm">
                {t('btnDownloads')}
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="animate-hero-5 text-xs text-slate-500 leading-relaxed">
              {t('note')}<br/>{t('noteManufacturer')}
            </p>
          </div>
        </div>
      </section>

      {/* ══ TRUST BAR ══ */}
      <div className="bg-white border-b border-border-light overflow-x-auto" role="list" aria-label="Certifications summary">
        <div className="container-page py-3 flex items-center gap-6 min-w-max">
          {(tabs.raw('items') as string[]).map((item: string) => (
            <div key={item} role="listitem" className="flex items-center gap-2 text-xs font-medium text-gray-500 whitespace-nowrap">
              <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true"/>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ══ ABOUT + AUTH REP (white) ══ */}
      <section className="bg-white py-16 lg:py-24" id="about">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* About */}
            <ScrollReveal>
              <p className="stag">{about('stag')}</p>
              <h2 className="stitle">{about('title')}</h2>
              <div className="rule" aria-hidden="true"/>
              <div className="space-y-5 mb-8">
                {(about.raw('points') as {title:string;text:string}[]).map((p) => (
                  <div key={p.title} className="flex gap-4">
                    <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{p.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-slate-800 mb-1.5">{about('statusTitle')}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{about('statusText')}</p>
              </div>
            </ScrollReveal>

            {/* Auth rep cards */}
            <ScrollReveal delay={120}>
              <p className="stag">{auth('stag')}</p>
              <h2 className="stitle">{auth('title')}</h2>
              <div className="rule" aria-hidden="true"/>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.values(auth.raw('cards') as Record<string, {title:string;body:string;cta?:string}>).map((card, i) => (
                  <div key={card.title} className="card-lift bg-page border border-border-light rounded-xl p-4">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <span className="text-xs font-black text-accent">{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <h3 className="text-xs font-bold text-gray-800 mb-1">{card.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{card.body}</p>
                    {card.cta && (
                      <Link href={navHref('/contact')} className="inline-block mt-2 text-[11px] font-semibold text-accent hover:text-accent-dark transition-colors">
                        {card.cta} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <div className="card-lift bg-page border border-border-light rounded-xl p-4 text-center">
                    <div className="text-xl font-black text-accent">{about('stat1Num')}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{about('stat1Label')}</div>
                  </div>
                  <div className="card-lift bg-page border border-border-light rounded-xl p-4 text-center">
                    <div className="text-xl font-black text-accent">{about('stat2Num')}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{about('stat2Label')}</div>
                  </div>
                </div>
                <Image
                  src="https://terasun-europe.eu/imgs/LK_luottamusmerkki_Luottamusmerkki-3-vuotta.png"
                  alt="Luotettava Kumppani trust mark"
                  width={90}
                  height={48}
                  loading="lazy"
                  className="shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ PRODUCT (dark navy, split with real image) ══ */}
      <section className="bg-dark py-16 lg:py-24" id="product">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image — large, rounded, zoom on hover */}
            <ScrollReveal delay={80}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-card">
                <Image
                  src="https://terasun-europe.eu/imgs/products/product1.jpeg"
                  alt="Terasun TSM fiber cement board"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Cert overlay badge */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="cert-badge">CE 1023-CPR-1565 P</span>
                  <span className="cert-badge">ETA 24/0895</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Specs */}
            <ScrollReveal delay={180}>
              <p className="stag">{home('productStag')}</p>
              <h2 className="stitle">{home('productTitle')}</h2>
              <div className="rule" aria-hidden="true"/>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">{home('productDesc')}</p>

              {/* Key specs — 3 tiles */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: home('labelWeight'),    val: `${PRODUCT.weightKgM2} kg/m²` },
                  { label: home('labelThickness'),  val: `${PRODUCT.thickness} mm` },
                  { label: home('labelSize'),       val: `${PRODUCT.width}×${PRODUCT.length}` },
                ].map((s) => (
                  <div key={s.label} className="dark-card-lift bg-card border border-border rounded-xl p-4 text-center">
                    <div className="text-base font-black text-accent mb-0.5">{s.val}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Additional spec rows */}
              <div className="space-y-2 mb-8">
                {[
                  { k: 'Fire', v: `${PRODUCT.fireClass} — ${PRODUCT.fireReport}` },
                  { k: 'EPD', v: `${PRODUCT.epd} · valid until ${PRODUCT.epdValidUntil}` },
                  { k: 'Surface', v: 'Asbestos-free · Paintable · CE marked' },
                ].map((r) => (
                  <div key={r.k} className="flex gap-3 text-sm border-b border-border pb-2">
                    <span className="text-slate-500 w-16 shrink-0">{r.k}</span>
                    <span className="text-slate-200">{r.v}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Link href={navHref('/products')} className="btn-primary text-sm">{home('btnSpecs')} →</Link>
                <Link href={navHref('/certifications')} className="btn-secondary text-sm">{nav('certifications')}</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ APPLICATIONS (page bg, icon grid) ══ */}
      <section className="bg-page py-16 lg:py-24" id="applications">
        <div className="container-page">
          <ScrollReveal>
            <p className="stag">{home('appStag')}</p>
            <h2 className="stitle">{home('appTitle')}</h2>
            <div className="rule" aria-hidden="true"/>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {APP_SLUGS.map(({ slug, icon }, i) => (
              <ScrollReveal key={slug} delay={i * 60}>
                <Link href={navHref(`/applications/${slug}`)} className="card-lift group block h-full bg-white border border-border-light rounded-xl p-6 hover:border-accent/30">
                  <div className="w-10 h-10 rounded-lg bg-accent/8 border border-accent/12 flex items-center justify-center mb-4 group-hover:bg-accent/12 transition-colors">
                    <AppIcon type={icon} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-accent transition-colors">{apps(`${slug}.title`)}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{apps(`${slug}.summary`)}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <Link href={navHref('/applications')} className="btn-secondary text-sm">{home('btnAllApps')} →</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ CERTIFICATIONS (white, premium cards) ══ */}
      <section className="bg-white py-16 lg:py-24" id="certifications">
        <div className="container-page">
          <ScrollReveal>
            <p className="stag">{home('certStag')}</p>
            <h2 className="stitle">{home('certTitle')}</h2>
            <div className="rule" aria-hidden="true"/>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: certs('ce.label'),    ref: PRODUCT.ce,        badge: certs('ce.badge'),    desc: certs('ce.desc').slice(0, 60) + '…' },
              { label: certs('eta.label'),   ref: PRODUCT.eta,       badge: certs('eta.badge'),   desc: certs('eta.desc').slice(0, 60) + '…' },
              { label: home('certLabelFire'),ref: PRODUCT.fireClass,  badge: 'Tested',             desc: `${PRODUCT.fireReport}` },
              { label: certs('epd.label'),   ref: PRODUCT.epd,       badge: certs('epd.badge'),   desc: `Valid until ${PRODUCT.epdValidUntil}` },
            ].map((c, i) => (
              <ScrollReveal key={c.ref} delay={i * 70}>
                <div className="card-lift h-full bg-page border border-border-light rounded-xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[9px] font-bold tracking-wider text-accent bg-amber-50 border border-accent/20 rounded px-2 py-0.5 uppercase">{c.badge}</span>
                  </div>
                  <div className="text-xs font-bold tracking-wide text-gray-500 uppercase mb-1">{c.label}</div>
                  <div className="text-base font-black text-gray-900 mb-2">{c.ref}</div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <Link href={navHref('/certifications')} className="btn-primary text-sm">{home('btnAllCerts')} →</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ MANUFACTURER (dark, factory image) ══ */}
      <section className="bg-dark py-16 lg:py-24" id="manufacturer">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="stag">{home('mfrStag')}</p>
              <h2 className="stitle">{MANUFACTURER.name}</h2>
              <div className="rule" aria-hidden="true"/>
              <div className="space-y-3 mb-6">
                {[
                  { label: home('labelFounded'), val: MANUFACTURER.founded },
                  { label: home('labelCountry'), val: MANUFACTURER.country },
                  { label: home('labelWebsite'), val: MANUFACTURER.websiteDisplay, href: MANUFACTURER.website },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-4 border-b border-border py-3">
                    <span className="text-xs font-semibold text-slate-500 w-20 shrink-0">{s.label}</span>
                    {s.href
                      ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors">{s.val}</a>
                      : <span className="text-sm font-semibold text-slate-100">{s.val}</span>
                    }
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {home('mfrNote')}{' '}
                <Link href={navHref('/manufacturer')} className="text-accent hover:text-accent-dark transition-colors">{nav('manufacturer')} →</Link>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-card">
                <Image
                  src="https://terasun-europe.eu/imgs/manufacturer/factory.jpg"
                  alt="Terasun factory — Zhejiang, China"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ DISTRIBUTORS CTA (accent-blue bg) ══ */}
      <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #1E40AF 100%)' }}>
        <div className="container-page">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-[11px] font-bold tracking-[0.18em] text-blue-200 uppercase mb-4">{home('distStag')}</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">{home('distTitle')}</h2>
              <p className="text-blue-100 leading-relaxed mb-8 text-base">{home('distDesc')}</p>

              {/* Open-market country chips */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['Germany', 'Netherlands', 'France', 'Poland', 'Czech Republic', 'Spain', 'Italy', 'Austria'].map((c) => (
                  <span key={c} className="text-xs bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full">
                    {c} — {home('distCountryLabel')}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <Link href={navHref('/distributors')} className="inline-flex items-center gap-2 bg-white text-accent font-bold px-6 py-3 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                  {home('btnPartnership')} →
                </Link>
                <Link href={navHref('/contact')} className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors">
                  {nav('contact')}
                </Link>
              </div>

              {/* FinnBuild badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-bold text-white">{home('finnbuildLabel')} — {FINNBUILD.dates}</p>
                  <p className="text-xs text-blue-200">{FINNBUILD.venue} · {home('finnbuildDesc')}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ CONTACT CTA (light, clean) ══ */}
      <section className="bg-page py-16 lg:py-24" id="contact">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="stag">{home('ctaStag')}</p>
              <h2 className="stitle">{home('ctaTitle')}</h2>
              <div className="rule" aria-hidden="true"/>
              <p className="text-gray-500 leading-relaxed mb-6">{home('ctaDesc')}</p>
              <Link href={navHref('/contact')} className="btn-primary">{home('btnOpenForm')} →</Link>
            </ScrollReveal>

            {/* Contact info tiles */}
            <div className="space-y-3">
              {[
                { label: home('labelEmail'),    val: CONTACT.email,       href: `mailto:${CONTACT.email}` },
                { label: home('labelPhone'),    val: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
                { label: home('labelLocation'), val: CONTACT.location,     href: undefined },
              ].map((c, i) => (
                <ScrollReveal key={c.label} delay={i * 80}>
                  <div className="card-lift flex items-center gap-4 bg-white border border-border-light rounded-xl p-4">
                    <div className="w-8 h-8 rounded-lg bg-accent/8 border border-accent/12 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-0.5">{c.label}</div>
                      {c.href
                        ? <a href={c.href} className="text-sm font-semibold text-gray-800 hover:text-accent transition-colors">{c.val}</a>
                        : <span className="text-sm font-semibold text-gray-800">{c.val}</span>
                      }
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
