import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchFavorites, removeFromFavorites } from '../../api/Favorites'
import { queryClient } from '../../api/queryClient'
import FilmCard from '../FilmCard/FilmCard'
import Loader from '../UI/Loader/Loader'

import { FC } from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from '../Icons/CloseIcon/CloseIcon'
import styles from './FavoritesList.module.scss'

const FavoritesList: FC = () => {
	const favoritesQuery = useQuery(
		{
			queryFn: fetchFavorites,
			queryKey: ['favorites'],
		},
		queryClient
	)

	const DeleteFavoriteMutation = useMutation(
		{
			mutationFn: (id: string) => removeFromFavorites(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['favorites'] })
			},
		},
		queryClient
	)

	switch (favoritesQuery.status) {
		case 'pending':
			return <Loader />

		case 'error':
			return <span>{favoritesQuery.error.message}</span>
		case 'success':
			return (
				<div className={styles['favorites']}>
					{favoritesQuery.data.map((film) => (
						<Link key={film.id} to={`/movie/${film.id}`}>
							<div className={styles['favorites__del-wrap']}>
								<FilmCard film={film} />
								<button
									className={styles['favorites__del-btn']}
									onClick={(e) => {
										e.preventDefault()
										DeleteFavoriteMutation.mutate(JSON.stringify(film.id))
									}}
									aria-label="Удаление фильма"
								>
									<CloseIcon />
								</button>
							</div>
						</Link>
					))}
				</div>
			)
	}
}

export default FavoritesList
