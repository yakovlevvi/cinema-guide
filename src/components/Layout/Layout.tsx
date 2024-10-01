import { FC, ReactNode } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

interface LayoutProps {
	children?: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="layout">
			<Header />
			<div className="main">{children}</div>
			<Footer />
		</div>
	)
}

export default Layout
