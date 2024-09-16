import { NavLink, useNavigate } from 'react-router-dom'
import SearchIcon from '../Icons/SearchIcon/SearchIcon'
import styles from './Menu.module.scss'

import { useState } from 'react'
import { fetchFilteredFilms, FilmList } from '../../api/Film'
import AuthForm from '../AuthForm/AuthForm'
import GenreIcon from '../GenreIcon/GenreIcon'
import UserIcon from '../Icons/UserIcon/UserIcon'
import SearchInput from '../SearchInput/SearchInput'
import SearchResults from '../SearchResults/SearchResults'
import Modal from '../UI/Modal/Modal'

const Menu = () => {
	const [authModal, setAuthModal] = useState(false)
	const [searchModal, setSearchModal] = useState(false)

	const [queryFilms, setQueryFilms] = useState<FilmList>([])
	const [searchInput, setSearchInput] = useState<string>('')

	const navigate = useNavigate()

	// Обработчик изменения ввода для поиска
	const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const str = e.target.value
		setSearchInput(str)
		const films = await fetchFilteredFilms(str)
		setQueryFilms(films)
	}

	// Обработчик клика по результату поиска
	const handleFilmClick = (filmId: number) => {
		setQueryFilms([])
		setSearchInput('')
		setSearchModal(false)
		navigate(`/movie/${filmId}`)
	}

	return (
		<div className={styles.menu}>
			<NavLink
				to="/"
				className={({ isActive }) =>
					[styles.menu__link, isActive ? styles.menu__linkActive : ''].join(' ')
				}
				end
			>
				Главная
			</NavLink>
			<NavLink
				to="/genres"
				className={({ isActive }) =>
					[styles.menu__link, isActive ? styles.menu__linkActive : ''].join(' ')
				}
			>
				Жанры
			</NavLink>
			<NavLink to="/genres" className={styles['menu__genre-link']}>
				<GenreIcon />
			</NavLink>

			{/* Основной поиск */}
			<div className={styles['menu__search-wrap']}>
				<SearchInput
					className={styles['menu__search-input']}
					handleInput={handleInput}
					searchInput={searchInput}
				/>
				<button
					className={styles['menu__btn']}
					onClick={() => setSearchModal(true)}
				>
					<SearchIcon className={styles['menu__search-icon']} />
				</button>
				{queryFilms.length > 0 && searchInput !== '' && (
					<SearchResults
						className={styles['menu__search-results']}
						queryFilms={queryFilms}
						handleClick={handleFilmClick}
					/>
				)}
			</div>

			{/* Модальное окно поиска */}
			{searchModal && (
				<div
					className={styles['menu__search-modal']}
					onClick={() => {
						setSearchModal(false)
						setSearchInput('')
					}}
				>
					<SearchInput
						className={styles['menu__modal-search-input']}
						handleInput={handleInput}
						searchInput={searchInput}
					/>
					{queryFilms.length > 0 && searchInput !== '' && (
						<SearchResults
							className={styles['menu__modal-search-results']}
							queryFilms={queryFilms}
							handleClick={handleFilmClick}
						/>
					)}
				</div>
			)}

			{/* Кнопки авторизации */}
			<button
				className={styles.menu__link}
				type="button"
				onClick={() => setAuthModal(true)}
			>
				Войти
			</button>
			<button
				className={styles['menu__btn']}
				type="button"
				onClick={() => setAuthModal(true)}
			>
				<UserIcon />
			</button>

			{/* Модальное окно авторизации */}
			<Modal
				isVisible={authModal}
				setIsVisible={(isVisible) => setAuthModal(isVisible)}
			>
				<AuthForm />
			</Modal>
		</div>
	)
}

export default Menu
