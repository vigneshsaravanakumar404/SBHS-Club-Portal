/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/checkin',
        destination: '/dashboard/checkin',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/db/:path*',
        destination: '/dashboard/:path*',
        permanent: true,
      },
    ]
  },
}
