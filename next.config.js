/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: false,
});

module.exports = withBundleAnalyzer({
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		return config;
	}
});