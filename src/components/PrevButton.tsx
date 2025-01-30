import Image from 'next/image'

const PrevButton = (props: any) => {
	const { onClick } = props
	return (
		<Image
			className='custom-prev [display:none] dark:invert lg:block'
			onClick={onClick}
			src='/prev-arrow.svg'
			width={50}
			height={50}
			alt='prev-button'
		></Image>
	)
}

export default PrevButton
