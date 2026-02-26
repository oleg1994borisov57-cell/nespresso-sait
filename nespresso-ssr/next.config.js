/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "dist",
  skipTrailingSlashRedirect: true,
  images: {

    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nestle-nespresso.ru",
        port: "",
      },
      {
        protocol: "https",
        hostname: "n-coffee.ru",
        port: "",
      },
      {
        protocol: "https",
        hostname: "savychk.fvds.ru",
        port: "",
      },
      {
        protocol: "https",
        hostname: "weblauncherstudio1.fvds.ru",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.nespresso.com",
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'n-coffee.ru',
        port: '',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Правило для всех маршрутов
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=86400, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/api/sitemap",
  //       headers: [
  //         {
  //           key: "Content-Type",
  //           value: "text/xml",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
