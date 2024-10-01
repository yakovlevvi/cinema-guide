import { FC, useState } from 'react'
import Loader from '../Loader/Loader'
import styles from './CustomImage.module.scss'

interface CustomImageProps {
	className?: string
	src?: string
	alt?: string
	width?: number
	height?: number
}

const CustomImage: FC<CustomImageProps> = ({ className, ...props }) => {
	const [isLoaded, setIsLoaded] = useState(false)

	const imgClasses = [styles['img']]

	if (className) {
		imgClasses.push(className)
	}

	if (isLoaded) {
		imgClasses.push(styles['img--active'])
	}

	return (
		<>
			{!isLoaded && <Loader />}
			<img
				className={imgClasses.join(' ')}
				onLoad={() => setIsLoaded(true)}
				{...props}
			/>
		</>
	)
}

export default CustomImage
