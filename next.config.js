/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
});

module.exports = withBundleAnalyzer({
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.(jpe?g|png)$/i,
      use: [
        {
          loader: 'next-image-loader',
          options: {
            quality: 80,
            format: 'webp',
          },
        },
      ],
    });

    return config;
  },
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  compress: true,
});