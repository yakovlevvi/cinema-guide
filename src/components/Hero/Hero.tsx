import { useMutation } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToFavorites, removeFromFavorites } from '../../api/Favorites'
import { Film } from '../../api/Film'
import { queryClient } from '../../api/queryClient'
import { User } from '../../api/User'
import btnStyles from '../../components/UI/CustomButton/CustomButton.module.scss'
import { RootState, useAppDispatch } from '../../store'
import { checkAuth } from '../../store/authSlice'
import AuthForm from '../AuthForm/AuthForm'
import FilmHeading from '../FilmHeading/FilmHeading'
import LikeIcon from '../Icons/LikeIcon/LikeIcon'
import RefreshIcon from '../Icons/RefreshIcon/RefreshIcon'
import Trailer from '../Trailer/Trailer'
import CustomButton from '../UI/CustomButton/CustomButton'
import CustomImage from '../UI/CustomImage/CustomImage'
import Modal from '../UI/Modal/Modal'
import styles from './Hero.module.scss'

interface HeroProps {
	film: Film
	refetch: () => void
	isRandomFilm: boolean
}

const Hero: FC<HeroProps> = ({ film, refetch, isRandomFilm }) => {
	const [trailerModal, setTrailerModal] = useState<boolean>(false)
	const [inFavorites, setInFavorites] = useState<boolean>(false)
	const [authModal, setAuthModal] = useState<boolean>(false)

	const favoritesMutation = useMutation(
		{
			mutationFn: (id: string) => addToFavorites(id),
			onSuccess: () => {
				setInFavorites(true)
				queryClient.invalidateQueries({ queryKey: ['favorites'] })
				dispatch(checkAuth())
			},
		},
		queryClient
	)

	const deleteFromFavoritesMutation = useMutation(
		{
			mutationFn: (id: string) => removeFromFavorites(id),
			onSuccess: () => {
				setInFavorites(false)
				queryClient.invalidateQueries({ queryKey: ['favorites'] })
				dispatch(checkAuth())
			},
		},
		queryClient
	)

	const dispatch = useAppDispatch()

	const authUser: User | null = useSelector(
		(state: RootState) => state.auth.user
	)

	useEffect(() => {
		if (authUser?.favorites.includes(JSON.stringify(film.id))) {
			setInFavorites(true)
		}
	}, [film.id, authUser?.favorites])

	return (
		<div className={styles.hero}>
			<div className={styles.hero__imgBlock}>
				{film.backdropUrl ? (
					<CustomImage
						className={styles.hero__img}
						width={900}
						height={680}
						src={film.backdropUrl}
						alt={film.title}
					/>
				) : film.posterUrl ? (
					<CustomImage
						className={styles.hero__img}
						width={900}
						height={680}
						src={film.posterUrl}
						alt={film.title}
					/>
				) : (
					<span className={styles.hero__imgText}>{film.title}</span>
				)}
			</div>
			<div className="container">
				<div className={styles.hero__wrapper}>
					<div className={styles['hero__info']}>
						<FilmHeading film={film} search={false} />
						<h2 className={styles.hero__title}>{film.title}</h2>
						{film.plot &&
							(isRandomFilm ? (
								<p
									className={`${styles['hero__description']} ${styles['hero__description--cut']}`}
								>
									{film.plot}
								</p>
							) : (
								<p className={`${styles['hero__description']}`}>{film.plot}</p>
							))}
					</div>
					<div
						className={styles.hero__btns}
						style={{ flexWrap: isRandomFilm ? 'wrap' : 'nowrap' }}
					>
						<CustomButton
							primary={true}
							wide={!isRandomFilm}
							onClick={() => setTrailerModal(true)}
						>
							Трейлер
						</CustomButton>
						<div className={styles['hero__btn-wrap']}>
							{isRandomFilm && (
								<Link className={btnStyles.btn} to={`movie/${film.id}`}>
									О фильме
								</Link>
							)}
							{inFavorites ? (
								<CustomButton
									className={btnStyles['btn--icon']}
									onClick={() => {
										deleteFromFavoritesMutation.mutate(film.id.toString())
									}}
								>
									<LikeIcon fill="#B4A9FF" />
								</CustomButton>
							) : (
								<CustomButton
									className={btnStyles['btn--icon']}
									onClick={() => {
										if (authUser) {
											favoritesMutation.mutate(JSON.stringify(film.id))
										} else {
											setAuthModal(true)
										}
									}}
								>
									<LikeIcon stroke="#fff" />
								</CustomButton>
							)}
							{isRandomFilm && (
								<CustomButton
									className={btnStyles['btn--icon']}
									onClick={() => {
										setInFavorites(false)
										refetch()
									}}
								>
									<RefreshIcon />
								</CustomButton>
							)}
						</div>
					</div>
					{film.trailerUrl && (
						<Modal isVisible={trailerModal} setIsVisible={setTrailerModal}>
							<Trailer film={film} isVisible={trailerModal} />
						</Modal>
					)}
					<Modal
						isVisible={authModal}
						setIsVisible={(isVisible) => setAuthModal(isVisible)}
					>
						<AuthForm closeModal={() => setAuthModal(false)} />
					</Modal>
				</div>
			</div>
		</div>
	)
}

export default Hero
