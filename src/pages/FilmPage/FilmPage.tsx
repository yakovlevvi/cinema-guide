import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFilm } from '../../api/Film'
import { queryClient } from '../../api/queryClient'
import FilmInfo from '../../components/FilmInfo/FilmInfo'
import Hero from '../../components/Hero/Hero'
import FetchError from '../../components/UI/FetchError/FetchError'
import Loader from '../../components/UI/Loader/Loader'

const FilmPage: FC = () => {
	const { filmId } = useParams<{ filmId: string }>()

	const FilmQuery = useQuery(
		{
			queryFn: () => fetchFilm(filmId ? filmId : 'error'),
			queryKey: ['film', filmId],
		},
		queryClient
	)

	switch (FilmQuery.status) {
		case 'pending':
			return <Loader />

		case 'error':
			return <FetchError refetch={() => FilmQuery.refetch()} />

		case 'success':
			return (
				<>
					<Hero
						film={FilmQuery.data}
						refetch={() => FilmQuery.refetch()}
						isRandomFilm={false}
					/>
					<FilmInfo film={FilmQuery.data} />
				</>
			)
	}
}

export default FilmPage
