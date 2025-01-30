'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FaGear } from 'react-icons/fa6'
import { useQuery } from 'react-query'
import { Element } from 'react-scroll'

const SlickSlider = dynamic(() => import('@/components/SlickSlider'))

export async function getPortfolio() {
	const res = await fetch(`/api/getPortfolio`).then(res => res.json())

	return res
}

const SectionPortfolio = () => {
	const { data } = useQuery('portfolio', () => getPortfolio())

	const photos = data?.map((photo: string, index: number) => {
		return (
			<div className='relative h-[350px] w-full' key={index}>
				<Image className='rounded-lg' fill alt='portfolio photo' src={photo} />
			</div>
		)
	})

	return (
		<section className='bg-black py-20'>
			<Element id='portfolio' name='portfolio'>
				<div className='container mx-auto px-[10px!important]'>
					<div className='mb-10 flex items-center gap-5 pl-4 md:mb-20'>
						<FaGear className='h-10 w-10' />
						<h1 className='text-center text-3xl font-bold sm:text-4xl md:text-[40px] lg:text-left'>
							ПОРТФОЛИО
						</h1>
					</div>
					{photos && (
						<SlickSlider
							slides={photos.length >= 3 ? 3 : 2}
							children={photos}
						/>
					)}
				</div>
			</Element>
		</section>
	)
}

export default SectionPortfolio
