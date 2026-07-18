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
  const url = `${SITE_URL}/${locale}/request-free-sample`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/request-free-sample`]))
  hreflang['x-default'] = `${SITE_URL}/en/request-free-sample`
  return {
    title: 'Request Free Cement Board Sample | Terasun TSM | Terasun Europe',
    description: 'Request a free Terasun TSM lightweight cement board sample pack. Includes board sample, CE certificate, ETA, TDS and EPD. Available to architects, contractors and distributors across Europe.',
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: 'Free Cement Board Sample Pack | Terasun Europe', description: 'Request a free sample of Terasun TSM lightweight cement board — includes CE certificate, ETA, and full technical documentation.', url, type: 'website' },
  }
}

export default async function RequestFreeSamplePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })
  const nav = (path: string) => `/${locale}${path}`

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: 'Request free sample', url: `${SITE_URL}/${locale}/request-free-sample` },
      ])} />

      <section className="page-hero">
        <div className="container-page">
          <p className="stag">Free sample</p>
          <h1 className="stitle-xl">Request a Free Cement Board Sample</h1>
          <p className="ssub max-w-2xl">
            Evaluate Terasun TSM lightweight cement board before ordering. Sample packs are available free of charge to qualified architects, contractors, specifiers, and distributors.
          </p>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="border border-[#D8E1E9] rounded-2xl p-8 bg-white">
              <h2 className="text-xl font-black text-[#132238] mb-6">Sample request form</h2>
              <form action={FORM_ACTION} method="POST" className="space-y-5">
                <input type="hidden" name="form_type" value="sample_request" />
                <input type="hidden" name="source" value="website-sample-page" />
                <input type="hidden" name="request_type" value="sample" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Full name *</label>
                    <input name="name" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm text-[#132238] focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Company *</label>
                    <input name="company" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm text-[#132238] focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Email address *</label>
                    <input name="email" type="email" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm text-[#132238] focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Phone</label>
                    <input name="phone" type="tel" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm text-[#132238] focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Country *</label>
                    <input name="country" required className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm text-[#132238] focus:border-[#5CA4D6] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#132238] mb-1">Business type</label>
                    <select name="business_type" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm text-[#132238] focus:border-[#5CA4D6] focus:outline-none bg-white">
                      <option value="">Select...</option>
                      <option value="architect">Architect / Specifier</option>
                      <option value="contractor">Contractor / Installer</option>
                      <option value="distributor">Distributor / Importer</option>
                      <option value="developer">Developer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#132238] mb-1">Delivery address for sample</label>
                  <input name="delivery_address" className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm text-[#132238] focus:border-[#5CA4D6] focus:outline-none" placeholder="Street address, city, postal code" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#132238] mb-1">Your project or application (optional)</label>
                  <textarea name="message" rows={3} className="w-full border border-[#D8E1E9] rounded-lg px-3 py-2.5 text-sm text-[#132238] focus:border-[#5CA4D6] focus:outline-none resize-none" placeholder="Briefly describe your project or intended application..." />
                </div>

                <button type="submit" className="btn-primary w-full py-3">Submit sample request</button>
                <p className="text-xs text-[#8B9AAD] text-center">We typically respond within 1–2 business days.</p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-4">What&apos;s included</h3>
              <ul className="space-y-3">
                {[
                  'Terasun TSM 12 mm board sample',
                  'Technical Data Sheet',
                  'CE Certificate 1023-CPR-1565 P',
                  'European Technical Assessment ETA 24/0895',
                  'Declaration of Performance TRS-20250610F',
                  'EPD-IES-0018268 summary',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#4A5B6D]">
                    <span className="text-[#245A85] font-bold shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white">
              <h3 className="font-black text-[#132238] mb-3">Direct contact</h3>
              <div className="space-y-2 text-sm text-[#4A5B6D]">
                <p>📧 <a href={`mailto:${CONTACT.email}`} className="text-[#245A85] hover:underline">{CONTACT.email}</a></p>
                <p>📍 {CONTACT.address}, {CONTACT.city}</p>
              </div>
            </div>

            <div className="border border-[#D8E1E9] rounded-2xl p-6 bg-white text-sm text-[#4A5B6D]">
              <h3 className="font-black text-[#132238] mb-3">Also available</h3>
              <ul className="space-y-2">
                <li><Link href={nav('/request-a-quote')} className="text-[#245A85] hover:underline">→ Request a container quotation</Link></li>
                <li><Link href={nav('/become-a-distributor')} className="text-[#245A85] hover:underline">→ Apply to become a distributor</Link></li>
                <li><Link href={nav('/downloads')} className="text-[#245A85] hover:underline">→ Download all technical documents</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
