import { getTranslations } from 'next-intl/server'
import { CONTACT, SITE_URL } from '@/lib/constants'
import { locales, type Locale } from '@/i18n/routing'
import JsonLd from '@/components/seo/JsonLd'
import { organizationSchema, breadcrumbSchema } from '@/lib/structured-data'
import QuotationForm from '@/components/forms/QuotationForm'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.contact' })
  const url = `${SITE_URL}/${locale}/contact`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/contact`]))
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('contact'), url: `${SITE_URL}/${locale}/contact` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{t('eyebrow')}</p>
          <h1 className="stitle">{t('h1')}</h1>
          <p className="ssub">{t('sub')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <QuotationForm locale={locale} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card-gold p-6">
              <h3 className="font-bold text-white mb-4">{t('sidebar.contactTitle')}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="text-gold2 hover:text-white transition-colors">{CONTACT.email}</a>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Phone / WhatsApp</p>
                  <a href={`tel:${CONTACT.phone}`} className="text-white hover:text-gold2 transition-colors">{CONTACT.phoneDisplay}</a>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">VAT ID</p>
                  <p className="text-gray-300">{CONTACT.vat}</p>
                </div>
              </div>
            </div>

            <div className="card-gold p-6">
              <h3 className="font-bold text-white mb-3">{t('sidebar.responseTitle')}</h3>
              <p className="text-sm text-gray-300">{t('sidebar.responseText')}</p>
            </div>

            <div className="card-gold p-6">
              <h3 className="font-bold text-white mb-3">{t('sidebar.addressTitle')}</h3>
              <address className="not-italic text-sm text-gray-300 leading-relaxed">
                Terasun Europe<br />
                {CONTACT.address}<br />
                {CONTACT.city}
              </address>
            </div>

            <div className="rounded-xl border border-yellow-700/40 bg-yellow-950/20 p-4">
              <p className="text-xs text-yellow-300/80 leading-relaxed">
                <strong className="text-yellow-300">Note:</strong> Terasun Europe is the Authorised European Representative only. We are not the manufacturer of Terasun products.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
