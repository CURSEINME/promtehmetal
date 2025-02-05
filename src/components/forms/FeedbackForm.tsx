'use client'

import { isValidPhoneNumber } from 'libphonenumber-js'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button'

interface IFormState {
	name: string
	tel: string
	email: string
}

const FeedbackForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<IFormState>({
		defaultValues: {
			tel: '+7'
		}
	})

	const tel = watch('tel')

	const [message, setMessage] = useState<string>()
	const [error, setError] = useState<string>()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onSubmit(data: IFormState) {
		try {
			setIsLoading(true)
			const res = await fetch('/api/feedback', {
				method: 'POST',
				body: JSON.stringify(data)
			})

			if (res.ok) {
				setMessage('Ваша заявка отправлена')
			}
			if (!res.ok) {
				setError('Произошла ошибка')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (!tel.startsWith('+7')) {
			setValue('tel', '+7', { shouldValidate: true })
		}
	}, [tel])
	return (
		<form
			className='flex flex-col items-center'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex w-full flex-col gap-10 sm:gap-20 lg:flex-row'>
				<div className='flex items-center justify-between gap-10'>
					<label className='mb-7 text-lg' htmlFor='name-field'>
						Имя
					</label>
					<div>
						<input
							{...register('name', {
								required: 'Обязательное поле'
							})}
							className={`w-[200px] border-4 ${errors.name && 'border-red-500'} rounded-sm px-5 py-3 text-black focus:outline-none sm:w-[500px] lg:w-full`}
							type='name'
							placeholder='Имя'
							autoComplete='on'
							id='name-field'
						></input>
						<div className='mt-2 h-[20px] text-sm font-bold text-red-500'>
							{errors.name?.message}
						</div>
					</div>
				</div>
				<div className='flex items-center justify-between gap-10'>
					<label className='mb-7 text-lg' htmlFor='tel'>
						Телефон
					</label>
					<div>
						<input
							{...register('tel', {
								validate: value => {
									if (value === '+7') {
										return 'Обязательное поле'
									}
									return isValidPhoneNumber(value)
										? true
										: 'Неверный формат телефона'
								}
							})}
							className={`w-[200px] border-4 ${errors.tel && 'border-red-500'} rounded-sm px-5 py-3 text-black focus:outline-none sm:w-[500px] lg:w-full`}
							type='tel'
							autoComplete='on'
							id='tel'
						></input>
						<div className='mt-2 h-[20px] text-sm font-bold text-red-500'>
							{errors.tel?.message}
						</div>
					</div>
				</div>
				<div className='flex items-center justify-between gap-10'>
					<label className='mb-7 text-lg' htmlFor='email-field'>
						Email
					</label>
					<div className='flex flex-col'>
						<input
							{...register('email', {
								required: 'Обязательное поле'
							})}
							className={`w-[200px] border-4 ${errors.email && 'border-red-500'} rounded-sm px-5 py-3 text-black focus:outline-none sm:w-[500px] lg:w-full`}
							type='email'
							placeholder='Email'
							autoComplete='on'
							id='email-field'
						></input>
						<div className='mt-2 h-[20px] text-sm font-bold text-red-500'>
							{errors.email?.message}
						</div>
					</div>
				</div>
			</div>
			{message && (
				<div className='mt-5 h-[20px] text-lg font-bold text-green-500'>
					{message}
				</div>
			)}
			{error && (
				<div className='mt-5 h-[20px] text-lg font-bold text-red-500'>
					{error}
				</div>
			)}
			<Button
				type='submit'
				disabled={isLoading}
				className='mt-10 px-2 py-3 text-xl'
			>
				{isLoading ? 'Отправка...' : 'Отправить'}
			</Button>
		</form>
	)
}
export default FeedbackForm
