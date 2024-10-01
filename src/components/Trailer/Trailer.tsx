import { FC, useEffect, useState } from 'react'
import { Film } from '../../api/Film'

import styles from './Trailer.module.scss'

interface TrailerProps {
	film: Film
	isVisible: boolean
}

const Trailer: FC<TrailerProps> = ({ film, isVisible }) => {
	const [trailerSrc, setTrailerSrc] = useState<string>('')

	const getTrailerId = (film: Film) => {
		return film.trailerUrl?.split('?v=')[1]
	}

	useEffect(() => {
		if (isVisible) {
			setTrailerSrc(
				`https://www.youtube.com/embed/${getTrailerId(film)}?autoplay=1`
			)
		} else {
			setTrailerSrc('')
		}
	}, [isVisible, film])

	return (
		<iframe
			className={styles['trailer']}
			src={trailerSrc}
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		/>
	)
}

export default Trailer
