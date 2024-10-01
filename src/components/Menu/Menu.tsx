import linkStyles from '../UI/CustomLink/CustomLink.module.scss'
import styles from './Menu.module.scss'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { User } from '../../api/User'
import { RootState, useAppDispatch } from '../../store'
import { checkAuth } from '../../store/authSlice'
import AuthForm from '../AuthForm/AuthForm'
import GenreIcon from '../Icons/GenreIcon/GenreIcon'
import UserIcon from '../Icons/UserIcon/UserIcon'
import Search from '../Search/Search'
import CustomLink from '../UI/CustomLink/CustomLink'
import Modal from '../UI/Modal/Modal'

const Menu = () => {
	const [authModal, setAuthModal] = useState(false)

	const dispatch = useAppDispatch()
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)
	const authStatus = useSelector((state: RootState) => state.auth.status)

	const authUser: User | null = useSelector(
		(state: RootState) => state.auth.user
	)

	useEffect(() => {
		if (authStatus === 'idle') {
			dispatch(checkAuth())
		}
	}, [dispatch, authStatus, isAuthenticated])

	return (
		<div className={styles.menu}>
			<CustomLink className={styles.menu__link} to="/">
				Главная
			</CustomLink>
			<CustomLink className={styles.menu__link} to="/genres">
				Жанры
			</CustomLink>
			<CustomLink to="/genres" className={styles['menu__genre-link']} isIcon>
				<GenreIcon />
			</CustomLink>

			<Search />

			{isAuthenticated ? (
				<CustomLink to="/account" className={styles['menu__genre-link']} isIcon>
					<UserIcon />
				</CustomLink>
			) : (
				<button
					className={styles['menu__btn']}
					type="button"
					onClick={() => setAuthModal(true)}
				>
					<UserIcon />
				</button>
			)}

			{isAuthenticated ? (
				<CustomLink to="/account" className={styles['menu__link']}>
					{authUser ? authUser.surname : 'Loading...'}
				</CustomLink>
			) : (
				<button
					className={linkStyles.link}
					type="button"
					onClick={() => setAuthModal(true)}
				>
					Войти
				</button>
			)}

			<Modal
				isVisible={authModal}
				setIsVisible={(isVisible) => setAuthModal(isVisible)}
			>
				<AuthForm closeModal={() => setAuthModal(false)} />
			</Modal>
		</div>
	)
}

export default Menu
