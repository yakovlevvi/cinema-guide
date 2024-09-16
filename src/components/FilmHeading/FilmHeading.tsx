import { FC } from 'react'
import { Film } from '../../api/Film'
import { getTimeString } from '../../utils/time'
import StarIcon from '../Icons/StarIcon/StarIcon'
import styles from './FilmHeading.module.scss'

interface FilmHeadingProps {
	film: Film
	search: boolean
}

const FilmHeading: FC<FilmHeadingProps> = ({ film, search }) => {
	let ratingClasses = styles.heading__rating

	if (film.tmdbRating > 8) {
		ratingClasses += ` ${styles['heading__rating--gold']}`
	} else if (film.tmdbRating > 7) {
		ratingClasses += ` ${styles['heading__rating--green']}`
	} else if (film.tmdbRating > 6) {
		ratingClasses += ` ${styles['heading__rating--silver']}`
	}

	const headingStyles = [styles.heading]

	if (search) {
		headingStyles.push(styles['heading--search'])
	}

	return (
		<div className={headingStyles.join(' ')}>
			{film.tmdbRating > 0 && (
				<span className={ratingClasses}>
					<StarIcon />
					<span className={styles.heading__ratingText}>
						{film.tmdbRating.toFixed(1)}
					</span>
				</span>
			)}
			<span className={styles.heading__info}>{film.releaseYear}</span>
			{film.genres && (
				<span className={styles.heading__info}>{film.genres.join(', ')}</span>
			)}
			<span className={styles.heading__info}>
				{getTimeString(film.runtime)}
			</span>
		</div>
	)
}

export default FilmHeading
