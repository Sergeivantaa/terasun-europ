'use client'

import { useState } from 'react'
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
  const [moreOpen, setMoreOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const localePath = (loc: string) => {
    const segments = pathname.split('/')
    segments[1] = loc
    return segments.join('/') || `/${loc}`
  }

  const navHref = (path: string) => `/${locale}${path}`

  return (
    <nav className="sticky top-0 z-50 bg-dark/95 backdrop-blur border-b border-border" aria-label="Main navigation">
      <div className="container-page flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={navHref('')} className="flex flex-col leading-none group">
          <span className="text-lg font-black tracking-widest text-white group-hover:text-gold2 transition-colors">TERASUN</span>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-gold uppercase">Europe</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={navHref(href)}
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded hover:bg-white/5"
            >
              {t(key)}
            </Link>
          ))}
          {/* More dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded hover:bg-white/5"
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
            >
              {t('more')}
              <svg className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {moreOpen && (
              <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-xl py-1 min-w-[160px]" role="menu">
                {MORE_LINKS.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={navHref(href)}
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => setMoreOpen(false)}
                  >
                    {t(key)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Language picker */}
          <div className="relative">
            <button
              className="px-2.5 py-1.5 text-xs font-bold text-gray-400 hover:text-white border border-border rounded hover:border-gray-500 transition-colors"
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Select language"
            >
              {LOCALE_LABELS[locale as Locale] ?? locale.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-xl py-1 max-h-64 overflow-y-auto min-w-[80px]">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={localePath(loc)}
                    className={`block px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-white/5 ${loc === locale ? 'text-gold' : 'text-gray-300 hover:text-white'}`}
                    onClick={() => setLangOpen(false)}
                  >
                    {LOCALE_LABELS[loc]}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href={navHref('/contact')} className="btn-secondary text-xs py-2 px-4">
            {t('requestQuotation')}
          </Link>
          <a href={LOGIN_URL} className="flex items-center gap-1.5 btn-primary text-xs py-2 px-4">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5" aria-hidden="true">
              <circle cx="8" cy="5" r="3"/>
              <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
            </svg>
            {t('login')}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block w-6 h-0.5 bg-gray-300 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-gray-300 transition-all ${mobileOpen ? 'opacity-0' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-gray-300 transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border" aria-label="Mobile navigation">
          <div className="container-page py-4 flex flex-col gap-1">
            {[...NAV_LINKS, ...MORE_LINKS].map(({ key, href }) => (
              <Link
                key={key}
                href={navHref(href)}
                className="px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-3 flex flex-col gap-2">
              <Link href={navHref('/contact')} className="btn-secondary text-sm text-center" onClick={() => setMobileOpen(false)}>
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
                    className={`px-2 py-1 text-xs font-bold rounded border transition-colors ${loc === locale ? 'border-gold text-gold' : 'border-border text-gray-400 hover:text-white hover:border-gray-500'}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {LOCALE_LABELS[loc]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
