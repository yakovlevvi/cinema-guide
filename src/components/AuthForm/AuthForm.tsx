import { FC, useState } from 'react'

import LogoIcon from '../Icons/LogoIcon/LogoIcon'
import LoginForm from '../LoginForm/LoginForm'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import CustomButton from '../UI/CustomButton/CustomButton'
import styles from './AuthForm.module.scss'

interface AuthFormProps {
	closeModal: () => void
}

const AuthForm: FC<AuthFormProps> = ({ closeModal }) => {
	const [registration, setRegistration] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)

	const toggleRegister = (register: boolean) => {
		return register ? setRegistration(false) : setRegistration(true)
	}

	return (
		<div className={styles['auth-form']}>
			<LogoIcon className={styles['auth-form__logo-icon']} />

			{registration ? (
				<RegistrationForm isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
			) : (
				<LoginForm closeModal={closeModal} />
			)}

			{isSuccess ? (
				<CustomButton
					onClick={() => {
						setIsSuccess(false)
						setRegistration(false)
					}}
				>
					Войти
				</CustomButton>
			) : (
				<button
					className={styles['auth-form__btn']}
					onClick={(e) => {
						e.preventDefault()
						toggleRegister(registration)
					}}
				>
					{registration === true ? 'У меня есть пароль' : 'Регистрация'}
				</button>
			)}
		</div>
	)
}

export default AuthForm
