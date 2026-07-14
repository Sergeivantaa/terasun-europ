export type TechSpec = {
  key: string
  value: string
  standard?: string
}

export type BoardFormat = {
  size: string
  note?: string
}

export type Composition = {
  key: string
}

export type DownloadDoc = {
  key: string
  slug: string
  size?: string
}

export const products = {
  thicknesses: [6, 8, 9, 10, 12, 15, 18],

  boardFormats: [
    { size: '1200×2400 mm' },
    { size: '1200×2500 mm' },
    { size: '1200×2600 mm' },
    { size: '1200×3000 mm' },
    { size: 'Custom', note: 'on request' },
  ] as BoardFormat[],

  composition: [
    { key: 'cement' },
    { key: 'cellulose' },
    { key: 'silica' },
    { key: 'autoclaved' },
    { key: 'asbestosFree' },
    { key: 'waterResistant' },
  ] as Composition[],

  technicalSpecs: [
    { key: 'ceMarking',       value: '1023-CPR-1565 P',        standard: 'EU CPR' },
    { key: 'eta',             value: 'ETA 24/0895',            standard: 'EOTA' },
    { key: 'dop',             value: 'DoP TRS-20250610F',      standard: 'Per ETA 24/0895' },
    { key: 'fireResistance',  value: 'E120 / EI90 / EW120',   standard: 'FIRES-CR-284-25-AUPE' },
    { key: 'weight12mm',      value: '9.96 kg/m²',            standard: 'EPD-IES-0018268' },
    { key: 'epd',             value: 'EPD-IES-0018268',        standard: 'ISO 14025' },
    { key: 'binder',          value: 'Portland cement',        standard: 'Asbestos-free' },
    { key: 'reinforcement',   value: 'Cellulose fiber',        standard: 'Autoclaved' },
    { key: 'studSpacing',     value: '400 or 600 mm',         standard: 'Timber / steel frame' },
  ] as TechSpec[],

  downloadDocs: [
    { key: 'tds',          slug: 'technical-data-sheet',              size: 'PDF' },
    { key: 'installation', slug: 'installation-manual',               size: 'PDF' },
    { key: 'brochure',     slug: 'product-brochure',                  size: 'PDF' },
    { key: 'facade',       slug: 'facade-system-guide',               size: 'PDF' },
    { key: 'wetroom',      slug: 'wet-room-system-guide',             size: 'PDF' },
    { key: 'cutting',      slug: 'cutting-fixing-guide',              size: 'PDF' },
    { key: 'sds',          slug: 'safety-data-sheet',                 size: 'PDF' },
    { key: 'ce',           slug: 'ce-certificate',                    size: 'PDF' },
    { key: 'eta',          slug: 'test-verification-of-confirmity',   size: 'PDF' },
    { key: 'epd',          slug: 'epd',                               size: 'PDF' },
    { key: 'fire',         slug: 'fire-test-report',                  size: 'PDF' },
    { key: 'voc',          slug: 'environmental-product-declaration', size: 'PDF' },
  ] as DownloadDoc[],
}
