import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { CONTACT, BACKEND_URL, SITE_URL } from '@/lib/constants'

type Props = { locale: string }

export default function Footer({ locale }: Props) {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')

  const navHref = (path: string) => `/${locale}${path}`

  return (
    <footer className="bg-darker border-t border-border-dark mt-16">
      <div className="container-page py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="text-lg font-black tracking-widest text-white mb-0.5">{t('brand')}</div>
            <div className="text-xs font-semibold tracking-wider text-[#5CA4D6] uppercase mb-4">{t('brandSub')}</div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('desc')}<br/>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">{CONTACT.email}</a>
            </p>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              {t('authLine')}<br/>
              {t('notManufacturer')}
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">{t('colProduct')}</h3>
            <div className="flex flex-col gap-2">
              <Link href={navHref('/products')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('products')}</Link>
              <Link href={navHref('/applications')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('applications')}</Link>
              <Link href={navHref('/technical-data')} className="text-sm text-gray-400 hover:text-white transition-colors">Technical data</Link>
              <Link href={navHref('/installation')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('downloads')}</Link>
            </div>
          </div>

          {/* Documentation links */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">{t('colDocs')}</h3>
            <div className="flex flex-col gap-2">
              <Link href={navHref('/certifications')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('certifications')}</Link>
              <Link href={navHref('/downloads')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('downloads')}</Link>
              <Link href={navHref('/faq')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('faq')}</Link>
              <Link href={navHref('/contact')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('contact')}</Link>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">{t('colCompany')}</h3>
            <div className="flex flex-col gap-2">
              <Link href={navHref('/about')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('about')}</Link>
              <Link href={navHref('/manufacturer')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('manufacturer')}</Link>
              <Link href={navHref('/distributors')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('distributors')}</Link>
              <Link href={navHref('/logistics')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('logistics')}</Link>
              <Link href={navHref('/gallery')} className="text-sm text-gray-400 hover:text-white transition-colors">{nav('gallery')}</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border-dark pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t('legal')}<br/>
              {t('legalMfr')}<br/>
              {t('legalCerts')}
            </p>
            <div className="flex gap-4 mt-3">
              <a href={`${BACKEND_URL}/privacy-policy`} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{t('privacy')}</a>
              <a href={`${BACKEND_URL}/cookie-policy`} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{t('cookies')}</a>
              <a href={`${BACKEND_URL}/terms-of-use`} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{t('terms')}</a>
            </div>
          </div>
          <div className="shrink-0">
            <Image
              src="https://terasun-europe.eu/imgs/LK_luottamusmerkki_Luottamusmerkki-3-vuotta.png"
              alt="Luotettava Kumppani trust mark - 3 years"
              width={120}
              height={64}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
