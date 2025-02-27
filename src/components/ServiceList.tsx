'use client'

import { deleteService } from '@/actions/service'
import { IService } from '@/app/sections/ProductSections/SectionProductHead'
import { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { TiDeleteOutline } from 'react-icons/ti'
import Modal from './Modal'
import UpdateServiceForm from './forms/UpdateServiceForm'

const ServiceList = ({ services }: { services: IService[] }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedService, setSelectedService] = useState<IService | null>(null)

	const serviceList = services.map((service: IService) => {
		const serviceImage = service.serviceImage.split('/')[5]
		const serviceIcon = service.serviceIcon.split('/')[5]

		return (
			<div
				className='flex items-center justify-between gap-10 rounded-lg bg-slate-600 p-2'
				key={service.id}
			>
				<div className='text-xl'>{service.title}</div>
				<div className='flex items-center gap-2'>
					<button
						className='text-lg'
						onClick={() => {
							setSelectedService(service)
							setIsOpen(true)
						}}
					>
						<MdEdit className='h-7 w-7' />
					</button>
					<button
						onClick={() =>
							deleteService({ serviceImage, serviceIcon, id: service.id })
						}
						className='text-lg'
					>
						<TiDeleteOutline className='h-7 w-7' />
					</button>
				</div>
			</div>
		)
	})
	return (
		<div className='flex flex-col items-center gap-5'>
			<h1 className='text-3xl font-bold'>Список услуг</h1>
			<ul className='flex flex-col gap-2'>{serviceList}</ul>
			{isOpen && selectedService && (
				<Modal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					children={<UpdateServiceForm service={selectedService} />}
				/>
			)}
		</div>
	)
}

export default ServiceList
