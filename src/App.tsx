import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import FilmPage from './pages/FilmPage/FilmPage'
import GenreFilmsPage from './pages/GenreFilmsPage/GenreFilmsPage'
import GenresPage from './pages/GenresPage/GenresPage'
import MainPage from './pages/MainPage/MainPage'

import { Provider } from 'react-redux'
import AccountPage from './pages/AccountPage/AccountPage'
import store from './store'

function App() {


	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="" element={<MainPage />} />
						<Route path="/genres" element={<GenresPage />} />
						<Route path="/genres/:genre" element={<GenreFilmsPage />} />
						<Route path="/movie/:filmId" element={<FilmPage />} />
						<Route path="/account" element={<AccountPage />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</Provider>
	)
}

export default App
