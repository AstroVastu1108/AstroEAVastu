// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   basePath: process.env.BASEPATH,
//   serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
//   redirects: async () => {
//     return [
//       {
//         source: '/',
//         destination: '/login',
//         permanent: true,
//         locale: false
//       }
//     ]
//   }
// }

// export default nextConfig


import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  experimental: {
    serverComponentsExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  },
  outputFileTracingIncludes: {
    './src': [
      path.resolve('./node_modules/@sparticuz/chromium/bin'),
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  },
  outputFileTracingIncludes: {
    './src': [
      path.resolve('./node_modules/@sparticuz/chromium/bin'),
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
        locale: false,
      },
    ];
  },
};

export default nextConfig;