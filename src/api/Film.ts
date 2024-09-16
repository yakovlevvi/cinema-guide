import { z } from 'zod'
import { genresURL, MovieURL, randomFilmURL, topFilmsURL } from '../utils/urls'

export const FilmSchema = z.object({
	id: z.number(),
	title: z.string(),
	originalTitle: z.string(),
	language: z.string(),
	releaseYear: z.number().nullable().optional(),
	releaseDate: z.string().nullable().optional(),
	genres: z.array(z.string()).nullable().optional(),
	plot: z.string().nullable().optional(),
	runtime: z.number(),
	budget: z.string().nullable().optional(),
	revenue: z.string().nullable().optional(),
	homepage: z.string().nullable().optional(),
	status: z.string().nullable().optional(),
	posterUrl: z.string().nullable().optional(),
	backdropUrl: z.string().nullable().optional(),
	trailerUrl: z.string().nullable().optional(),
	trailerYoutubeId: z.string().nullable().optional(),
	tmdbRating: z.number(),
	searchL: z.string().nullable().optional(),
	keywords: z.array(z.string()).optional(),
	countriesOfOrigin: z.array(z.string()).optional(),
	languages: z.array(z.string()).optional(),
	cast: z.array(z.string()).optional(),
	director: z.string().nullable().optional(),
	production: z.string().nullable().optional(),
	awardsSummary: z.string().nullable().optional(),
})

export type Film = z.infer<typeof FilmSchema>

export const FilmListSchema = z.array(FilmSchema)

export type FilmList = z.infer<typeof FilmListSchema>

export async function fetchTopFilms(): Promise<FilmList> {
	const response = await fetch(topFilmsURL)
	const data = await response.json()
	return FilmListSchema.parse(data)
}

export async function fetchRandomFilm(): Promise<Film> {
	const response = await fetch(randomFilmURL)
	const data = await response.json()
	return FilmSchema.parse(data)
}

export async function fetchGenres(): Promise<string[]> {
	const response = await fetch(genresURL)
	const data = await response.json()
	return data
}

export async function getGenrePhotoUrl(
	genre: string,
	number: number
): Promise<string> {
	const response = await fetch(MovieURL + `?count=20&genre=${genre}`)
	const data = await response.json()
	const posterUrl = data[number].posterUrl
	return posterUrl
}

export async function fetchGenreFilms(
	genre: string,
	page: number
): Promise<FilmList> {
	const response = await fetch(
		MovieURL + `?count=15&genre=${genre}&page=${page}`
	)
	const data = await response.json()
	return FilmListSchema.parse(data)
}

export async function fetchFilm(filmId: string): Promise<Film> {
	const response = await fetch(MovieURL + `/${filmId}`)
	const data = await response.json()
	return FilmSchema.parse(data)
}

export async function fetchFilteredFilms(str: string) {
	const response = await fetch(MovieURL + `?title=${str}`)
	const data = await response.json()
	return FilmListSchema.parse(data)
}