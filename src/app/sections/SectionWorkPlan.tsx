'use client'

import Button from '@/components/Button'
import FlexLink from '@/components/FlexLink'
import { BsCreditCardFill } from 'react-icons/bs'
import { FaClipboardCheck } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { LuComputer, LuFactory } from 'react-icons/lu'

const SectionWorkPlan = () => {
	const steps = [
		{
			icon: <FaClipboardCheck className='mb-20 h-[70px] w-[70px]' />,
			step: '1 шаг',
			title: 'Заявка',
			description:
				'Свяжитесь с нами любым удобным для вас способом, чтобы обсудить задачу.'
		},
		{
			icon: <LuComputer className='mb-20 h-[70px] w-[70px]' />,
			step: '2 шаг',
			title: 'Согласование',
			description: 'Предложим решение, обсудим условия, заключим договор'
		},
		{
			icon: <BsCreditCardFill className='mb-20 h-[70px] w-[70px]' />,
			step: '3 шаг',
			title: 'Оплата',
			description:
				'Оформим платежные документы на оплату удобным для вас способом'
		},
		{
			icon: <LuFactory className='mb-20 h-[70px] w-[70px]' />,
			step: '4 шаг',
			title: 'Производство',
			description:
				'После получения оплаты приступим к работам и выполним их в срок'
		}
	]

	return (
		<div className='mb-20 bg-black py-20 text-white'>
			<div className='container mx-auto'>
				<div className='mb-12 flex justify-between'>
					<div className='flex items-center gap-5'>
						<FaGear className='h-10 w-10' />
						<h1 className='text-2xl font-bold sm:text-4xl md:text-[40px]'>
							СХЕМА РАБОТЫ
						</h1>
					</div>
					<div className='flex max-w-md flex-col items-end gap-4 text-gray-400'>
						<FlexLink to='feedback' className='text-xl' offset={-200}>
							<Button
								type={'button'}
								className='hidden px-4 py-5 text-white md:block'
							>
								Заказать консультацию
							</Button>
						</FlexLink>
					</div>
				</div>

				<div className='relative'>
					<div className='absolute left-0 right-0 top-[100px] h-[2px] border-t-2 border-dotted border-gray-800' />

					<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
						{steps.map((step, index) => (
							<div key={index} className='relative'>
								<div className='mb-6 text-red-500'>{step.icon}</div>
								<div className='absolute left-[25px] top-[92px] h-4 w-4 rounded-full bg-red-500' />
								<div className='mt-10'>
									<div className='mb-2 text-red-500'>{step.step}</div>
									<h2 className='mb-2 text-xl font-bold'>{step.title}</h2>
									<p className='text-gray-400'>{step.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<FlexLink className='text-xl' to='feedback' offset={-147 + -30}>
					<Button className='mt-10 px-2 py-4 sm:hidden'>
						Заказать консультацию
					</Button>
				</FlexLink>
			</div>
		</div>
	)
}

export default SectionWorkPlan
