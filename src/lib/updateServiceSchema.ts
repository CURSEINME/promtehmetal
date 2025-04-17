import { z } from 'zod'

export type TUpdateService = z.infer<typeof updateServiceSchema>

const propertiesSchema = z.object({
	title: z.string(),
	description: z.string()
})
export const updateServiceSchema = z.object({
	title: z.string().min(1, 'Обязательное поле'),
	oldServiceImage: z.string(),
	oldServiceIcon: z.string(),
	description: z
		.string()
		.min(1, 'Обязательное поле')
		.max(500, 'Максимум 400 символов'),
	properties: z.array(propertiesSchema),
	serviceImage: z
		.any()
		.refine(file => !file || (file && file instanceof File), 'Неверный формат файла')
		.refine(
			file => !file || (file && file.size < 4 * 1024 * 1024),
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
