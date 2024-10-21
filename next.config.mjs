/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "navaibe.1.0.storage.yandexcloud.net",
        port: "",
        pathname: "/content/images/**"
      },
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        port: "",
        pathname: "/navaibe.1.0/content/images/**"
      }
    ]
  }
};

export default nextConfig;
