import { getTranslations } from 'next-intl/server'
import { SITE_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'
import { faqKeys } from '@/data/faq'
import JsonLd from '@/components/seo/JsonLd'
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data'
import FaqAccordion from '@/components/sections/FaqAccordion'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.faq' })
  const url = `${SITE_URL}/${locale}/faq`
  const hreflang = Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/faq`]))
  hreflang['x-default'] = `${SITE_URL}/en/faq`
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: url, languages: hreflang },
    openGraph: { title: t('title'), description: t('description'), url, type: 'website' },
  }
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  const bc = await getTranslations({ locale, namespace: 'breadcrumb' })

  const items = faqKeys.map(key => ({
    key,
    question: t(`${key}.question`),
    answer: t(`${key}.answer`),
  }))

  return (
    <>
      <JsonLd data={faqSchema(items.map(({ question, answer }) => ({ question, answer })))} />
      <JsonLd data={breadcrumbSchema([
        { name: bc('home'), url: `${SITE_URL}/${locale}` },
        { name: bc('faq'), url: `${SITE_URL}/${locale}/faq` },
      ])} />

      <section className="container-page py-12 md:py-16">
        <div className="stag mb-12">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{t('eyebrow')}</p>
          <h1 className="stitle">{t('h1')}</h1>
          <p className="ssub max-w-2xl">{t('sub')}</p>
        </div>

        <div className="max-w-3xl">
          <FaqAccordion items={items} />
        </div>
      </section>
    </>
  )
}
