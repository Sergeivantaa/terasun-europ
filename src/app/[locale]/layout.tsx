import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { SITE_URL, SITE_NAME } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

// og:locale requires BCP47 region format (de_DE), not just language (de)
const OG_LOCALES: Record<string, string> = {
  en: 'en_GB', de: 'de_DE', fr: 'fr_FR', es: 'es_ES', it: 'it_IT',
  pt: 'pt_PT', nl: 'nl_NL', pl: 'pl_PL', fi: 'fi_FI', sv: 'sv_SE',
  no: 'nb_NO', da: 'da_DK', et: 'et_EE', lv: 'lv_LV', lt: 'lt_LT',
  cs: 'cs_CZ', sk: 'sk_SK', hu: 'hu_HU', ro: 'ro_RO', bg: 'bg_BG',
  el: 'el_GR', hr: 'hr_HR', sl: 'sl_SI', uk: 'uk_UA', ru: 'ru_RU',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  // Build full hreflang map with x-default pointing to English
  const hreflangMap = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`])
  ) as Record<string, string>
  hreflangMap['x-default'] = `${SITE_URL}/en`

  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: hreflangMap,
    },
    openGraph: {
      locale: OG_LOCALES[locale] ?? 'en_GB',
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALES[l] ?? l),
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1a1c22" />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%231a1c22'/%3E%3Ctext x='16' y='24' font-family='Arial' font-size='22' font-weight='700' fill='%23b8932a' text-anchor='middle'%3ET%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:rounded"
          >
            {SITE_NAME}
          </a>
          <Header locale={locale} />
          <main id="main-content">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
