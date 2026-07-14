'use client'

import { useState } from 'react'

type Item = { key: string; question: string; answer: string }

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.key} className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/3 transition-colors"
            onClick={() => setOpen(open === item.key ? null : item.key)}
            aria-expanded={open === item.key}
          >
            <span className="text-sm font-semibold text-white">{item.question}</span>
            <svg
              className={`shrink-0 w-4 h-4 text-gold transition-transform ${open === item.key ? 'rotate-180' : ''}`}
              viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === item.key && (
            <div className="px-5 pb-5">
              <div className="rule mb-4" />
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
