/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:path',
        headers: [
          {key: 'Access-Control-Allow-Origin', value: 'localhost:3000'},
        ]
      }
    ]
  }
}

module.exports = nextConfig
