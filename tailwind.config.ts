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
        dark:   '#1a1c22',
        darker: '#13151a',
        gold:   '#b8932a',
        gold2:  '#f4d98a',
        'gold-light': '#fdf8ec',
        'gold-border': '#e8d5a3',
        muted:  '#7a8299',
        light:  '#a0aabf',
        border: '#2d3040',
        card:   '#1f2230',
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
