import { FC, useState } from 'react'
import AccountSettings from '../../components/AccountSettings/AccountSettings'
import FavoritesList from '../../components/FavoritesList/FavoritesList'
import LikeIcon from '../../components/Icons/LikeIcon/LikeIcon'
import UserIcon from '../../components/Icons/UserIcon/UserIcon'
import styles from './Account.module.scss'

const AccountPage: FC = () => {
	const [isSettings, setIsSettings] = useState<boolean>(false)

	return (
		<div className={styles['account']}>
			<div className="container">
				<h1 className={styles['account__title']}>Мой аккаунт</h1>
				<div className={styles['account__menu']}>
					<button
						className={[
							styles['account__menu-btn'],
							isSettings ? '' : styles['account__menu-btn--active'],
						].join(' ')}
						onClick={() => setIsSettings(false)}
					>
						<LikeIcon />
						<span className={styles['account__menu-big-text']}>
							Избранные фильмы
						</span>
						<span className={styles['account__menu-small-text']}>
							Избранное
						</span>
					</button>
					<button
						className={[
							styles['account__menu-btn'],
							isSettings ? styles['account__menu-btn--active'] : '',
						].join(' ')}
						onClick={() => setIsSettings(true)}
					>
						<UserIcon />
						<span className={styles['account__menu-big-text']}>
							Настройки аккаунта
						</span>
						<span className={styles['account__menu-small-text']}>
							Настройки
						</span>
					</button>
				</div>
				{isSettings ? <AccountSettings /> : <FavoritesList />}
			</div>
		</div>
	)
}

export default AccountPage
