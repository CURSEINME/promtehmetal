import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			},
			backgroundImage: {
				feedback: "url('/feedback-bg.jpg')",
				serviceOne: "url('/services.jpg)",
				laser_cutting: "url('/laser-cutting.webp')",
				home: "url('/home_bg.png')",
				homeOverlay:
					'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
				feedbackOverlay:
					'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,10) 100%)'
			}
		}
	},
	plugins: []
} satisfies Config
