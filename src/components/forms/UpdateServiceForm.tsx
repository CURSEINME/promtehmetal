'use client'

import { updateService } from '@/actions/service'
import { IService } from '@/app/sections/ProductSections/SectionProductHead'
import { TUpdateService, updateServiceSchema } from '@/lib/updateServiceSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

const UpdateServiceForm = ({ service }: { service: IService }) => {
	const {
		register,
		handleSubmit,
		control,
		resetField,
		formState: { errors }
	} = useForm<TUpdateService>({
		mode: 'onChange',
		resolver: zodResolver(updateServiceSchema),
		defaultValues: {
			...service,
			oldServiceImage: service.serviceImage,
			oldServiceIcon: service.serviceIcon,
			serviceImage: null,
			serviceIcon: null,
			properties: [...service.advantages]
		}
	})

	const { fields, append } = useFieldArray({
		control,
		name: 'advantages'
	})

	const [previewServiceImage, setPreviewServiceImage] = useState<string | null>(
		null
	)
	const [previewServiceIcon, setPreviewServiceIcon] = useState<string | null>(
		null
	)

	const [fileInputKey, setFileInputKey] = useState('serviceImage')
	const [file2InputKey, setFile2InputKey] = useState('serviceIcon')

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [message, setMessage] = useState<string | null>()
	const [errorMessage, setErrorMessage] = useState<string | null>()

	const onSubmit = async (data: TUpdateService) => {
		try {
			setIsLoading(true)

			const res = await updateService({ ...data, id: service.id })

			if (res.success) {
				setMessage(res.message)
			}
			if (!res.success) {
				setErrorMessage(res.message)
			}
		} catch (err) {
			setErrorMessage('Произошла ошибка')
		} finally {
			setIsLoading(false)
		}
	}
	const handleRemoveServiceImage = () => {
		URL.revokeObjectURL(previewServiceImage as string)
		resetField('serviceImage')
		setFileInputKey(`serviceImage-${Date.now()}`)
		setPreviewServiceImage(null)
	}
	const handleRemoveServiceIcon = () => {
		URL.revokeObjectURL(previewServiceIcon as string)
		resetField('serviceIcon')
		setFile2InputKey(`serviceIcon-${Date.now()}`)
		setPreviewServiceIcon(null)
	}

	useEffect(() => {
		setPreviewServiceIcon(service.serviceIcon)
		setPreviewServiceImage(service.serviceImage)
	}, [])

	return (
		<form
			className='flex flex-col items-center'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex gap-20'>
				<div className='flex flex-col gap-10'>
					<div>
						<input
							placeholder='Заголовок услуги'
							className={`rounded-lg bg-transparent p-2 text-lg text-white outline focus:outline-[3px] ${errors.title ? 'outline-red-600 focus:outline-red-600' : 'focus:outline-purple-500'}`}
							type='text'
							{...register('title')}
						></input>
						<div className='h-0'>
							<span className='text-sm font-bold text-red-600'>
								{errors.title?.message}
							</span>
						</div>
					</div>
					<div>
						<input
							{...register('slug')}
							placeholder='slug'
							className={`rounded-lg bg-transparent p-2 text-lg text-white outline focus:outline-[3px] ${errors.slug ? 'outline-red-600 focus:outline-red-600' : 'focus:outline-purple-500'}`}
							type='text'
						></input>
						<div className='h-0'>
							<span className='text-sm font-bold text-red-600'>
								{errors.slug?.message}
							</span>
						</div>
					</div>
					<div>
						<textarea
							placeholder='Описание услуги'
							className={`h-[200px] w-[450px] rounded-lg bg-transparent p-2 text-sm text-white outline focus:outline-[3px] ${errors.description ? 'outline-red-600 focus:outline-red-600' : 'focus:outline-purple-500'}`}
							{...register('description')}
						></textarea>
						<div className='h-0'>
							<span className='text-sm font-bold text-red-600'>
								{errors.description?.message}
							</span>
						</div>
					</div>
					<div className='flex'>
						<Controller
							name='serviceImage'
							control={control}
							render={({ field, fieldState }) => (
								<div className='flex flex-col'>
									<label htmlFor='serviceImage' className='mb-2 text-lg'>
										Изображение услуги
									</label>
									<input
										id='serviceImage'
										key={fileInputKey}
										type='file'
										accept='image/*'
										onChange={event => {
											if (event.target.files) {
												field.onChange(event.target.files[0])
												if (!event.target.files[0]) {
													return setPreviewServiceImage(null)
												}
												const imageUrl = URL.createObjectURL(
													event.target.files[0]
												)
												setPreviewServiceImage(imageUrl)
											}
										}}
									></input>
									<div className='my-2 text-sm font-bold text-red-600'>
										{fieldState.error?.message}
									</div>
								</div>
							)}
						/>
						{previewServiceImage && (
							<div className='relative h-[125] w-[125]'>
								<Image
									src={previewServiceImage}
									fill
									alt='preview'
									className='rounded-lg object-cover'
								/>
								<button
									onClick={handleRemoveServiceImage}
									className='absolute right-2 top-2 dark:invert'
									type='submit'
								>
									<Image src='/close.svg' width={25} height={25} alt='close' />
								</button>
							</div>
						)}
					</div>
					<div className='flex'>
						<Controller
							name='serviceIcon'
							control={control}
							render={({ field, fieldState }) => (
								<div className='flex flex-col'>
									<label htmlFor='serviceIcon' className='mb-2 text-lg'>
										Иконка услуги
									</label>
									<input
										id='serviceIcon'
										key={file2InputKey}
										type='file'
										accept='image/*'
										onChange={event => {
											if (event.target.files) {
												field.onChange(event.target.files[0])
												if (!event.target.files[0]) {
													return setPreviewServiceIcon(null)
												}
												const imageUrl = URL.createObjectURL(
													event.target.files[0]
												)
												setPreviewServiceIcon(imageUrl)
											}
										}}
									></input>
									<div className='my-2 text-sm font-bold text-red-600'>
										{fieldState.error?.message}
									</div>
								</div>
							)}
						/>
						{previewServiceIcon && (
							<div className='relative h-[125] w-[125]'>
								<Image
									src={previewServiceIcon}
									fill
									alt='preview'
									className='rounded-lg object-cover'
								/>
								<button
									onClick={handleRemoveServiceIcon}
									className='absolute right-2 top-2 dark:invert'
									type='submit'
								>
									<Image src='/close.svg' width={25} height={25} alt='close' />
								</button>
							</div>
						)}
					</div>
				</div>
				<div className='flex flex-col items-center gap-10'>
					{fields.map((property, index) => {
						return (
							<div key={property.id} className='flex flex-col gap-10'>
								<div>
									<input
										{...register(`properties.${index}.title`)}
										placeholder='Заголовок'
										className={`rounded-lg bg-transparent p-2 text-lg text-white outline focus:outline-[3px] ${errors.properties?.[index]?.title ? 'outline-red-600 focus:outline-red-600' : 'focus:outline-purple-500'}`}
									></input>
									<div className='h-0'>
										<span className='text-sm font-bold text-red-600'>
											{errors.properties?.[index]?.title?.message}
										</span>
									</div>
								</div>
								<div>
									<input
										{...register(`properties.${index}.description`)}
										placeholder='Описание'
										className={`rounded-lg bg-transparent p-2 text-lg text-white outline focus:outline-[3px] ${errors.properties?.[index]?.description ? 'outline-red-600 focus:outline-red-600' : 'focus:outline-purple-500'}`}
									></input>
									<div className='h-0'>
										<span className='text-sm font-bold text-red-600'>
											{errors.properties?.[index]?.description?.message}
										</span>
									</div>
								</div>
							</div>
						)
					})}
					{fields.length < 4 && (
						<button
							className='rounded-lg border-2 border-white px-4 py-1 text-xl hover:bg-white hover:text-black'
							type='button'
							onClick={() => append({ title: '', description: '' })}
						>
							Добавить свойство
						</button>
					)}
				</div>
			</div>
			<button
				disabled={isLoading}
				className='mt-10 self-center rounded-lg border-2 border-white px-4 py-1 text-xl hover:bg-white hover:text-black'
				type='submit'
			>
				{isLoading ? 'Загрузка...' : 'Создать услугу'}
			</button>
			{message ? (
				<div className='my-5 text-lg text-green-500'>{message}</div>
			) : (
				<div className='my-5 text-lg text-red-500'>{errorMessage}</div>
			)}
		</form>
	)
}
export default UpdateServiceForm
