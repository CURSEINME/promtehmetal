'use client'

import FlexLink from './FlexLink'

const Footer = () => {
	return (
		<footer className='mt-auto bg-black py-5'>
			<div className='container mx-auto flex flex-col-reverse items-center justify-between gap-10 md:flex-row'>
				<FlexLink className='text-3xl font-bold' to='head' offset={-100}>
					<button type='button'>ПРОМТЕХМЕТАЛЛ</button>
				</FlexLink>
				<nav className='flex gap-10'>
					<ul className='grid grid-cols-2 gap-x-5 text-center md:text-left'>
						<li>
							<FlexLink className='text-xl' to='services' offset={-200}>
								Заказать
							</FlexLink>
						</li>
						<li>
							<FlexLink className='text-xl' to='about' offset={-200}>
								О нас
							</FlexLink>
						</li>
						<li>
							<FlexLink className='text-xl' to='portfolio' offset={-200}>
								Наши работы
							</FlexLink>
						</li>
						<li>
							<FlexLink className='text-xl' to='contacts' offset={-200}>
								Контакты
							</FlexLink>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	)
}

export default Footer
