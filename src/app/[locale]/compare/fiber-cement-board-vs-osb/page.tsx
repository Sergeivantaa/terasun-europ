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
  const url = `${SITE_URL}/${locale}/compare/fiber-cement-board-vs-osb`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/compare/fiber-cement-board-vs-osb`]))
  hreflang['x-default'] = `${SITE_URL}/en/compare/fiber-cement-board-vs-osb`
  return {
    title: 'Fiber Cement Board vs OSB: Complete Comparison | Terasun Europe',
    description: 'Fiber cement board vs OSB: fire class A1 vs D, Category A moisture vs swelling 15–25%, non-combustible vs combustible. Which is better for facades and exterior walls?',
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: 'Fiber Cement Board vs OSB | Terasun Europe', description: 'Technical comparison: fiber cement board vs OSB for facades, fire-rated walls, and wet rooms. CE 1023-CPR-1565 P, ETA 24/0895.', url, type: 'article' },
    keywords: 'fiber cement board vs OSB, cement board vs OSB, FCB OSB comparison, facade sheathing comparison, non-combustible sheathing',
  }
}

const rows = [
  { prop: 'Fire class', osb: 'Class D (combustible)', fcb: 'Class A1 (non-combustible)', winner: 'fcb' },
  { prop: 'Moisture behaviour', osb: 'Swells 15–25% (EN 317)', fcb: 'EN 12467 Category A — <1% swelling', winner: 'fcb' },
  { prop: 'Mould resistance', osb: 'Susceptible (organic)', fcb: 'Immune (inorganic, no food source)', winner: 'fcb' },
  { prop: 'Weight (12 mm)', osb: '~10 kg/m²', fcb: '9.96 kg/m² (Terasun TSM)', winner: 'tie' },
  { prop: 'CE marking', osb: 'EN 300', fcb: 'EN 12467 — CE 1023-CPR-1565 P', winner: 'fcb' },
  { prop: 'European Technical Assessment', osb: '—', fcb: 'ETA 24/0895', winner: 'fcb' },
  { prop: 'Fire resistance (assembly)', osb: 'Not tested / Class D', fcb: 'E 120 / EI 90 / EW 120', winner: 'fcb' },
  { prop: 'EPD (environmental)', osb: 'Varies', fcb: 'EPD-IES-0018268 (ISO 14025)', winner: 'fcb' },
  { prop: 'Exterior facade use', osb: 'Conditional / limited', fcb: 'Yes — all climates', winner: 'fcb' },
  { prop: 'Wet room use', osb: 'Not recommended', fcb: 'Yes — Category A', winner: 'fcb' },
  { prop: 'Cost', osb: 'Lower material cost', fcb: 'Higher material cost', winner: 'osb' },
]

export default async function FiberCementVsOsbPage({ params }: { params: Promise<{ locale: string }> }) {
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
        name: 'Is fiber cement board better than OSB for facades?',
        acceptedAnswer: { '@type': 'Answer', text: 'For ventilated facade systems, fiber cement board is technically superior. It is non-combustible (Class A1) and dimensionally stable when wet (EN 12467 Category A). OSB is combustible (Class D) and swells 15–25% when wetted.' },
      },
      {
        '@type': 'Question',
        name: 'Can OSB be used on exterior facades?',
        acceptedAnswer: { '@type': 'Answer', text: 'OSB/3 has some moisture resistance but is not recommended for ventilated facades in wet climates. It can swell and delaminate over time. For exterior facades, fiber cement board is the correct choice.' },
      },
      {
        '@type': 'Question',
        name: 'Which is cheaper — OSB or fiber cement board?',
        acceptedAnswer: { '@type': 'Answer', text: 'OSB has a lower material cost. However, fiber cement board requires no fire treatment, has longer service life, and does not need replacement due to moisture damage. Total installed cost over the building lifetime often favours fiber cement board.' },
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Compare', url: `${SITE_URL}/${locale}/compare/fiber-cement-board-vs-osb` },
        { name: 'Fiber Cement Board vs OSB', url: `${SITE_URL}/${locale}/compare/fiber-cement-board-vs-osb` },
      ])} />
      <JsonLd data={faqSchema} />

      <section className="page-hero">
        <div className="container-page">
          <p className="stag">Product comparison</p>
          <h1 className="stitle-xl">Fiber Cement Board vs OSB</h1>
          <p className="ssub max-w-2xl">
            Fire class, moisture resistance, CE certification, and suitability for facades, fire-rated walls, and wet rooms — compared side by side.
          </p>
        </div>
      </section>

      {/* Verdict strip */}
      <div className="bg-[#132238] text-white">
        <div className="container-page py-5 grid sm:grid-cols-3 gap-4 text-center text-sm">
          <div><p className="text-[#8BA9C4] text-xs uppercase tracking-wider mb-1">Fire class</p><p className="font-bold">A1 vs Class D</p></div>
          <div><p className="text-[#8BA9C4] text-xs uppercase tracking-wider mb-1">Moisture</p><p className="font-bold">Cat. A (&lt;1%) vs 15–25% swelling</p></div>
          <div><p className="text-[#8BA9C4] text-xs uppercase tracking-wider mb-1">Exterior facades</p><p className="font-bold">Fiber cement wins</p></div>
        </div>
      </div>

      <section className="container-page py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">

            {/* Comparison table */}
            <div>
              <h2 className="text-xl font-black text-[#132238] mb-4">Side-by-side comparison</h2>
              <div className="overflow-x-auto rounded-xl border border-[#D8E1E9]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F0F5FA]">
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Property</th>
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">OSB/3</th>
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Fiber Cement Board (Terasun TSM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.prop} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9FBFD]'}>
                        <td className="px-4 py-3 font-medium text-[#132238]">{row.prop}</td>
                        <td className={`px-4 py-3 ${row.winner === 'osb' ? 'text-[#132238] font-semibold' : 'text-[#6B7A8D]'}`}>{row.osb}</td>
                        <td className={`px-4 py-3 ${row.winner === 'fcb' ? 'text-[#1A6E3C] font-semibold' : row.winner === 'tie' ? 'text-[#132238]' : 'text-[#132238]'}`}>
                          {row.winner === 'fcb' && <span className="mr-1 text-green-600">✓</span>}{row.fcb}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fire */}
            <div>
              <h2 className="text-xl font-black text-[#132238] mb-3">Fire performance: the critical difference</h2>
              <p className="text-[#4A5B6D] leading-relaxed mb-3">
                OSB is classified as <strong>Class D</strong> — it contributes to fire and is classed as a combustible material. Standard and fire-retardant-treated OSB typically cannot achieve Class A2 required for facades on buildings above 18 m in most European member states.
              </p>
              <p className="text-[#4A5B6D] leading-relaxed mb-3">
                Terasun TSM fiber cement board achieves <strong>Class A1</strong> — non-combustible, with very limited smoke. The tested wall assembly reaches <strong>E 120 / EI 90 / EW 120</strong>, enabling use in fire-rated partitions and facades.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
                <strong>Building regulation note:</strong> For facade cladding on buildings over 18 m height in most EU member states, A1 or A2 materials are required. OSB does not meet this requirement. Verify your national building code with a fire engineer.
              </div>
            </div>

            {/* Moisture */}
            <div>
              <h2 className="text-xl font-black text-[#132238] mb-3">Moisture performance</h2>
              <p className="text-[#4A5B6D] leading-relaxed mb-3">
                OSB/3 has improved moisture resistance but remains a wood-based product. In ventilated facade systems it can be exposed to bulk water. Repeated wetting causes 15–25% thickness swelling (EN 317), edge delamination, and long-term strength loss. Organic content also means mould risk in persistently damp conditions.
              </p>
              <p className="text-[#4A5B6D] leading-relaxed">
                Fiber cement board classified <strong>Category A under EN 12467</strong> is dimensionally stable when fully saturated. Thickness swelling is less than 1%. There is no organic content, so mould cannot grow. This is the correct choice for Nordic, Atlantic, and Alpine climates where driving rain is frequent.
              </p>
            </div>

            {/* When to use each */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-[#D8E1E9] rounded-2xl p-6">
                <h3 className="font-black text-[#132238] mb-3">When OSB is appropriate</h3>
                <ul className="text-sm text-[#4A5B6D] space-y-1.5">
                  <li>• Internal sheathing in dry conditions</li>
                  <li>• Structural bracing where Class D is acceptable</li>
                  <li>• Roof decking under roofing membranes</li>
                  <li>• Where cost is primary driver</li>
                  <li>• Low-rise residential below 18 m</li>
                </ul>
              </div>
              <div className="border border-[#5CA4D6] rounded-2xl p-6 bg-[#EBF4FB]">
                <h3 className="font-black text-[#132238] mb-3">When fiber cement board is correct</h3>
                <ul className="text-sm text-[#245A85] space-y-1.5">
                  <li>• Ventilated facade systems (all heights)</li>
                  <li>• Buildings above 18 m (A2 required)</li>
                  <li>• Fire-rated wall assemblies E120/EI90/EW120</li>
                  <li>• Wet rooms and bathrooms</li>
                  <li>• Steel frame and modular construction</li>
                  <li>• Nordic, Atlantic, Alpine climates</li>
                  <li>• LEED, BREEAM, DGNB projects</li>
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-black text-[#132238] mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'Is fiber cement board better than OSB for facades?', a: 'For ventilated facade systems, fiber cement board is technically superior. It is non-combustible (Class A1), dimensionally stable when wet (EN 12467 Category A), and immune to mould. OSB is combustible (Class D) and swells 15–25% when wetted — a significant risk in exposed exterior conditions.' },
                  { q: 'Can OSB be used on exterior facades?', a: 'OSB/3 can be used on protected exterior sheathing in some low-rise applications, but it is not recommended for ventilated facade systems exposed to rain, especially in northern European climates. Edge swelling and potential delamination are serious long-term risks.' },
                  { q: 'Which is cheaper?', a: 'OSB has a lower material cost per m². Fiber cement board costs more initially but requires no fire treatment, has a longer service life, and does not degrade when wet. Over 30–50 years, the total cost comparison often favours fiber cement board.' },
                ].map(item => (
                  <details key={item.q} className="border border-[#D8E1E9] rounded-xl p-4 group">
                    <summary className="font-semibold text-[#132238] cursor-pointer list-none flex items-center justify-between">
                      {item.q}
                      <span className="text-[#5CA4D6] text-lg">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-[#4A5B6D] leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-[#5CA4D6] rounded-2xl p-6 bg-[#EBF4FB]">
              <h3 className="font-black text-[#132238] mb-2">Terasun TSM Specifications</h3>
              <dl className="text-xs space-y-2 text-[#4A5B6D]">
                {[
                  ['CE marking', '1023-CPR-1565 P'],
                  ['Standard', 'EN 12467'],
                  ['ETA', '24/0895'],
                  ['Fire class', 'A1'],
                  ['Fire assembly', 'E120 / EI90 / EW120'],
                  ['Moisture', 'Category A'],
                  ['Weight (12 mm)', '9.96 kg/m²'],
                  ['Format', '1,220 × 2,440 mm'],
                  ['Thicknesses', '6, 8, 10, 12, 15, 18 mm'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <dt className="text-[#8B9AAD]">{k}</dt>
                    <dd className="font-semibold text-[#132238] text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-3">Request a sample</h3>
              <p className="text-xs text-[#4A5B6D] mb-4">Try Terasun TSM before specifying. Free sample + full documentation pack.</p>
              <Link href={nav('/request-free-sample')} className="btn-primary text-sm py-2.5 w-full text-center block">Request free sample</Link>
            </div>

            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-sm">
              <h3 className="font-black text-[#132238] mb-3">More comparisons</h3>
              <ul className="space-y-2 text-[#245A85] text-sm">
                <li><Link href={nav('/compare/fiber-cement-board-vs-gypsum-board')} className="hover:underline">→ Fiber cement vs gypsum board</Link></li>
                <li><Link href={nav('/compare/fiber-cement-board-vs-plywood')} className="hover:underline">→ Fiber cement vs plywood</Link></li>
                <li><Link href={nav('/blog/fiber-cement-vs-gypsum')} className="hover:underline">→ Full vs-gypsum article</Link></li>
              </ul>
            </div>

            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-sm">
              <h3 className="font-black text-[#132238] mb-3">Technical contact</h3>
              <div className="space-y-2 text-xs text-[#4A5B6D]">
                <p>📧 <a href={`mailto:${CONTACT.email}`} className="text-[#245A85] hover:underline">{CONTACT.email}</a></p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
