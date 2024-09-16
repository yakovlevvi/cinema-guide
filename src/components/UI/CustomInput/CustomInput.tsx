import { FC, InputHTMLAttributes, ReactNode } from 'react'
import styles from './CustomInput.module.scss'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode
	isDark: boolean
	className?: string
}

const CustomInput: FC<CustomInputProps> = ({
	children,
	isDark,
	className,
	...props
}) => {
	let classes = styles['customInput']
	if (isDark) {
		classes += ` ${styles['customInput--dark']}`
	}
	if (className) {
		classes += ` ${className}`
	}

	return (
		<div className={classes}>
			<input className={styles.customInput__field} type="text" {...props} />
			{children}
		</div>
	)
}

export default CustomInput
