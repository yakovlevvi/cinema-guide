import { z } from 'zod'
import { BASE_URL } from './BASE_URL'
import { validateResponse } from './validateResponse'

export const UserSchema = z.object({
	name: z.string(),
	surname: z.string(),
	email: z.string(),
	favorites: z.array(z.string()),
})

export type User = z.infer<typeof UserSchema>

export interface RegisterUserProps {
	email: string
	password: string
	name: string
	surname: string
}

export function registerUser({
	email,
	password,
	name,
	surname,
}: RegisterUserProps): Promise<void> {
	return fetch(BASE_URL + '/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
			name,
			surname,
		}),
	})
		.then(validateResponse)
		.then(() => undefined)
}

export type LoginUserProps = {
	email: string
	password: string
}

export function login({ email, password }: LoginUserProps): Promise<void> {
	return fetch(BASE_URL + '/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
		credentials: 'include',
	})
		.then(validateResponse)
		.then(() => undefined)
}

export const LogoutSchema = z.object({
	result: z.boolean(),
})

export type LogoutResult = z.infer<typeof LogoutSchema>

export async function logout(): Promise<LogoutResult> {
	const response = await fetch(BASE_URL + '/auth/logout', {
		credentials: 'include',
	})
	const data = await response.json()
	return LogoutSchema.parse(data)
}

export async function fetchUser(): Promise<User> {
	const response = await fetch(BASE_URL + '/profile', {
		credentials: 'include',
	})
	const data = await response.json()
	return UserSchema.parse(data)
}
