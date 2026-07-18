'use client'

import type { DiagramType } from '@/data/techDocs'

interface Layer {
  label: string
  sublabel?: string
  thickness?: string
  fill: string
  stroke: string
  pattern?: 'hatch' | 'dot' | 'brick' | 'solid' | 'wool' | 'board'
  highlight?: boolean
}

const diagrams: Record<DiagramType, { title: string; subtitle: string; direction: string; layers: Layer[] }> = {
  'ventilated-facade': {
    title: 'Ventilated Facade System',
    subtitle: 'Drained & ventilated rainscreen cladding',
    direction: 'Exterior ←  →  Interior',
    layers: [
      { label: 'Exterior finish', sublabel: 'Paint / mineral render', thickness: '2–5 mm', fill: '#E8F4FD', stroke: '#5CA4D6', pattern: 'solid' },
      { label: 'Terasun TSM', sublabel: 'CE 1023-CPR-1565 P · A1', thickness: '8–12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
      { label: 'Air cavity', sublabel: 'Ventilated gap — min. 40 mm', thickness: '40–100 mm', fill: '#F0F8FF', stroke: '#B0C8DB', pattern: 'solid' },
      { label: 'Breather membrane', sublabel: 'Wind-tight, vapour-open', thickness: '0.5 mm', fill: '#FDEBD0', stroke: '#E8A055', pattern: 'solid' },
      { label: 'Insulation + studs', sublabel: 'Mineral wool / PIR — steel or timber', thickness: '80–200 mm', fill: '#FDF6E3', stroke: '#D4A820', pattern: 'wool' },
      { label: 'Vapour control', sublabel: 'If required by hygrothermal design', thickness: '0.5 mm', fill: '#FCE8E8', stroke: '#E06060', pattern: 'solid' },
      { label: 'Interior board', sublabel: 'Gypsum / fiber cement / OSB', thickness: '12–15 mm', fill: '#F5F5F5', stroke: '#AAAAAA', pattern: 'solid' },
    ],
  },
  'render-facade': {
    title: 'Render Carrier System',
    subtitle: 'Terasun TSM as external render substrate',
    direction: 'Exterior ←  →  Interior',
    layers: [
      { label: 'Decorative render', sublabel: 'Mineral or silicone topcoat', thickness: '3–5 mm', fill: '#F5E6D3', stroke: '#C98A45', pattern: 'solid' },
      { label: 'Base coat', sublabel: 'Polymer-modified basecoat', thickness: '4–6 mm', fill: '#EDD9B3', stroke: '#C09055', pattern: 'solid' },
      { label: 'Fibreglass mesh', sublabel: 'Alkali-resistant, bedded in basecoat', thickness: '1 mm', fill: '#C8E6C9', stroke: '#4CAF50', pattern: 'hatch' },
      { label: 'Terasun TSM', sublabel: 'CE 1023-CPR-1565 P · A1', thickness: '12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
      { label: 'Insulation + studs', sublabel: 'Mineral wool / PIR', thickness: '80–200 mm', fill: '#FDF6E3', stroke: '#D4A820', pattern: 'wool' },
      { label: 'Interior board', sublabel: 'Gypsum / fiber cement', thickness: '12 mm', fill: '#F5F5F5', stroke: '#AAAAAA', pattern: 'solid' },
    ],
  },
  'wet-room': {
    title: 'Wet Room System',
    subtitle: 'Tile backing for fully wet areas',
    direction: 'Finished surface ←  →  Structure',
    layers: [
      { label: 'Tile finish', sublabel: 'Ceramic / porcelain / natural stone', thickness: '6–12 mm', fill: '#F0F0F0', stroke: '#999999', pattern: 'brick' },
      { label: 'Tile adhesive', sublabel: 'S1 flexible, alkali-resistant', thickness: '3–6 mm', fill: '#E8D5B7', stroke: '#C09A60', pattern: 'solid' },
      { label: 'Waterproof membrane', sublabel: 'Brush-applied or sheet system', thickness: '1–2 mm', fill: '#B3E5FC', stroke: '#0288D1', pattern: 'hatch' },
      { label: 'Terasun TSM', sublabel: 'EN 12467 Category A · moisture-stable', thickness: '12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
      { label: 'Steel/timber frame', sublabel: 'C-studs @ 400–600 mm c/c', thickness: '75–100 mm', fill: '#ECEFF1', stroke: '#90A4AE', pattern: 'hatch' },
      { label: 'Acoustic infill', sublabel: 'Mineral wool 30–50 kg/m³', thickness: '(within frame)', fill: '#FDF6E3', stroke: '#D4A820', pattern: 'wool' },
      { label: 'Interior board', sublabel: 'Gypsum board / fiber cement', thickness: '12–15 mm', fill: '#F5F5F5', stroke: '#AAAAAA', pattern: 'solid' },
    ],
  },
  'fire-partition': {
    title: 'Fire-Rated Partition',
    subtitle: 'Tested assembly E 120 / EI 90 / EW 120 (FIRES-CR-284-25-AUPE)',
    direction: 'Face A ←  →  Face B',
    layers: [
      { label: 'Terasun TSM 12 mm', sublabel: 'Face A · A1 · CE 1023-CPR-1565 P', thickness: '12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
      { label: 'Steel C-stud', sublabel: '75–100 mm @ 400 mm c/c', thickness: '75–100 mm', fill: '#ECEFF1', stroke: '#78909C', pattern: 'hatch' },
      { label: 'Rock wool', sublabel: 'Min. 60 kg/m³ — continuous fill', thickness: '(within frame)', fill: '#FFF9C4', stroke: '#F9A825', pattern: 'wool' },
      { label: 'Terasun TSM 12 mm', sublabel: 'Face B · same board, mirrored', thickness: '12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
    ],
  },
  'steel-frame-exterior': {
    title: 'Lightweight Steel Frame — Exterior',
    subtitle: 'Non-combustible sheathing for LSF construction',
    direction: 'Exterior ←  →  Interior',
    layers: [
      { label: 'Terasun TSM', sublabel: 'Exterior sheathing · A1', thickness: '10–12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
      { label: 'Steel C-stud frame', sublabel: '100–200 mm @ 400–600 mm c/c', thickness: '100–200 mm', fill: '#ECEFF1', stroke: '#78909C', pattern: 'hatch' },
      { label: 'Mineral wool', sublabel: 'Between studs — thermal + acoustic', thickness: '(within frame)', fill: '#FDF6E3', stroke: '#D4A820', pattern: 'wool' },
      { label: 'Vapour control', sublabel: 'Continuous vapour control layer', thickness: '0.5 mm', fill: '#FCE8E8', stroke: '#E06060', pattern: 'solid' },
      { label: 'Interior board', sublabel: 'Gypsum / fiber cement', thickness: '12–15 mm', fill: '#F5F5F5', stroke: '#AAAAAA', pattern: 'solid' },
    ],
  },
  'interior-partition': {
    title: 'Interior Partition',
    subtitle: 'Steel stud partition with cement board faces',
    direction: 'Face A ←  →  Face B',
    layers: [
      { label: 'Interior finish', sublabel: 'Paint / tile / skim plaster', thickness: '—', fill: '#F5F5F5', stroke: '#CCCCCC', pattern: 'solid' },
      { label: 'Terasun TSM or gypsum', sublabel: 'Face A lining board', thickness: '12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
      { label: 'Steel C-stud', sublabel: '75 mm @ 400–600 mm c/c', thickness: '75 mm', fill: '#ECEFF1', stroke: '#78909C', pattern: 'hatch' },
      { label: 'Acoustic mineral wool', sublabel: 'Acoustic performance enhancement', thickness: '(within frame)', fill: '#FDF6E3', stroke: '#D4A820', pattern: 'wool' },
      { label: 'Terasun TSM or gypsum', sublabel: 'Face B lining board', thickness: '12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
      { label: 'Interior finish', sublabel: 'Paint / tile / skim plaster', thickness: '—', fill: '#F5F5F5', stroke: '#CCCCCC', pattern: 'solid' },
    ],
  },
  'modular': {
    title: 'Modular / Prefabricated Panel',
    subtitle: 'Factory-assembled panel with TSM board faces',
    direction: 'Exterior ←  →  Interior',
    layers: [
      { label: 'Protective coating', sublabel: 'Factory-applied finish or primer', thickness: '1–3 mm', fill: '#E8F4FD', stroke: '#5CA4D6', pattern: 'solid' },
      { label: 'Terasun TSM', sublabel: 'Exterior face · A1', thickness: '10–12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
      { label: 'Steel frame', sublabel: 'Module frame — CFS or hot-rolled', thickness: '100–150 mm', fill: '#ECEFF1', stroke: '#78909C', pattern: 'hatch' },
      { label: 'Insulation', sublabel: 'Factory-filled — mineral wool / PIR', thickness: '(within frame)', fill: '#FDF6E3', stroke: '#D4A820', pattern: 'wool' },
      { label: 'Terasun TSM', sublabel: 'Interior face — moisture stable', thickness: '12 mm', fill: '#245A85', stroke: '#132238', pattern: 'board', highlight: true },
      { label: 'Interior finish', sublabel: 'Paint / liner board', thickness: '—', fill: '#F5F5F5', stroke: '#AAAAAA', pattern: 'solid' },
    ],
  },
}

function PatternDefs() {
  return (
    <defs>
      <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#aaa" strokeWidth="1.5" />
      </pattern>
      <pattern id="wool" patternUnits="userSpaceOnUse" width="16" height="8">
        <path d="M0,4 Q4,0 8,4 Q12,8 16,4" fill="none" stroke="#D4A820" strokeWidth="1.2" />
      </pattern>
      <pattern id="brick" patternUnits="userSpaceOnUse" width="20" height="10">
        <rect width="20" height="10" fill="none" stroke="#bbb" strokeWidth="0.5" />
        <line x1="10" y1="0" x2="10" y2="5" stroke="#bbb" strokeWidth="0.5" />
        <line x1="0" y1="5" x2="20" y2="5" stroke="#bbb" strokeWidth="0.5" />
      </pattern>
      <pattern id="dot" patternUnits="userSpaceOnUse" width="8" height="8">
        <circle cx="4" cy="4" r="1.2" fill="#aaa" />
      </pattern>
      <pattern id="board" patternUnits="userSpaceOnUse" width="24" height="8">
        <rect width="24" height="8" fill="none" />
        <line x1="0" y1="0" x2="24" y2="0" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        <line x1="0" y1="4" x2="24" y2="4" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="4 4" />
      </pattern>
    </defs>
  )
}

interface Props {
  type: DiagramType
  className?: string
}

export default function SystemDiagram({ type, className = '' }: Props) {
  const diagram = diagrams[type]
  if (!diagram) return null

  const layerHeight = 46
  const labelWidth = 220
  const thickWidth = 80
  const barWidth = 200
  const padding = { top: 20, bottom: 20, left: 16, right: 16 }
  const svgWidth = labelWidth + barWidth + thickWidth + padding.left + padding.right
  const svgHeight = diagram.layers.length * layerHeight + padding.top + padding.bottom + 52

  const barX = padding.left + labelWidth
  const thickX = barX + barWidth

  return (
    <div className={`rounded-2xl border border-[#D8E1E9] bg-white overflow-hidden ${className}`}>
      <div className="bg-[#132238] px-5 py-3">
        <p className="text-white font-bold text-sm">{diagram.title}</p>
        <p className="text-[#8BA9C4] text-xs mt-0.5">{diagram.subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width="100%"
          style={{ minWidth: '380px', maxWidth: '600px', display: 'block' }}
          aria-label={`Wall build-up diagram: ${diagram.title}`}
          role="img"
        >
          <PatternDefs />

          {/* Column headers */}
          <text x={padding.left} y={padding.top + 12} fontSize="10" fill="#8B9AAD" fontFamily="system-ui, sans-serif">LAYER</text>
          <text x={barX + 4} y={padding.top + 12} fontSize="10" fill="#8B9AAD" fontFamily="system-ui, sans-serif">SECTION</text>
          <text x={thickX + 4} y={padding.top + 12} fontSize="10" fill="#8B9AAD" fontFamily="system-ui, sans-serif">THICKNESS</text>
          <line x1={padding.left} y1={padding.top + 18} x2={svgWidth - padding.right} y2={padding.top + 18} stroke="#E8EFF5" strokeWidth="1" />

          {/* Direction arrow */}
          <text x={barX + barWidth / 2} y={svgHeight - 8} textAnchor="middle" fontSize="9" fill="#8B9AAD" fontFamily="system-ui, sans-serif">{diagram.direction}</text>

          {diagram.layers.map((layer, i) => {
            const y = padding.top + 24 + i * layerHeight
            const midY = y + layerHeight / 2

            return (
              <g key={i}>
                {/* Layer rectangle */}
                <rect
                  x={barX}
                  y={y + 2}
                  width={barWidth}
                  height={layerHeight - 4}
                  fill={layer.fill}
                  stroke={layer.stroke}
                  strokeWidth={layer.highlight ? 1.5 : 1}
                  rx="2"
                />
                {/* Pattern overlay */}
                {layer.pattern && layer.pattern !== 'solid' && (
                  <rect
                    x={barX}
                    y={y + 2}
                    width={barWidth}
                    height={layerHeight - 4}
                    fill={`url(#${layer.pattern})`}
                    opacity="0.7"
                    rx="2"
                  />
                )}
                {/* Highlight indicator */}
                {layer.highlight && (
                  <rect
                    x={barX}
                    y={y + 2}
                    width={4}
                    height={layerHeight - 4}
                    fill="#5CA4D6"
                    rx="2"
                  />
                )}

                {/* Label (left) */}
                <text
                  x={padding.left}
                  y={midY - 6}
                  fontSize={layer.highlight ? '11' : '10.5'}
                  fontWeight={layer.highlight ? '700' : '600'}
                  fill={layer.highlight ? '#132238' : '#1A2B3C'}
                  fontFamily="system-ui, sans-serif"
                >
                  {layer.label}
                </text>
                {layer.sublabel && (
                  <text
                    x={padding.left}
                    y={midY + 7}
                    fontSize="9"
                    fill="#6B7A8D"
                    fontFamily="system-ui, sans-serif"
                  >
                    {layer.sublabel.length > 32 ? layer.sublabel.slice(0, 30) + '…' : layer.sublabel}
                  </text>
                )}

                {/* Thickness (right) */}
                {layer.thickness && (
                  <text
                    x={thickX + 6}
                    y={midY + 4}
                    fontSize="10"
                    fill="#4A5B6D"
                    fontFamily="system-ui, sans-serif"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {layer.thickness}
                  </text>
                )}

                {/* Row separator */}
                <line
                  x1={padding.left}
                  y1={y + layerHeight}
                  x2={svgWidth - padding.right}
                  y2={y + layerHeight}
                  stroke="#EDF2F7"
                  strokeWidth="0.5"
                />
              </g>
            )
          })}
        </svg>
      </div>
      <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#EDF2F7]">
        <p className="text-xs text-[#8B9AAD]">Indicative system only. Refer to Installation Manual and ETA 24/0895 for verified design values.</p>
      </div>
    </div>
  )
}
