import { FC, useRef } from 'react'

import { useQuery } from '@tanstack/react-query'
import { getGenrePhotoUrl } from '../../api/Film'
import { queryClient } from '../../api/queryClient'
import { capitalizeString } from '../../utils/capitalizeString'
import CustomImage from '../UI/CustomImage/CustomImage'
import styles from './GenreCard.module.scss'

interface GenreCardProps {
	genre: string
}

const GenreCard: FC<GenreCardProps> = ({ genre }) => {
	const randomNum = useRef(Math.round(Math.random() * 19))

	const { data: genrePhoto, isSuccess } = useQuery(
		{
			queryFn: () => getGenrePhotoUrl(genre, randomNum.current),
			queryKey: ['genrePhoto', genre],
		},
		queryClient
	)

	return (
		<div className={styles.genreCard}>
			{isSuccess && (
				<CustomImage
					className={styles['genreCard__img']}
					src={genrePhoto}
					alt={genre}
				/>
			)}
			<h2 className={styles.genreCard__name}>{capitalizeString(genre)}</h2>
		</div>
	)
}

export default GenreCard
