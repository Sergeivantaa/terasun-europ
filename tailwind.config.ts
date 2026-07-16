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
        // Nav, footer, hero sections
        dark:     '#111318',
        darker:   '#0D0F14',
        // Light page background
        page:     '#F5F6F8',
        // Gold accent — amber-orange, works on both light and dark
        gold:     '#B45309',
        gold2:    '#F59E0B',
        'gold-light':   '#FEF3C7',
        'gold-border':  '#FDE68A',
        // Utility
        muted:    '#6B7280',
        light:    '#9CA3AF',
        // Dark borders (backward compat — most pages use these inside dark sections)
        border:       '#2d3040',
        'border-dark': '#1F2937',
        // Dark cards (backward compat)
        card:        '#1C1F2B',
        'card-dark': '#1C1F2B',
        // Light-section tokens
        surface:      '#FFFFFF',
        'border-light': '#E5E7EB',
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
