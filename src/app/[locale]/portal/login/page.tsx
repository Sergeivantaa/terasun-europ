import { getTranslations } from 'next-intl/server'
import { LOGIN_URL, REGISTER_URL } from '@/lib/constants'
import { locales } from '@/i18n/routing'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata() {
  return {
    title: 'Partner Login — Terasun Europe',
    description: 'Log in to the Terasun Europe partner portal to access protected documents and order management.',
    robots: 'noindex',
  }
}

export default async function PortalLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portal' })

  return (
    <section className="container-page py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="stag mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">{t('loginTitle')}</h1>
          <p className="text-gray-400 text-sm">{t('loginSub')}</p>
        </div>
        <div className="card-gold p-8 text-center">
          <p className="text-gray-300 text-sm mb-6">{t('loginRedirectText')}</p>
          <a href={LOGIN_URL} className="btn-primary px-8 py-3 block w-full text-center">{t('loginBtn')}</a>
          <div className="rule my-6" />
          <p className="text-gray-500 text-xs">{t('noAccount')}</p>
          <a href={REGISTER_URL} className="btn-secondary text-sm py-2 px-6 mt-3 inline-block">{t('registerLink')}</a>
        </div>
      </div>
    </section>
  )
}
