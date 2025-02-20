'use server'

import LoginForm from '@/components/forms/LoginForm'

export default async function Login() {
	return (
		<div className='px-10 flex h-screen items-center justify-center'>
			<div className='rounded-3xl border-2 border-white p-16'>
				<div className='flex flex-col items-center justify-center'>
					<LoginForm />
				</div>
			</div>
		</div>
	)
}
