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
	error?: string
}

const CustomInput: FC<CustomInputProps> = forwardRef(
	(
		{ children, isDark, className, error, ...props },
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const classes = [styles['customInput']]

		if (isDark) {
			classes.push(styles['customInput--dark'])
		}
		if (error) {
			classes.push(styles['customInput--error'])
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
				{error && <span className={styles['customInput__error']}>{error}</span>}
				{children}
			</div>
		)
	}
)

export default CustomInput
