import { defineRouting } from 'next-intl/routing'

// 24 EU official languages + Russian, Ukrainian, Norwegian
export const locales = [
  'en', 'bg', 'hr', 'cs', 'da', 'nl', 'et', 'fi', 'fr', 'de',
  'el', 'hu', 'ga', 'it', 'lv', 'lt', 'mt', 'pl', 'pt', 'ro',
  'sk', 'sl', 'es', 'sv', 'nb', 'ru', 'uk', 'no',
] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
})
