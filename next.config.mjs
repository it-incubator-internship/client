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
      }
    ]
  }
};

export default nextConfig;
