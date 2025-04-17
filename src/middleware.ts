import { auth as middleware } from '@/auth'
import { NextResponse } from 'next/server'

export default middleware(async req => {
	const isLoggedIn = !!req.auth
	const protectedRoute = req.nextUrl.pathname.startsWith('/admin')
	const authRoute = req.nextUrl.pathname.startsWith('/login')

	if (protectedRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	if (authRoute && isLoggedIn) {
		return NextResponse.redirect(new URL('/admin', req.url))
	}

	return NextResponse.next()
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
