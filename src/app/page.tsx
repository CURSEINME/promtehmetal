import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPortfolio, getServices } from '../../actions/service'
import SectionHead from './sections/SectionHead'

const SectionAboutUs = dynamic(() => import('./sections/SectionAboutUs'))
const SectionFeedback = dynamic(() => import('./sections/SectionFeedback'))
const SectionMap = dynamic(() => import('./sections/SectionMap'))
const SectionPortfolio = dynamic(() => import('./sections/SectionPortfolio'))
const SectionServices = dynamic(() => import('./sections/SectionServices'))
const SectionWorkPlan = dynamic(() => import('./sections/SectionWorkPlan'))

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

export default async function Home() {
	const products = await getServices()
	const portfolio = await getPortfolio()
	return (
		<>
			<SectionHead />
			<SectionServices products={products} />
			<SectionFeedback />
			<SectionAboutUs />
			<SectionPortfolio portfolio={portfolio} />
			<SectionWorkPlan />
			<SectionMap />
		</>
	)
}
