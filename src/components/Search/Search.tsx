import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchFilteredFilms, FilmList } from '../../api/Film'
import useDebounce from '../../hooks/useDebounce'
import SearchIcon from '../Icons/SearchIcon/SearchIcon'
import SearchResults from '../SearchResults/SearchResults'

import CustomInput from '../UI/CustomInput/CustomInput'
import inputStyles from '../UI/CustomInput/CustomInput.module.scss'
import styles from './Search.module.scss'

const Search = () => {
	const [searchModal, setSearchModal] = useState(false)
	const [searchInput, setSearchInput] = useState<string>('')
	const [queryFilms, setQueryFilms] = useState<FilmList>([])

	const navigate = useNavigate()

	const debouncedSearch = useDebounce<FilmList, string[]>(
		fetchFilteredFilms,
		500
	)

	const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const str = e.target.value
		setSearchInput(str)

		if (str.trim()) {
			const films = await debouncedSearch(str)
			if (films) {
				setQueryFilms(films)
			}
		} else {
			setQueryFilms([])
		}
	}

	const handleFilmClick = (filmId: number) => {
		setQueryFilms([])
		setSearchInput('')
		setSearchModal(false)
		navigate(`/movie/${filmId}`)
	}

	const searchModalClasses = [styles['search__modal']]

	if (searchModal) {
		searchModalClasses.push(styles['search__modal--active'])
	}

	return (
		<div className={styles['search']}>
			<div
				className={searchModalClasses.join(' ')}
				onClick={() => {
					setSearchInput('')
					setSearchModal(false)
				}}
			>
				<CustomInput
					className={styles['search__input']}
					isDark
					type="search"
					placeholder="Поиск"
					onChange={handleInput}
					value={searchInput}
					onClick={(e) => e.stopPropagation()}
				>
					<SearchIcon className={inputStyles['customInput__icon']} />
				</CustomInput>
				{queryFilms.length > 0 && searchInput !== '' && (
					<SearchResults
						className={styles['search__results']}
						queryFilms={queryFilms}
						handleClick={handleFilmClick}
					/>
				)}
			</div>
			<button
				className={styles['search__btn']}
				onClick={() => setSearchModal(true)}
			>
				<SearchIcon className={styles['search__icon']} />
			</button>
		</div>
	)
}

export default Search
