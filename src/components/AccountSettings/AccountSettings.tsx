import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, User } from '../../api/User'
import { RootState } from '../../store'
import { logout as logoutAction } from '../../store/authSlice'
import CustomButton from '../UI/CustomButton/CustomButton'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { queryClient } from '../../api/queryClient'
import MailIcon from '../Icons/MailIcon/MailIcon'
import styles from './AccountSettings.module.scss'

const AccountSettings: FC = () => {
	const user: User | null = useSelector((state: RootState) => state.auth.user)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const logoutMutation = useMutation(
		{
			mutationFn: logout,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
				dispatch(logoutAction())
				navigate('/')
			},
		},
		queryClient
	)

	return (
		<div className={styles['settings']}>
			{user && (
				<div className={styles['settings__info']}>
					<div className={styles['settings__info-item']}>
						<div className={styles['settings__avatar']}>
							{user.name[0]}
							{user.surname[0]}
						</div>
						<div className={styles['settings__text-wrap']}>
							<span className={styles['settings__text']}>Имя Фамилия</span>
							<span className={styles['settings__value']}>
								{user.name} {user.surname}
							</span>
						</div>
					</div>
					<div className={styles['settings__info-item']}>
						<div className={styles['settings__avatar']}>
							<MailIcon />
						</div>
						<div className={styles['settings__text-wrap']}>
							<span className={styles['settings__text']}>
								Электронная почта
							</span>
							<span className={styles['settings__value']}>{user.email}</span>
						</div>
					</div>
				</div>
			)}
			<CustomButton
				className={styles['settings__btn']}
				onClick={() => {
					logoutMutation.mutate()
				}}
			>
				Выйти из аккаунта
			</CustomButton>
		</div>
	)
}

export default AccountSettings
