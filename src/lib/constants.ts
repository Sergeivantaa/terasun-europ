export const BACKEND_URL = 'https://terasun-europe.eu'
export const FORM_ACTION = `${BACKEND_URL}/quotation-enquiry-request`
export const LOGIN_URL = `${BACKEND_URL}/login`
export const REGISTER_URL = `${BACKEND_URL}/register`
export const DOWNLOAD_BASE = `${BACKEND_URL}/documents/download`
export const CSRF_URL = `${BACKEND_URL}/api/csrf-token`

export const SITE_URL = 'https://terasun-europe.eu'
export const SITE_NAME = 'Terasun Europe'

export const CONTACT = {
  email: 'sales@terasun-europe.eu',
  location: '01370 Vantaa, Finland',
  address: 'Teollisuustie, 01370',
  city: 'Vantaa, Finland',
  vat: 'FI33599486',
} as const

export const MANUFACTURER = {
  name: 'Zhejiang Terasun Air Duct Co., Ltd.',
  country: 'China',
  province: 'Zhejiang Province, People\'s Republic of China',
  address: 'Zhejiang Province, China',
  founded: '1989',
  website: 'https://www.terasun.cn',
  websiteDisplay: 'www.terasun.cn',
} as const

export const PRODUCT = {
  name: 'Terasun TSM Cement Board',
  shortName: 'TSM',
  weightKgM2: '9.96',
  thickness: '12',
  width: '1200',
  length: '2400',
  ce: '1023-CPR-1565 P',
  eta: '24/0895',
  dop: 'TRS-20250610F',
  epd: 'EPD-IES-0018268',
  epdValidUntil: '2029-03-14',
  epdPublished: '2025-03-14',
  fireReport: 'FIRES-CR-284-25-AUPE',
  fireClass: 'E 120 / EI 90 / EW 120',
} as const

export const FINNBUILD = {
  dates: '29 September – 1 October 2026',
  venue: 'Messukeskus, Helsinki, Finland',
  dateISO: '2026-09-29',
} as const
