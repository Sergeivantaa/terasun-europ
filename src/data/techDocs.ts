import { DOWNLOAD_BASE } from '@/lib/constants'

export type DocStatus = 'available' | 'login' | 'coming-soon'

export type DocCategory =
  | 'installation'
  | 'system-guide'
  | 'technical-data'
  | 'certification'
  | 'fire'
  | 'environmental'
  | 'drawings'
  | 'brochure'

export type DiagramType =
  | 'ventilated-facade'
  | 'render-facade'
  | 'wet-room'
  | 'fire-partition'
  | 'steel-frame-exterior'
  | 'interior-partition'
  | 'modular'

export interface TechDoc {
  id: string
  name: string
  desc: string
  category: DocCategory
  /** backend slug for DOWNLOAD_BASE — undefined means coming-soon */
  slug?: string
  status: DocStatus
  format: 'PDF' | 'DWG' | 'IFC' | 'ZIP'
  applications: string[]   // application slug array — '*' = all
}

export const techDocs: TechDoc[] = [
  // ── Always available (all applications) ─────────────────────────────────
  {
    id: 'tds',
    name: 'Technical Data Sheet',
    desc: 'Full product specifications: weight, dimensions, fire class, moisture category, standards',
    category: 'technical-data',
    slug: 'technical-data-sheet',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },
  {
    id: 'installation',
    name: 'Installation Manual',
    desc: 'General installation guidance: cutting, fixing, jointing, storage, and handling',
    category: 'installation',
    slug: 'installation-manual',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },
  {
    id: 'cutting-fixing',
    name: 'Cutting & Fixing Guide',
    desc: 'Screw types, drill sizes, edge distances, stud spacing, and blade specifications',
    category: 'installation',
    slug: 'cutting-fixing-guide',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },
  {
    id: 'ce',
    name: 'CE Certificate — 1023-CPR-1565 P',
    desc: 'CE marking certificate under EN 12467 and the Construction Products Regulation',
    category: 'certification',
    slug: 'ce-certificate',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },
  {
    id: 'eta',
    name: 'European Technical Assessment ETA 24/0895',
    desc: 'Full ETA document confirming performance for facade, wet room, and fire applications',
    category: 'certification',
    slug: 'test-verification-of-confirmity',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },
  {
    id: 'dop',
    name: 'Declaration of Performance — TRS-20250610F',
    desc: 'DoP issued under CPR: declared values for all essential characteristics',
    category: 'certification',
    slug: 'dop-trs-20250610f',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },
  {
    id: 'epd',
    name: 'Environmental Product Declaration — EPD-IES-0018268',
    desc: 'ISO 14025 Type III EPD: GWP, primary energy, acidification, eutrophication. Valid to 2029.',
    category: 'environmental',
    slug: 'epd',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },
  {
    id: 'voc',
    name: 'VOC / Intertek Certificate',
    desc: 'VOC emissions and chemical safety certificate. Supports LEED/BREEAM indoor air quality credits.',
    category: 'environmental',
    slug: 'environmental-product-declaration',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },
  {
    id: 'sds',
    name: 'Safety Data Sheet',
    desc: 'REACH-compliant SDS for on-site handling, cutting dust management, and storage',
    category: 'technical-data',
    slug: 'safety-data-sheet',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },
  {
    id: 'brochure',
    name: 'Product Brochure',
    desc: 'Overview brochure with applications, certifications, and supply information',
    category: 'brochure',
    slug: 'product-brochure',
    status: 'available',
    format: 'PDF',
    applications: ['*'],
  },

  // ── Facade / Ventilated Facade ──────────────────────────────────────────
  {
    id: 'facade-guide',
    name: 'Facade System Guide',
    desc: 'Ventilated facade system specification: subframe, cavity, board layout, joint details',
    category: 'system-guide',
    slug: 'facade-system-guide',
    status: 'login',
    format: 'PDF',
    applications: [
      'facade-systems',
      'cement-board-ventilated-facades',
      'cement-board-exterior-walls',
      'commercial-buildings',
      'residential',
      'cement-board-renovation',
    ],
  },
  {
    id: 'fastening-guide',
    name: 'Facade Fastening Guide',
    desc: 'Screw spacing, load tables, edge distances, and wind-load anchoring for facade systems',
    category: 'installation',
    status: 'coming-soon',
    format: 'PDF',
    applications: [
      'facade-systems',
      'cement-board-ventilated-facades',
      'cement-board-exterior-walls',
    ],
  },
  {
    id: 'joint-treatment',
    name: 'Joint Treatment Guide',
    desc: 'Movement joints, perimeter sealing, mesh tape bedding, and sealant specification',
    category: 'installation',
    status: 'coming-soon',
    format: 'PDF',
    applications: [
      'facade-systems',
      'cement-board-ventilated-facades',
      'cement-board-exterior-walls',
      'cement-board-exterior-plaster',
      'cement-board-interior-walls',
    ],
  },
  {
    id: 'facade-cad',
    name: 'Facade Typical Details (CAD)',
    desc: 'DWG drawings: wall sections, corner details, window reveals, base condition',
    category: 'drawings',
    status: 'coming-soon',
    format: 'DWG',
    applications: [
      'facade-systems',
      'cement-board-ventilated-facades',
      'cement-board-exterior-walls',
    ],
  },
  {
    id: 'render-guide',
    name: 'Render System Guide',
    desc: 'Using TSM board as a render carrier: basecoat, fibreglass mesh, topcoat specification',
    category: 'system-guide',
    status: 'coming-soon',
    format: 'PDF',
    applications: [
      'cement-board-exterior-plaster',
      'cement-board-exterior-walls',
      'facade-systems',
    ],
  },

  // ── Wet Room / Bathroom ─────────────────────────────────────────────────
  {
    id: 'wetroom-guide',
    name: 'Wet Room System Guide',
    desc: 'Tile backer board specification: waterproofing membrane, adhesive selection, grout',
    category: 'system-guide',
    slug: 'wet-room-system-guide',
    status: 'login',
    format: 'PDF',
    applications: [
      'wet-rooms',
      'cement-board-wet-rooms',
      'cement-board-bathrooms',
    ],
  },
  {
    id: 'waterproofing-guide',
    name: 'Waterproofing Application Guide',
    desc: 'Waterproof membrane systems compatible with TSM board: tanking, brush-applied, sheet',
    category: 'system-guide',
    status: 'coming-soon',
    format: 'PDF',
    applications: [
      'wet-rooms',
      'cement-board-wet-rooms',
      'cement-board-bathrooms',
    ],
  },
  {
    id: 'wetroom-cad',
    name: 'Wet Room Details (CAD)',
    desc: 'DWG sections: floor-wall junction, penetration details, shower tray surround',
    category: 'drawings',
    status: 'coming-soon',
    format: 'DWG',
    applications: [
      'wet-rooms',
      'cement-board-wet-rooms',
      'cement-board-bathrooms',
    ],
  },

  // ── Fire-Rated Systems ──────────────────────────────────────────────────
  {
    id: 'fire-test',
    name: 'Fire Test Report — FIRES-CR-284-25-AUPE',
    desc: 'Full test report: E120/EI90/EW120 wall assembly, test conditions, results',
    category: 'fire',
    slug: 'fire-test-report',
    status: 'login',
    format: 'PDF',
    applications: [
      'fire-protection',
      'fire-rated-cement-board-wall-system',
      'cement-board-steel-frame-construction',
      'cement-board-interior-walls',
    ],
  },
  {
    id: 'fire-manual',
    name: 'Fire-Rated Wall Installation Manual',
    desc: 'Step-by-step installation of E120/EI90/EW120 tested wall assembly with steel studs',
    category: 'installation',
    status: 'coming-soon',
    format: 'PDF',
    applications: [
      'fire-protection',
      'fire-rated-cement-board-wall-system',
    ],
  },
  {
    id: 'fire-assemblies',
    name: 'Tested Wall Assemblies Guide',
    desc: 'Full specification of the tested E120/EI90/EW120 wall system: studs, infill, board layers',
    category: 'system-guide',
    status: 'coming-soon',
    format: 'PDF',
    applications: [
      'fire-protection',
      'fire-rated-cement-board-wall-system',
      'cement-board-steel-frame-construction',
    ],
  },
  {
    id: 'fire-cad',
    name: 'Fire-Rated Wall Details (CAD)',
    desc: 'DWG drawings: wall cross-section, penetration details, junction details',
    category: 'drawings',
    status: 'coming-soon',
    format: 'DWG',
    applications: [
      'fire-protection',
      'fire-rated-cement-board-wall-system',
    ],
  },

  // ── Steel Frame / Modular ───────────────────────────────────────────────
  {
    id: 'steel-frame-guide',
    name: 'Steel Frame System Guide',
    desc: 'LSF construction: stud selection, screw schedule, board layout, movement joints',
    category: 'system-guide',
    status: 'coming-soon',
    format: 'PDF',
    applications: [
      'steel-frame',
      'cement-board-steel-frame-construction',
      'cement-board-modular-construction',
      'cement-board-prefabricated-buildings',
    ],
  },
  {
    id: 'steel-frame-cad',
    name: 'Steel Frame Details (CAD)',
    desc: 'DWG: stud layout, board orientation, corner and junction details',
    category: 'drawings',
    status: 'coming-soon',
    format: 'DWG',
    applications: [
      'steel-frame',
      'cement-board-steel-frame-construction',
    ],
  },

  // ── Interior Walls ──────────────────────────────────────────────────────
  {
    id: 'interior-guide',
    name: 'Interior Wall System Guide',
    desc: 'Partition walls, service zones, acoustic performance, tile-ready substrates',
    category: 'system-guide',
    status: 'coming-soon',
    format: 'PDF',
    applications: [
      'cement-board-interior-walls',
      'commercial-buildings',
      'residential',
    ],
  },
]

