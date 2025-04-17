'use server'

import { auth } from '@/auth'
import { createServiceSchema, TCreateServiceSchema } from '@/lib/createServiceSchema'
import { generateSlug } from '@/lib/generateSlug'
import { getImageBuffer } from '@/lib/getImageBuffer'
import { aws } from '@/lib/S3Client'
import { TUpdateService, updateServiceSchema } from '@/lib/updateServiceSchema'
import {
	DeleteObjectCommand,
	ListObjectsV2Command,
	PutObjectCommand
} from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const prisma = new PrismaClient()

const bucketName = process.env.BUCKET_NAME
const endpoint = process.env.ENDPOINT

export const getServices = async () => {
	const res = await prisma.services.findMany()
	return res
}

export const getService = async (slug: string) => {
	const res = await prisma.services.findFirst({
		where: {
			slug
		}
	})
	return res
}

const deleteServiceSchema = z.object({
	id: z.string(),
	serviceImage: z.string(),
	serviceIcon: z.string()
})
type TDeleteService = z.infer<typeof deleteServiceSchema>

export const deleteService = async (data: TDeleteService) => {
	try {
		const session = await auth()

		if (!session) {
			return { success: false, message: 'Вы не авторизованы' }
		}

		const result = deleteServiceSchema.safeParse(data)

		if (!result.success) {
			return { success: false, message: 'Неверный формат данных' }
		}

		const { id, serviceImage, serviceIcon } = result.data

		const deleteServiceImage = new DeleteObjectCommand({
			Bucket: bucketName,
			Key: `serviceImages/${serviceImage}`
		})
		const deleteServiceIcon = new DeleteObjectCommand({
			Bucket: bucketName,
			Key: `serviceIcons/${serviceIcon}`
		})

		aws.send(deleteServiceImage)
		aws.send(deleteServiceIcon)

		await prisma.services.delete({
			where: {
				id
			}
		})

		revalidatePath('/admin')
		revalidatePath('/')

		return { success: true, message: 'Услуга удалена' }
	} catch (err) {
		console.log(err)
		return { success: true, message: 'Произошла ошибка' }
	}
}

type TUpdateServiceAction = TUpdateService & {
	id: string
}

export const updateService = async (data: TUpdateServiceAction) => {
	try {
		const session = await auth()

		if (!session) {
			return { success: false, message: 'Вы не авторизованы' }
		}

		const result = updateServiceSchema.safeParse(data)

		if (!result.success) {
			return { success: false, message: 'Неверный формат данных' }
		}

		const {
			serviceImage,
			serviceIcon,
			oldServiceImage,
			oldServiceIcon,
			properties,
			...newData
		} = result.data

		if (serviceImage instanceof File) {
			const serviceImageBuffer = getImageBuffer(serviceImage)

			const serviceImageUpload = new PutObjectCommand({
				Bucket: bucketName,
				Key: `serviceImages/` + serviceImage.name,
				Body: await serviceImageBuffer,
				ACL: 'public-read'
			})

			aws.send(serviceImageUpload)

			const deleteServiceImage = new DeleteObjectCommand({
				Bucket: bucketName,
				Key: `serviceImages/${oldServiceImage.split('/')[5]}`
			})

			aws.send(deleteServiceImage)
		}
		if (serviceIcon instanceof File) {
			const serviceIconBuffer = getImageBuffer(serviceIcon)

			const serviceIconUpload = new PutObjectCommand({
				Bucket: bucketName,
				Key: `serviceIcons/` + serviceIcon.name,
				Body: await serviceIconBuffer,
				ACL: 'public-read'
			})

			aws.send(serviceIconUpload)

			const deleteServiceIcon = new DeleteObjectCommand({
				Bucket: bucketName,
				Key: `serviceImages/${oldServiceIcon.split('/')[5]}`
			})

			aws.send(deleteServiceIcon)
		}

		const slug = generateSlug(data.title)

		await prisma.services.update({
			where: {
				id: data.id
			},
			data: {
				...newData,
				slug,
				advantages: [...properties],
				serviceImage: serviceImage
					? `${endpoint}/${bucketName}/serviceImages/${serviceImage.name}`
					: oldServiceImage,
				serviceIcon: serviceIcon
					? `${endpoint}/${bucketName}/serviceIcons/${serviceIcon.name}`
					: oldServiceIcon
			}
		})

		revalidatePath('/admin')
		revalidatePath('/')
		revalidatePath(`/service/${slug}`)

		return { success: true, message: 'Услуга обновлена' }
	} catch (err) {
		console.log(err)
		return { success: false, message: 'Произошла ошибка' }
	}
}

export const createService = async (data: TCreateServiceSchema) => {
	try {
		const session = await auth()

		if (!session) {
			return { success: false, message: 'Вы не авторизованы' }
		}

		const result = createServiceSchema.safeParse(data)
		if (!result.success) {
			return { success: false, message: 'Неверный формат данных' }
		}

		const { title, description, serviceIcon, serviceImage, properties } = data

		if (serviceImage instanceof File) {
			const serviceImageBuffer = getImageBuffer(serviceImage)

			const serviceImageUpload = new PutObjectCommand({
				Bucket: bucketName,
				Key: `serviceImages/` + serviceImage.name,
				Body: await serviceImageBuffer,
				ACL: 'public-read'
			})

			aws.send(serviceImageUpload)
		}
		if (serviceIcon instanceof File) {
			const serviceIconBuffer = getImageBuffer(serviceIcon)

			const serviceIconUpload = new PutObjectCommand({
				Bucket: bucketName,
				Key: 'serviceIcons/' + serviceIcon.name,
				Body: await serviceIconBuffer,
				ACL: 'public-read'
			})

			aws.send(serviceIconUpload)
		}
		const slug = generateSlug(title)

		await prisma.services.create({
			data: {
				title,
				slug,
				description,
				advantages: [...properties],
				serviceImage: serviceImage
					? `${endpoint}/${bucketName}/serviceImages/${serviceImage.name}`
					: '',
				serviceIcon: serviceIcon
					? `${endpoint}/${bucketName}/serviceIcons/${serviceIcon.name} `
					: ''
			}
		})

		revalidatePath('/admin')
		revalidatePath('/')

		return { success: true, message: 'Услуга успешно создана' }
	} catch (error) {
		console.log(error)
		return { success: false, message: 'Произошла ошибка' }
	}
}

export const getPortfolio = async () => {
	const command = new ListObjectsV2Command({
		Bucket: bucketName,
		Prefix: 'portfolio/'
	})

	const data = await aws.send(command)

	const images = data.Contents

	const urls = images?.slice(1, images.length).map(obj => {
		return endpoint + '/' + bucketName + '/' + obj.Key
	})

	return urls
}

export const getServicePortfolio = async (slug: string) => {
	const command = new ListObjectsV2Command({
		Bucket: bucketName
	})

	const data = await aws.send(command)

	const images = data.Contents?.filter(obj =>
		obj.Key?.includes(slug + '-portfolio/')
	)

	const urls = images?.slice(1, images.length).map(obj => {
		return endpoint + '/' + bucketName + '/' + obj.Key
	})

	return urls
}
