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

const LOCALE_LABELS: Record<Locale, string> = {
  en:'EN', de:'DE', fr:'FR', es:'ES', it:'IT', pt:'PT', nl:'NL', pl:'PL',
  fi:'FI', sv:'SV', no:'NO', da:'DA', et:'ET', lv:'LV', lt:'LT',
  cs:'CS', sk:'SK', hu:'HU', ro:'RO', bg:'BG', el:'EL', hr:'HR', sl:'SL',
  uk:'UK', ru:'RU',
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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
          <span className="text-lg font-black tracking-widest text-white group-hover:text-gold2 transition-colors duration-200">TERASUN</span>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-gold uppercase">Europe</span>
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
              <span className="absolute bottom-1 left-3 right-3 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
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
                  <span className="w-1 h-1 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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
              className="px-2.5 py-1.5 text-xs font-bold text-gray-400 hover:text-white border border-border-dark rounded-md hover:border-gray-500 transition-all duration-150"
              onClick={() => { setLangOpen(v => !v); setMoreOpen(false) }}
              aria-label="Select language"
            >
              {LOCALE_LABELS[locale as Locale] ?? locale.toUpperCase()}
            </button>

            <div
              className={`absolute right-0 top-full mt-2 rounded-xl shadow-2xl shadow-black/40 border py-2 max-h-64 overflow-y-auto min-w-[72px] transition-all duration-200 ${
                langOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              style={{ background: 'rgba(13,15,20,0.97)', backdropFilter: 'blur(16px)', borderColor: 'rgba(45,48,64,0.8)' }}
            >
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={localePath(loc)}
                  className={`block px-3 py-1.5 text-xs font-bold transition-colors duration-150 hover:bg-white/6 ${
                    loc === locale ? 'text-gold' : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setLangOpen(false)}
                >
                  {LOCALE_LABELS[loc]}
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

      {/* Mobile menu — height transition for smooth open/close */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-350 ease-in-out`}
        style={{
          maxHeight: mobileOpen ? '600px' : '0',
          opacity: mobileOpen ? 1 : 0,
          transitionDuration: mobileOpen ? '380ms' : '220ms',
        }}
        aria-label="Mobile navigation"
      >
        <div
          className="border-t py-4"
          style={{ background: 'rgba(13,15,20,0.98)', backdropFilter: 'blur(20px)', borderColor: 'rgba(45,48,64,0.7)' }}
        >
          <div className="container-page flex flex-col gap-0.5">
            {[...NAV_LINKS, ...MORE_LINKS].map(({ key, href }, i) => (
              <Link
                key={key}
                href={navHref(href)}
                className="px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/6 rounded-md transition-colors duration-150 animate-mobile-item"
                style={{ animationDelay: `${i * 35}ms` }}
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </Link>
            ))}

            <div className="border-t border-white/8 mt-3 pt-3 flex flex-col gap-2">
              <Link
                href={navHref('/contact')}
                className="btn-secondary text-sm text-center justify-center"
                onClick={() => setMobileOpen(false)}
              >
                {t('requestQuotation')}
              </Link>
              <a href={LOGIN_URL} className="btn-primary text-sm text-center justify-center">
                {t('login')}
              </a>

              {/* Language grid */}
              <div className="flex flex-wrap gap-1 mt-2">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={localePath(loc)}
                    className={`px-2 py-1 text-xs font-bold rounded-md border transition-colors duration-150 ${
                      loc === locale
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-border-dark text-gray-400 hover:text-white hover:border-gray-500'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
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
