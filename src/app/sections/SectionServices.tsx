'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { FaGear } from 'react-icons/fa6'
import { Element } from 'react-scroll'

import { IService } from './ProductSections/SectionProductHead'

function splitIntoSentences(text: string) {
	if (!text) {
		return []
	}
	const sentenceRegex = /([^.?!]+[.?!]+)/g
	return text.match(sentenceRegex) || []
}

const SlickSlider = dynamic(() => import('@/components/SlickSlider'))
const SectionServices = ({ products }: { products: IService[] }) => {
	const productsList = products?.map((product: IService, index: number) => {
		return (
			<Link key={index} href={`/service/${product.slug}`}>
				<div className={`mb-10`}>
					<div className='relative h-[85px] w-[85px]'>
						<Image
							src={product?.serviceIcon}
							fill
							alt='service-icon'
							className='object-cover'
						/>
					</div>
					<div className='flex flex-col'>
						<h1 className='my-2 text-xl font-bold md:text-2xl'>
							{product.title}
						</h1>
						<p className='mb-auto line-clamp-2 max-h-[50px] overflow-hidden overflow-ellipsis text-lg md:text-xl'>
							{splitIntoSentences(product.description)[0]}
						</p>
					</div>
				</div>
				<div className={`relative h-[250px] w-full md:h-[350px]`}>
					{product.serviceImage && (
						<Image
							src={product?.serviceImage}
							fill
							className='rounded-lg object-cover'
							alt='service'
						/>
					)}
				</div>
			</Link>
		)
	})

	return (
		<section>
			<Element id='services' name='services'>
				<div className='container mx-auto mb-20 px-[10px!important]'>
					<div className='flex flex-col'>
						<div className='mb-10 flex items-center gap-5 pl-5'>
							<FaGear className='h-10 w-10' />
							<h1 className='md:20 text-2xl font-bold sm:text-5xl md:text-[40px]'>
								У НАС ЗАКАЗЫВАЮТ
							</h1>
						</div>
						{productsList && <SlickSlider slides={2} children={productsList} />}
					</div>
				</div>
			</Element>
		</section>
	)
}

export default SectionServices
