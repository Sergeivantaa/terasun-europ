import Link from 'next/link'
import { getDocsForApplication, docDownloadUrl, categoryOrder, categoryLabels, type TechDoc } from '@/data/techDocs'
import { LOGIN_URL } from '@/lib/constants'

function StatusBadge({ status }: { status: TechDoc['status'] }) {
  if (status === 'coming-soon') {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#F0F5FA] text-[#8B9AAD] font-medium border border-[#D8E1E9]">
        Coming soon
      </span>
    )
  }
  if (status === 'login') {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#FFF8E7] text-[#9A7B00] font-medium border border-[#EDD97A]">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <rect x="1.5" y="4.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
          <path d="M3 4.5V3a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        Login required
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#1A6E3C] font-medium border border-[#A8D9B9]">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M2 5.5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Available
    </span>
  )
}

function FormatBadge({ format }: { format: TechDoc['format'] }) {
  const colors: Record<string, string> = {
    PDF: 'text-[#C0392B] bg-[#FDF0EF] border-[#F5C6C2]',
    DWG: 'text-[#1A5C9A] bg-[#EBF4FB] border-[#B0D4EF]',
    IFC: 'text-[#5B3A8C] bg-[#F2EDF9] border-[#C9B5E8]',
    ZIP: 'text-[#4A5B6D] bg-[#F0F5FA] border-[#C8D5E0]',
  }
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${colors[format] ?? colors.ZIP}`}>
      {format}
    </span>
  )
}

function DocRow({ doc }: { doc: TechDoc }) {
  const url = docDownloadUrl(doc)
  const isComingSoon = doc.status === 'coming-soon'
  const isLogin = doc.status === 'login'

  return (
    <div className={`flex items-start justify-between gap-4 py-3 px-4 rounded-lg border transition-colors ${
      isComingSoon
        ? 'bg-[#FAFBFC] border-[#E8EEF4] opacity-70'
        : 'bg-white border-[#D8E1E9] hover:border-[#5CA4D6] hover:bg-[#F5FAFF]'
    }`}>
      <div className="flex items-start gap-3 min-w-0">
        <FormatBadge format={doc.format} />
        <div className="min-w-0">
          <p className={`text-sm font-semibold leading-snug ${isComingSoon ? 'text-[#8B9AAD]' : 'text-[#132238]'}`}>
            {doc.name}
          </p>
          <p className="text-xs text-[#6B7A8D] mt-0.5 leading-relaxed">{doc.desc}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <StatusBadge status={doc.status} />
        {!isComingSoon && (
          isLogin ? (
            <Link
              href={LOGIN_URL}
              className="text-xs text-[#245A85] hover:text-[#5CA4D6] font-medium transition-colors whitespace-nowrap"
            >
              Sign in →
            </Link>
          ) : url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#245A85] hover:text-[#5CA4D6] font-medium transition-colors whitespace-nowrap"
            >
              Download ↗
            </a>
          ) : null
        )}
      </div>
    </div>
  )
}

interface Props {
  applicationSlug: string
}

export default function TechDocsSection({ applicationSlug }: Props) {
  const docs = getDocsForApplication(applicationSlug)

  // Group by category in defined order
  const grouped = categoryOrder.reduce<Record<string, TechDoc[]>>((acc, cat) => {
    const items = docs.filter(d => d.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})

  if (Object.keys(grouped).length === 0) return null

  const totalAvailable = docs.filter(d => d.status === 'available').length
  const totalLogin = docs.filter(d => d.status === 'login').length
  const totalDocs = docs.length

  return (
    <section className="mt-16 pt-10 border-t border-[#D8E1E9]">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-[#132238]">Technical Documentation</h2>
          <p className="text-sm text-[#6B7A8D] mt-1">
            {totalDocs} documents — {totalAvailable} available for immediate download
            {totalLogin > 0 && `, ${totalLogin} require partner login`}
          </p>
        </div>
        <a
          href="/en/downloads"
          className="text-xs text-[#245A85] hover:text-[#5CA4D6] font-medium transition-colors"
        >
          View full download centre →
        </a>
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <h3 className="text-xs font-bold text-[#8B9AAD] uppercase tracking-wider mb-3">
              {categoryLabels[cat as keyof typeof categoryLabels]}
            </h3>
            <div className="space-y-2">
              {items.map(doc => (
                <DocRow key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
