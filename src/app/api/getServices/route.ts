import { getServices } from '@/actions/service'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const services = await getServices()

		if (!services)
			return NextResponse.json({ error: 'Данные не найдены' }, { status: 404 })

		return NextResponse.json(services, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: 'Произошла ошибка' }, { status: 500 })
	}
}
