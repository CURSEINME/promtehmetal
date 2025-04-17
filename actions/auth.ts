'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export async function signInWithCredentials(data: {
	name: string
	password: string
}) {
	const { name, password } = data
	try {
		await signIn('credentials', {
			name,
			password,
			redirectTo: '/admin'
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return {
						message: 'Неверные данные'
					}
				default:
					return {
						message: 'Что-то пошло не так'
					}
			}
		}
		throw error
	}
}
