import type { MetadataRoute } from 'next'

import { getServices } from '../../actions/service'
import { IService } from './sections/ProductSections/SectionProductHead'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const res = await getServices()

	const services = res.map((service: IService) => {
		return {
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/service/${service.slug}`,
			lastModified: new Date()
		}
	})

	return [
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
			lastModified: new Date()
		},
		...services
	]
}
