export type TechSpec = {
  key: string
  value: string
  standard?: string
  note?: string
}

export type BoardFormat = {
  size: string
  note?: string
}

export type DownloadDoc = {
  key: string
  slug: string
  size?: string
  requiresLogin?: boolean
}

// Full commercial thickness range.
// Only 12 mm has full certified documentation (EPD, CE marking, fire test).
// All other thicknesses: available subject to order volume and manufacturer confirmation.
export const products = {
  // Commercial range — subject to production availability
  thicknessesAll: [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 22, 25],

  // Primary documented thickness
  primaryThickness: 12,
  primaryWeightKgM2: 9.96,   // EPD-IES-0018268, 1200×2400 mm board
  primaryFormat: '1200 × 2400 mm',

  boardFormats: [
    { size: '1200 × 2400 mm' },
    { size: '1200 × 2500 mm' },
    { size: '1200 × 2600 mm' },
    { size: '1200 × 3000 mm' },
    { size: 'Custom', note: 'on request' },
  ] as BoardFormat[],

  // Safe neutral product description for marketing use.
  // Does not disclose EPD-only details (talc, cellulose, silica) pending
  // manufacturer confirmation for the full commercial thickness range.
  compositionShort: 'Lightweight cement-based core with inorganic binders and fibreglass mesh reinforcement.',
  compositionFull: 'TSM Cement Board is a lightweight cement-based construction board manufactured from inorganic cementitious binders, lightweight components and reinforcing fibreglass mesh. Its lightweight, slightly porous cementitious core reduces board weight while maintaining suitability for documented interior and exterior construction applications.',

  // Technical specs — certified/documented values only.
  // Fire classification applies to the tested 12 mm wall assembly; not valid for other thicknesses.
  // Weight 9.96 kg/m² is declared for 12 mm per EPD-IES-0018268.
  technicalSpecs: [
    { key: 'ceMarking',      value: '1023-CPR-1565 P',       standard: 'EU CPR' },
    { key: 'eta',            value: 'ETA 24/0895',           standard: 'EOTA' },
    { key: 'dop',            value: 'DoP TRS-20250610F',     standard: 'Per ETA 24/0895' },
    { key: 'fireResistance', value: 'E 120 / EI 90 / EW 120', standard: 'FIRES-CR-284-25-AUPE', note: 'Tested 12 mm wall assembly' },
    { key: 'weight12mm',     value: '9.96 kg/m²',           standard: 'EPD-IES-0018268',    note: '12 mm × 1200 × 2400 mm' },
    { key: 'epd',            value: 'EPD-IES-0018268',       standard: 'ISO 14025' },
    { key: 'binder',         value: 'Inorganic cementitious binders', standard: 'Asbestos-free' },
    { key: 'reinforcement',  value: 'Fibreglass mesh',       standard: 'Both faces' },
    { key: 'studSpacing',    value: '400 or 600 mm',        standard: 'Timber or steel frame' },
  ] as TechSpec[],

  downloadDocs: [
    { key: 'tds',          slug: 'technical-data-sheet',              size: 'PDF' },
    { key: 'installation', slug: 'installation-manual',               size: 'PDF' },
    { key: 'brochure',     slug: 'product-brochure',                  size: 'PDF' },
    { key: 'facade',       slug: 'facade-system-guide',               size: 'PDF', requiresLogin: true },
    { key: 'wetroom',      slug: 'wet-room-system-guide',             size: 'PDF', requiresLogin: true },
    { key: 'cutting',      slug: 'cutting-fixing-guide',              size: 'PDF' },
    { key: 'sds',          slug: 'safety-data-sheet',                 size: 'PDF' },
    { key: 'ce',           slug: 'ce-certificate',                    size: 'PDF' },
    { key: 'eta',          slug: 'test-verification-of-confirmity',   size: 'PDF' },
    { key: 'epd',          slug: 'epd',                               size: 'PDF' },
    { key: 'fire',         slug: 'fire-test-report',                  size: 'PDF', requiresLogin: true },
    { key: 'voc',          slug: 'environmental-product-declaration', size: 'PDF' },
  ] as DownloadDoc[],
}
