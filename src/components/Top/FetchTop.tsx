import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { fetchTopFilms } from '../../api/Film'
import { queryClient } from '../../api/queryClient'
import FetchError from '../UI/FetchError/FetchError'
import Loader from '../UI/Loader/Loader'
import Top from './Top'

const FetchTop: FC = () => {
	const topFilmsQuery = useQuery(
		{
			queryFn: () => fetchTopFilms(),
			queryKey: ['top'],
		},
		queryClient
	)

	switch (topFilmsQuery.status) {
		case 'pending':
			return <Loader />

		case 'success':
			return <Top topFilms={topFilmsQuery.data} />

		case 'error':
			return <FetchError refetch={() => topFilmsQuery.refetch()} />
	}
}

export default FetchTop
