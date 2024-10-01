import { FC } from 'react'
import { useParams } from 'react-router-dom'
import GenreFilms from '../../components/GenreFilms/GenreFilms'

const GenreFilmsPage: FC = () => {
	const { genre } = useParams()

	if (genre) {
		return <GenreFilms genre={genre} />
	}
}

export default GenreFilmsPage
