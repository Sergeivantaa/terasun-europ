import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const isPagesPreview = process.env.GITHUB_PAGES === 'true'

const locales = ['en','de','fr','es','it','pt','nl','pl','fi','sv','no','da','et','lv','lt','cs','sk','hu','ro','bg','el','hr','sl','uk','ru','ga','mt','nb']

const nextConfig: NextConfig = {
  output: isPagesPreview ? 'export' : 'standalone',

  basePath: isPagesPreview ? '/terasun-europ' : '',
  assetPrefix: isPagesPreview ? '/terasun-europ/' : '',

  images: {
    unoptimized: isPagesPreview,
    remotePatterns: [
      { hostname: 'terasun-europe.eu' },
      { hostname: 'www.terasun.cn' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // redirects only apply in server mode; static export uses public/index.html
  ...(isPagesPreview ? {} : {
    async redirects() {
      // Build per-locale product redirects
      const productRedirects = locales.flatMap(locale => [
        // /en/products → /en/products/lightweight-cement-board (canonical SEO URL)
        {
          source: `/${locale}/products`,
          destination: `/${locale}/products/lightweight-cement-board`,
          permanent: true,
        },
      ])

      return [
        { source: '/', destination: '/en', permanent: false },
        ...productRedirects,
      ]
    },
  }),

  experimental: {
    optimizePackageImports: ['next-intl'],
  },
}

export default withNextIntl(nextConfig)
