import { FC } from 'react'
import { Link } from 'react-router-dom'
import GenreCard from '../GenreCard/GenreCard'
import styles from './Genres.module.scss'

interface GenresProps {
	genres: string[]
}

const Genres: FC<GenresProps> = ({ genres }) => {
	return (
		<section className={styles.genres}>
			<div className="container">
				<h1 className={styles.genres__title}>Жанры фильмов</h1>
				<ul className={styles.genres__list}>
					{genres.map((genre) => (
						<li className={styles.genres__item} key={genre}>
							<Link to={`/genres/${genre}`}>
								<GenreCard genre={genre} />
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default Genres
