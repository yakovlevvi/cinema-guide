import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { fetchGenres } from '../../api/Film'
import { queryClient } from '../../api/queryClient'
import FetchError from '../UI/FetchError/FetchError'
import Loader from '../UI/Loader/Loader'
import Genres from './Genres'

const FetchGenres: FC = () => {
	const genresQuery = useQuery(
		{
			queryFn: () => fetchGenres(),
			queryKey: ['genres'],
		},
		queryClient
	)

	switch (genresQuery.status) {
		case 'pending':
			return <Loader />

		case 'success':
			return <Genres genres={genresQuery.data} />

		case 'error':
			return <FetchError refetch={() => genresQuery.refetch()} />
	}
}

export default FetchGenres
