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
  const url = `${SITE_URL}/${locale}/compare/fiber-cement-board-vs-plywood`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/compare/fiber-cement-board-vs-plywood`]))
  hreflang['x-default'] = `${SITE_URL}/en/compare/fiber-cement-board-vs-plywood`
  return {
    title: 'Fiber Cement Board vs Plywood: Facade and Exterior Wall Comparison | Terasun',
    description: 'Fiber cement board vs plywood for facades and exterior walls. Non-combustible A1 vs Class D, Category A moisture vs delamination, CE 1023-CPR-1565 P vs EN 636.',
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: 'Fiber Cement Board vs Plywood | Terasun Europe', description: 'Technical comparison for facade sheathing and exterior walls: fire class, moisture, weight, CE certification. Terasun TSM vs plywood (EN 636).', url, type: 'article' },
    keywords: 'fiber cement board vs plywood, cement board vs plywood, facade sheathing comparison, non-combustible facade, plywood exterior wall',
  }
}

const rows = [
  { prop: 'Fire class', ply: 'Class D–E (combustible)', fcb: 'Class A1 (non-combustible)', winner: 'fcb' },
  { prop: 'Exterior facade suitability', ply: 'Conditional (protected only)', fcb: 'Yes — all climates', winner: 'fcb' },
  { prop: 'Moisture resistance', ply: 'Delamination risk at cut edges', fcb: 'EN 12467 Category A — immersion stable', winner: 'fcb' },
  { prop: 'Mould risk', ply: 'Yes (organic material)', fcb: 'None (inorganic)', winner: 'fcb' },
  { prop: 'Weight (12 mm)', ply: '7–8 kg/m²', fcb: '9.96 kg/m²', winner: 'ply' },
  { prop: 'CE standard', ply: 'EN 636', fcb: 'EN 12467 — CE 1023-CPR-1565 P', winner: 'tie' },
  { prop: 'ETA', ply: '—', fcb: 'ETA 24/0895', winner: 'fcb' },
  { prop: 'Fire assembly rating', ply: 'Not tested for E/EI/EW', fcb: 'E120 / EI90 / EW120', winner: 'fcb' },
  { prop: 'Buildings above 18 m (A2 req.)', ply: 'Does not comply', fcb: 'Yes — A1', winner: 'fcb' },
  { prop: 'EPD / LEED-BREEAM', ply: 'Limited', fcb: 'EPD-IES-0018268', winner: 'fcb' },
  { prop: 'Material cost', ply: 'Lower', fcb: 'Higher', winner: 'ply' },
]

export default async function FiberCementVsPlywoodPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const nav = (path: string) => `/${locale}${path}`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Can plywood be used on ventilated facades?', acceptedAnswer: { '@type': 'Answer', text: 'Exterior-grade plywood (EN 636-3) can be used on low-rise facades where fire class D is acceptable, but is not recommended for wet northern climates. On buildings above 18 m, where A1/A2 materials are typically required for facades, plywood cannot be used.' } },
      { '@type': 'Question', name: 'Is fiber cement board heavier than plywood?', acceptedAnswer: { '@type': 'Answer', text: 'Terasun TSM fiber cement board at 12 mm weighs 9.96 kg/m². Structural plywood at 12 mm weighs 7–8 kg/m². However, facade applications often use 8–10 mm fiber cement board, which is comparable in weight to structural plywood.' } },
      { '@type': 'Question', name: 'Can fire-retardant-treated plywood replace fiber cement board for facades?', acceptedAnswer: { '@type': 'Answer', text: 'No. Fire-retardant treatments can improve plywood to Class C or B in some cases, but typically cannot achieve the A1 required for high-rise facades. FR-treated plywood also remains susceptible to delamination and mould in wet conditions.' } },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Compare', url: `${SITE_URL}/${locale}/compare/fiber-cement-board-vs-plywood` },
        { name: 'Fiber Cement vs Plywood', url: `${SITE_URL}/${locale}/compare/fiber-cement-board-vs-plywood` },
      ])} />
      <JsonLd data={faqSchema} />

      <section className="page-hero">
        <div className="container-page">
          <p className="stag">Product comparison</p>
          <h1 className="stitle-xl">Fiber Cement Board vs Plywood</h1>
          <p className="ssub max-w-2xl">
            For exterior facades and exterior walls — fire class, moisture performance, and CE certification compared. Which is correct for your project?
          </p>
        </div>
      </section>

      <div className="bg-[#132238] text-white">
        <div className="container-page py-5 grid sm:grid-cols-3 gap-4 text-center text-sm">
          <div><p className="text-[#8BA9C4] text-xs uppercase tracking-wider mb-1">Fire class</p><p className="font-bold">A1 vs Class D</p></div>
          <div><p className="text-[#8BA9C4] text-xs uppercase tracking-wider mb-1">Buildings 18 m+</p><p className="font-bold">FCB yes · Plywood no</p></div>
          <div><p className="text-[#8BA9C4] text-xs uppercase tracking-wider mb-1">Moisture</p><p className="font-bold">Category A vs delamination risk</p></div>
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
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Plywood (EN 636-3)</th>
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Fiber Cement Board (Terasun TSM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.prop} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9FBFD]'}>
                        <td className="px-4 py-3 font-medium text-[#132238]">{row.prop}</td>
                        <td className={`px-4 py-3 ${row.winner === 'ply' ? 'text-[#1A6E3C] font-semibold' : 'text-[#6B7A8D]'}`}>{row.ply}</td>
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
              <h2 className="text-xl font-black text-[#132238] mb-3">Fire regulations for facades</h2>
              <p className="text-[#4A5B6D] leading-relaxed mb-3">
                In most EU member states, building regulations derived from Eurocode and the EU Construction Products Regulation require facade materials to be <strong>Class A1 or A2</strong> on buildings above 18 m height. Standard and even fire-retardant-treated plywood typically achieves at best Class B-C, not A2.
              </p>
              <p className="text-[#4A5B6D] leading-relaxed">
                Terasun TSM fiber cement board achieves <strong>A1</strong> — non-combustible, compliant for facades on all building heights. The tested wall assembly achieves <strong>E 120 / EI 90 / EW 120</strong> for compartmentalisation, a performance level not achievable with plywood-based systems.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#132238] mb-3">Moisture and durability</h2>
              <p className="text-[#4A5B6D] leading-relaxed mb-4">
                Exterior-grade plywood (EN 636-3) uses phenolic resin adhesive to resist moisture, but cut edges are still vulnerable to delamination when repeatedly wetted. In ventilated facade systems in Nordic, Atlantic, and Alpine climates, moisture ingress through facade gaps and wind-driven rain will eventually compromise plywood integrity — typically within 10–20 years.
              </p>
              <p className="text-[#4A5B6D] leading-relaxed">
                Fiber cement board with <strong>EN 12467 Category A</strong> classification has less than 1% thickness swelling under full immersion. It has no organic content, so it does not support mould or biological degradation. Service life in exterior applications exceeds 40 years with normal maintenance.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-[#D8E1E9] rounded-2xl p-6">
                <h3 className="font-black text-[#132238] mb-3">When plywood is appropriate</h3>
                <ul className="text-sm text-[#4A5B6D] space-y-1.5">
                  <li>• Structural roof decking (under membranes)</li>
                  <li>• Internal sheathing in dry conditions</li>
                  <li>• Low-rise buildings where Class D is acceptable</li>
                  <li>• Curved surface applications</li>
                  <li>• Cost-driven projects with no fire or moisture constraints</li>
                </ul>
              </div>
              <div className="border border-[#5CA4D6] rounded-2xl p-6 bg-[#EBF4FB]">
                <h3 className="font-black text-[#132238] mb-3">When fiber cement board is correct</h3>
                <ul className="text-sm text-[#245A85] space-y-1.5">
                  <li>• All ventilated facade systems</li>
                  <li>• Buildings above 18 m (A2 required)</li>
                  <li>• Wet climates (Scandinavia, UK, Atlantic, Alpine)</li>
                  <li>• Fire-rated assemblies E120/EI90/EW120</li>
                  <li>• Render carrier (exterior plaster substrate)</li>
                  <li>• Steel frame exterior sheathing</li>
                  <li>• LEED, BREEAM, DGNB projects</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#132238] mb-4">FAQ</h2>
              <div className="space-y-4">
                {[
                  { q: 'Can plywood be used on ventilated facades?', a: 'EN 636-3 plywood can be used on low-rise ventilated facades where fire class D is acceptable and moisture exposure is managed. On buildings above 18 m or in wet northern climates, fiber cement board is the technically correct and regulation-compliant choice.' },
                  { q: 'Is fiber cement board heavier than plywood?', a: 'Terasun TSM at 12 mm weighs 9.96 kg/m², slightly more than 12 mm structural plywood at 7–8 kg/m². Facade applications typically use 8–10 mm fiber cement board, which is comparable or lighter than structural plywood.' },
                  { q: 'Can fire-retardant treated plywood replace fiber cement board on facades?', a: 'No. FR-treated plywood typically achieves Class B-C at best, and cannot match the A1 classification of fiber cement board. It also remains susceptible to moisture delamination in repeated wetting conditions. For non-combustible, moisture-stable facade systems, fiber cement board is the correct specification.' },
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
                {[['CE marking','1023-CPR-1565 P'],['Standard','EN 12467'],['ETA','24/0895'],['Fire class','A1'],['Fire assembly','E120 / EI90 / EW120'],['Moisture','Category A'],['Weight 12 mm','9.96 kg/m²'],['Thicknesses','6–18 mm']].map(([k,v]) => (
                  <div key={k} className="flex justify-between gap-2"><dt className="text-[#8B9AAD]">{k}</dt><dd className="font-semibold text-[#132238] text-right">{v}</dd></div>
                ))}
              </dl>
            </div>
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-3">Request a free sample</h3>
              <p className="text-xs text-[#4A5B6D] mb-4">Try the board. Free sample + full documentation pack.</p>
              <Link href={nav('/request-free-sample')} className="btn-primary text-sm py-2.5 w-full text-center block">Request sample</Link>
            </div>
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-sm">
              <h3 className="font-black text-[#132238] mb-3">More comparisons</h3>
              <ul className="space-y-2 text-[#245A85]">
                <li><Link href={nav('/compare/fiber-cement-board-vs-osb')} className="hover:underline">→ Fiber cement vs OSB</Link></li>
                <li><Link href={nav('/compare/fiber-cement-board-vs-gypsum-board')} className="hover:underline">→ Fiber cement vs gypsum board</Link></li>
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
