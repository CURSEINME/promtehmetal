'use server'

import { getServices } from '@/actions/service'
import AddServiceBtn from '@/components/AddServiceBtn'
import ServiceList from '@/components/ServiceList'

export default async function Dashboard() {
	const services = await getServices()
	return (
		<div className='flex py-10 flex-col items-center justify-center gap-10'>
			<ServiceList services={services} />
			<AddServiceBtn />
		</div>
	)
}
