import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			disallow: ['/admin', '/login']
		},
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
	}
}
