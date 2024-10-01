import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../Menu/Menu'
import styles from './Header.module.scss'

import LogoIcon from '../Icons/LogoIcon/LogoIcon'

const Header: FC = () => {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY
			if (scrollTop > 50) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div
			className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}
		>
			<div className="container">
				<div className={styles.header__wrapper}>
					<Link to="/" className={styles['header__logo-link']}>
						<LogoIcon />
					</Link>
					<Menu />
				</div>
			</div>
		</div>
	)
}

export default Header
