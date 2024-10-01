import {
	FC,
	ForwardedRef,
	forwardRef,
	InputHTMLAttributes,
	ReactNode,
} from 'react'
import styles from './CustomInput.module.scss'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode
	isDark: boolean
	className?: string
}

const CustomInput: FC<CustomInputProps> = forwardRef(
	(
		{ children, isDark, className, ...props },
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const classes = [styles['customInput']]

		if (isDark) {
			classes.push(styles['customInput--dark'])
		}
		if (className) {
			classes.push(className)
		}

		return (
			<div className={classes.join(' ')}>
				<input
					className={styles.customInput__field}
					type="text"
					{...props}
					ref={ref}
				/>
				{children}
			</div>
		)
	}
)

export default CustomInput
