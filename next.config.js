/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/tprc/:path*',
        headers: [
          {key: 'Access-Control-Allow-Origin', value: '*'},
          {key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS'},
        ]
      }
    ]
  },
  env: {
    VERCEL_URL: process.env.VERCEL_URL,
  }
}

module.exports = nextConfig
