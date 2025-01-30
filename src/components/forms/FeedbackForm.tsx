'use client'

import { useForm } from 'react-hook-form'

import Button from '../Button'

const FeedbackForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	function onSubmit() {}

	return (
		<form
			className='flex flex-col items-center'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex w-full flex-col gap-20 lg:flex-row'>
				<div className='flex w-full flex-col md:flex-row md:justify-between lg:flex-col'>
					<label className='mb-2 text-lg' htmlFor='name'>
						Имя
					</label>
					<input
						{...register('name')}
						className='w-full rounded-sm px-10 py-3 text-black md:w-[500px] lg:w-full'
						type='name'
						placeholder='Имя'
					></input>
				</div>
				<div className='flex w-full flex-col md:flex-row md:justify-between lg:flex-col'>
					<label className='mb-2 text-lg' htmlFor='tel'>
						Телефон
					</label>
					<input
						{...register('tel')}
						className='w-full rounded-sm px-10 py-3 text-black md:w-[500px] lg:w-full'
						type='tel'
						placeholder='Телефон'
					></input>
				</div>
				<div className='flex w-full flex-col md:flex-row md:justify-between lg:flex-col'>
					<label className='mb-2 text-lg' htmlFor='email'>
						Email
					</label>
					<input
						{...register('email')}
						className='w-full rounded-sm px-10 py-3 text-black md:w-[500px] lg:w-full'
						type='email'
						placeholder='Email'
					></input>
				</div>
			</div>
			<Button type='submit' className='mt-10 px-2 py-3 text-xl'>
				Отправить
			</Button>
		</form>
	)
}
export default FeedbackForm
