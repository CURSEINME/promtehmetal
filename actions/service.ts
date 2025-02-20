import { IService } from '@/app/sections/ProductSections/SectionProductHead'
import { aws } from '@/lib/S3Client'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'

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

export const uploadPhoto = async (formData: FormData) => {
	const file = formData.get('file')
}

export const createService = async (data: IService) => {
	const res = await prisma.services.create({
		data: {
			title: data.title,
			slug: data.slug,
			description: data.description,
			advantages: {
				title: 'test',
				description: 'test'
			},
			productImage: '',
			serviceIcon: '',
			serviceImage: ''
		}
	})

	return res
}

export const getPortfolio = async () => {
	const command = new ListObjectsV2Command({
		Bucket: bucketName,
		Prefix: 'portfolio/'
	})

	const data = await aws.send(command)

	const images = data.Contents

	console.log(images)

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
