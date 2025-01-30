'use client'

import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import Image from 'next/image'
import { FaGear } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { Element } from 'react-scroll'

const SectionMap = () => {
	return (
		<section>
			<Element id='contacts' name='contacts'>
				<div className='container mx-auto mb-20 flex flex-col'>
					<div className='mb-10 flex items-center gap-5 md:mb-20'>
						<FaGear className='h-10 w-10' />
						<h2 className='max-w-[600px] text-2xl font-bold sm:text-4xl md:text-[40px]'>
							КОНТАКТЫ
						</h2>
					</div>
					<div className='flex flex-col items-center gap-20 md:flex-row'>
						{
							<YMaps query={{ apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY }}>
								<Map
									defaultState={{ center: [55.991853, 43.104204], zoom: 16 }}
									className='h-[500px] w-full md:w-[60%]'
								>
									<Placemark geometry={[55.991853, 43.104204]} />
								</Map>
							</YMaps>
						}
						<div className='flex flex-col items-center gap-10 md:items-start'>
							<ul className='flex flex-col gap-5'>
								<li>
									<h3 className='mb-2 text-xl text-orange-400'>АДРЕС</h3>
									<p className='text-lg'>
										г.Павлово ул. 3-я Северная улица, 7Б
									</p>
								</li>
								<li>
									<h3 className='mb-2 text-xl text-orange-400'>
										ГРАФИК РАБОТЫ
									</h3>
									<p className='text-lg'>
										C понедельника по пятницу с 8:00 до 17:00
									</p>
								</li>
								<li>
									<h3 className='mb-2 text-xl text-orange-400'>КОНТАКТЫ</h3>
									<p className='text-lg'>+791012931289</p>
									<p className='text-lg'>email@gmail.com</p>
								</li>
							</ul>
							<ul className='flex flex-col gap-2'>
								<li>
									<button className='flex w-[230px] items-center gap-2 rounded-2xl bg-white p-2 font-bold text-black'>
										<MdEmail className='h-6 w-6' />
										Написать на почту
									</button>
								</li>
								<li>
									<button className='flex w-[230px] items-center gap-2 rounded-2xl bg-white p-2 font-bold text-black'>
										<Image
											src='/icons/whatsapp.png'
											width={23}
											height={23}
											alt='whatsapp'
										/>
										Написать в WhatsApp
									</button>
								</li>
								<li>
									<button className='flex w-[230px] items-center gap-2 rounded-2xl bg-white p-2 font-bold text-black'>
										<div>
											<Image
												width={23}
												height={23}
												src='/icons/telegram.png'
												alt='telegram'
											/>
										</div>
										Написать Telegram
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Element>
		</section>
	)
}

export default SectionMap
