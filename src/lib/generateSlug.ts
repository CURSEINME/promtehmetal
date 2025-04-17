import { transliterate } from 'transliteration'

export const generateSlug = (val: string): string => {
	const transliteratedValue = transliterate(val)

	return transliteratedValue
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim()
}
