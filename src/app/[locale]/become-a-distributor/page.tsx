import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { SITE_URL, CONTACT, REGISTER_URL, FORM_ACTION } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const url = `${SITE_URL}/${locale}/become-a-distributor`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/become-a-distributor`]))
  hreflang['x-default'] = `${SITE_URL}/en/become-a-distributor`
  return {
    title: 'Become a Cement Board Distributor in Europe | Terasun Europe',
    description: 'Become an authorised Terasun TSM cement board distributor. Territory-based agreements, competitive margins, full CE documentation support, and technical training.',
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: 'Cement Board Distributor Programme | Terasun Europe', description: 'Exclusive territory distribution of CE-certified Terasun TSM lightweight cement board across Europe. Apply for distributor access.', url, type: 'website' },
    keywords: 'become cement board distributor, cement board distributor Europe, cement board importer, cement board wholesale, lightweight cement board distribution',
  }
}

export default async function BecomeADistributorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const nav = (path: string) => `/${locale}${path}`

  const openMarkets = [
    'Germany', 'Netherlands', 'Belgium', 'France', 'Spain', 'Portugal',
    'Italy', 'Austria', 'Switzerland', 'Poland', 'Czech Republic', 'Slovakia',
    'Hungary', 'Romania', 'Bulgaria', 'Croatia', 'Slovenia', 'Estonia',
    'Latvia', 'Lithuania', 'Denmark', 'Norway', 'Sweden', 'Greece',
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Become a distributor', url: `${SITE_URL}/${locale}/become-a-distributor` },
      ])} />

      <section className="page-hero">
        <div className="container-page">
          <p className="stag">Distribution programme</p>
          <h1 className="stitle-xl">Become a Cement Board Distributor</h1>
          <p className="ssub max-w-2xl">
            Distribute Terasun TSM CE-certified lightweight cement board in your territory. We offer exclusive territory agreements, competitive wholesale margins, and full technical support.
          </p>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {[
            { icon: '💰', title: 'Competitive margins', body: 'Wholesale pricing with distributor margins. Volume-based discounts for stocking partners.' },
            { icon: '🗺️', title: 'Exclusive territory', body: 'Territory-based agreements. Priority markets available across Europe now.' },
            { icon: '📋', title: 'Full documentation', body: 'Complete CE, ETA, DoP, EPD, and fire test documentation for your customers\' building authorities.' },
            { icon: '🎓', title: 'Training & support', body: 'Technical product training, installation guidance, and marketing support for your sales team.' },
          ].map(b => (
            <div key={b.title} className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-center">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-bold text-[#132238] mb-2">{b.title}</h3>
              <p className="text-[#4A5B6D] text-sm leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="border border-[#D8E1E9] rounded-2xl p-8 bg-white">
              <h2 className="text-xl font-black text-[#132238] mb-2">Distributor application</h2>
              <p className="text-[#4A5B6D] text-sm mb-6">Complete this form and we will review your application. All inquiries are treated confidentially.</p>
              <form action={FORM_ACTION} method="POST" className="space-y-5">
                <input type="hidden" name="form_type" value="distributor_application" />
                <input type="hidden" name="source" value="website-distributor-page" />
                <input type="hidden" name="supply_type" value="distributor" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Full name *</label>
                    <input name="name" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Company name *</label>
                    <input name="company" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Email *</label>
                    <input name="email" type="email" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Phone *</label>
                    <input name="phone" type="tel" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Country / Territory *</label>
                    <input name="country" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Website</label>
                    <input name="website" type="url" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none" placeholder="https://" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#132238] mb-1">Business type *</label>
                  <select name="business_type" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none bg-white">
                    <option value="">Select...</option>
                    <option value="stocking_distributor">Stocking distributor</option>
                    <option value="importer">Importer</option>
                    <option value="building_merchant">Building merchant / retailer</option>
                    <option value="project_partner">Project partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#132238] mb-1">Estimated annual volume (m²)</label>
                  <select name="annual_volume" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none bg-white">
                    <option value="">Select...</option>
                    <option value="under5000">Under 5,000 m²</option>
                    <option value="5000-20000">5,000–20,000 m²</option>
                    <option value="20000-50000">20,000–50,000 m²</option>
                    <option value="over50000">Over 50,000 m²</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#132238] mb-1">Tell us about your business and target applications</label>
                  <textarea name="message" rows={4} className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm focus:border-[#5CA4D6] focus:outline-none resize-none" placeholder="Current product range, customer base, target applications (facade, wet rooms, etc.)..." />
                </div>

                <button type="submit" className="btn-primary w-full py-3">Submit distributor application</button>
                <p className="text-xs text-[#8B9AAD] text-center">Applications are reviewed within 3–5 business days.</p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-4">Open markets</h3>
              <div className="flex flex-wrap gap-2">
                {openMarkets.map(m => (
                  <span key={m} className="text-xs bg-[#EBF4FB] text-[#245A85] border border-[#245A85]/20 rounded-full px-2.5 py-1">{m}</span>
                ))}
              </div>
              <p className="text-xs text-[#8B9AAD] mt-3">Contact us for territory availability in your country.</p>
            </div>

            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-3">Already registered?</h3>
              <p className="text-[#4A5B6D] text-xs mb-4">Access your partner account for protected documents and order history.</p>
              <a href={REGISTER_URL} className="btn-secondary text-sm py-2 w-full text-center block" target="_blank" rel="noopener noreferrer">Partner portal →</a>
            </div>

            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-sm">
              <h3 className="font-black text-[#132238] mb-3">Questions?</h3>
              <p className="text-[#4A5B6D] text-xs mb-3">Contact our distribution team directly.</p>
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
