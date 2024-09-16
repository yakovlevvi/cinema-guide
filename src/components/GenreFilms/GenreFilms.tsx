import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { fetchGenreFilms, FilmList } from '../../api/Film'
import { queryClient } from '../../api/queryClient'
import FetchError from '../UI/FetchError/FetchError'
import Loader from '../UI/Loader/Loader'

import { Link } from 'react-router-dom'
import { capitalizeString } from '../../utils/capitalizeString'
import FilmCard from '../FilmCard/FilmCard'
import ChevronIcon from '../Icons/ChevronIcon/ChevronIcon'
import CustomButton from '../UI/CustomButton/CustomButton'
import './GenreFilms.scss'

interface GenreFilmsProps {
	genre: string
}

const GenreFilms: FC<GenreFilmsProps> = ({ genre }) => {
	const [page, setPage] = useState(1)
	const [films, setFilms] = useState<FilmList>([])
	const [isPaginated, setIsPaginated] = useState(true)

	const genreFilmsQuery = useQuery(
		{
			queryFn: async () => {
				const data = await fetchGenreFilms(genre, page)
				setFilms((films) => [...films, ...data])
				if (data.length < 15) {
					setIsPaginated(false)
				}
				return data
			},
			queryKey: ['films', genre, page],
			placeholderData: keepPreviousData,
		},
		queryClient
	)

	switch (genreFilmsQuery.status) {
		case 'pending':
			return <Loader />

		case 'error':
			return <FetchError refetch={() => genreFilmsQuery.refetch()} />
		case 'success':
			return (
				<section className="films">
					<div className="container">
						<div className="films__heading">
							<Link className="films__nav-link" to="/genres">
								<ChevronIcon className="films__nav-icon" />
							</Link>{' '}
							<h1 className="films__title">{capitalizeString(genre)}</h1>
						</div>
						<ul className="films__list">
							{films.map((film) => (
								<li className="films__item" key={film.id}>
									<Link to={`/movie/${film.id}`}>
										<FilmCard film={film} />
									</Link>
								</li>
							))}
						</ul>
						{isPaginated && (
							<CustomButton
								className="films__btn"
								onClick={() => setPage((page) => page + 1)}
							>
								Показать ещё
							</CustomButton>
						)}
					</div>
				</section>
			)
	}
}

export default GenreFilms
