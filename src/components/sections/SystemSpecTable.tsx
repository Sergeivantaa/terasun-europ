import { getTranslations } from 'next-intl/server'
import type { DiagramType } from '@/data/techDocs'

// Verified technical data only — sourced from:
// ETA 24/0895, DoP TRS-20250610F, CE 1023-CPR-1565 P, FIRES-CR-284-25-AUPE, EN 12467
type SpecRow = { labelKey: string; value: string }

const systemSpecs: Record<DiagramType, SpecRow[]> = {
  'ventilated-facade': [
    { labelKey: 'board',            value: 'Terasun TSM · 8–18 mm' },
    { labelKey: 'standard',         value: 'EN 12467' },
    { labelKey: 'fireClass',        value: 'A1' },
    { labelKey: 'moistureCategory', value: 'Category A — EN 12467' },
    { labelKey: 'substructure',     value: 'Steel or aluminium rail system' },
    { labelKey: 'airCavity',        value: 'Min. 40 mm (drained & ventilated)' },
    { labelKey: 'eta',              value: 'ETA 24/0895' },
    { labelKey: 'ce',               value: 'CE 1023-CPR-1565 P' },
  ],
  'render-facade': [
    { labelKey: 'board',            value: 'Terasun TSM · 8–12 mm' },
    { labelKey: 'standard',         value: 'EN 12467' },
    { labelKey: 'fireClass',        value: 'A1' },
    { labelKey: 'moistureCategory', value: 'Category A — EN 12467' },
    { labelKey: 'renderSystem',     value: 'Mineral or silicone render on fibreglass mesh' },
    { labelKey: 'eta',              value: 'ETA 24/0895' },
    { labelKey: 'ce',               value: 'CE 1023-CPR-1565 P' },
  ],
  'wet-room': [
    { labelKey: 'board',            value: 'Terasun TSM · 12 mm' },
    { labelKey: 'standard',         value: 'EN 12467' },
    { labelKey: 'fireClass',        value: 'A1' },
    { labelKey: 'moistureCategory', value: 'Category A — suitable for wet areas' },
    { labelKey: 'waterproofing',    value: 'MAPEI or Schönox approved system' },
    { labelKey: 'frame',            value: 'Steel or timber studs' },
    { labelKey: 'finish',           value: 'Ceramic tiles or natural stone' },
    { labelKey: 'eta',              value: 'ETA 24/0895' },
  ],
  'fire-partition': [
    { labelKey: 'board',            value: 'Terasun TSM 12 mm — both faces' },
    { labelKey: 'fireClass',        value: 'A1' },
    { labelKey: 'fireRating',       value: 'E 120 / EI 90 / EW 120' },
    { labelKey: 'testReport',       value: 'FIRES-CR-284-25-AUPE' },
    { labelKey: 'frame',            value: 'Steel C-studs 75–100 mm' },
    { labelKey: 'studSpacing',      value: '400 mm c/c' },
    { labelKey: 'insulation',       value: 'Mineral wool · min. 60 kg/m³ · continuous fill' },
    { labelKey: 'eta',              value: 'ETA 24/0895' },
  ],
  'steel-frame-exterior': [
    { labelKey: 'board',            value: 'Terasun TSM · 12 mm' },
    { labelKey: 'standard',         value: 'EN 12467' },
    { labelKey: 'fireClass',        value: 'A1' },
    { labelKey: 'moistureCategory', value: 'Category A — EN 12467' },
    { labelKey: 'frame',            value: 'Steel C-studs (LSF)' },
    { labelKey: 'studSpacing',      value: '400–600 mm c/c' },
    { labelKey: 'eta',              value: 'ETA 24/0895' },
    { labelKey: 'ce',               value: 'CE 1023-CPR-1565 P' },
  ],
  'interior-partition': [
    { labelKey: 'board',            value: 'Terasun TSM · 12 mm' },
    { labelKey: 'standard',         value: 'EN 12467' },
    { labelKey: 'fireClass',        value: 'A1' },
    { labelKey: 'frame',            value: 'Steel or timber studs' },
    { labelKey: 'studSpacing',      value: '400–600 mm c/c' },
    { labelKey: 'eta',              value: 'ETA 24/0895' },
    { labelKey: 'ce',               value: 'CE 1023-CPR-1565 P' },
  ],
  'modular': [
    { labelKey: 'board',            value: 'Terasun TSM · 12 mm' },
    { labelKey: 'standard',         value: 'EN 12467' },
    { labelKey: 'fireClass',        value: 'A1' },
    { labelKey: 'moistureCategory', value: 'Category A — EN 12467' },
    { labelKey: 'frame',            value: 'Steel C-studs (offsite fabricated)' },
    { labelKey: 'studSpacing',      value: '400 mm c/c' },
    { labelKey: 'eta',              value: 'ETA 24/0895' },
    { labelKey: 'ce',               value: 'CE 1023-CPR-1565 P' },
  ],
}

interface Props {
  type: DiagramType
  /** Short application description shown above the table */
  applicationSlug: string
}

export default async function SystemSpecTable({ type, applicationSlug }: Props) {
  const t = await getTranslations('systemSpecs')
  const rows = systemSpecs[type]
  if (!rows) return null

  // Get application description if available
  let appDesc: string | null = null
  try {
    appDesc = t(`applicationDesc.${applicationSlug}` as Parameters<typeof t>[0])
  } catch {
    try {
      appDesc = t(`applicationDesc.${type}` as Parameters<typeof t>[0])
    } catch {
      appDesc = null
    }
  }

  // Highlight rows for fire-rated system
  const highlightKeys = new Set(['fireRating', 'testReport', 'fireClass'])

  return (
    <div className="rounded-2xl border border-[#D8E1E9] overflow-hidden">
      {/* Table header */}
      <div className="bg-[#132238] px-5 py-3">
        <p className="text-white text-xs font-bold uppercase tracking-wider opacity-70">
          {t('labels.application')}
        </p>
        {appDesc && (
          <p className="text-[#9DB8D0] text-sm mt-1 leading-relaxed">{appDesc}</p>
        )}
      </div>

      {/* Spec table */}
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => {
            const isHighlight = highlightKeys.has(row.labelKey)
            const isEven = i % 2 === 0
            return (
              <tr
                key={row.labelKey}
                className={`border-b border-[#E8EEF4] last:border-0 ${
                  isHighlight
                    ? 'bg-[#FFF8E7]'
                    : isEven
                    ? 'bg-white'
                    : 'bg-[#F9FBFD]'
                }`}
              >
                <td className="px-5 py-2.5 font-medium text-[#6B7A8D] w-2/5 text-xs">
                  {t(`labels.${row.labelKey}` as Parameters<typeof t>[0])}
                </td>
                <td className={`px-5 py-2.5 font-semibold ${isHighlight ? 'text-[#8B4F00]' : 'text-[#132238]'}`}>
                  {row.value}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Source note */}
      <div className="px-5 py-2.5 bg-[#F5F8FB] border-t border-[#E8EEF4]">
        <p className="text-[10px] text-[#8B9AAD]">
          Source: ETA 24/0895 · DoP TRS-20250610F · CE 1023-CPR-1565 P
          {type === 'fire-partition' ? ' · FIRES-CR-284-25-AUPE' : ''}
          {' '}· EN 12467
        </p>
      </div>
    </div>
  )
}
