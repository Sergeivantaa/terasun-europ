'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { locales, type Locale } from '@/i18n/routing'
import { LOGIN_URL } from '@/lib/constants'

type Props = { locale: string }

const NAV_LINKS = [
  { key: 'about',          href: '/about' },
  { key: 'products',       href: '/products' },
  { key: 'applications',   href: '/applications' },
  { key: 'certifications', href: '/certifications' },
  { key: 'distributors',   href: '/distributors' },
] as const

const MORE_LINKS = [
  { key: 'manufacturer', href: '/manufacturer' },
  { key: 'logistics',    href: '/logistics' },
  { key: 'downloads',    href: '/downloads' },
  { key: 'gallery',      href: '/gallery' },
  { key: 'faq',          href: '/faq' },
] as const

// ISO code shown in trigger button; full native name shown in dropdown
const LOCALE_CODE: Record<Locale, string> = {
  en:'EN', bg:'BG', hr:'HR', cs:'CS', da:'DA', nl:'NL', et:'ET', fi:'FI',
  fr:'FR', de:'DE', el:'EL', hu:'HU', ga:'GA', it:'IT', lv:'LV', lt:'LT',
  mt:'MT', pl:'PL', pt:'PT', ro:'RO', sk:'SK', sl:'SL', es:'ES', sv:'SV', nb:'NB',
}

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  bg: 'Български',
  hr: 'Hrvatski',
  cs: 'Čeština',
  da: 'Dansk',
  nl: 'Nederlands',
  et: 'Eesti',
  fi: 'Suomi',
  fr: 'Français',
  de: 'Deutsch',
  el: 'Ελληνικά',
  hu: 'Magyar',
  ga: 'Gaeilge',
  it: 'Italiano',
  lv: 'Latviešu',
  lt: 'Lietuvių',
  mt: 'Malti',
  pl: 'Polski',
  pt: 'Português',
  ro: 'Română',
  sk: 'Slovenčina',
  sl: 'Slovenščina',
  es: 'Español',
  sv: 'Svenska',
  nb: 'Norsk',
}

