import { FC, MouseEventHandler } from 'react'
import CustomButton from '../CustomButton/CustomButton'
import styles from './FetchError.module.scss'

interface FetchErrorProps {
	refetch: MouseEventHandler<HTMLButtonElement> | undefined
}

const FetchError: FC<FetchErrorProps> = ({ refetch }) => {
	return (
		<div className={styles.error}>
			<span>Ошибка</span>
			<CustomButton onClick={refetch}>Повторить запрос</CustomButton>
		</div>
	)
}

export default FetchError
