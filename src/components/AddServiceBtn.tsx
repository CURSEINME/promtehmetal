'use client'

import { useState } from 'react'
import Modal from './Modal'
import CreateServiceForm from './forms/CreateServiceForm'
import UpdateServiceForm from './forms/UpdateServiceForm'

const AddServiceBtn = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<Modal
				onClose={() => setIsOpen(false)}
				isOpen={isOpen}
				children={<CreateServiceForm />}
			/>
			<button
				className='rounded-xl bg-sky-500 p-2 text-xl font-bold'
				onClick={() => setIsOpen(true)}
			>
				Добавить услугу
			</button>
		</>
	)
}

export default AddServiceBtn
