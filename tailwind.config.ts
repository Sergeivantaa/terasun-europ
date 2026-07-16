import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Dark/navy (all dark sections) ──
        dark:     '#0C1929',
        darker:   '#080F1A',
        // ── Blue accent — primary CTA, replaces orange as lead color ──
        accent:        '#2563EB',
        'accent-dark': '#1D4ED8',
        'accent-light':'#EFF6FF',
        // ── Gold — secondary only: cert badges, cert numbers ──
        gold:     '#B45309',
        gold2:    '#F59E0B',
        'gold-light':   '#FEF3C7',
        'gold-border':  '#FDE68A',
        // ── Page backgrounds ──
        page:     '#F4F7FB',
        // ── Utility text ──
        muted:    '#64748B',
        light:    '#94A3B8',
        // ── Dark-section borders + cards (navy tint) ──
        border:       '#1E3A57',
        'border-dark': '#162E47',
        card:        '#0F2135',
        'card-dark': '#0F2135',
        // ── Light-section tokens ──
        surface:      '#FFFFFF',
        'border-light': '#D1DCF0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [typography],
}

export default config
