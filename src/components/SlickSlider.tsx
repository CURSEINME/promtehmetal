'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import NextButton from './NextButton'
import PrevButton from './PrevButton'

interface sliderProps {
	children: React.ReactNode
	slides: number
}
const slickSlider = ({ children, slides }: sliderProps) => {
	const defaultSettings = {
		nextArrow: <NextButton />,
		prevArrow: <PrevButton />,
		autoplay: true,
		autoplaySpeed: 5000,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: slides,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					autoplay: false,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	}

	return <Slider {...defaultSettings}>{children}</Slider>
}

export default slickSlider
