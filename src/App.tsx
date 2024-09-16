import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import GenreFilmsPage from './pages/GenreFilmsPage/GenreFilmsPage'
import GenresPage from './pages/Genres/GenresPage'
import MainPage from './pages/MainPage/MainPage'
import FilmPage from './pages/FilmPage/FilmPage'

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="" element={<MainPage />} />
					<Route path="/genres" element={<GenresPage />} />
					<Route path="/genres/:genre" element={<GenreFilmsPage />} />
					<Route path="/movie/:filmId" element={<FilmPage />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

export default App
