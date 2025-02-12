'use client'

import Button from '@/components/Button'
import FlexLink from '@/components/FlexLink'
import Image from 'next/image'

export interface IAdvantages {
	title: string
	description: string
}

export interface IService {
	id: string
	title: string
	slug: string
	description: string
	subDesc: string
	serviceFor: string
	advantages: IAdvantages[]
	productImage: string
	serviceIcon: string
	serviceImage: string
}
const SectionProductHead = ({ product }: { product: IService }) => {
	const { title, description, serviceImage } = product
	return (
		<div className='relative mb-20 flex h-[600px] w-full bg-homeOverlay lg:mb-0 lg:bg-none'>
			<div className='container mx-auto flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:gap-10'>
				<div className='flex flex-col'>
					<h1 className='mb-8 text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl'>
						{title}
					</h1>
					<p className='mb-10 text-left text-lg lg:mb-20'>{description}</p>
					<FlexLink className='text-xl' to='feedback' offset={-200}>
						<Button type={'button'} className='px-4 py-5'>
							Получить расчет стоимости
						</Button>
					</FlexLink>
				</div>
				<div className='w-full md:mb-0 md:ml-auto lg:relative lg:h-[500px]'>
					<Image
						alt='laser cuttering banner'
						fill
						className='-z-10 object-cover'
						priority
						src={serviceImage}
					/>
				</div>
			</div>
		</div>
	)
}

export default SectionProductHead
