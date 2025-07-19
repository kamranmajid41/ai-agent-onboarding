/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://knowing-tax-production.up.railway.app/api',
  },
};

export default nextConfig; 