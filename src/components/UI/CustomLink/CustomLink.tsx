import { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './CustomLink.module.scss'

interface CustomLinkProps {
	to: string
	children: ReactNode
	className?: string
	isIcon?: boolean
}

const CustomLink: FC<CustomLinkProps> = ({
	to,
	children,
	className,
	isIcon = false,
	...props
}) => {
	const classes = [styles.link]

	if (className) {
		classes.push(className)
	}

	if (isIcon) {
		classes.push(styles['link--icon'])
	}

	return (
		<NavLink
			className={({ isActive }) =>
				[...classes, isActive && !isIcon ? styles['link--active'] : ''].join(
					' '
				)
			}
			to={to}
			{...props}
		>
			{children}
		</NavLink>
	)
}

export default CustomLink
