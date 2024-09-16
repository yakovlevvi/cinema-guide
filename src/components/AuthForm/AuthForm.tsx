import MailIcon from '../Icons/MailIcon/MailIcon'
import CustomInput from '../UI/CustomInput/CustomInput'

import { useState } from 'react'
import KeyIcon from '../Icons/KeyIcon/KeyIcon'
import CustomButton from '../UI/CustomButton/CustomButton'
import iconStyles from '../UI/CustomInput/CustomInput.module.scss'

import UserIcon from '../Icons/UserIcon/UserIcon'
import styles from './AuthForm.module.scss'

const AuthForm = () => {
	const [register, setRegister] = useState(false)

	const handleRegister = (register: boolean) => {
		return register === false ? setRegister(true) : setRegister(false)
	}

	return (
		<form className={styles['auth-form']}>
			{register && (
				<span className={styles['auth-form__text']}>Регистрация</span>
			)}
			<div className={styles['auth-form__wrap']}>
				<CustomInput isDark={false} placeholder="Электронная почта">
					<MailIcon className={iconStyles.customInput__icon} />
				</CustomInput>
				{register && (
					<CustomInput isDark={false} placeholder="Имя">
						<UserIcon className={iconStyles.customInput__icon} />
					</CustomInput>
				)}
				{register && (
					<CustomInput isDark={false} placeholder="Фамилия">
						<UserIcon className={iconStyles.customInput__icon} />
					</CustomInput>
				)}
				<CustomInput isDark={false} placeholder="Пароль">
					<KeyIcon className={iconStyles.customInput__icon} />
				</CustomInput>
				{register && (
					<CustomInput isDark={false} placeholder="Подтвердите пароль">
						<KeyIcon className={iconStyles.customInput__icon} />
					</CustomInput>
				)}
			</div>
			<CustomButton>
				{register === true ? 'Создать аккаунт' : 'Войти'}
			</CustomButton>
			<button
				className={styles['auth-form__btn']}
				onClick={(e) => {
					e.preventDefault()
					handleRegister(register)
				}}
			>
				{register === true ? 'У меня есть пароль' : 'Регистрация'}
			</button>
		</form>
	)
}

export default AuthForm
