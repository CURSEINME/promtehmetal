'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Link as ScrollLink } from 'react-scroll'

interface FlexLinkProps {
	children: React.ReactNode
	offset: number
	className: string
	to: string
}
const FlexLink = ({ children, offset, to, className }: FlexLinkProps) => {
	const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0
	const pathname = usePathname()
	return (
		<>
			{pathname == '/' || (to !== 'services' && to !== 'about') ? (
				<ScrollLink
					href={`#${to}`}
					className={className}
					to={to}
					spy={true}
					offset={windowWidth >= 1024 ? offset : -30}
					smooth={true}
					duration={1000}
				>
					{children}
				</ScrollLink>
			) : (
				<Link className={className} href={`/#${to}`}>
					{children}
				</Link>
			)}
		</>
	)
}

export default FlexLink
