'use server'

import { getServices } from '@/actions/service'
import { IService } from '../sections/ProductSections/SectionProductHead'

function serviceList(services: IService[]) {
	return services.map((service: IService) => (
		<div key={service.id}>{service.title}</div>
	))
}

export default async function Dashboard() {
	const services = await getServices()
	console.log('render')
	return (
		<div className='container'>
			<title>Service list</title>
			<ul>{serviceList(services)}</ul>
		</div>
	)
}
