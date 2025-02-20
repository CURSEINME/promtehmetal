import SectionProductHead, {
	IService
} from '@/app/sections/ProductSections/SectionProductHead'
import SectionFeedback from '@/app/sections/SectionFeedback'
import SectionMap from '@/app/sections/SectionMap'
import SlickSlider from '@/components/SlickSlider'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FaGear } from 'react-icons/fa6'

import {
	getPortfolio,
	getService,
	getServicePortfolio,
	getServices
} from '@/actions/service'

type tParams = Promise<{ slug: string }>

export async function generateStaticParams() {
	const services = await getServices()

	return services.map((service: IService) => ({
		slug: service.slug
	}))
}
export async function generateMetadata({ params }: { params: tParams }) {
	const { slug } = await params
	const service = await getService(slug)
	return {
		title: service?.title,
		description: service?.description,
		openGraph: {
			type: 'website',
			siteName: 'промтехметалл',
			title: service?.title,
			description: service?.description
		}
	}
}
export default async function Product({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const product = await getService(slug)
	const servicePortfolio = await getServicePortfolio(slug)
	const portfolio = await getPortfolio()

	if (!product) notFound()
	return (
		<>
			<SectionProductHead product={product} />
			<Advantages product={product} />
			<SectionFeedback />
			{portfolio && servicePortfolio && (
				<OurWorks
					photos={servicePortfolio.length == 0 ? portfolio : servicePortfolio}
				/>
			)}
			<SectionMap />
		</>
	)
}
function Advantages({ product }: { product: IService }) {
	return (
		<section>
			<div className='container mx-auto mb-20'>
				<div className='grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-4'>
					{product.advantages?.map((advantage, index) => (
						<div
							key={product.id}
							className='flex flex-col justify-center gap-2 rounded-[15px] bg-gray-300 p-5 text-black'
						>
							<h3 className='text-2xl font-bold'>{advantage.title}</h3>
							{advantage.description && (
								<p className='text-lg'>{advantage.description}</p>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

async function OurWorks({ photos }: { photos: string[] }) {
	return (
		<section id='portfolio'>
			<div className='container mx-auto mb-20'>
				<div className='mb-10 flex items-center gap-5 md:mb-20'>
					<FaGear className='h-10 w-10' />
					<h2 className='text-2xl font-bold sm:text-4xl md:text-6xl'>
						Примеры наших работ
					</h2>
				</div>
				<SlickSlider
					slides={photos.length >= 3 ? 3 : 2}
					children={photos.map((photo: any) => {
						return (
							<div key={photo} className='relative h-[350px] w-full'>
								<Image
									className='mx-auto rounded-xl'
									alt='about'
									src={photo}
									fill
								/>
							</div>
						)
					})}
				/>
			</div>
		</section>
	)
}
