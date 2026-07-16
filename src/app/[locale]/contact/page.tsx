import { getTranslations, setRequestLocale} from 'next-intl/server'
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
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta.contact' })
  const url = `${SITE_URL}/${locale}/contact`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/contact`]))
  hreflang['x-default'] = `${SITE_URL}/en/contact`
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
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('contact'), url: `${SITE_URL}/${locale}/contact` },
      ])} />

      <div className="page-hero">
        <div className="container-page">
          <p className="stag">{t('eyebrow')}</p>
          <h1 className="stitle-xl">{t('h1')}</h1>
          <p className="ssub">{t('sub')}</p>
        </div>
      </div>

      <section className="section-alt py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <QuotationForm locale={locale} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">{t('sidebar.contactTitle')}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Email</p>
                    <a href={`mailto:${CONTACT.email}`} className="text-accent hover:text-accent-dark transition-colors font-medium">{CONTACT.email}</a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Phone / WhatsApp</p>
                    <a href={`tel:${CONTACT.phone}`} className="text-slate-800 hover:text-accent transition-colors font-medium">{CONTACT.phoneDisplay}</a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">VAT ID</p>
                    <p className="text-slate-600">{CONTACT.vat}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3">{t('sidebar.responseTitle')}</h3>
                <p className="text-sm text-slate-500">{t('sidebar.responseText')}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3">{t('sidebar.addressTitle')}</h3>
                <address className="not-italic text-sm text-slate-600 leading-relaxed">
                  Terasun Europe<br />
                  {CONTACT.address}<br />
                  {CONTACT.city}
                </address>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-xs text-blue-700 leading-relaxed">
                  <strong>Note:</strong> Terasun Europe is the Authorised European Representative only. We are not the manufacturer of Terasun products.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
