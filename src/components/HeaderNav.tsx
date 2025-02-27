'use client'

import { IService } from '@/app/sections/ProductSections/SectionProductHead'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import Burger from './Burger'
import FlexLink from './FlexLink'

const HeaderNav = ({ services }: { services: IService[] }) => {
	const [isDropMenuActive, setIsDropMenuActive] = useState(false)
	const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false)
	return (
		<div className='relative flex items-center bg-black text-white lg:bg-white lg:text-black'>
			<Burger
				active={isBurgerMenuActive}
				setActive={() => setIsBurgerMenuActive(prev => !prev)}
			/>
			<button
				type='button'
				aria-label='open mobile menu'
				onClick={() => setIsBurgerMenuActive(true)}
			>
				<Image
					src='/burger.svg'
					width={30}
					height={30}
					alt='mobile menu'
					className={`fixed right-7 top-7 z-10 lg:hidden ${isBurgerMenuActive ? 'hidden' : 'block'}`}
				/>
			</button>
			<div className='container mx-auto flex items-center py-[30px!important]'>
				<Link href='/' className='text-2xl font-bold sm:text-[32px]'>
					ПРОМТЕХМЕТАЛЛ
				</Link>
				<nav className='ml-auto hidden lg:flex'>
					<ul className='flex gap-10'>
						<li>
							<FlexLink offset={-147 + -30} className='text-xl' to='about'>
								O компании
							</FlexLink>
						</li>
						<li
							className='relative'
							onMouseEnter={() => setIsDropMenuActive(true)}
							onMouseLeave={() => setIsDropMenuActive(false)}
						>
							<div className='flex items-center gap-2'>
								<FlexLink offset={-147 + -30} className='text-xl' to='services'>
									Услуги
								</FlexLink>
								<div
									className={`translate transform duration-200 ${isDropMenuActive ? 'rotate-180' : ''}`}
								>
									<SlArrowDown />
								</div>
								<ul
									className={`${isDropMenuActive ? 'flex' : 'hidden'} absolute top-6 w-[300px] flex-col gap-2 rounded-b-lg border-t-0 bg-white p-4 text-black duration-200`}
								>
									{services?.map((service: IService) => (
										<Link
											key={service.id}
											href={`/service/${service.slug}`}
											className='text-lg underline'
										>
											{service.title}
										</Link>
									))}
								</ul>
							</div>
						</li>
						<li>
							<FlexLink offset={-147 + -30} className='text-xl' to='feedback'>
								Заказать
							</FlexLink>
						</li>
						<li>
							<FlexLink offset={-147 + -30} className='text-xl' to='portfolio'>
								Портфолио
							</FlexLink>
						</li>
						<li>
							<FlexLink offset={-147 + -30} className='text-xl' to='contacts'>
								Контакты
							</FlexLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default HeaderNav
