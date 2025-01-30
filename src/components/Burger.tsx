import Image from 'next/image'

import FlexLink from './FlexLink'

interface burgerProps {
	active: boolean
	setActive: () => void
}

const Burger = ({ active, setActive }: burgerProps) => {
	return (
		<div
			className={`${
				active ? 'translate-x-0' : 'translate-x-full'
			} translate fixed right-0 top-0 z-10 rounded-lg bg-[#0f0f0f] duration-200`}
		>
			<Image
				onClick={setActive}
				src='/close.svg'
				width={35}
				height={35}
				alt='burger'
				className='absolute right-3 top-3'
			/>
			<ul className='flex flex-col items-center gap-10 p-10'>
				<li className='flex flex-col items-center'>
					<FlexLink className='text-xl' to='services' offset={-20}>
						Услуги
					</FlexLink>
				</li>
				<li>
					<FlexLink className='text-xl' to='about' offset={-20}>
						О нас
					</FlexLink>
				</li>
				<li>
					<FlexLink className='text-xl' to='portfolio' offset={-20}>
						Наши работы
					</FlexLink>
				</li>
				<li>
					<FlexLink className='text-xl' to='contacts' offset={-20}>
						Контакты
					</FlexLink>
				</li>
			</ul>
		</div>
	)
}

export default Burger
