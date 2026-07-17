import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL, PRODUCT, CONTACT } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const url = `${SITE_URL}/${locale}/products/lightweight-cement-board`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/products/lightweight-cement-board`]))
  hreflang['x-default'] = `${SITE_URL}/en/products/lightweight-cement-board`
  return {
    title: 'Lightweight Cement Board Supplier Europe | Terasun TSM',
    description: 'Terasun Europe supplies lightweight TSM cement boards for facades, wet rooms, fire-rated wall systems, steel frames and modular construction across Europe.',
    alternates: { canonical: url, languages: hreflang },
    openGraph: {
      title: 'Lightweight Cement Board Supplier Europe | Terasun TSM',
      description: 'CE-certified lightweight cement board for European construction. Facades, wet rooms, fire partitions, steel frame. CE 1023-CPR-1565 P · ETA 24/0895.',
      url, type: 'website',
    },
    keywords: 'lightweight cement board, lightweight cement panel, lightweight fibre cement board, cement board supplier Europe, TSM cement board, fiber cement board Europe',
  }
}

const productSchema = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Terasun TSM Lightweight Cement Board',
  description: 'Lightweight cement-based construction board with inorganic binders, lightweight components and fibreglass mesh reinforcement. CE-certified, asbestos-free, suitable for facades, wet rooms, fire-rated wall assemblies and steel frame construction.',
  brand: { '@type': 'Brand', name: 'Terasun' },
  manufacturer: { '@type': 'Organization', name: 'Zhejiang Terasun Air Duct Co., Ltd.' },
  offers: {
    '@type': 'Offer',
    seller: { '@type': 'Organization', name: 'Terasun Europe', url: SITE_URL },
    availability: 'https://schema.org/InStock',
    areaServed: 'EU',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'CE Certificate', value: PRODUCT.ce },
    { '@type': 'PropertyValue', name: 'ETA', value: `ETA ${PRODUCT.eta}` },
    { '@type': 'PropertyValue', name: 'EPD', value: PRODUCT.epd },
    { '@type': 'PropertyValue', name: 'Declared weight', value: `${PRODUCT.weightKgM2} kg/m² at 12 mm` },
    { '@type': 'PropertyValue', name: 'Fire test', value: `${PRODUCT.fireClass} (${PRODUCT.fireReport})` },
  ],
})

const faqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is lightweight cement board?',
      acceptedAnswer: { '@type': 'Answer', text: 'Lightweight cement board (also called fibre cement board or cement building board) is a construction board made from Portland cement, inorganic binders, lightweight aggregates, and fibreglass mesh reinforcement. It is significantly lighter than traditional concrete or natural stone, while providing high moisture resistance, fire performance, and dimensional stability. Terasun TSM weighs 9.96 kg/m² at 12 mm thickness.' },
    },
    {
      '@type': 'Question',
      name: 'Is Terasun TSM CE certified?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Terasun TSM carries CE marking under EN 12467 (certificate 1023-CPR-1565 P), European Technical Assessment ETA 24/0895, and Declaration of Performance TRS-20250610F. These are mandatory for the sale and use of construction boards in the EU/EEA.' },
    },
    {
      '@type': 'Question',
      name: 'What applications is Terasun TSM certified for?',
      acceptedAnswer: { '@type': 'Answer', text: 'Terasun TSM is certified for ventilated facade systems (CBSS/CBMV), wet room tile backing, fire-rated wall assemblies (tested assembly: E 120 / EI 90 / EW 120), steel frame construction, flooring substrates, and interior wall systems.' },
    },
    {
      '@type': 'Question',
      name: 'What is the declared weight of Terasun TSM?',
      acceptedAnswer: { '@type': 'Answer', text: 'The declared weight per EPD-IES-0018268 is 9.96 kg/m² at 12 mm thickness. This is the CE-documented specification.' },
    },
    {
      '@type': 'Question',
      name: 'How does Terasun TSM compare to gypsum board?',
      acceptedAnswer: { '@type': 'Answer', text: 'Terasun TSM cement board outperforms gypsum board in moisture resistance (EN 12467 Category A vs. gypsum Category B), exterior suitability (cement board can be used externally, gypsum cannot), impact resistance, and long-term durability in wet environments. Gypsum board is lighter and easier to cut for dry interior partitions.' },
    },
    {
      '@type': 'Question',
      name: 'Can I order cement board samples?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Sample packs including board sample, Technical Data Sheet, CE certificate, ETA, and EPD are available for architects, contractors, and distributors. Request via the contact form or email sales@terasun-europe.eu.' },
    },
  ],
})

export default async function LightweightCementBoardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const nav = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Products', url: `${SITE_URL}/${locale}/products` },
        { name: 'Lightweight Cement Board', url: `${SITE_URL}/${locale}/products/lightweight-cement-board` },
      ])} />
      <JsonLd data={productSchema(locale)} />
      <JsonLd data={faqSchema()} />

      {/* Hero */}
      <section className="page-hero">
        <div className="container-page">
          <p className="stag">Product</p>
          <h1 className="stitle-xl">Lightweight Cement Board<br />for European Construction</h1>
          <p className="ssub max-w-2xl">
            CE-certified, asbestos-free lightweight cement board for facades, wet rooms, fire-rated wall assemblies, steel frame and modular construction across Europe.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href={nav('/request-free-sample')} className="btn-primary">Request free sample</Link>
            <Link href={nav('/request-a-quote')} className="btn-secondary">Get a quotation</Link>
          </div>
        </div>
      </section>

      {/* Cert strip */}
      <div className="bg-white border-b border-[#D8E1E9]">
        <div className="container-page py-4 flex flex-wrap gap-4 text-xs font-semibold text-[#245A85]">
          {[`CE ${PRODUCT.ce}`, `ETA ${PRODUCT.eta}`, `EPD ${PRODUCT.epd}`, `Fire: ${PRODUCT.fireClass}`, 'EN 12467 Cat. A', 'Asbestos-free'].map(item => (
            <span key={item} className="bg-[#EBF4FB] px-3 py-1 rounded-full">{item}</span>
          ))}
        </div>
      </div>

      <div className="container-page py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main content */}
          <article className="lg:col-span-2 space-y-12">

            {/* What is TSM */}
            <section>
              <h2 className="text-2xl font-black text-[#132238] mb-4">What is Terasun TSM Cement Board?</h2>
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-[#EBF4FB]">
                <Image
                  src="https://terasun-europe.eu/imgs/products/product2.jpeg"
                  alt="Terasun TSM lightweight cement board — surface detail showing the smooth factory finish"
                  fill className="object-cover"
                  sizes="(max-width: 768px) 100vw, 65vw"
                  priority
                />
              </div>
              <p className="text-[#4A5B6D] leading-relaxed mb-4">
                Terasun TSM is a <strong>lightweight cement-based construction board</strong> with inorganic binders, lightweight components and fibreglass mesh reinforcement. It is manufactured by Zhejiang Terasun Air Duct Co., Ltd. in Zhejiang Province, China, and supplied across Europe by Terasun Europe — the officially appointed Authorised European Representative.
              </p>
              <p className="text-[#4A5B6D] leading-relaxed">
                Unlike traditional concrete or natural stone, Terasun TSM combines a <strong>cement mineral matrix</strong> with lightweight components that reduce board weight to <strong>9.96 kg/m² at 12 mm</strong> (declared per EPD-IES-0018268), making it practical for facade cladding, interior partitions, and floor substrates where dead load is a design consideration.
              </p>
            </section>

            {/* Key characteristics */}
            <section>
              <h2 className="text-2xl font-black text-[#132238] mb-6">Key Product Characteristics</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: '⚖️', title: 'Lightweight', body: '9.96 kg/m² at 12 mm. Lighter than stone, terracotta, and ceramic tile facade alternatives. Reduces structural load on fixing systems.' },
                  { icon: '💧', title: 'Moisture resistant — EN 12467 Cat. A', body: 'Classified as Category A under EN 12467 — the highest moisture classification. Dimensionally stable when wet. Suitable for exterior and wet room applications.' },
                  { icon: '🔥', title: 'Non-combustible — Class A2-s1,d0', body: 'Reaction to fire: Class A2-s1,d0 (non-combustible). The tested wall assembly achieves E 120 / EI 90 / EW 120 (fire report FIRES-CR-284-25-AUPE).' },
                  { icon: '🏗️', title: 'CE certified — EN 12467', body: 'CE marking 1023-CPR-1565 P under EN 12467. Mandatory for sale and use in the EU/EEA under the Construction Products Regulation.' },
                  { icon: '📋', title: 'European Technical Assessment', body: 'ETA 24/0895 confirms declared performance characteristics for facade, wet room, and fire protection applications.' },
                  { icon: '🌿', title: 'Environmental Product Declaration', body: 'EPD-IES-0018268 — ISO 14025 compliant. Supports LEED, BREEAM, and DGNB green building documentation.' },
                ].map(card => (
                  <div key={card.title} className="border border-[#D8E1E9] rounded-xl p-5 bg-white">
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <h3 className="font-bold text-[#132238] mb-2 text-sm">{card.title}</h3>
                    <p className="text-[#4A5B6D] text-sm leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Spec table */}
            <section>
              <h2 className="text-2xl font-black text-[#132238] mb-4">Technical Specifications</h2>
              <div className="overflow-x-auto rounded-xl border border-[#D8E1E9]">
                <table className="w-full text-sm">
                  <thead className="bg-[#F4F7FA]">
                    <tr>
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Property</th>
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Value / Classification</th>
                      <th className="text-left px-4 py-3 font-bold text-[#132238]">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDF2F7]">
                    {[
                      ['Standard format', '1200 × 2400 mm', '—'],
                      ['Primary thickness', '12 mm (CE documented)', 'DoP TRS-20250610F'],
                      ['Declared weight', '9.96 kg/m² at 12 mm', 'EPD-IES-0018268'],
                      ['Moisture classification', 'Category A (highest)', 'EN 12467'],
                      ['Flexural strength (wet)', 'Class 4', 'EN 12467'],
                      ['Reaction to fire', 'A2-s1,d0', 'EN 13501-1'],
                      ['Wall assembly fire rating', 'E 120 / EI 90 / EW 120', 'FIRES-CR-284-25-AUPE'],
                      ['CE certificate', '1023-CPR-1565 P', 'EN 12467 / CPR'],
                      ['ETA', '24/0895', 'CPR'],
                      ['EPD', 'EPD-IES-0018268', 'ISO 14025 / EN 15804'],
                      ['REACH compliance', 'Confirmed, no SVHC >0.1%', 'REACH Regulation'],
                      ['Asbestos', 'Asbestos-free', 'EPD material data'],
                    ].map(([prop, val, ref], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                        <td className="px-4 py-3 text-[#4A5B6D] font-medium">{prop}</td>
                        <td className="px-4 py-3 text-[#132238] font-semibold">{val}</td>
                        <td className="px-4 py-3 text-[#8B9AAD] text-xs">{ref}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Applications */}
            <section>
              <h2 className="text-2xl font-black text-[#132238] mb-6">Main Applications</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { slug: 'facade-systems', label: 'Ventilated facade systems', desc: 'CBSS and CBMV systems. Lightweight cladding board for exterior walls in all European climate zones.', href: nav('/applications/facade-systems') },
                  { slug: 'wet-rooms', label: 'Wet rooms and bathrooms', desc: 'Moisture-stable tile backing substrate. Used in Mapei and Schönox wet room systems with waterproof membrane.', href: nav('/applications/wet-rooms') },
                  { slug: 'fire-protection', label: 'Fire-rated wall assemblies', desc: 'Tested wall system achieves E 120 / EI 90 / EW 120. Required for fire partition and compartmentation applications.', href: nav('/applications/fire-protection') },
                  { slug: 'steel-frame', label: 'Steel frame construction', desc: 'Compatible with 400 mm and 600 mm stud spacing. Suitable for light steel frame (LSF) and structural steel systems.', href: nav('/applications/steel-frame') },
                  { slug: 'commercial-buildings', label: 'Commercial and industrial buildings', desc: 'High-impact resistance for corridors, warehouses, hospitals, and public buildings requiring durable wall surfaces.', href: nav('/applications/commercial-buildings') },
                  { slug: 'residential', label: 'Residential construction', desc: 'Timber frame and modular residential applications. Interior and exterior wall substrates for new build and renovation.', href: nav('/applications/residential') },
                ].map(app => (
                  <Link key={app.slug} href={app.href}
                    className="border border-[#D8E1E9] rounded-xl p-5 bg-white hover:border-[#5CA4D6]/50 hover:shadow-md transition-all group">
                    <h3 className="font-bold text-[#132238] mb-2 text-sm group-hover:text-[#245A85] transition-colors">{app.label}</h3>
                    <p className="text-[#4A5B6D] text-xs leading-relaxed">{app.desc}</p>
                    <span className="text-xs font-semibold text-[#245A85] mt-3 inline-block">View application →</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Image gallery */}
            <section>
              <h2 className="text-2xl font-black text-[#132238] mb-4">Product Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { src: 'https://terasun-europe.eu/imgs/products/product1.jpeg', alt: 'Terasun TSM lightweight cement board — stack showing uniform thickness and smooth surface' },
                  { src: 'https://terasun-europe.eu/imgs/products/product2.jpeg', alt: 'TSM cement board water beading test demonstrating moisture resistance (Category A)' },
                  { src: 'https://terasun-europe.eu/imgs/products/product3.jpeg', alt: 'Terasun TSM board edge detail showing fibreglass mesh reinforcement' },
                ].map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-[#EBF4FB]">
                    <Image src={img.src} alt={img.alt} fill className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>

            {/* Installation */}
            <section>
              <h2 className="text-2xl font-black text-[#132238] mb-4">Installation and Handling</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Cutting', body: 'Circular saw or angle grinder with fibre cement or diamond blade. Score-and-snap for straight cuts on thinner boards. Wear P2 dust mask when cutting — cement dust is a respiratory irritant.' },
                  { title: 'Fixing', body: 'Corrosion-resistant screws (A4 stainless for exterior). Pre-drill holes 0.5 mm larger than screw shank to allow thermal movement. Min. edge distance: 25 mm from cut edges.' },
                  { title: 'Jointing', body: 'Leave 3–5 mm movement gap between boards. Tape joints with alkali-resistant fibreglass mesh tape, bed in flexible adhesive. Fill and sand before painting.' },
                  { title: 'Storage', body: 'Store flat on a level surface, off the ground. Protect from prolonged rain before installation. Boards may absorb surface moisture — allow to acclimatise before finishing.' },
                ].map(step => (
                  <div key={step.title} className="border border-[#D8E1E9] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#132238] mb-2 text-sm">{step.title}</h3>
                    <p className="text-[#4A5B6D] text-sm leading-relaxed">{step.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href={nav('/installation')} className="text-sm font-semibold text-[#245A85] hover:underline">
                  Complete installation guide for contractors →
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-black text-[#132238] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'What is lightweight cement board?', a: 'Lightweight cement board is a construction panel made from Portland cement, inorganic binders, lightweight aggregates, and fibreglass mesh reinforcement. Terasun TSM weighs 9.96 kg/m² at 12 mm — significantly lighter than stone (40–60 kg/m²) or ceramic tile alternatives, while matching the durability of traditional cement-based boards.' },
                  { q: 'Is CE certification mandatory for cement board in Europe?', a: 'Yes. Under the EU Construction Products Regulation (CPR No. 305/2011), fiber cement boards must carry CE marking when sold in the EEA. Products without CE marking cannot legally be incorporated into construction works in EU/EEA member states. Terasun TSM carries CE certificate 1023-CPR-1565 P.' },
                  { q: 'Can lightweight cement board be used on exterior facades?', a: 'Yes. Terasun TSM is classified as EN 12467 Category A — the highest moisture and climate classification — confirming suitability for exterior use in all European climate zones. It is used as the facade board in CBSS and CBMV ventilated facade systems.' },
                  { q: 'What fire resistance does the board achieve?', a: 'The reaction to fire classification is A2-s1,d0 (non-combustible). The tested wall assembly achieves E 120 / EI 90 / EW 120 per fire test report FIRES-CR-284-25-AUPE. These are system-level classifications — the tested assembly must be replicated exactly for the classification to apply.' },
                  { q: 'How do I order samples or get a quotation?', a: 'Sample packs (board sample + CE certificate + TDS + ETA) are available free to architects, contractors, and distributors. Container quotations (min. approx. 1,600–2,200 m² per 20ft container) are available on request. Contact us via the form or email sales@terasun-europe.eu.' },
                  { q: 'Is Terasun Europe the manufacturer?', a: 'No. Terasun Europe is the Authorised European Representative for Zhejiang Terasun Air Duct Co., Ltd. (China). Terasun Europe manages CE documentation, EU compliance, and European customer relationships. Products are manufactured in Zhejiang Province, China.' },
                ].map((faq, i) => (
                  <details key={i} className="group border border-[#D8E1E9] rounded-xl overflow-hidden bg-white">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-[#132238] text-sm hover:bg-[#F4F7FA] transition-colors">
                      {faq.q}
                      <span className="text-[#5CA4D6] shrink-0 ml-4 text-lg group-open:rotate-45 transition-transform inline-block">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-[#4A5B6D] text-sm leading-relaxed">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 self-start">

            {/* Quick facts */}
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-4 text-sm uppercase tracking-wider">Quick facts</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['Thickness', '12 mm (CE documented)'],
                  ['Format', '1200 × 2400 mm'],
                  ['Weight', '9.96 kg/m²'],
                  ['CE', PRODUCT.ce],
                  ['ETA', `ETA ${PRODUCT.eta}`],
                  ['Fire (system)', PRODUCT.fireClass],
                  ['EN standard', 'EN 12467 Cat. A'],
                  ['EPD', PRODUCT.epd],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-[#EDF2F7] pb-2 last:border-0">
                    <span className="text-[#6B7A8D]">{k}</span>
                    <span className="text-[#132238] font-semibold text-right max-w-[55%]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample CTA */}
            <div className="border border-[#245A85]/20 rounded-2xl p-6 bg-[#EBF4FB]">
              <h3 className="font-black text-[#132238] mb-2">Request a free sample</h3>
              <p className="text-[#4A5B6D] text-xs mb-4">Physical board sample + CE certificate + TDS + ETA. Available to architects, contractors, and distributors.</p>
              <Link href={nav('/request-free-sample')} className="btn-primary text-sm py-2 w-full text-center block">Request sample pack</Link>
            </div>

            {/* Quote CTA */}
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-2">Get a quotation</h3>
              <p className="text-[#4A5B6D] text-xs mb-4">Container and pallet orders for distributors and contractors across Europe.</p>
              <Link href={nav('/request-a-quote')} className="btn-secondary text-sm py-2 w-full text-center block">Request quotation</Link>
            </div>

            {/* Documents */}
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-4 text-sm">Technical documents</h3>
              <ul className="space-y-2 text-xs">
                {['CE Certificate 1023-CPR-1565 P', 'ETA 24/0895', 'DoP TRS-20250610F', 'EPD-IES-0018268', 'Fire Test FIRES-CR-284-25-AUPE'].map(doc => (
                  <li key={doc}>
                    <Link href={nav('/downloads')} className="text-[#245A85] hover:underline flex items-center gap-2">
                      <span className="shrink-0">📄</span>{doc}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={nav('/downloads')} className="text-xs font-semibold text-[#245A85] mt-4 inline-block hover:underline">All documents →</Link>
            </div>

            {/* Internal links */}
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-4 text-sm">Related pages</h3>
              <nav className="space-y-2 text-xs">
                {[
                  { href: nav('/technical-data'), label: 'Technical data & specifications' },
                  { href: nav('/certifications'), label: 'Certifications & compliance' },
                  { href: nav('/installation'), label: 'Installation guide' },
                  { href: nav('/applications/facade-systems'), label: 'Facade system applications' },
                  { href: nav('/applications/wet-rooms'), label: 'Wet room applications' },
                  { href: nav('/applications/fire-protection'), label: 'Fire-rated wall systems' },
                  { href: nav('/manufacturer'), label: 'About the manufacturer' },
                  { href: nav('/become-a-distributor'), label: 'Become a distributor' },
                ].map(link => (
                  <div key={link.href}>
                    <Link href={link.href} className="text-[#245A85] hover:underline">{link.label}</Link>
                  </div>
                ))}
              </nav>
            </div>
          </aside>
        </div>

        {/* Bottom CTAs */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { title: 'Request a free sample', desc: 'Board sample + full documentation pack. Free to architects, contractors, and distributors.', href: nav('/request-free-sample'), cta: 'Request sample', primary: true },
            { title: 'Get a container quotation', desc: 'Min. ~1,600 m² per 20ft container. DDP European warehouse available.', href: nav('/request-a-quote'), cta: 'Request quotation', primary: false },
            { title: 'Become a distributor', desc: 'Territory-based agreements, competitive margins, full documentation support.', href: nav('/become-a-distributor'), cta: 'Apply now', primary: false },
          ].map(cta => (
            <div key={cta.title} className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-center">
              <h3 className="font-black text-[#132238] mb-2">{cta.title}</h3>
              <p className="text-[#4A5B6D] text-sm mb-4">{cta.desc}</p>
              <Link href={cta.href} className={cta.primary ? 'btn-primary' : 'btn-secondary'}>{cta.cta}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
