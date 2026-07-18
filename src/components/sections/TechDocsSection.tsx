import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getDocsForApplication, docDownloadUrl, type TechDoc } from '@/data/techDocs'
import { LOGIN_URL } from '@/lib/constants'

// Priority doc IDs per application — ordered by relevance to the system
const systemPriorityDocs: Record<string, string[]> = {
  'facade-systems':                       ['installation', 'facade-guide', 'cutting-fixing', 'facade-cad', 'eta', 'ce'],
  'cement-board-ventilated-facades':      ['installation', 'facade-guide', 'cutting-fixing', 'facade-cad', 'eta', 'ce'],
  'cement-board-exterior-walls':          ['installation', 'facade-guide', 'joint-treatment', 'cutting-fixing', 'eta', 'ce'],
  'cement-board-exterior-plaster':        ['installation', 'render-guide', 'joint-treatment', 'cutting-fixing', 'eta', 'ce'],
  'wet-rooms':                            ['installation', 'wetroom-guide', 'waterproofing-guide', 'wetroom-cad', 'eta', 'ce'],
  'cement-board-wet-rooms':              ['installation', 'wetroom-guide', 'waterproofing-guide', 'wetroom-cad', 'eta'],
  'cement-board-bathrooms':              ['installation', 'wetroom-guide', 'waterproofing-guide', 'eta'],
  'fire-protection':                      ['fire-test', 'fire-assemblies', 'fire-manual', 'fire-cad', 'eta', 'ce', 'dop'],
  'fire-rated-cement-board-wall-system':  ['fire-test', 'fire-assemblies', 'fire-manual', 'fire-cad', 'eta', 'dop'],
  'steel-frame':                          ['installation', 'steel-frame-guide', 'steel-frame-cad', 'cutting-fixing', 'eta', 'ce'],
  'cement-board-steel-frame-construction':['installation', 'steel-frame-guide', 'cutting-fixing', 'eta', 'ce'],
  'cement-board-modular-construction':    ['installation', 'steel-frame-guide', 'cutting-fixing', 'eta'],
  'cement-board-prefabricated-buildings': ['installation', 'steel-frame-guide', 'cutting-fixing', 'eta'],
  'cement-board-interior-walls':          ['installation', 'interior-guide', 'cutting-fixing', 'joint-treatment', 'eta', 'ce'],
  'commercial-buildings':                 ['installation', 'facade-guide', 'fire-test', 'eta', 'ce', 'dop'],
  'residential':                          ['installation', 'facade-guide', 'wetroom-guide', 'eta', 'ce'],
  'cement-board-renovation':              ['installation', 'facade-guide', 'cutting-fixing', 'joint-treatment', 'eta'],
}

const defaultPriority = ['installation', 'eta', 'ce', 'dop', 'epd', 'tds']

function DocItem({ doc, actionDownload, actionLogin, statusLogin, statusComingSoon }: {
  doc: TechDoc
  actionDownload: string
  actionLogin: string
  statusLogin: string
  statusComingSoon: string
}) {
  const url = docDownloadUrl(doc)
  const isComingSoon = doc.status === 'coming-soon'
  const isLogin = doc.status === 'login'

  const formatColors: Record<string, string> = {
    PDF: 'text-[#C0392B] bg-[#FDF0EF] border-[#F5C6C2]',
    DWG: 'text-[#1A5C9A] bg-[#EBF4FB] border-[#B0D4EF]',
    IFC: 'text-[#5B3A8C] bg-[#F2EDF9] border-[#C9B5E8]',
    ZIP: 'text-[#4A5B6D] bg-[#F0F5FA] border-[#C8D5E0]',
  }

  return (
    <div className={`flex items-center justify-between gap-4 py-3 px-4 rounded-xl border transition-colors group ${
      isComingSoon
        ? 'bg-[#FAFBFC] border-[#E8EEF4]'
        : 'bg-white border-[#D8E1E9] hover:border-[#5CA4D6]'
    }`}>
      <div className="flex items-center gap-3 min-w-0">
        {/* Format chip */}
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${formatColors[doc.format] ?? formatColors.ZIP}`}>
          {doc.format}
        </span>
        <div className="min-w-0">
          <p className={`text-sm font-semibold leading-snug ${isComingSoon ? 'text-[#8B9AAD]' : 'text-[#132238]'}`}>
            {doc.name}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        {isComingSoon ? (
          <span className="text-xs text-[#8B9AAD] font-medium">{statusComingSoon}</span>
        ) : isLogin ? (
          <Link
            href={LOGIN_URL}
            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-[#EDD97A] bg-[#FFFBEC] text-[#9A7B00] font-semibold hover:bg-[#FFF3CC] transition-colors whitespace-nowrap"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <rect x="1.5" y="4.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3 4.5V3a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {statusLogin}
          </Link>
        ) : url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-[#5CA4D6] bg-[#EBF4FB] text-[#245A85] font-semibold hover:bg-[#D6EAFA] transition-colors whitespace-nowrap"
          >
            {actionDownload} ↗
          </a>
        ) : null}
      </div>
    </div>
  )
}

interface Props {
  applicationSlug: string
  /** locale-specific path prefix e.g. "/en" */
  localePath: string
}

export default async function TechDocsSection({ applicationSlug, localePath }: Props) {
  const t = await getTranslations('techDocs')
  const allDocs = getDocsForApplication(applicationSlug)

  const priorityIds = systemPriorityDocs[applicationSlug] ?? defaultPriority
  const docs = priorityIds
    .map(id => allDocs.find(d => d.id === id))
    .filter((d): d is TechDoc => d !== undefined)

  if (docs.length === 0) return null

  const availableCount = docs.filter(d => d.status === 'available').length

  return (
    <section className="mt-12 pt-10 border-t border-[#D8E1E9]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-black text-[#132238]">{t('sectionHeading')}</h2>
          <p className="text-xs text-[#8B9AAD] mt-0.5">
            {t('sectionSub', { count: docs.length, available: availableCount })}
          </p>
        </div>
        <Link
          href={`${localePath}/downloads`}
          className="text-xs font-semibold text-[#245A85] hover:text-[#5CA4D6] transition-colors whitespace-nowrap"
        >
          {t('openCentre')} →
        </Link>
      </div>

      <div className="space-y-2">
        {docs.map(doc => (
          <DocItem
            key={doc.id}
            doc={doc}
            actionDownload={t('actionDownload')}
            actionLogin={t('actionLogin')}
            statusLogin={t('statusLogin')}
            statusComingSoon={t('statusComingSoon')}
          />
        ))}
      </div>
    </section>
  )
}
