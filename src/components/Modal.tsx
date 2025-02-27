import { ReactNode } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) return null

	return (
		<div
			className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50'
			onClick={onClose}
		>
			<div
				className='relative rounded-lg border-2 border-white backdrop-blur-sm p-6 shadow-xl'
				onClick={e => e.stopPropagation()}
			>
				<button
					className='absolute right-2 top-2 cursor-pointer border-none bg-transparent text-2xl text-gray-600'
					onClick={onClose}
				></button>
				{children}
			</div>
		</div>
	)
}

export default Modal
