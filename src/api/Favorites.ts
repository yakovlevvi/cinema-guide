import { BASE_URL } from './BASE_URL'
import { FilmList, FilmListSchema } from './Film'

export async function fetchFavorites(): Promise<FilmList> {
	const response = await fetch(BASE_URL + '/favorites', {
		credentials: 'include',
	})
	const data = await response.json()
	return FilmListSchema.parse(data)
}

export async function addToFavorites(id: string): Promise<void> {
	await fetch(BASE_URL + '/favorites', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id,
		}),
		credentials: 'include',
	})
}

export async function removeFromFavorites(id: string): Promise<void> {
	await fetch(BASE_URL + `/favorites/${id}`, {
		method: 'DELETE',
		credentials: 'include',
	})
}
