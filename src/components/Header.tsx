'use client'

import { FaPhone } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { useQuery } from 'react-query'
import HeaderNav from './HeaderNav'

export async function getServices() {
	const res = await fetch('/api/getServices', { cache: 'force-cache' }).then(res =>
		res.json()
	)
	return res
}

export default function Header() {
	const { data: services } = useQuery('services', () => getServices())

	return (
		<header className='right-0 top-0 z-10 w-full lg:sticky'>
			<div className='hidden w-full bg-black py-4 lg:flex'>
				<div className='mx-auto flex w-full max-w-[1300px] flex-col px-4'>
					<ul className='flex items-center justify-end gap-20'>
						<li className='flex items-center gap-5'>
							<FaPhone className='h-5 w-5 text-[#ff1f1f]' />
							<p className='text-md'>+7 (952) 446-62-33</p>
						</li>
						<li className='flex items-center gap-5'>
							<MdEmail className='h-6 w-6 text-[#ff1f1f]' />
							<p className='text-red text-md'>info@promtehmetal.ru</p>
						</li>
						<li className='flex items-center gap-5'>
							<FaLocationDot className='h-5 w-5 text-[#ff1f1f]' />
							<p className='text-red text-md'>
								г. Павлово ул. 3-я Северная улица, 7Б
							</p>
						</li>
					</ul>
				</div>
			</div>
			<HeaderNav services={services} />
		</header>
	)
}
