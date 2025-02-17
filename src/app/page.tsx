import dynamic from 'next/dynamic'
import { getPortfolio, getServices } from '../../prisma/service'
import SectionHead from './sections/SectionHead'

const SectionAboutUs = dynamic(() => import('./sections/SectionAboutUs'))
const SectionFeedback = dynamic(() => import('./sections/SectionFeedback'))
const SectionMap = dynamic(() => import('./sections/SectionMap'))
const SectionPortfolio = dynamic(() => import('./sections/SectionPortfolio'))
const SectionServices = dynamic(() => import('./sections/SectionServices'))
const SectionWorkPlan = dynamic(() => import('./sections/SectionWorkPlan'))

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
