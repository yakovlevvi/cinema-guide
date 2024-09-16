import { useState } from 'react'
import Loader from '../Loader/Loader'

const CustomImage = ({ ...props }) => {
	const [isLoaded, setIsLoaded] = useState(false)
	return (
		<>
			{!isLoaded && <Loader />}
			<img
				{...props}
				style={{ display: isLoaded ? 'block' : 'none' }}
				onLoad={() => setIsLoaded(true)}
			/>
		</>
	)
}

export default CustomImage
