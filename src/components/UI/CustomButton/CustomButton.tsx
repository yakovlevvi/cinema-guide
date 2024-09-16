import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import styles from './CustomButton.module.scss'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	primary?: boolean
	wide?: boolean
	className?: string
}

const CustomButton: FC<CustomButtonProps> = ({
	children,
	primary,
	wide,
	className,
	...props
}) => {
	const btnClassName = [
		styles.btn,
		primary && styles['btn--primary'],
		wide && styles['btn--wide'],
		className,
	].join(' ')
	return (
		<button className={btnClassName} {...props}>
			{children}
		</button>
	)
}

export default CustomButton
