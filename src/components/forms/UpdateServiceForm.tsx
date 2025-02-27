'use client'

import { updateService } from '@/actions/service'
import { IService } from '@/app/sections/ProductSections/SectionProductHead'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'

export type TUpdateServiceFormState = z.infer<typeof schema>

const propertiesSchema = z.object({
	title: z.string(),
	description: z.string()
})
const schema = z.object({
	title: z.string().min(1, 'Обязательное поле'),
	slug: z.string().min(1, 'Обязательное поле'),
	description: z.string().min(1, 'Обязательное поле'),
	advantages: z.array(propertiesSchema),
	oldServiceImage: z.string(),
	oldServiceIcon: z.string(),
	serviceImage: z
		.any()
		.refine(file => !file || (file && file instanceof File), 'Неверный формат файла')
		.refine(
			file => !file || file?.size < 4 * 1024 * 1024,
			'Размер файла превышает 4 МБ'
		),
	serviceIcon: z
		.any()
		.refine(file => !file || (file && file instanceof File), 'Обязательное поле')
		.refine(
			file => !file || (file && file?.size < 4 * 1024 * 1024),
			'Размер файла превышает 4 МБ'
		)
})

const UpdateServiceForm = ({ service }: { service: IService }) => {
	const {
		register,
		handleSubmit,
		control,
		resetField,
		formState: { errors }
	} = useForm<TUpdateServiceFormState>({
		resolver: zodResolver(schema),
		defaultValues: {
			...service,
			oldServiceImage: service.serviceImage,
			oldServiceIcon: service.serviceIcon,
			serviceImage: null,
			serviceIcon: null
		}
	})

	const { fields, append } = useFieldArray({
		control,
		name: 'advantages'
	})

	const [previewServiceImage, setPreviewServiceImage] = useState<string | null>(null)
	const [previewServiceIcon, setPreviewServiceIcon] = useState<string | null>(null)

	const [fileInputKey, setFileInputKey] = useState('serviceImage')
	const [file2InputKey, setFile2InputKey] = useState('serviceIcon')

	const onSubmit = async (data: any) => {
		await updateService({ ...data, id: service.id })
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
		<form className='flex flex-col gap-10' onSubmit={handleSubmit(onSubmit)}>
			<div className='flex gap-20'>
				<div className='flex flex-col gap-10'>
					<div>
						<input
							placeholder='title'
							className={`rounded-lg bg-transparent p-2 text-lg text-white outline ${errors.title && 'outline outline-red-600 focus:outline-red-600'} focus:outline focus:outline-[3px] focus:outline-sky-500`}
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
							className={`rounded-lg bg-transparent p-2 text-lg text-white outline ${errors.slug && 'outline outline-red-600 focus:outline-red-600'} focus:outline focus:outline-[3px] focus:outline-sky-500`}
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
							className={`h-[200px] w-[450px] rounded-lg bg-transparent p-2  text-sm text-white outline ${errors.description && 'outline outline-red-600 focus:outline-red-600'} focus:outline focus:outline-[3px] focus:outline-sky-500`}
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
									<input
										key={fileInputKey}
										type='file'
										accept='image/*'
										onChange={event => {
											if (event.target.files) {
												field.onChange(event.target.files[0])
												const imageUrl = URL.createObjectURL(event.target.files[0])
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
							<div className='relative h-[150] w-[150]'>
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
									<input
										key={file2InputKey}
										type='file'
										accept='image/*'
										onChange={event => {
											if (event.target.files) {
												field.onChange(event.target.files[0])
												const imageUrl = URL.createObjectURL(event.target.files[0])
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
							<div className='relative h-[150] w-[150]'>
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
							<div key={property.id} className='flex flex-col gap-5'>
								<input
									{...register(`advantages.${index}.title`)}
									placeholder='Заголовок'
									className={`rounded-lg bg-transparent p-2 text-lg text-white outline ${errors.title && 'outline outline-red-600 focus:outline-red-600'} focus:outline focus:outline-[3px] focus:outline-sky-500`}
								></input>
								<input
									{...register(`advantages.${index}.description`)}
									placeholder='Описание'
									className={`rounded-lg bg-transparent p-2 text-lg text-white outline ${errors.title && 'outline outline-red-600 focus:outline-red-600'} focus:outline focus:outline-[3px] focus:outline-sky-500`}
								></input>
							</div>
						)
					})}
					{fields.length < 4 && (
						<button
							type='button'
							onClick={() => append({ title: '', description: '' })}
						>
							Добавить
						</button>
					)}
				</div>
			</div>
			<button type='submit'>Submit</button>
		</form>
	)
}
export default UpdateServiceForm
