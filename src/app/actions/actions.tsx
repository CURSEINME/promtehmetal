'use server'

import { IFormState } from '@/components/forms/FeedbackForm'
import nodemailer from 'nodemailer'

export async function sendForm({ data }: { data: IFormState }) {
	const { name, tel, email } = data

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
		return { message: 'Произошла ошибка', ok: false }
	}

	return { message: 'Ваша заявка отправлена', ok: true }
}
