import Image from 'next/image'

const NextButton = (props: any) => {
	const { onClick } = props
	return (
		<Image
			className='custom-next [display:none] dark:invert lg:block'
			onClick={onClick}
			src='/next-arrow.svg'
			width={50}
			height={50}
			alt='next-button'
		></Image>
	)
}

export default NextButton
