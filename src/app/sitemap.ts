import type { MetadataRoute } from 'next'

import { getServices } from '../../prisma/service'
import { IService } from './sections/ProductSections/SectionProductHead'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseURL = 'https://www.example.com'
	const res = await getServices()

	return res.map((service: IService) => {
		return {
			url: `${baseURL}/service/${service.slug}`,
			lastModified: new Date()
		}
	})
}
