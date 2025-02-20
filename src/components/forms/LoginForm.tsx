'use client'

import { signInWithCredentials } from '@/actions/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ILoginFormState {
	name: string
	password: string
}
const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ILoginFormState>()
	const [error, setError] = useState<string>()
	const [loading, setLoading] = useState<boolean>(false)
	async function onSubmit(data: any) {
		try {
			await signInWithCredentials(data)
			setLoading(true)
			const result = await signInWithCredentials(data)
			if (result?.message) {
				setError(result.message)
			}
		} catch (err) {
		} finally {
			setLoading(false)
		}
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col items-center'
		>
			<div className='mb-10'>
				<input
					className='w-full rounded-xl border-2 border-white bg-transparent p-2 text-lg text-white focus:outline-none'
					placeholder='Логин'
					type='text'
					{...register('name', { required: 'Обязательное поле' })}
				></input>
				<div className='h-0'>
					<span className='text-sm font-bold text-red-600'>
						{errors.name?.message}
					</span>
				</div>
			</div>
			<div className='mb-10'>
				<input
					className='w-full rounded-xl border-2 border-white bg-transparent p-2 text-lg text-white focus:outline-none'
					placeholder='Пароль'
					type='password'
					{...register('password', { required: 'Обязательное поле' })}
				></input>
				<div className='h-0'>
					<span className='text-sm font-bold text-red-600'>
						{errors.password?.message}
					</span>
				</div>
			</div>
			<button
				disabled={loading}
				className='mb-5 rounded-xl border-2 border-white px-3 text-lg hover:bg-white hover:text-black'
				type='submit'
			>
				{loading ? 'Загрузка...' : 'Войти'}
			</button>
			<div className='h-0'>
				<p className='font-bold text-red-600'>{error}</p>
			</div>
		</form>
	)
}

export default LoginForm
