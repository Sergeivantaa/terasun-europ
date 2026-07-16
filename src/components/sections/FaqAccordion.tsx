'use client'

import { useState } from 'react'

type Item = { key: string; question: string; answer: string }

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      {items.map(item => {
        const isOpen = open === item.key
        return (
          <div
            key={item.key}
            className={`rounded-xl border overflow-hidden transition-colors duration-200 ${
              isOpen
                ? 'border-[#245A85]/40 bg-white shadow-sm'
                : 'border-[#D8E1E9] bg-white hover:border-[#245A85]/30'
            }`}
          >
            <button
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-150"
              onClick={() => setOpen(isOpen ? null : item.key)}
              aria-expanded={isOpen}
            >
              <span className={`text-sm font-semibold transition-colors duration-200 ${isOpen ? 'text-[#245A85]' : 'text-[#132238]'}`}>
                {item.question}
              </span>
              <span
                className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? 'border-[#245A85] bg-[#245A85]/10 rotate-180'
                    : 'border-[#D8E1E9]'
                }`}
              >
                <svg
                  className={`w-3 h-3 transition-colors duration-200 ${isOpen ? 'text-[#245A85]' : 'text-[#6B7A8D]'}`}
                  viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M1 1l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>

            <div
              className="overflow-hidden transition-all ease-in-out"
              style={{
                maxHeight: isOpen ? '400px' : '0',
                transitionDuration: isOpen ? '320ms' : '200ms',
              }}
            >
              <div className="px-5 pb-5">
                <div className="w-8 h-px bg-[#245A85]/30 mb-4" />
                <p className="text-sm text-[#4A5B6D] leading-relaxed whitespace-pre-line">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
