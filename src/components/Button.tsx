import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
}
const Button = ({ children, ...props }: ButtonProps) => {
	const merged = clsx('rounded-xl bg-red-600 hover:bg-red-700', props.className)
	return (
		<button {...props} className={merged}>
			{children}
		</button>
	)
}

export default Button
