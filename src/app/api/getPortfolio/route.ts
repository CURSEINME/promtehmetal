import { NextResponse } from 'next/server'

import { getPortfolio } from '../../../../prisma/service'

export async function GET(req: Request) {
	const portfolio = await getPortfolio()

	return NextResponse.json(portfolio)
}
