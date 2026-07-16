import { getTranslations, setRequestLocale} from 'next-intl/server'
import { REGISTER_URL, LOGIN_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata() {
  return {
    title: 'Partner Registration — Terasun Europe',
    description: 'Apply to become an authorised Terasun Europe distributor or verified partner.',
    robots: 'noindex',
  }
}

export default async function PortalRegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'portal' })

  return (
    <section className="container-page py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="stag mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#132238] mb-2">{t('registerTitle')}</h1>
          <p className="text-[#4A5B6D] text-sm">{t('registerSub')}</p>
        </div>
        <div className="card-gold p-8 text-center">
          <p className="text-[#132238] text-sm mb-6">{t('registerRedirectText')}</p>
          <a href={REGISTER_URL} className="btn-primary px-8 py-3 block w-full text-center">{t('registerBtn')}</a>
          <div className="rule my-6" />
          <p className="text-[#6B7A8D] text-xs">{t('haveAccount')}</p>
          <a href={LOGIN_URL} className="btn-secondary text-sm py-2 px-6 mt-3 inline-block">{t('loginLink')}</a>
        </div>
      </div>
    </section>
  )
}
