import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
	const { name, tel, email } = await req.json()

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD
		}
	})

	try {
		await transporter.sendMail({
			from: email,
			to: 'info@promtehmetal.ru',
			subject: `Заявка от ${name}`,
			html: `
			  <p><strong>Имя: </strong> ${name}</p>
				<p><strong>Почта: </strong> ${email}</p>
				<p><strong>Телефон: </strong> ${tel}</p>
			`
		})
	} catch (error) {
		return NextResponse.json({ message: 'Произошла ошибка' }, { status: 500 })
	}

	return NextResponse.json(
		{ message: 'Ваша заявка отправлена' },
		{ status: 200 }
	)
}
