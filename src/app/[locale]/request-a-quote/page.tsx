import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL, CONTACT, FORM_ACTION } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const url = `${SITE_URL}/${locale}/request-a-quote`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/request-a-quote`]))
  hreflang['x-default'] = `${SITE_URL}/en/request-a-quote`
  return {
    title: 'Cement Board Quotation Europe | Buy Lightweight Cement Board | Terasun',
    description: 'Request a wholesale quotation for Terasun TSM lightweight cement board. Container and pallet orders, DDP European delivery. CE-certified, ETA 24/0895.',
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: 'Cement Board Price & Quotation | Terasun Europe', description: 'Get a quotation for CE-certified Terasun TSM lightweight cement board. Container orders for distributors and contractors across Europe.', url, type: 'website' },
    keywords: 'cement board quotation Europe, buy lightweight cement board, cement board price, cement board wholesale, cement board container order, cement board supplier Europe',
  }
}

export default async function RequestAQuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const nav = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Request a quote', url: `${SITE_URL}/${locale}/request-a-quote` },
      ])} />

      <section className="page-hero">
        <div className="container-page">
          <p className="stag">Quotation</p>
          <h1 className="stitle-xl">Cement Board Price & Quotation</h1>
          <p className="ssub max-w-2xl">
            Request a wholesale quotation for Terasun TSM lightweight cement board. Container and pallet quantities, DDP European warehouse delivery available.
          </p>
        </div>
      </section>

      {/* Key commercial facts */}
      <div className="bg-white border-b border-[#D8E1E9]">
        <div className="container-page py-5 grid sm:grid-cols-4 gap-4 text-sm">
          {[
            { label: 'Min. order', value: '~1,600 m² (20ft container)' },
            { label: 'Lead time', value: '6–10 weeks (container)' },
            { label: 'Incoterms', value: 'CIF / DDP / EXW' },
            { label: 'Warehouse stock', value: 'Finland — shorter lead time' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="text-xs text-[#8B9AAD] uppercase tracking-wider">{item.label}</p>
              <p className="font-bold text-[#132238] mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="container-page py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="border border-[#D8E1E9] rounded-2xl p-8 bg-white">
              <h2 className="text-xl font-black text-[#132238] mb-6">Quotation request</h2>
              <form action={FORM_ACTION} method="POST" className="space-y-5">
                <input type="hidden" name="form_type" value="quotation" />
                <input type="hidden" name="source" value="website-quote-page" />
                <input type="hidden" name="request_type" value="quotation" />
                <input type="hidden" name="product" value="Terasun TSM Cement Board" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Full name *</label>
                    <input name="name" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Company *</label>
                    <input name="company" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Email *</label>
                    <input name="email" type="email" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Phone</label>
                    <input name="phone" type="tel" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Country *</label>
                    <input name="country" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Business type</label>
                    <select name="business_type" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none bg-white">
                      <option value="">Select...</option>
                      <option value="distributor">Distributor / Importer</option>
                      <option value="contractor">Contractor</option>
                      <option value="developer">Developer</option>
                      <option value="retailer">Building merchant / Retailer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <hr className="border-[#EDF2F7]" />
                <h3 className="font-bold text-[#132238] text-sm">Order details</h3>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Thickness (mm)</label>
                    <select name="thickness" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none bg-white">
                      <option value="12">12 mm (CE documented)</option>
                      <option value="6">6 mm</option>
                      <option value="8">8 mm</option>
                      <option value="10">10 mm</option>
                      <option value="15">15 mm</option>
                      <option value="18">18 mm</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Quantity (m²)</label>
                    <input name="quantity_m2" type="number" min="0" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" placeholder="e.g. 2000" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Incoterms preference</label>
                    <select name="incoterms" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none bg-white">
                      <option value="">No preference</option>
                      <option value="DDP">DDP (delivered)</option>
                      <option value="CIF">CIF (port)</option>
                      <option value="EXW">EXW (ex works)</option>
                      <option value="FOB">FOB</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#132238] mb-1">Delivery destination</label>
                  <input name="delivery_country" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" placeholder="City, country" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#132238] mb-1">Application / project details</label>
                  <textarea name="message" rows={3} className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none resize-none" placeholder="Facade cladding, wet rooms, fire-rated partitions..." />
                </div>

                <button type="submit" className="btn-primary w-full py-3">Send quotation request</button>
                <p className="text-xs text-[#8B9AAD] text-center">We respond with pricing and availability within 1–2 business days.</p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-4">Ordering information</h3>
              <div className="space-y-4 text-sm text-[#4A5B6D]">
                <div>
                  <p className="font-semibold text-[#132238] mb-1">Minimum order</p>
                  <p>Approximately 1,600–2,200 m² per 20ft container, depending on board thickness. Smaller quantities may be available from Finnish warehouse stock.</p>
                </div>
                <div>
                  <p className="font-semibold text-[#132238] mb-1">Lead times</p>
                  <ul className="space-y-1 text-xs">
                    <li>Container from China: 6–10 weeks</li>
                    <li>DDP warehouse delivery: +1–2 weeks</li>
                    <li>Finnish warehouse stock: 1–2 weeks</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#132238] mb-1">What&apos;s included</p>
                  <p className="text-xs">CE certificate, DoP, technical data sheet, and full certification pack with every shipment.</p>
                </div>
              </div>
            </div>

            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-3">Direct contact</h3>
              <div className="space-y-2 text-sm text-[#4A5B6D]">
                <p>📧 <a href={`mailto:${CONTACT.email}`} className="text-[#245A85] hover:underline">{CONTACT.email}</a></p>
                <p>📞 <a href={`tel:${CONTACT.phone}`} className="text-[#245A85] hover:underline">{CONTACT.phoneDisplay}</a></p>
              </div>
            </div>

            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-sm">
              <h3 className="font-black text-[#132238] mb-3">Related</h3>
              <ul className="space-y-2 text-[#245A85]">
                <li><Link href={nav('/request-free-sample')} className="hover:underline">→ Request a free sample first</Link></li>
                <li><Link href={nav('/become-a-distributor')} className="hover:underline">→ Become a distributor</Link></li>
                <li><Link href={nav('/logistics')} className="hover:underline">→ Logistics & supply chain</Link></li>
                <li><Link href={nav('/downloads')} className="hover:underline">→ Technical documents</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
