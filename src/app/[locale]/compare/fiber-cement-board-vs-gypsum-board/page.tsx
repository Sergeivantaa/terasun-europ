import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL, CONTACT } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const url = `${SITE_URL}/${locale}/compare/fiber-cement-board-vs-gypsum-board`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/compare/fiber-cement-board-vs-gypsum-board`]))
  hreflang['x-default'] = `${SITE_URL}/en/compare/fiber-cement-board-vs-gypsum-board`
  return {
    title: 'Fiber Cement Board vs Gypsum Board: Which for Exterior and Wet Areas? | Terasun',
    description: 'Fiber cement board vs gypsum (plasterboard) for facades, wet rooms, fire-rated walls. Moisture resistance, fire class, exterior suitability — complete technical comparison.',
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: 'Fiber Cement Board vs Gypsum Board | Terasun Europe', description: 'Technical comparison for wet rooms, facades, and fire-rated partitions. CE-certified Terasun TSM vs standard and moisture-resistant gypsum board.', url, type: 'article' },
    keywords: 'fiber cement board vs gypsum board, cement board vs plasterboard, fiber cement wet room, gypsum board exterior, cement board vs drywall',
  }
}

const rows = [
  { prop: 'Exterior use', gyp: 'Not suitable (dissolves when wet)', fcb: 'Yes — all climates (Category A)', winner: 'fcb' },
  { prop: 'Wet room use', gyp: 'MR grade with protection only', fcb: 'Yes — fully waterproof behind tiles', winner: 'fcb' },
  { prop: 'Fire class', gyp: 'A2 (standard), A1 (Type F)', fcb: 'A1', winner: 'fcb' },
  { prop: 'Moisture resistance', gyp: 'MR grade resists splash — not immersion', fcb: 'EN 12467 Category A — immersion stable', winner: 'fcb' },
  { prop: 'Weight (12–13 mm)', gyp: '~10 kg/m²', fcb: '9.96 kg/m²', winner: 'tie' },
  { prop: 'Screw holding', gyp: 'Good (interior)', fcb: 'Good — use pre-drilled holes', winner: 'tie' },
  { prop: 'Paintable', gyp: 'Yes', fcb: 'Yes', winner: 'tie' },
  { prop: 'Tileable', gyp: 'MR grade only (interior)', fcb: 'Yes — interior and exterior', winner: 'fcb' },
  { prop: 'CE standard', gyp: 'EN 520 / EN 15283', fcb: 'EN 12467 — CE 1023-CPR-1565 P', winner: 'tie' },
  { prop: 'ETA', gyp: '—', fcb: 'ETA 24/0895', winner: 'fcb' },
  { prop: 'EPD', gyp: 'Available for major brands', fcb: 'EPD-IES-0018268', winner: 'tie' },
  { prop: 'Fire assembly rating', gyp: 'Up to EI 60–90 (tested systems)', fcb: 'E120 / EI90 / EW120 (FIRES-CR-284-25)', winner: 'fcb' },
  { prop: 'Ease of cutting', gyp: 'Score-and-snap easy', fcb: 'Circular saw or angle grinder', winner: 'gyp' },
  { prop: 'Material cost', gyp: 'Lower', fcb: 'Higher', winner: 'gyp' },
]

export default async function FiberCementVsGypsumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const nav = (path: string) => `/${locale}${path}`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can gypsum board be used in wet rooms?',
        acceptedAnswer: { '@type': 'Answer', text: 'Standard gypsum board cannot. Moisture-resistant (MR) gypsum board can be used in splash zones with a waterproofing membrane, but should not be used in areas of permanent immersion or direct water contact. Fiber cement board is the technically correct substrate for fully wet rooms.' },
      },
      {
        '@type': 'Question',
        name: 'Can gypsum board be used on exterior facades?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Even moisture-resistant gypsum board is not suitable for exterior facades exposed to weather. Gypsum dissolves in water and will fail structurally if directly exposed. Fiber cement board classified EN 12467 Category A is the correct choice for exterior applications.' },
      },
      {
        '@type': 'Question',
        name: 'Is fiber cement board harder to work with than gypsum?',
        acceptedAnswer: { '@type': 'Answer', text: 'Fiber cement board requires a circular saw or angle grinder for cutting rather than the score-and-snap of gypsum. It is denser and heavier per panel. However, it requires no additional waterproofing in wet areas, which saves time and cost on wet room projects.' },
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Compare', url: `${SITE_URL}/${locale}/compare/fiber-cement-board-vs-gypsum-board` },
        { name: 'Fiber Cement vs Gypsum Board', url: `${SITE_URL}/${locale}/compare/fiber-cement-board-vs-gypsum-board` },
      ])} />
      <JsonLd data={faqSchema} />

      <section className="page-hero">
        <div className="container-page">
          <p className="stag">Product comparison</p>
          <h1 className="stitle-xl">Fiber Cement Board vs Gypsum Board</h1>
          <p className="ssub max-w-2xl">
            For exterior facades, wet rooms, and fire-rated walls — technical comparison of fiber cement board and gypsum (plasterboard) for European construction.
          </p>
        </div>
      </section>

      <div className="bg-[#132238] text-white">
        <div className="container-page py-5 grid sm:grid-cols-3 gap-4 text-center text-sm">
          <div><p className="text-[#8BA9C4] text-xs uppercase tracking-wider mb-1">Exterior use</p><p className="font-bold">FCB yes · Gypsum no</p></div>
          <div><p className="text-[#8BA9C4] text-xs uppercase tracking-wider mb-1">Wet rooms</p><p className="font-bold">FCB fully wet · Gypsum splash only</p></div>
          <div><p className="text-[#8BA9C4] text-xs uppercase tracking-wider mb-1">Fire (assembly)</p><p className="font-bold">FCB E120/EI90/EW120</p></div>
        </div>
      </div>

      <section className="container-page py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">

            <div>
              <h2 className="text-xl font-black text-[#132238] mb-4">Comparison table</h2>
              <div className="overflow-x-auto rounded-xl border border-[#D8E1E9]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F0F5FA]">
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Property</th>
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Gypsum Board</th>
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Fiber Cement (Terasun TSM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.prop} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9FBFD]'}>
                        <td className="px-4 py-3 font-medium text-[#132238]">{row.prop}</td>
                        <td className={`px-4 py-3 ${row.winner === 'gyp' ? 'text-[#1A6E3C] font-semibold' : 'text-[#6B7A8D]'}`}>{row.gyp}</td>
                        <td className={`px-4 py-3 ${row.winner === 'fcb' ? 'text-[#1A6E3C] font-semibold' : 'text-[#132238]'}`}>
                          {row.winner === 'fcb' && <span className="mr-1 text-green-600">✓</span>}{row.fcb}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#132238] mb-3">The core difference: water</h2>
              <p className="text-[#4A5B6D] leading-relaxed mb-3">
                Gypsum (calcium sulphate dihydrate) is water-soluble. When exposed to sustained moisture, gypsum board loses structural integrity, swells, and eventually dissolves. Moisture-resistant (MR) gypsum board delays this with water-repellent additives, but the fundamental chemistry does not change.
              </p>
              <p className="text-[#4A5B6D] leading-relaxed">
                Fiber cement board is an inorganic product. Portland cement, once set, does not dissolve in water. EN 12467 Category A classification confirms dimensional stability under full immersion — less than 1% thickness swelling. This is why fiber cement board is specified for wet rooms, swimming pool surrounds, and exterior facades worldwide.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#132238] mb-3">Fire performance</h2>
              <p className="text-[#4A5B6D] leading-relaxed mb-3">
                Both standard gypsum and fiber cement board can achieve <strong>Class A2</strong> reaction-to-fire classification. High-density Type F gypsum board achieves A1. In this category, gypsum board is a strong competitor — it performs well in fire-rated partition systems.
              </p>
              <p className="text-[#4A5B6D] leading-relaxed">
                However, Terasun TSM's tested wall assembly achieves <strong>E 120 / EI 90 / EW 120</strong> — 120-minute fire integrity and insulation. Comparable gypsum board systems typically achieve EI 60–90. For maximum fire resistance in fire compartmentalisation, the Terasun TSM tested system offers a performance advantage.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-[#D8E1E9] rounded-2xl p-6">
                <h3 className="font-black text-[#132238] mb-3">When gypsum board is appropriate</h3>
                <ul className="text-sm text-[#4A5B6D] space-y-1.5">
                  <li>• Dry internal partitions and ceilings</li>
                  <li>• Corridor and corridor fire-rated walls (EI 60)</li>
                  <li>• Where ease of cutting is critical</li>
                  <li>• Budget-driven interior fit-out</li>
                  <li>• Skimmed plaster finish requirements</li>
                </ul>
              </div>
              <div className="border border-[#5CA4D6] rounded-2xl p-6 bg-[#EBF4FB]">
                <h3 className="font-black text-[#132238] mb-3">When fiber cement board is correct</h3>
                <ul className="text-sm text-[#245A85] space-y-1.5">
                  <li>• Exterior facades (all climates)</li>
                  <li>• Wet rooms, showers, bathrooms</li>
                  <li>• Swimming pool changing rooms</li>
                  <li>• Fire-rated systems requiring E120/EI90/EW120</li>
                  <li>• Render carrier on exterior walls</li>
                  <li>• Steel frame sheathing (interior + exterior)</li>
                  <li>• High-humidity industrial environments</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#132238] mb-4">FAQ</h2>
              <div className="space-y-4">
                {[
                  { q: 'Can gypsum board be used in wet rooms?', a: 'Standard gypsum board cannot. MR-grade gypsum with a properly installed waterproofing membrane can be used behind tiles in splash zones, but should not be used in areas of permanent immersion. Fiber cement board does not require an additional waterproofing layer — it is inherently suitable for wet areas.' },
                  { q: 'Can gypsum board be used on exterior facades?', a: 'No. Even MR gypsum board is not suitable for exterior facades exposed to weather. Gypsum is water-soluble and will structurally fail if directly exposed to rain. EN 12467 Category A fiber cement board is the correct choice for exterior use.' },
                  { q: 'Which is easier to work with?', a: 'Gypsum board is easier to cut (score-and-snap) and lighter to handle per panel. Fiber cement board requires a circular saw with a fibre cement blade and generates fine cement dust (wear P2 mask). However, fiber cement board requires no additional waterproofing membrane in wet rooms, saving time overall.' },
                ].map(item => (
                  <details key={item.q} className="border border-[#D8E1E9] rounded-xl p-4">
                    <summary className="font-semibold text-[#132238] cursor-pointer list-none flex items-center justify-between">
                      {item.q}<span className="text-[#5CA4D6] text-lg">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-[#4A5B6D] leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border border-[#5CA4D6] rounded-2xl p-6 bg-[#EBF4FB]">
              <h3 className="font-black text-[#132238] mb-2">Terasun TSM Key Data</h3>
              <dl className="text-xs space-y-2 text-[#4A5B6D]">
                {[['CE marking','1023-CPR-1565 P'],['Standard','EN 12467'],['ETA','24/0895'],['Fire class','A1'],['Fire assembly','E120 / EI90 / EW120'],['Moisture','Category A (<1% swelling)'],['Weight 12 mm','9.96 kg/m²'],['Thicknesses','6, 8, 10, 12, 15, 18 mm']].map(([k,v]) => (
                  <div key={k} className="flex justify-between gap-2"><dt className="text-[#8B9AAD]">{k}</dt><dd className="font-semibold text-[#132238] text-right">{v}</dd></div>
                ))}
              </dl>
            </div>
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-3">Request a free sample</h3>
              <p className="text-xs text-[#4A5B6D] mb-4">Board sample + full documentation pack sent free.</p>
              <Link href={nav('/request-free-sample')} className="btn-primary text-sm py-2.5 w-full text-center block">Request sample</Link>
            </div>
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-sm">
              <h3 className="font-black text-[#132238] mb-3">More comparisons</h3>
              <ul className="space-y-2 text-[#245A85]">
                <li><Link href={nav('/compare/fiber-cement-board-vs-osb')} className="hover:underline">→ Fiber cement vs OSB</Link></li>
                <li><Link href={nav('/compare/fiber-cement-board-vs-plywood')} className="hover:underline">→ Fiber cement vs plywood</Link></li>
              </ul>
            </div>
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-sm">
              <h3 className="font-black text-[#132238] mb-3">Contact</h3>
              <div className="space-y-2 text-xs text-[#4A5B6D]">
                <p>📧 <a href={`mailto:${CONTACT.email}`} className="text-[#245A85] hover:underline">{CONTACT.email}</a></p>
                <p>📞 <a href={`tel:${CONTACT.phone}`} className="text-[#245A85] hover:underline">{CONTACT.phoneDisplay}</a></p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
