import Button from '@/components/Button'
import FlexLink from '@/components/FlexLink'
import Image from 'next/image'
import { FaGear } from 'react-icons/fa6'
import { Element } from 'react-scroll'

const SectionAboutUs = () => {
	return (
		<section>
			<Element id='about' name='about'>
				<div className='container relative mx-auto mb-20 flex flex-col lg:items-start'>
					<div className='mb-10 flex items-center gap-5 md:mb-20'>
						<FaGear className='h-10 w-10' />
						<h1 className='text-3xl font-bold sm:text-5xl md:text-[40px]'>
							О КОМПАНИИ
						</h1>
					</div>
					<div className='flex flex-col gap-20'>
						<div className='flex flex-col items-center gap-10 lg:flex-row'>
							<Image
								alt='about'
								className='h-[300px] w-full'
								src='/about-us-banner.webp'
								style={{ objectFit: 'cover' }}
								height={700}
								width={700}
							/>
							<div className='flex flex-col gap-8'>
								<p className=' text-xl'>
									Компания «ПРОМТЕХМЕТАЛЛ» — это современное производство,
									специализирующееся на высокоточной металлообработке. Мы
									предоставляем комплексные услуги, которые охватывают все этапы
									обработки металла — от резки до создания готовых изделий.
								</p>
								<p className=' text-xl'>
									Мы используем современное оборудование, обеспечивающее высокое
									качество обработки и точное соответствие техническим
									требованиям. Индивидуальный подход к каждому заказу и строгое
									соблюдение сроков — это наши главные приоритеты.
								</p>
							</div>
						</div>
						<FlexLink className='text-xl' to='services' offset={-200}>
							<Button type={'button'} className='px-4 py-5'>
								Наши услуги
							</Button>
						</FlexLink>
					</div>
				</div>
			</Element>
		</section>
	)
}

export default SectionAboutUs
