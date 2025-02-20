'use client'

import ReactQueryProvider from '@/providers/ReactQueryProvider'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'

import YandexMetrika from '@/components/YandexMetrika'
import { usePathname } from 'next/navigation'
import './globals.css'

const Footer = dynamic(() => import('../components/Footer'))
const Header = dynamic(() => import('../components/Header'))

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const pathname = usePathname()
	const routes = ['/login', '/dashboard']
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<YandexMetrika />
				<ReactQueryProvider>
					<div className='flex min-h-screen flex-col'>
						{!routes.includes(pathname) && <Header />}
						<main className=''>{children}</main>
						{!routes.includes(pathname) && <Footer />}
					</div>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
