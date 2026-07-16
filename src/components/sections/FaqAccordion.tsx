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
              isOpen ? 'border-gold/30 bg-card-dark' : 'border-border-dark bg-card-dark hover:border-border'
            }`}
          >
            <button
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-150"
              onClick={() => setOpen(isOpen ? null : item.key)}
              aria-expanded={isOpen}
            >
              <span className={`text-sm font-semibold transition-colors duration-200 ${isOpen ? 'text-gold2' : 'text-white'}`}>
                {item.question}
              </span>
              <span
                className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isOpen ? 'border-gold bg-gold/15 rotate-180' : 'border-border-dark'
                }`}
              >
                <svg
                  className={`w-3 h-3 transition-colors duration-200 ${isOpen ? 'text-gold' : 'text-gray-500'}`}
                  viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M1 1l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>

            {/* Smooth height animation via max-height */}
            <div
              className="overflow-hidden transition-all ease-in-out"
              style={{
                maxHeight: isOpen ? '400px' : '0',
                transitionDuration: isOpen ? '320ms' : '200ms',
              }}
            >
              <div className="px-5 pb-5">
                <div className="w-8 h-px bg-gold/50 mb-4" />
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