/** Returns documents for a given application slug (includes '*' global docs) */
export function getDocsForApplication(slug: string): TechDoc[] {
  return techDocs.filter(
    d => d.applications.includes('*') || d.applications.includes(slug)
  )
}

/** Returns the download URL for an available/login doc */
export function docDownloadUrl(doc: TechDoc): string | null {
  if (!doc.slug || doc.status === 'coming-soon') return null
  return `${DOWNLOAD_BASE}/${doc.slug}`
}

/** Ordered display categories */
export const categoryOrder: DocCategory[] = [
  'installation',
  'system-guide',
  'fire',
  'technical-data',
  'certification',
  'drawings',
  'environmental',
  'brochure',
]

export const categoryLabels: Record<DocCategory, string> = {
  installation: 'Installation',
  'system-guide': 'System Guides',
  fire: 'Fire Documentation',
  'technical-data': 'Technical Data',
  certification: 'Certifications',
  drawings: 'Drawings & CAD',
  environmental: 'Environmental',
  brochure: 'Brochures',
}

/** Diagram type lookup by application slug */
export const applicationDiagram: Record<string, DiagramType> = {
  'facade-systems': 'ventilated-facade',
  'cement-board-ventilated-facades': 'ventilated-facade',
  'cement-board-exterior-walls': 'ventilated-facade',
  'cement-board-exterior-plaster': 'render-facade',
  'wet-rooms': 'wet-room',
  'cement-board-wet-rooms': 'wet-room',
  'cement-board-bathrooms': 'wet-room',
  'fire-protection': 'fire-partition',
  'fire-rated-cement-board-wall-system': 'fire-partition',
  'steel-frame': 'steel-frame-exterior',
  'cement-board-steel-frame-construction': 'steel-frame-exterior',
  'cement-board-modular-construction': 'modular',
  'cement-board-prefabricated-buildings': 'modular',
  'cement-board-interior-walls': 'interior-partition',
  'commercial-buildings': 'ventilated-facade',
  'residential': 'ventilated-facade',
  'cement-board-renovation': 'ventilated-facade',
}
