import { defineRouting } from 'next-intl/routing'

export const locales = [
  'en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl',
  'fi', 'sv', 'no', 'da', 'et', 'lv', 'lt',
  'cs', 'sk', 'hu', 'ro', 'bg', 'el', 'hr', 'sl',
  'uk', 'ru',
] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
})
