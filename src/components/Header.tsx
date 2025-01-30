'use client'

import { IService } from '@/app/sections/ProductSections/SectionProductHead'
import { getServices } from '@/app/sections/SectionServices'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaPhone } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { SlArrowDown } from 'react-icons/sl'
import { useQuery } from 'react-query'

import FlexLink from './FlexLink'

const Burger = dynamic(() => import('./Burger'), {
	ssr: false
})

const Header = () => {
	const { data } = useQuery('products', () => getServices())

	const [isDropMenuActive, setIsDropMenuActive] = useState(false)
	const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false)

	return (
		<header className='right-0 top-0 z-10 w-full lg:sticky'>
			<div className='hidden w-full bg-black py-4 lg:flex'>
				<div className='mx-auto flex w-full max-w-[1300px] flex-col px-4'>
					<ul className='flex items-center justify-end gap-20'>
						<li className='flex items-center gap-5'>
							<FaPhone className='h-5 w-5 text-[#ff1f1f]' />
							<p className='text-md'>+7(952)446-62-33</p>
						</li>
						<li className='flex items-center gap-5'>
							<MdEmail className='h-6 w-6 text-[#ff1f1f]' />
							<p className='text-red text-md'>sdlkfj@gmail.com</p>
						</li>
						<li className='flex items-center gap-5'>
							<FaLocationDot className='h-5 w-5 text-[#ff1f1f]' />
							<p className='text-red text-md'>г. Павлово, высокая 4</p>
						</li>
					</ul>
				</div>
			</div>
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
					<Link href='/' className='text-2xl sm:text-[32px] font-bold'>
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
									<FlexLink
										offset={-147 + -30}
										className='text-xl'
										to='services'
									>
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
										{data?.map((service: IService) => (
											<Link
												key={service.slug}
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
								<FlexLink
									offset={-147 + -30}
									className='text-xl'
									to='portfolio'
								>
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
		</header>
	)
}

export default Header
