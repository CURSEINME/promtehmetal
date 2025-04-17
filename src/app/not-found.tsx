import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='h-[calc(100vh-(94px+150px))] flex flex-col items-center justify-center bg-white p-4 text-black dark:bg-black dark:text-white'>
			<div className='w-full max-w-md text-center'>
				<h1 className='mb-4 text-white bg-clip-text text-9xl font-bold '>
					404
				</h1>

				<h2 className='mb-4 text-3xl font-bold'>Страница не найдена</h2>

				<p className='mb-8 text-lg text-gray-600 dark:text-gray-400'>
					Страница, которую вы ищете, не существует или была перемещена.
				</p>

				<div className='flex justify-center'>
					<Link
						href='/'
						className='rounded-md bg-black px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black'
					>
						Вернуться домой
					</Link>
				</div>
			</div>
		</div>
	)
}
