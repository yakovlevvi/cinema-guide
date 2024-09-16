import { useParams } from 'react-router-dom'
import GenreFilms from '../../components/GenreFilms/GenreFilms'

const GenreFilmsPage = () => {
	const { genre } = useParams()

	if (genre) {
		return <GenreFilms genre={genre} />
	}
}

export default GenreFilmsPage