export default function Header({ locale }: Props) {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen]     = useState(false)
  const [langOpen, setLangOpen]     = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  const moreRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  // Scroll effect — darken nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // Lock body scroll + signal popup guard when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    document.body.setAttribute('data-mobile-open', mobileOpen ? 'true' : 'false')
    return () => {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-mobile-open')
    }
  }, [mobileOpen])

  const localePath = (loc: string) => {
    const segments = pathname.split('/')
    segments[1] = loc
    return segments.join('/') || `/${loc}`
  }

  const navHref = (path: string) => `/${locale}${path}`

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-dark/[0.97] backdrop-blur-xl border-border-dark shadow-2xl shadow-black/30'
          : 'bg-dark/85 backdrop-blur-lg border-white/5'
      }`}
      aria-label="Main navigation"
    >
      <div className="container-page flex items-center justify-between h-16">

        {/* Logo */}
        <Link href={navHref('')} className="flex flex-col leading-none group shrink-0">
          <span className="text-lg font-black tracking-widest text-white group-hover:text-[#5CA4D6] transition-colors duration-200">TERASUN</span>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-[#5CA4D6] uppercase">Europe</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={navHref(href)}
              className="relative px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-150 rounded-md hover:bg-white/6 group"
            >
              {t(key)}
              <span className="absolute bottom-1 left-3 right-3 h-px bg-[#5CA4D6] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-150 rounded-md hover:bg-white/6"
              onClick={() => { setMoreOpen(v => !v); setLangOpen(false) }}
              aria-expanded={moreOpen}
            >
              {t('more')}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M1 1l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown — always rendered, toggled via opacity/pointer-events for smooth transition */}
            <div
              className={`absolute top-full left-0 mt-2 min-w-[180px] py-2 rounded-xl shadow-2xl shadow-black/40 border transition-all duration-200 ${
                moreOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              style={{ background: 'rgba(13,15,20,0.97)', backdropFilter: 'blur(16px)', borderColor: 'rgba(45,48,64,0.8)' }}
              role="menu"
            >
              {MORE_LINKS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={navHref(href)}
                  role="menuitem"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/6 transition-colors duration-150 group"
                  onClick={() => setMoreOpen(false)}
                >
                  <span className="w-1 h-1 rounded-full bg-[#5CA4D6] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  {t(key)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2">

          {/* Language picker */}
          <div className="relative" ref={langRef}>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white border border-white/20 rounded-md hover:border-white/50 hover:bg-white/8 transition-all duration-150"
              onClick={() => { setLangOpen(v => !v); setMoreOpen(false) }}
              aria-label="Select language"
              aria-expanded={langOpen}
            >
              <svg className="w-3 h-3 text-white/60" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5"/>
                <path d="M8 1.5C8 1.5 5.5 4.5 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4.5 10.5 8S8 14.5 8 14.5M1.5 8h13"/>
              </svg>
              {LOCALE_CODE[locale as Locale] ?? locale.toUpperCase()}
              <svg className={`w-2.5 h-2.5 text-white/50 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M1 1l4 4 4-4"/>
              </svg>
            </button>

            <div
              className={`absolute right-0 top-full mt-2 rounded-xl shadow-2xl shadow-black/50 border py-2 max-h-72 overflow-y-auto min-w-[160px] transition-all duration-200 ${
                langOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              style={{ background: 'rgba(10,18,30,0.98)', backdropFilter: 'blur(16px)', borderColor: 'rgba(92,164,214,0.2)' }}
              role="listbox"
              aria-label="Language"
            >
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={localePath(loc)}
                  role="option"
                  aria-selected={loc === locale}
                  className={`flex items-center gap-2.5 px-4 py-2 text-xs transition-colors duration-150 hover:bg-white/8 ${
                    loc === locale
                      ? 'text-white font-semibold bg-white/6'
                      : 'text-[#B8CADE] hover:text-white font-medium'
                  }`}
                  onClick={() => setLangOpen(false)}
                >
                  <span className="text-[10px] font-mono text-white/40 w-6 shrink-0">{LOCALE_CODE[loc]}</span>
                  {LOCALE_LABELS[loc]}
                  {loc === locale && (
                    <svg className="ml-auto w-3 h-3 text-[#5CA4D6]" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={navHref('/contact')}
            className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 font-medium px-4 py-2 rounded-md text-xs hover:border-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            {t('requestQuotation')}
          </Link>

          <a
            href={LOGIN_URL}
            className="flex items-center gap-1.5 btn-primary text-xs py-2 px-4"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5" aria-hidden="true">
              <circle cx="8" cy="5" r="3"/>
              <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
            </svg>
            {t('login')}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md hover:bg-white/8 transition-colors"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}/>
          <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`}/>
          <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? '85vh' : '0',
          opacity: mobileOpen ? 1 : 0,
          overflowY: mobileOpen ? 'auto' : 'hidden',
          transition: `max-height ${mobileOpen ? '380ms' : '220ms'} ease-in-out, opacity ${mobileOpen ? '280ms' : '180ms'} ease`,
        }}
        aria-label="Mobile navigation"
      >
        <div
          className="border-t py-5"
          style={{ background: '#0D1520', borderColor: 'rgba(45,48,64,0.8)' }}
        >
          <div className="container-page flex flex-col gap-0.5">
            {/* Nav links */}
            {[...NAV_LINKS, ...MORE_LINKS].map(({ key, href }, i) => (
              <Link
                key={key}
                href={navHref(href)}
                className="px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/6 rounded-lg transition-colors duration-150"
                style={{ animationDelay: `${i * 30}ms` }}
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </Link>
            ))}

            {/* CTA buttons */}
            <div className="mt-4 pt-4 flex flex-col gap-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <Link
                href={navHref('/contact')}
                onClick={() => setMobileOpen(false)}
                className="block text-center py-3 px-4 rounded-xl text-sm font-semibold text-white transition-colors duration-150"
                style={{ border: '1px solid rgba(255,255,255,0.22)', backgroundColor: 'transparent' }}
              >
                {t('requestQuotation')}
              </Link>
              <a
                href={LOGIN_URL}
                className="block text-center py-3 px-4 rounded-xl text-sm font-bold text-white transition-colors duration-150"
                style={{ backgroundColor: '#245A85' }}
              >
                {t('login')}
              </a>
            </div>

            {/* Language selector */}
            <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3 px-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Language</p>
              <div className="grid grid-cols-2 gap-1.5">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={localePath(loc)}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-xs rounded-lg border transition-colors duration-150"
                    style={loc === locale
                      ? { borderColor: 'rgba(92,164,214,0.5)', color: '#ffffff', backgroundColor: 'rgba(92,164,214,0.12)', fontWeight: 600 }
                      : { borderColor: 'rgba(255,255,255,0.1)', color: '#B8CADE', backgroundColor: 'transparent', fontWeight: 500 }
                    }
                  >
                    <span className="text-[9px] font-mono shrink-0" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
                      {LOCALE_CODE[loc]}
                    </span>
                    {LOCALE_LABELS[loc]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
