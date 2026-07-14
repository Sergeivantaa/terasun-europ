import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    remotePatterns: [
      { hostname: 'terasun-europe.eu' },
      { hostname: 'www.terasun.cn' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: false },
    ]
  },

  experimental: {
    optimizePackageImports: ['next-intl'],
  },
}

export default withNextIntl(nextConfig)
