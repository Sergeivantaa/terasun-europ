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

const APP_SLUGS = [
  { slug: 'facade-systems',       icon: 'facade' },
  { slug: 'fire-protection',      icon: 'fire' },
  { slug: 'wet-rooms',            icon: 'wet' },
  { slug: 'commercial-buildings', icon: 'commercial' },
  { slug: 'steel-frame',          icon: 'steel' },
  { slug: 'residential',          icon: 'residential' },
] as const

function AppIcon({ type }: { type: string }) {
  const cls = 'w-5 h-5 text-[#245A85]'
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

/* Checkmark icon for lists */
function Check({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 8 6.5 11.5 13 5"/>
    </svg>
  )
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

      {/* ══════════════════════════════════════════
          HERO — full-bleed split panel
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#08131F] overflow-hidden" id="top" style={{ minHeight: '95vh' }}>
        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(92,164,214,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Hero image */}
        <div className="absolute top-0 right-0 w-full lg:w-[52%] h-full" aria-hidden="true">
          <Image
            src="https://terasun-europe.eu/imgs/products/product1.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #08131F 0%, rgba(8,19,31,0.88) 25%, rgba(8,19,31,0.4) 55%, transparent 100%)' }} />
          <div className="absolute inset-0 lg:hidden" style={{ background: 'rgba(8,19,31,0.8)' }} />
        </div>

        <div className="container-page relative h-full">
          <div className="flex flex-col justify-center py-24 lg:py-0" style={{ minHeight: '95vh', maxWidth: '58%' }}>
            {/* Eyebrow */}
            <div className="animate-hero-1">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-[#5CA4D6] uppercase border border-[#5CA4D6]/30 bg-[#5CA4D6]/8 rounded-full px-4 py-1.5 mb-7">
                {t('eyebrow')}
              </span>
            </div>

            {/* H1 */}
            <h1 className="animate-hero-2 font-black leading-[1.06] tracking-tight text-white mb-5"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.75rem)' }}>
              {t('h1Line1')}<br/>
              <span className="text-[#5CA4D6]">{t('h1Line2Emphasis')}</span>{' '}
              {t('h1Line2')}<br/>
              {t('h1Line3')}
            </h1>

            {/* Sub */}
            <p className="animate-hero-3 text-[#B8CADE] text-base lg:text-lg leading-relaxed mb-7 max-w-lg">
              {t('sub')}
            </p>

            {/* Cert strip */}
            <div className="animate-hero-3 flex flex-wrap gap-2 mb-8">
              {[
                { label: 'CE',   val: PRODUCT.ce },
                { label: 'ETA',  val: PRODUCT.eta },
                { label: 'EPD',  val: PRODUCT.epd },
                { label: 'Fire', val: PRODUCT.fireClass },
              ].map((c) => (
                <div key={c.val} className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-[9px] font-bold tracking-widest text-[#7A9EC2] uppercase">{c.label}</span>
                  <span className="text-[11px] font-bold text-[#5CA4D6]">{c.val}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="animate-hero-4 flex flex-wrap gap-3 mb-8">
              <Link href={navHref('/contact')} className="btn-primary px-7 py-3 text-sm font-bold shadow-lg shadow-[#245A85]/30">
                {t('btnQuote')}
              </Link>
              <Link href={navHref('/downloads')}
                className="inline-flex items-center gap-2 border border-white/25 text-white font-medium px-7 py-3 rounded-lg text-sm hover:bg-white/8 transition-all duration-200">
                {t('btnDownloads')}
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="animate-hero-5 text-xs text-[#4A6480] leading-relaxed">
              {t('note')}<br/>{t('noteManufacturer')}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-hero-5" aria-hidden="true">
          <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════ */}
      <div className="bg-white border-b border-[#D8E1E9] overflow-x-auto" role="list" aria-label="Certifications summary">
        <div className="container-page py-3.5 flex items-center gap-8 min-w-max">
          {(tabs.raw('items') as string[]).map((item: string) => (
            <div key={item} role="listitem" className="flex items-center gap-2 text-xs font-semibold text-[#4A5B6D] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#245A85] shrink-0" aria-hidden="true"/>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT + AUTHORISED REP
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28" id="about">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <p className="stag">{about('stag')}</p>
              <h2 className="stitle">{about('title')}</h2>
              <div className="rule" aria-hidden="true"/>
              <div className="space-y-5 mb-8">
                {(about.raw('points') as {title:string;text:string}[]).map((p) => (
                  <div key={p.title} className="flex gap-4">
                    <span className="w-5 h-5 rounded-full bg-[#EBF4FB] border border-[#5CA4D6]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#245A85]" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#132238] mb-0.5">{p.title}</h3>
                      <p className="text-sm text-[#4A5B6D] leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-5">
                <p className="text-xs font-bold text-[#245A85] uppercase tracking-wider mb-1">{about('statusTitle')}</p>
                <p className="text-sm text-[#4A5B6D] leading-relaxed">{about('statusText')}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <p className="stag">{auth('stag')}</p>
              <h2 className="stitle">{auth('title')}</h2>
              <div className="rule" aria-hidden="true"/>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.values(auth.raw('cards') as Record<string, {title:string;body:string;cta?:string}>).map((card, i) => (
                  <div key={card.title} className="card-lift bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-4">
                    <div className="w-7 h-7 rounded-lg bg-[#EBF4FB] border border-[#5CA4D6]/25 flex items-center justify-center mb-3">
                      <span className="text-[10px] font-black text-[#245A85]">{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <h3 className="text-xs font-bold text-[#132238] mb-1">{card.title}</h3>
                    <p className="text-xs text-[#4A5B6D] leading-relaxed">{card.body}</p>
                    {card.cta && (
                      <Link href={navHref('/contact')} className="inline-block mt-2 text-[11px] font-semibold text-[#245A85] hover:text-[#1A4470] transition-colors">
                        {card.cta} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <div className="card-lift bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-4 text-center">
                    <div className="text-xl font-black text-[#245A85]">{about('stat1Num')}</div>
                    <div className="text-[11px] text-[#6B7A8D] mt-0.5">{about('stat1Label')}</div>
                  </div>
                  <div className="card-lift bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-4 text-center">
                    <div className="text-xl font-black text-[#245A85]">{about('stat2Num')}</div>
                    <div className="text-[11px] text-[#6B7A8D] mt-0.5">{about('stat2Label')}</div>
                  </div>
                </div>
                <Image
                  src="https://terasun-europe.eu/imgs/LK_luottamusmerkki_Luottamusmerkki-3-vuotta.png"
                  alt="Luotettava Kumppani trust mark"
                  width={90}
                  height={48}
                  loading="lazy"
                  className="shrink-0 opacity-75 hover:opacity-100 transition-opacity"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCT — dark navy split
      ══════════════════════════════════════════ */}
      <section className="bg-[#0C1929] py-20 lg:py-28" id="product">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal delay={80}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ background: '#152D4A' }}>
                <Image
                  src="https://terasun-europe.eu/imgs/products/product1.jpeg"
                  alt="Terasun TSM cement board — close-up texture"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="cert-badge">CE 1023-CPR-1565 P</span>
                  <span className="cert-badge">ETA 24/0895</span>
                </div>
                {/* Second product photo (corner peek) */}
                <div className="absolute bottom-4 right-4 w-24 h-24 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
                  <Image
                    src="https://terasun-europe.eu/imgs/products/product2.jpeg"
                    alt="TSM board profile view"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <p className="stag">{home('productStag')}</p>
              <h2 className="stitle">{home('productTitle')}</h2>
              <div className="rule" aria-hidden="true"/>
              <p className="text-[#B8CADE] text-sm leading-relaxed mb-8">{home('productDesc')}</p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: home('labelWeight'),   val: `${PRODUCT.weightKgM2} kg/m²` },
                  { label: home('labelThickness'), val: `${PRODUCT.thickness} mm` },
                  { label: home('labelSize'),      val: `${PRODUCT.width}×${PRODUCT.length}` },
                ].map((s) => (
                  <div key={s.label} className="bg-[#152D4A] border border-[#1E3B5C] rounded-xl p-4 text-center">
                    <div className="text-base font-black text-[#5CA4D6] mb-0.5">{s.val}</div>
                    <div className="text-[10px] text-[#6B7A8D] leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 mb-8">
                {[
                  { k: 'Fire', v: `${PRODUCT.fireClass} — ${PRODUCT.fireReport}` },
                  { k: 'EPD',  v: `${PRODUCT.epd} · valid until ${PRODUCT.epdValidUntil}` },
                  { k: 'Surface', v: 'Asbestos-free · Paintable · CE marked' },
                ].map((r) => (
                  <div key={r.k} className="flex gap-3 text-sm border-b border-[#1E3B5C] pb-2.5">
                    <span className="text-[#6B7A8D] w-16 shrink-0 font-medium">{r.k}</span>
                    <span className="text-[#D0E3F4]">{r.v}</span>
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

      {/* ══════════════════════════════════════════
          FREE SAMPLE — high-impact CTA
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28" id="sample">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal>
              <p className="stag">Free sample programme</p>
              <h2 className="text-2xl lg:text-3xl font-black text-[#132238] leading-tight mb-4">
                Evaluate TSM Board Quality<br/>
                <span className="text-[#245A85]">Before Your Next Project</span>
              </h2>
              <div className="rule" aria-hidden="true"/>
              <p className="text-[#4A5B6D] leading-relaxed mb-7">
                We provide physical board samples to qualified construction companies, architects, contractors, and distributors across Europe. Evaluate the surface finish, weight, and cut behaviour before committing to a project order.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Full-size A4 sample piece with CE documentation',
                  'Technical data sheet and DoP included',
                  'Shipped within 5–7 business days across EU/EEA',
                  'Available for architects, contractors, and distributors',
                  'No cost — qualified companies only',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#4A5B6D]">
                    <span className="w-5 h-5 rounded-full bg-[#EBF4FB] border border-[#5CA4D6]/35 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#245A85]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={navHref('/contact')}
                className="btn-primary px-8 py-3 text-sm font-bold shadow-lg shadow-[#245A85]/20">
                Request Free Sample →
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#F4F7FA]">
                <Image
                  src="https://terasun-europe.eu/imgs/products/product1.jpeg"
                  alt="TSM cement board sample showing surface texture"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0F2742]/30" />
                {/* Info badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#D8E1E9]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EBF4FB] border border-[#5CA4D6]/30 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[#245A85]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M9 9h6M9 13h4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#132238]">CE 1023-CPR-1565 P · ETA 24/0895</p>
                      <p className="text-[11px] text-[#6B7A8D]">Full certification documentation included with every sample</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APPLICATIONS
      ══════════════════════════════════════════ */}
      <section className="bg-[#F4F7FA] py-20 lg:py-28" id="applications">
        <div className="container-page">
          <ScrollReveal>
            <p className="stag">{home('appStag')}</p>
            <h2 className="stitle">{home('appTitle')}</h2>
            <div className="rule" aria-hidden="true"/>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {APP_SLUGS.map(({ slug, icon }, i) => (
              <ScrollReveal key={slug} delay={i * 55}>
                <Link href={navHref(`/applications/${slug}`)}
                  className="card-lift group block h-full bg-white border border-[#D8E1E9] rounded-xl p-6 hover:border-[#5CA4D6]/50 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF4FB] border border-[#5CA4D6]/20 flex items-center justify-center mb-4 group-hover:bg-[#EBF4FB] group-hover:border-[#5CA4D6]/40 transition-colors">
                    <AppIcon type={icon} />
                  </div>
                  <h3 className="text-sm font-bold text-[#132238] mb-1.5 group-hover:text-[#245A85] transition-colors">
                    {apps(`${slug}.title`)}
                  </h3>
                  <p className="text-xs text-[#6B7A8D] leading-relaxed line-clamp-2">{apps(`${slug}.summary`)}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-semibold text-[#245A85] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="flex items-center gap-4">
              <Link href={navHref('/applications')} className="btn-secondary text-sm">{home('btnAllApps')} →</Link>
              <Link href={navHref('/technical-data')} className="text-sm font-medium text-[#245A85] hover:text-[#1A4470] transition-colors underline">
                View technical data →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28" id="certifications">
        <div className="container-page">
          <ScrollReveal>
            <p className="stag">{home('certStag')}</p>
            <h2 className="stitle">{home('certTitle')}</h2>
            <div className="rule" aria-hidden="true"/>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: certs('ce.label'),    ref: PRODUCT.ce,       badge: certs('ce.badge'),   desc: certs('ce.desc').slice(0, 70) + '…' },
              { label: certs('eta.label'),   ref: PRODUCT.eta,      badge: certs('eta.badge'),  desc: certs('eta.desc').slice(0, 70) + '…' },
              { label: home('certLabelFire'),ref: PRODUCT.fireClass, badge: 'Tested',            desc: PRODUCT.fireReport },
              { label: certs('epd.label'),   ref: PRODUCT.epd,      badge: certs('epd.badge'),  desc: `Valid until ${PRODUCT.epdValidUntil}` },
            ].map((c, i) => (
              <ScrollReveal key={c.ref} delay={i * 65}>
                <div className="card-lift h-full bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[9px] font-bold tracking-wider text-[#B45309] bg-amber-50 border border-amber-200 rounded px-2 py-0.5 uppercase">{c.badge}</span>
                  </div>
                  <div className="text-[10px] font-bold tracking-wider text-[#6B7A8D] uppercase mb-1">{c.label}</div>
                  <div className="text-base font-black text-[#132238] mb-2 leading-tight">{c.ref}</div>
                  <p className="text-[11px] text-[#6B7A8D] leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <Link href={navHref('/certifications')} className="btn-primary text-sm">{home('btnAllCerts')} →</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MANUFACTURER
      ══════════════════════════════════════════ */}
      <section className="bg-[#0C1929] section-dark py-20 lg:py-28" id="manufacturer">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal>
              <p className="stag">{home('mfrStag')}</p>
              <h2 className="stitle">{MANUFACTURER.name}</h2>
              <div className="rule" aria-hidden="true"/>
              <div className="space-y-0 mb-6">
                {[
                  { label: home('labelFounded'), val: MANUFACTURER.founded },
                  { label: home('labelCountry'), val: MANUFACTURER.country },
                  { label: home('labelWebsite'), val: MANUFACTURER.websiteDisplay, href: MANUFACTURER.website },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-4 border-b border-[#1E3B5C] py-3">
                    <span className="text-xs font-semibold text-[#6B7A8D] w-20 shrink-0">{s.label}</span>
                    {s.href
                      ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#5CA4D6] hover:text-white transition-colors">{s.val}</a>
                      : <span className="text-sm font-semibold text-[#D0E3F4]">{s.val}</span>
                    }
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6B7A8D] leading-relaxed">
                {home('mfrNote')}{' '}
                <Link href={navHref('/manufacturer')} className="text-[#5CA4D6] hover:text-white transition-colors">{nav('manufacturer')} →</Link>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="relative rounded-2xl overflow-hidden aspect-video" style={{ background: '#152D4A' }}>
                <Image
                  src="https://terasun-europe.eu/imgs/manufacturer/factory.jpg"
                  alt="Zhejiang Terasun manufacturing facility"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1929]/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs font-bold text-white">{MANUFACTURER.name}</p>
                  <p className="text-[11px] text-[#B8CADE]">{MANUFACTURER.address}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BECOME A DISTRIBUTOR — premium dark CTA
      ══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D2240 0%, #1A4470 60%, #0D2240 100%)' }}>
        {/* Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="container-page relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <ScrollReveal>
                <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-[#5CA4D6] uppercase border border-[#5CA4D6]/30 rounded-full px-4 py-1.5 mb-6">
                  Partnership Programme
                </span>
                <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-4">
                  {home('distTitle')}
                </h2>
                <p className="text-[#B8CADE] leading-relaxed mb-8 text-sm">{home('distDesc')}</p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Exclusive territory arrangements available',
                    'Full technical and marketing support',
                    'Competitive ex-works pricing from China',
                    'CE/ETA documentation included',
                    'Sample stock programme for new partners',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#D0E3F4]">
                      <span className="w-4 h-4 rounded-full bg-[#5CA4D6]/20 border border-[#5CA4D6]/40 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#5CA4D6]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link href={navHref('/distributors')}
                    className="inline-flex items-center gap-2 bg-white text-[#245A85] font-bold px-6 py-3 rounded-lg text-sm hover:bg-[#EBF4FB] transition-colors shadow-lg">
                    {home('btnPartnership')} →
                  </Link>
                  <Link href={navHref('/contact')}
                    className="inline-flex items-center gap-2 border border-white/25 text-white font-medium px-6 py-3 rounded-lg text-sm hover:bg-white/8 transition-colors">
                    {nav('contact')}
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                {/* Open market map placeholder */}
                <div className="bg-white/[0.06] border border-white/[0.12] rounded-2xl p-7">
                  <p className="text-xs font-bold tracking-widest text-[#5CA4D6] uppercase mb-4">Open Markets</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Germany', 'Netherlands', 'France', 'Poland', 'Czech Republic', 'Spain', 'Italy', 'Austria', 'Belgium', 'Hungary'].map((c) => (
                      <span key={c} className="text-xs bg-white/[0.08] border border-white/[0.15] text-[#D0E3F4] px-3 py-1.5 rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.12] pt-5 space-y-3">
                    {[
                      { label: 'Min. order', val: '250 m² / container' },
                      { label: 'Lead time', val: '6–10 weeks from order' },
                      { label: 'Incoterms', val: 'EXW, FOB, CIF available' },
                    ].map((r) => (
                      <div key={r.label} className="flex justify-between text-sm">
                        <span className="text-[#6B7A8D]">{r.label}</span>
                        <span className="text-white font-semibold">{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FinnBuild badge */}
                <div className="mt-4 inline-flex items-center gap-3 bg-white/[0.06] border border-white/[0.12] rounded-xl px-5 py-3 w-full">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">{home('finnbuildLabel')} — {FINNBUILD.dates}</p>
                    <p className="text-xs text-[#7A9EC2]">{FINNBUILD.venue} · {home('finnbuildDesc')}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT CTA — light clean
      ══════════════════════════════════════════ */}
      <section className="bg-[#F4F7FA] py-20 lg:py-28" id="contact">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal>
              <p className="stag">{home('ctaStag')}</p>
              <h2 className="stitle">{home('ctaTitle')}</h2>
              <div className="rule" aria-hidden="true"/>
              <p className="text-[#4A5B6D] leading-relaxed mb-8">{home('ctaDesc')}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={navHref('/contact')} className="btn-primary text-sm">{home('btnOpenForm')} →</Link>
                <Link href={navHref('/downloads')} className="btn-secondary text-sm">Technical docs</Link>
              </div>
            </ScrollReveal>

            <div className="space-y-3">
              {[
                { icon: 'email',    label: home('labelEmail'),    val: CONTACT.email,        href: `mailto:${CONTACT.email}` },
                { icon: 'phone',    label: home('labelPhone'),    val: CONTACT.phoneDisplay,  href: `tel:${CONTACT.phone}` },
                { icon: 'location', label: home('labelLocation'), val: CONTACT.location,      href: undefined },
              ].map((c, i) => (
                <ScrollReveal key={c.label} delay={i * 70}>
                  <div className="card-lift flex items-center gap-4 bg-white border border-[#D8E1E9] rounded-xl p-4 hover:border-[#5CA4D6]/40 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-[#EBF4FB] border border-[#5CA4D6]/25 flex items-center justify-center shrink-0">
                      {c.icon === 'email' && (
                        <svg className="w-4 h-4 text-[#245A85]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
                        </svg>
                      )}
                      {c.icon === 'phone' && (
                        <svg className="w-4 h-4 text-[#245A85]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 013 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                      )}
                      {c.icon === 'location' && (
                        <svg className="w-4 h-4 text-[#245A85]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-[#8B9AAD] uppercase mb-0.5">{c.label}</div>
                      {c.href
                        ? <a href={c.href} className="text-sm font-semibold text-[#132238] hover:text-[#245A85] transition-colors">{c.val}</a>
                        : <span className="text-sm font-semibold text-[#132238]">{c.val}</span>
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
