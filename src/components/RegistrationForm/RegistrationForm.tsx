import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { registerUser } from '../../api/User'
import { queryClient } from '../../api/queryClient'
import KeyIcon from '../Icons/KeyIcon/KeyIcon'
import MailIcon from '../Icons/MailIcon/MailIcon'
import UserIcon from '../Icons/UserIcon/UserIcon'
import CustomButton from '../UI/CustomButton/CustomButton'
import CustomInput from '../UI/CustomInput/CustomInput'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../AuthForm/AuthForm.module.scss'
import iconStyles from '../UI/CustomInput/CustomInput.module.scss'

const RegisterSchema = z
	.object({
		email: z.string().email('Некорректный email'),
		name: z.string().min(5, 'Имя должно содержать минимум 5 символов'),
		surname: z.string().min(5, 'Фамилия должна содержать минимум 5 символов'),
		password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
		confirmPassword: z
			.string()
			.min(6, 'Пароль должен содержать минимум 6 символов'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

type RegisterForm = z.infer<typeof RegisterSchema>

interface RegistrationFormProps {
	isSuccess: boolean
	setIsSuccess: (isSuccess: boolean) => void
}

const RegistrationForm: FC<RegistrationFormProps> = ({
	isSuccess,
	setIsSuccess,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>({
		resolver: zodResolver(RegisterSchema),
	})

	const registerMutation = useMutation(
		{
			mutationFn: registerUser,
			onSuccess: () => {
				setIsSuccess(true)
			},
		},
		queryClient
	)

	if (isSuccess) {
		return (
			<div className={styles['auth-form__wrap']}>
				<span className={styles['auth-form__text']}>Регистрация завершена</span>
				<p className={styles['auth-form__description']}>
					Используйте вашу электронную почту для входа
				</p>
			</div>
		)
	}

	return (
		<form
			className={styles['auth-form__wrap']}
			onSubmit={handleSubmit(({ email, name, surname, password }) => {
				registerMutation.mutate({ email, name, surname, password })
			})}
		>
			<span className={styles['auth-form__text']}>Регистрация</span>
			<div className={styles['auth-form__inner']}>
				<CustomInput
					isDark={false}
					placeholder="Электронная почта"
					type="email"
					required
					error={errors.email?.message}
					{...register('email')}
				>
					<MailIcon className={iconStyles.customInput__icon} />
				</CustomInput>

				<CustomInput
					isDark={false}
					placeholder="Имя"
					required
					error={errors.name?.message}
					{...register('name')}
				>
					<UserIcon className={iconStyles.customInput__icon} />
				</CustomInput>

				<CustomInput
					isDark={false}
					placeholder="Фамилия"
					required
					error={errors.surname?.message}
					{...register('surname')}
				>
					<UserIcon className={iconStyles.customInput__icon} />
				</CustomInput>

				<CustomInput
					isDark={false}
					placeholder="Пароль"
					type="password"
					required
					error={errors.password?.message}
					{...register('password')}
				>
					<KeyIcon className={iconStyles.customInput__icon} />
				</CustomInput>

				<CustomInput
					isDark={false}
					placeholder="Подтвердите пароль"
					type="password"
					required
					error={errors.confirmPassword?.message}
					{...register('confirmPassword')}
				>
					<KeyIcon className={iconStyles.customInput__icon} />
				</CustomInput>
			</div>
			<CustomButton>Создать аккаунт</CustomButton>

			{registerMutation.error && (
				<span>
					Ошибка запроса: {JSON.parse(registerMutation.error.message)['error']}
				</span>
			)}
		</form>
	)
}

export default RegistrationForm
