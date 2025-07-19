/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Hostinger shared hosting
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },

  // Environment variables for Hostinger
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://yourdomain.com/api',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  },

  // Build optimization
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'react-icons']
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  },

  // Redirects for Hostinger
  async redirects() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://yourdomain.com/api/:path*',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig; 