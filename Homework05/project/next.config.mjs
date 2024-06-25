import { withKumaUI } from '@kuma-ui/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [{ source: '/api/:path*', destination: 'https://academy-backend.sofascore.dev/:path*' }]
  },
  i18n: {
    locales: ['en', 'hr'],
    defaultLocale: 'en',
  },
}

export default withKumaUI(nextConfig)
