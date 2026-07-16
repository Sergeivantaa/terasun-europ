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
        // ── Dark section backgrounds (deep navy) ──
        dark:     '#0F2742',   // primary navy bg
        darker:   '#081A2D',   // deepest navy
        // ── Blue scale — primary action colour ──
        accent:        '#245A85',   // buttons, CTAs, links (contrast 5.4:1 on white)
        'accent-dark': '#1A4470',   // hover state
        'accent-light':'#EBF4FB',   // tinted bg for chips/tags
        sky:           '#5CA4D6',   // lighter blue highlight on dark sections
        // ── Gold — cert badges ONLY, never in UI structure ──
        gold:     '#B45309',
        gold2:    '#F59E0B',
        'gold-light':   '#FEF3C7',
        'gold-border':  '#FDE68A',
        // ── Page/card backgrounds ──
        page:     '#F4F7FA',   // off-white page bg
        card:     '#FFFFFF',   // white cards (light sections)
        'card-dark': '#152D4A', // card inside dark sections
        // ── Text ──
        muted:    '#4A5B6D',   // secondary body text (5.7:1 on white) ✓ WCAG AA
        light:    '#6B7A8D',   // tertiary/captions
        // ── Borders ──
        border:        '#D8E1E9',   // light section border
        'border-dark': '#1E3B5C',   // dark section border
        // ── Aliases ──
        surface:       '#FFFFFF',
        'border-light': '#D8E1E9',
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
