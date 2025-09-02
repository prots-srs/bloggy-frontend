/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  // locales: ['en'],
  // defaultLocale: 'en',
  // localeDetection: true,
  // }
  //  trailingSlash: true, // or false
  allowedDevOrigins: ['protsdev'],
  images: {
    remotePatterns: [
      new URL('http://protsdev:8080/content/**')
    ],
  },
};

export default nextConfig;
