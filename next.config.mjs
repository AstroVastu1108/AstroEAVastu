/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
