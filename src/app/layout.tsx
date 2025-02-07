import ReactQueryProvider from '@/providers/ReactQueryProvider'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'

import YandexMetrika from '@/components/YandexMetrika'
import './globals.css'

const Footer = dynamic(() => import('../components/Footer'))
const Header = dynamic(() => import('../components/Header'))

export const metadata: Metadata = {
	title: 'Услуги лазерной резки',
	description:
		'Полный цикл производства изделия на современном оборудовании. ✅ Лазерная резка, ✅ сварка и очистка металла, ✅ точная гибка на чпу станке, ✅ высокое качество порошковой покраски. Доставка на ваш склад по всей России.',
	openGraph: {
		type: 'website',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
		description:
			'Полный цикл производства изделия на современном оборудовании. ✅ Лазерная резка, ✅ сварка и очистка металла, ✅ точная гибка на чпу станке, ✅ высокое качество порошковой покраски. Доставка на ваш склад по всей России.',
		siteName: 'промтехметалл'
	},
	other: {
		'mailru-domain': 'CDKeRhuVgOCLl26y',
		'yandex-verification': 'dd60247d6e672066'
	}
}

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
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<YandexMetrika />
				<ReactQueryProvider>
					<div className='flex min-h-screen flex-col'>
						<Header />
						<main className=''>{children}</main>
						<Footer />
					</div>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
