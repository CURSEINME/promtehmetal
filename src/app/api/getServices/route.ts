import { NextResponse } from 'next/server'

import { getServices } from '../../../../prisma/service'

export async function GET(req: Request) {
	const services = await getServices()
	return NextResponse.json(services)
}
