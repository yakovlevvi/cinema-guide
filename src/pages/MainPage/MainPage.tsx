import { FC } from 'react'
import FetchHero from '../../components/Hero/FetchHero'
import FetchTop from '../../components/Top/FetchTop'

const MainPage: FC = () => {
	return (
		<>
			<FetchHero />
			<FetchTop />
		</>
	)
}

export default MainPage
