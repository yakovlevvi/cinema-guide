import { FC } from 'react'
import { Film } from '../../api/Film'
import CustomImage from '../UI/CustomImage/CustomImage'
import styles from './FilmCard.module.scss'

interface FilmCardProps {
	film: Film
}

const FilmCard: FC<FilmCardProps> = ({ film }) => {
	return (
		<div className={styles.filmCard}>
			<div className={styles['filmCard__img-wrap']}>
				{film.posterUrl ? (
					<CustomImage
						className={styles.filmCard__img}
						src={film.posterUrl}
						width={224}
						height={336}
						alt={film.title}
					/>
				) : (
					<span className={styles.filmCard__imgText}>{film.title}</span>
				)}
			</div>
		</div>
	)
}

export default FilmCard
