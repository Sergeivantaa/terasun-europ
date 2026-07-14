export type Certification = {
  key: string
  icon: string
  ref: string
  downloadSlug: string
  priority: number
}

export const certifications: Certification[] = [
  {
    key: 'ce',
    icon: '🏷️',
    ref: 'CE 1023-CPR-1565 P',
    downloadSlug: 'ce-certificate',
    priority: 1,
  },
  {
    key: 'eta',
    icon: '📋',
    ref: 'ETA 24/0895',
    downloadSlug: 'test-verification-of-confirmity',
    priority: 2,
  },
  {
    key: 'dop',
    icon: '📄',
    ref: 'DoP TRS-20250610F',
    downloadSlug: 'declaration-of-performance',
    priority: 3,
  },
  {
    key: 'epd',
    icon: '🌿',
    ref: 'EPD-IES-0018268',
    downloadSlug: 'epd',
    priority: 4,
  },
  {
    key: 'fire',
    icon: '🔥',
    ref: 'FIRES-CR-284-25-AUPE',
    downloadSlug: 'fire-test-report',
    priority: 5,
  },
  {
    key: 'voc',
    icon: '💨',
    ref: 'Intertek',
    downloadSlug: 'environmental-product-declaration',
    priority: 6,
  },
  {
    key: 'authorisation',
    icon: '📜',
    ref: 'Zhejiang Terasun → Terasun Europe',
    downloadSlug: 'authorisation-letter',
    priority: 7,
  },
  {
    key: 'reach',
    icon: '⚗️',
    ref: 'No SVHC above 0.1% w/w',
    downloadSlug: 'reach-svhc-declaration',
    priority: 8,
  },
]
