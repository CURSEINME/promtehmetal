import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [
		Credentials({
			credentials: {
				name: {},
				password: {}
			},
			authorize: async credentials => {
				const { name, password } = credentials
				if (!name || !password) return null

				let user = await prisma.user.findFirst({
					where: {
						name
					}
				})

				if (!user) return null

				const isMatch = await compare(password as string, user.password)
				if (!isMatch) return null

				return user
			}
		})
	],
	trustHost: true
})
