/** @type {import('next').NextConfig} */

const nextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.yandexcloud.net'
			}
		]
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb'
		}
	}
}

module.exports = nextConfig
