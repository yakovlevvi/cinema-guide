import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Film, FilmList } from '../../api/Film'
import FilmCard from '../FilmCard/FilmCard'
import styles from './Top.module.scss'

interface TopProps {
	topFilms: FilmList
}

const Top: FC<TopProps> = ({ topFilms }) => {
	return (
		<section className={styles.top}>
			<div className="container">
				<h2 className={styles.top__title}>Топ 10 фильмов</h2>
				<ul className={styles.top__list}>
					{topFilms.map((film: Film, index) => (
						<li className={styles.top__item} key={film.id}>
							<span className={styles.top__place}>{index + 1}</span>
							<Link to={`/movie/${film.id}`}>
								<FilmCard film={film} />
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default Top
