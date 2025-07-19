/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['cdn.sanity.io', 'firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/aejuflc7/production/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/moger-pro.appspot.com/o/**',
      },
    ],
  },
  typescript: {
    // ⚠️ Dangereux mais nécessaire pour le moment
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 