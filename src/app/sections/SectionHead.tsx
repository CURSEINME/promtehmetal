'use client' 

import Button from '@/components/Button'
import FlexLink from '@/components/FlexLink'
import Image from 'next/image'
import { Element } from 'react-scroll'

const SectionHead = () => {
	return (
		<section>
			<Element
				id='head'
				name='head'
				className={`relative mb-20 rounded-lg bg-center [scroll-margin-top:0!important]`}
			>
				<Image
					src='/home-bg.webp'
					className='-z-10'
					fill
					priority
					style={{ objectFit: 'cover' }}
					alt='background'
				></Image>
				<div className='flex h-[600px] w-full bg-homeOverlay lg:h-[calc(100vh-148px)]'>
					<div className='container mx-auto flex flex-col justify-center'>
						<h1 className='max-w-[600px] text-2xl font-bold sm:text-5xl md:text-6xl lg:text-7xl'>
							КОМПЛЕКСНАЯ МЕТАЛЛООБРАБОТКА ЛЮБОЙ СЛОЖНОСТИ
						</h1>
						<div className='flex flex-col'>
							<p className='my-10 max-w-[800px] text-lg'>
								Предоставляем услуги лазерной резки и гибки листового металла.
								Сотрудничаем с предприятиями и индивидуальными
								предпринимателями. Гарантируем высокое качество и доступные
								цены.
							</p>
							<FlexLink className='text-xl' to='feedback' offset={-147 + -30}>
								<Button
									type={'button'}
									className='self-start px-4 py-5 font-bold'
								>
									Получить консультацию
								</Button>
							</FlexLink>
						</div>
					</div>
				</div>
			</Element>
		</section>
	)
}

export default SectionHead
