export type TerritoryStatus = 'hq' | 'active' | 'open' | 'available'

export type Country = {
  slug: string
  name: string
  flag: string
  status: TerritoryStatus
  locale: string
  port?: string
}

export const countries: Country[] = [
  { slug: 'finland',         name: 'Finland',         flag: '🇫🇮', status: 'hq',        locale: 'fi',  port: 'Helsinki' },
  { slug: 'sweden',          name: 'Sweden',           flag: '🇸🇪', status: 'active',    locale: 'sv',  port: 'Gothenburg' },
  { slug: 'norway',          name: 'Norway',           flag: '🇳🇴', status: 'active',    locale: 'no',  port: 'Oslo' },
  { slug: 'denmark',         name: 'Denmark',          flag: '🇩🇰', status: 'active',    locale: 'da',  port: 'Copenhagen' },
  { slug: 'estonia',         name: 'Estonia',          flag: '🇪🇪', status: 'active',    locale: 'et',  port: 'Tallinn' },
  { slug: 'latvia',          name: 'Latvia',           flag: '🇱🇻', status: 'active',    locale: 'lv',  port: 'Riga' },
  { slug: 'lithuania',       name: 'Lithuania',        flag: '🇱🇹', status: 'active',    locale: 'lt',  port: 'Klaipeda' },
  { slug: 'germany',         name: 'Germany',          flag: '🇩🇪', status: 'open',      locale: 'de',  port: 'Hamburg' },
  { slug: 'netherlands',     name: 'Netherlands',      flag: '🇳🇱', status: 'open',      locale: 'nl',  port: 'Rotterdam' },
  { slug: 'belgium',         name: 'Belgium',          flag: '🇧🇪', status: 'open',      locale: 'nl',  port: 'Antwerp' },
  { slug: 'france',          name: 'France',           flag: '🇫🇷', status: 'open',      locale: 'fr' },
  { slug: 'spain',           name: 'Spain',            flag: '🇪🇸', status: 'open',      locale: 'es' },
  { slug: 'portugal',        name: 'Portugal',         flag: '🇵🇹', status: 'open',      locale: 'pt' },
  { slug: 'italy',           name: 'Italy',            flag: '🇮🇹', status: 'open',      locale: 'it' },
  { slug: 'austria',         name: 'Austria',          flag: '🇦🇹', status: 'open',      locale: 'de' },
  { slug: 'switzerland',     name: 'Switzerland',      flag: '🇨🇭', status: 'open',      locale: 'de' },
  { slug: 'poland',          name: 'Poland',           flag: '🇵🇱', status: 'open',      locale: 'pl',  port: 'Gdansk' },
  { slug: 'czech-republic',  name: 'Czech Republic',   flag: '🇨🇿', status: 'open',      locale: 'cs' },
  { slug: 'slovakia',        name: 'Slovakia',         flag: '🇸🇰', status: 'open',      locale: 'sk' },
  { slug: 'hungary',         name: 'Hungary',          flag: '🇭🇺', status: 'open',      locale: 'hu' },
  { slug: 'romania',         name: 'Romania',          flag: '🇷🇴', status: 'available', locale: 'ro' },
  { slug: 'bulgaria',        name: 'Bulgaria',         flag: '🇧🇬', status: 'available', locale: 'bg' },
  { slug: 'croatia',         name: 'Croatia',          flag: '🇭🇷', status: 'available', locale: 'hr' },
  { slug: 'slovenia',        name: 'Slovenia',         flag: '🇸🇮', status: 'available', locale: 'sl' },
  { slug: 'greece',          name: 'Greece',           flag: '🇬🇷', status: 'available', locale: 'el' },
  { slug: 'ireland',         name: 'Ireland',          flag: '🇮🇪', status: 'available', locale: 'en' },
  { slug: 'ukraine',         name: 'Ukraine',          flag: '🇺🇦', status: 'available', locale: 'uk' },
  { slug: 'luxembourg',      name: 'Luxembourg',       flag: '🇱🇺', status: 'available', locale: 'fr' },
]
