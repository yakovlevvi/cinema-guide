import { FC } from 'react'
import { FilmList } from '../../api/Film'
import SearchFilmCard from '../SearchFilmCard/SearchFilmCard'

import styles from './SearchResults.module.scss'

interface SearchResultProps {
	className: string
	queryFilms: FilmList
	handleClick: (id: number) => void
}
const SearchResults: FC<SearchResultProps> = ({
	className,
	queryFilms,
	handleClick,
}) => {
	const resultClasses = [styles['search-result'], className].join(' ')

	return (
		<ul className={resultClasses}>
			{queryFilms.map((film) => (
				<li
					key={film.id}
					className={styles['search-results__item']}
					onClick={() => handleClick(film.id)}
				>
					<SearchFilmCard film={film} />
				</li>
			))}
		</ul>
	)
}

export default SearchResults
