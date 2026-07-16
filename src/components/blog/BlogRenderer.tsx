import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/constants'

type Props = {
  body: string
  locale: string
  faq?: { q: string; a: string }[]
  downloads?: { label: string; url: string }[]
}

function parseInline(text: string): React.ReactNode {
  // Bold, links, cert badges
  const parts: React.ReactNode[] = []
  const regex = /(\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`)/g
  let last = 0
  let m: RegExpExecArray | null

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[0].startsWith('**')) {
      parts.push(<strong key={m.index} className="font-semibold text-[#132238]">{m[2]}</strong>)
    } else if (m[0].startsWith('[')) {
      const href = m[4]
      const isExternal = href.startsWith('http')
      parts.push(
        isExternal
          ? <a key={m.index} href={href} target="_blank" rel="noopener noreferrer"
              className="text-[#245A85] underline underline-offset-2 hover:text-[#1A4470]">{m[3]}</a>
          : <Link key={m.index} href={href} className="text-[#245A85] underline underline-offset-2 hover:text-[#1A4470]">{m[3]}</Link>
      )
    } else if (m[0].startsWith('`')) {
      parts.push(<code key={m.index} className="bg-[#EBF4FB] text-[#245A85] rounded px-1.5 py-0.5 text-sm font-mono">{m[5]}</code>)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 ? parts[0] : <>{parts}</>
}

function renderTable(block: string) {
  const rows = block.split('\n').filter(r => r.trim().startsWith('|'))
  if (rows.length < 2) return null
  const headers = rows[0].split('|').filter(Boolean).map(h => h.trim())
  const bodyRows = rows.slice(2).map(r => r.split('|').filter(Boolean).map(c => c.trim()))
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-[#D8E1E9]">
      <table className="w-full text-sm">
        <thead className="bg-[#F4F7FA]">
          <tr>{headers.map((h, i) => (
            <th key={i} className="text-left px-4 py-3 font-bold text-[#132238] text-xs uppercase tracking-wide border-b border-[#D8E1E9]">
              {parseInline(h)}
            </th>
          ))}</tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#EDF2F7]">
          {bodyRows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? 'bg-[#FAFBFC]' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[#4A5B6D]">{parseInline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderBlock(block: string, locale: string, i: number): React.ReactNode {
  const trimmed = block.trim()

  if (!trimmed) return null

  // H2
  if (trimmed.startsWith('## '))
    return <h2 key={i} className="text-2xl font-black text-[#132238] mt-12 mb-4 leading-tight">{parseInline(trimmed.slice(3))}</h2>

  // H3
  if (trimmed.startsWith('### '))
    return <h3 key={i} className="text-lg font-bold text-[#132238] mt-8 mb-3">{parseInline(trimmed.slice(4))}</h3>

  // HR
  if (trimmed === '---')
    return <hr key={i} className="border-t border-[#D8E1E9] my-8" />

  // Image: ![alt](src)
  if (trimmed.startsWith('![')) {
    const m = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
    if (m) {
      const [, alt, src] = m
      const isExternal = src.startsWith('http')
      const imgSrc = isExternal ? src : src
      return (
        <div key={i} className="my-6 rounded-2xl overflow-hidden border border-[#D8E1E9] relative aspect-video bg-[#EBF4FB]">
          <Image src={imgSrc} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          {alt && <p className="absolute bottom-0 inset-x-0 bg-[#132238]/60 backdrop-blur-sm text-white text-xs px-4 py-2 text-center">{alt}</p>}
        </div>
      )
    }
  }

  // Blockquote
  if (trimmed.startsWith('> ')) {
    const lines = trimmed.split('\n').map(l => l.replace(/^>\s?/, ''))
    return (
      <blockquote key={i} className="border-l-4 border-[#245A85] bg-[#EBF4FB] rounded-r-xl pl-5 pr-4 py-4 my-6 text-[#132238] leading-relaxed">
        {lines.map((l, j) => <p key={j}>{parseInline(l)}</p>)}
      </blockquote>
    )
  }

  // Table
  if (trimmed.includes('|') && trimmed.split('\n').some(l => l.trim().startsWith('|')))
    return <div key={i}>{renderTable(trimmed)}</div>

  // Bullet list
  if (trimmed.startsWith('- ') || (trimmed.includes('\n- ') && !trimmed.startsWith('## '))) {
    const items = trimmed.split('\n').filter(l => l.startsWith('- '))
    return (
      <ul key={i} className="space-y-2 my-4">
        {items.map((item, j) => (
          <li key={j} className="flex items-start gap-3 text-[#4A5B6D]">
            <span className="w-5 h-5 rounded-full bg-[#EBF4FB] border border-[#5CA4D6]/30 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-2.5 h-2.5 text-[#245A85]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 8 6.5 11.5 13 5"/>
              </svg>
            </span>
            <span>{parseInline(item.slice(2))}</span>
          </li>
        ))}
      </ul>
    )
  }

  // Numbered list
  if (/^\d+\.\s/.test(trimmed)) {
    const items = trimmed.split('\n').filter(l => /^\d+\.\s/.test(l))
    return (
      <ol key={i} className="space-y-2 my-4 list-decimal list-inside">
        {items.map((item, j) => (
          <li key={j} className="text-[#4A5B6D] pl-1">{parseInline(item.replace(/^\d+\.\s/, ''))}</li>
        ))}
      </ol>
    )
  }

  // CTA block
  if (trimmed === '[CTA:sample]') return (
    <div key={i} className="my-8 p-6 bg-[#EBF4FB] border border-[#5CA4D6]/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <p className="font-bold text-[#132238] mb-1">Request a free board sample</p>
        <p className="text-sm text-[#4A5B6D]">Evaluate surface finish, weight, and cut behaviour before specifying. CE documentation included.</p>
      </div>
      <Link href={`/${locale}/contact`} className="btn-primary whitespace-nowrap shrink-0">Request sample →</Link>
    </div>
  )

  if (trimmed === '[CTA:quote]') return (
    <div key={i} className="my-8 p-6 bg-[#132238] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <p className="font-bold text-white mb-1">Request a project quotation</p>
        <p className="text-sm text-[#B8CADE]">CE-certified TSM board, direct from factory to your project or warehouse across Europe.</p>
      </div>
      <Link href={`/${locale}/contact`} className="bg-white text-[#245A85] font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#EBF4FB] transition-colors whitespace-nowrap shrink-0">Get a quote →</Link>
    </div>
  )

  if (trimmed === '[CTA:distributor]') return (
    <div key={i} className="my-8 p-6 bg-gradient-to-r from-[#0D2240] to-[#1A4470] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <p className="font-bold text-white mb-1">Become a distributor in your market</p>
        <p className="text-sm text-[#B8CADE]">Most European markets are open. Territory exclusivity available for qualified distributors.</p>
      </div>
      <Link href={`/${locale}/distributors`} className="bg-[#5CA4D6] text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#4A90C4] transition-colors whitespace-nowrap shrink-0">Partnership details →</Link>
    </div>
  )

  // Cert/spec info box: [INFO:text]
  if (trimmed.startsWith('[INFO:')) {
    const text = trimmed.slice(6, -1)
    return (
      <div key={i} className="my-4 flex gap-3 items-start bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-4">
        <svg className="w-5 h-5 text-[#245A85] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
        </svg>
        <p className="text-sm text-[#4A5B6D] leading-relaxed">{parseInline(text)}</p>
      </div>
    )
  }

  // Paragraph
  return <p key={i} className="text-[#4A5B6D] leading-relaxed">{parseInline(trimmed)}</p>
}

export default function BlogRenderer({ body, locale, faq, downloads }: Props) {
  const blocks = body.split('\n\n')

  return (
    <div className="space-y-2">
      {blocks.map((block, i) => renderBlock(block, locale, i))}

      {/* Downloads section */}
      {downloads && downloads.length > 0 && (
        <div className="mt-10 pt-6 border-t border-[#D8E1E9]">
          <h3 className="text-base font-bold text-[#132238] mb-4">Technical documents</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {downloads.map((d, i) => (
              <Link key={i} href={d.url}
                className="flex items-center gap-3 bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-4 hover:border-[#5CA4D6]/50 hover:bg-[#EBF4FB] transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#D8E1E9] flex items-center justify-center shrink-0 group-hover:border-[#5CA4D6]/40">
                  <svg className="w-4 h-4 text-[#245A85]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/>
                    <polyline points="9 15 12 18 15 15"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#132238]">{d.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAQ section */}
      {faq && faq.length > 0 && (
        <div className="mt-10 pt-6 border-t border-[#D8E1E9]">
          <h2 className="text-xl font-black text-[#132238] mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-[#F4F7FA] border border-[#D8E1E9] rounded-xl p-5">
                <h3 className="font-bold text-[#132238] mb-2 text-sm">{item.q}</h3>
                <p className="text-sm text-[#4A5B6D] leading-relaxed">{parseInline(item.a)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
