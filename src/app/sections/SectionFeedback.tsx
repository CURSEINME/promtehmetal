'use client'
import { Element } from 'react-scroll'

import FeedbackForm from '@/components/forms/FeedbackForm'
import Image from 'next/image'
import { FaGear } from 'react-icons/fa6'

const SectionFeedback = () => {
	return (
		<section>
			<Element className='relative' id='feedback' name='feedback'>
				<Image
					className='absolute left-0 top-0 z-[-1] h-full w-full object-cover'
					src='/feedback-bg.webp'
					alt='feedback'
					fill
				/>
				<div className='mb-20 flex bg-feedbackOverlay py-20'>
					<div className='container mx-auto'>
						<div className='mb-10 flex items-center gap-5 md:mb-20'>
							<FaGear className='h-10 w-10' />
							<h1 className='text-2xl font-bold sm:text-5xl md:text-[40px]'>
								ОБРАТНАЯ СВЯЗЬ
							</h1>
						</div>
						<FeedbackForm />
					</div>
				</div>
			</Element>
		</section>
	)
}

export default SectionFeedback
