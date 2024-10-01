import { useQuery } from '@tanstack/react-query'
import { fetchRandomFilm } from '../../api/Film'
import { queryClient } from '../../api/queryClient'
import FetchError from '../UI/FetchError/FetchError'
import Loader from '../UI/Loader/Loader'
import Hero from './Hero'
import { FC } from 'react'

const FetchHero: FC = () => {
	const randomFilmQuery = useQuery(
		{
			queryFn: () => fetchRandomFilm(),
			queryKey: ['random'],
		},
		queryClient
	)
	switch (randomFilmQuery.status) {
		case 'pending':
			return <Loader />

		case 'success':
			return (
				<Hero
					film={randomFilmQuery.data}
					refetch={() => {
						randomFilmQuery.refetch()
					}}
					isRandomFilm={true}
				/>
			)

		case 'error':
			return <FetchError refetch={() => randomFilmQuery.refetch()} />
	}
}

export default FetchHero
