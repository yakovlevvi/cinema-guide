import { FC } from 'react'
import { Film } from '../../api/Film'
import FilmHeading from '../FilmHeading/FilmHeading'
import CustomImage from '../UI/CustomImage/CustomImage'

import styles from './SearchFilmCard.module.scss'

interface SearchFilmCardProps {
	film: Film
}

const SearchFilmCard: FC<SearchFilmCardProps> = ({ film }) => {
	return (
		<div className={styles['search-film']}>
			<div className={styles['search-film__img-wrap']}>
				{film.posterUrl ? (
					<CustomImage
						className={styles['search-film__img']}
						src={film.posterUrl}
						alt={film.title}
						width={40}
						height={52}
					/>
				) : (
					<span className={styles['search-film__img-text']}>
						{film.title[0]}
					</span>
				)}
			</div>
			<div className={styles['search-film__info']}>
				<FilmHeading film={film} search={true} />
				<span className={styles['search-film__title']}>{film.title}</span>
			</div>
		</div>
	)
}

export default SearchFilmCard
