'use client'

import { useState } from 'react'
import Link from 'next/link'
import { techDocs, categoryOrder, categoryLabels, docDownloadUrl, type TechDoc, type DocCategory } from '@/data/techDocs'
import { LOGIN_URL } from '@/lib/constants'

const applicationGroups = [
  { label: 'All documents', value: '*' },
  { label: 'Ventilated facades', value: 'facade-systems' },
  { label: 'Render / exterior plaster', value: 'cement-board-exterior-plaster' },
  { label: 'Wet rooms & bathrooms', value: 'wet-rooms' },
  { label: 'Fire-rated walls', value: 'fire-protection' },
  { label: 'Steel frame / LSF', value: 'steel-frame' },
  { label: 'Interior walls', value: 'cement-board-interior-walls' },
]

function FormatBadge({ format }: { format: TechDoc['format'] }) {
  const colors: Record<string, string> = {
    PDF: 'text-[#C0392B] bg-[#FDF0EF] border-[#F5C6C2]',
    DWG: 'text-[#1A5C9A] bg-[#EBF4FB] border-[#B0D4EF]',
    IFC: 'text-[#5B3A8C] bg-[#F2EDF9] border-[#C9B5E8]',
    ZIP: 'text-[#4A5B6D] bg-[#F0F5FA] border-[#C8D5E0]',
  }
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${colors[format] ?? colors.ZIP}`}>
      {format}
    </span>
  )
}

function DocCard({ doc }: { doc: TechDoc }) {
  const url = docDownloadUrl(doc)
  const isComingSoon = doc.status === 'coming-soon'
  const isLogin = doc.status === 'login'

  return (
    <div className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-colors ${
      isComingSoon
        ? 'bg-[#FAFBFC] border-[#E8EEF4]'
        : 'bg-white border-[#D8E1E9] hover:border-[#5CA4D6] hover:shadow-sm'
    }`}>
      <div className="flex items-start gap-3 min-w-0">
        <div className="mt-0.5"><FormatBadge format={doc.format} /></div>
        <div className="min-w-0">
          <p className={`text-sm font-semibold leading-snug mb-1 ${isComingSoon ? 'text-[#8B9AAD]' : 'text-[#132238]'}`}>
            {doc.name}
          </p>
          <p className="text-xs text-[#6B7A8D] leading-relaxed">{doc.desc}</p>
        </div>
      </div>
      <div className="shrink-0 mt-0.5">
        {isComingSoon ? (
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#F0F5FA] text-[#8B9AAD] font-medium border border-[#D8E1E9] whitespace-nowrap">
            Coming soon
          </span>
        ) : isLogin ? (
          <Link
            href={LOGIN_URL}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[#EDD97A] bg-[#FFFBEC] text-[#9A7B00] font-semibold hover:bg-[#FFF3CC] transition-colors whitespace-nowrap"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <rect x="1.5" y="5" width="8" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3.5 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Partner login
          </Link>
        ) : url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-[#5CA4D6] bg-[#EBF4FB] text-[#245A85] font-semibold hover:bg-[#D6EAFA] transition-colors whitespace-nowrap"
          >
            Download ↗
          </a>
        ) : null}
      </div>
    </div>
  )
}

export default function DownloadCentre() {
  const [activeApp, setActiveApp] = useState('*')
  const [activeCategory, setActiveCategory] = useState<DocCategory | '*'>('*')

  const filteredDocs = techDocs.filter(doc => {
    const appMatch = activeApp === '*' || doc.applications.includes('*') || doc.applications.includes(activeApp)
    const catMatch = activeCategory === '*' || doc.category === activeCategory
    return appMatch && catMatch
  })

  const grouped = categoryOrder.reduce<Record<string, TechDoc[]>>((acc, cat) => {
    const items = filteredDocs.filter(d => d.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})

  const availableCount = filteredDocs.filter(d => d.status === 'available').length
  const loginCount = filteredDocs.filter(d => d.status === 'login').length

  return (
    <section className="section-alt py-12 md:py-16">
      <div className="container-page">

        {/* Partner login note */}
        <div className="rounded-xl border border-[#EDD97A] bg-[#FFFDF0] p-4 mb-8 flex items-start gap-3">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0 mt-0.5 text-[#B8860B]">
            <rect x="3" y="8" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-[#7A5C00] text-sm font-semibold mb-0.5">System guides and fire test reports require a partner account</p>
            <p className="text-[#7A5C00] text-xs">
              Certifications, EPD, and installation documents are freely available.{' '}
              <Link href={LOGIN_URL} className="underline hover:no-underline">Sign in</Link>
              {' '}or{' '}
              <Link href={LOGIN_URL.replace('/login', '/register')} className="underline hover:no-underline">register for access</Link>.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <aside className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#8B9AAD] uppercase tracking-wider mb-3">Application</h3>
              <div className="space-y-1">
                {applicationGroups.map(g => (
                  <button
                    key={g.value}
                    onClick={() => setActiveApp(g.value)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      activeApp === g.value
                        ? 'bg-[#132238] text-white font-semibold'
                        : 'text-[#4A5B6D] hover:bg-[#F0F5FA]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#8B9AAD] uppercase tracking-wider mb-3">Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory('*')}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    activeCategory === '*'
                      ? 'bg-[#132238] text-white font-semibold'
                      : 'text-[#4A5B6D] hover:bg-[#F0F5FA]'
                  }`}
                >
                  All categories
                </button>
                {categoryOrder.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      activeCategory === cat
                        ? 'bg-[#132238] text-white font-semibold'
                        : 'text-[#4A5B6D] hover:bg-[#F0F5FA]'
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#D8E1E9] bg-white p-4 text-xs text-[#6B7A8D] space-y-1">
              <p><span className="font-semibold text-[#132238]">{filteredDocs.length}</span> documents shown</p>
              <p><span className="font-semibold text-[#1A6E3C]">{availableCount}</span> immediate download</p>
              {loginCount > 0 && <p><span className="font-semibold text-[#9A7B00]">{loginCount}</span> require login</p>}
            </div>
          </aside>

          {/* Document list */}
          <div className="lg:col-span-3 space-y-8">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <h2 className="text-sm font-bold text-[#132238] uppercase tracking-wider mb-3 pb-2 border-b border-[#D8E1E9]">
                  {categoryLabels[cat as DocCategory]}
                </h2>
                <div className="space-y-2">
                  {items.map(doc => (
                    <DocCard key={doc.id} doc={doc} />
                  ))}
                </div>
              </div>
            ))}

            {filteredDocs.length === 0 && (
              <div className="text-center py-16 text-[#8B9AAD]">
                <p className="text-lg mb-2">No documents match this filter</p>
                <button onClick={() => { setActiveApp('*'); setActiveCategory('*') }} className="text-sm text-[#245A85] hover:underline">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
