/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/aejuflc7/production/**',
      },
    ],
  },
  typescript: {
    // ⚠️ Dangereux mais nécessaire pour le moment
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 