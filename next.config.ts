import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const isPagesPreview = process.env.GITHUB_PAGES === 'true'

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
      return [
        { source: '/', destination: '/en', permanent: false },
      ]
    },
  }),

  experimental: {
    optimizePackageImports: ['next-intl'],
  },
}

export default withNextIntl(nextConfig)
