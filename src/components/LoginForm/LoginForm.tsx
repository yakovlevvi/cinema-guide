import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { login } from '../../api/User'
import { queryClient } from '../../api/queryClient'
import KeyIcon from '../Icons/KeyIcon/KeyIcon'
import MailIcon from '../Icons/MailIcon/MailIcon'
import CustomButton from '../UI/CustomButton/CustomButton'
import CustomInput from '../UI/CustomInput/CustomInput'

import { FC } from 'react'
import { useAppDispatch } from '../../store'
import { checkAuth } from '../../store/authSlice'
import styles from '../AuthForm/AuthForm.module.scss'
import iconStyles from '../UI/CustomInput/CustomInput.module.scss'

const LoginSchema = z.object({
	email: z.string().email('Некорректный email'),
	password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
})

type LoginForm = z.infer<typeof LoginSchema>

interface LoginFormProps {
	closeModal: () => void
}

const LoginForm: FC<LoginFormProps> = ({ closeModal }) => {
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: zodResolver(LoginSchema),
	})

	const loginMutation = useMutation(
		{
			mutationFn: login,
			onSuccess: () => {
				dispatch(checkAuth())
				queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
				closeModal()
			},
		},
		queryClient
	)

	return (
		<form
			className={styles['auth-form__wrap']}
			onSubmit={handleSubmit(({ email, password }) => {
				loginMutation.mutate({ email, password })
			})}
		>
			<div className={styles['auth-form__inner']}>
				<CustomInput
					isDark={false}
					placeholder="Электронная почта"
					type="email"
					{...register('email')}
				>
					<MailIcon className={iconStyles.customInput__icon} />
				</CustomInput>
				{errors.email && <span>{errors.email.message}</span>}

				<CustomInput
					isDark={false}
					placeholder="Пароль"
					type="password"
					{...register('password')}
				>
					<KeyIcon className={iconStyles.customInput__icon} />
				</CustomInput>
				{errors.password && <span>{errors.password.message}</span>}
			</div>
			<CustomButton>Войти</CustomButton>
			{loginMutation.error && <span>Ошибка запроса</span>}
		</form>
	)
}

export default LoginForm
