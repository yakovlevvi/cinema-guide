import { FC, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { Film } from '../../api/Film'
import btnStyles from '../../components/UI/CustomButton/CustomButton.module.scss'
import FilmHeading from '../FilmHeading/FilmHeading'
import LikeIcon from '../Icons/LikeIcon/LikeIcon'
import RefreshIcon from '../Icons/RefreshIcon/RefreshIcon'
import CustomButton from '../UI/CustomButton/CustomButton'
import CustomImage from '../UI/CustomImage/CustomImage'
import styles from './Hero.module.scss'

interface HeroProps {
	film: Film
	refetch: MouseEventHandler<HTMLButtonElement> | undefined
	isRandomFilm: boolean
}

const Hero: FC<HeroProps> = ({ film, refetch, isRandomFilm }) => {
	return (
		<section className={styles.hero}>
			<div className={styles.hero__imgBlock}>
				{film.backdropUrl ? (
					<CustomImage
						className={styles.hero__img}
						width={900}
						height={680}
						src={film.backdropUrl}
						alt={film.title}
					/>
				) : (
					<span className={styles.hero__imgText}>{film.title}</span>
				)}
			</div>
			<div className="container">
				<div className={styles.hero__wrapper}>
					<div className={styles['hero__info']}>
						<FilmHeading film={film} search={false}/>
						<h2 className={styles.hero__title}>{film.title}</h2>
						{film.plot && (
							<p className={styles.hero__description}>
								{isRandomFilm ? film.plot.split('. ')[0] + '...' : film.plot}
							</p>
						)}
					</div>
					<div
						className={styles.hero__btns}
						style={{ flexWrap: isRandomFilm ? 'wrap' : 'nowrap' }}
					>
						<CustomButton primary={true} wide={!isRandomFilm}>
							Трейлер
						</CustomButton>
						<div className={styles['hero__btn-wrap']}>
							{isRandomFilm && (
								<Link className={btnStyles.btn} to={`movie/${film.id}`}>
									О фильме
								</Link>
							)}
							<CustomButton className={btnStyles['btn--icon']}>
								<LikeIcon />
							</CustomButton>
							{isRandomFilm && (
								<CustomButton
									className={btnStyles['btn--icon']}
									onClick={refetch}
								>
									<RefreshIcon />
								</CustomButton>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
