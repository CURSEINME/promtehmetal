import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	const baseURL = 'https://www.example.com'
	return {
		rules: {
			userAgent: '*',
			allow: ['/', '/product'],
			disallow: []
		},
		sitemap: `${baseURL}/sitemap.xml`
	}
}
