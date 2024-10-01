import { FC } from 'react'
import Socials from '../Socials/Socials'
import styles from './Footer.module.scss'

const Footer: FC = () => {
	return (
		<div className={styles.footer}>
			<div className="container">
				<div className={styles.footer__wrapper}>
					<div className={styles.footer__info}>
						<span className={styles.footer__text}>
							LLC &laquo;Мультимедиа Визион&raquo;
						</span>
						<span className={styles.footer__copyright}>
							<svg
								className={styles['footer__copyright-icon']}
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M16.2877 9.42773C15.413 7.97351 13.8195 7 12 7C9.23999 7 7 9.23999 7 12C7 14.76 9.23999 17 12 17C13.8195 17 15.413 16.0265 16.2877 14.5723L14.5729 13.5442C14.0483 14.4166 13.0927 15 12 15C10.3425 15 9 13.6575 9 12C9 10.3425 10.3425 9 12 9C13.093 9 14.0491 9.58386 14.5735 10.4568L16.2877 9.42773ZM22 12C22 6.47998 17.52 2 12 2C6.47998 2 2 6.47998 2 12C2 17.52 6.47998 22 12 22C17.52 22 22 17.52 22 12ZM4 12C4 7.57996 7.57996 4 12 4C16.42 4 20 7.57996 20 12C20 16.42 16.42 20 12 20C7.57996 20 4 16.42 4 12Z"
									fill="currentColor"
								/>
							</svg>
							<span className={styles.footer__copyrightText}>
								Все права защищены{' '}
							</span>
						</span>
					</div>
					<Socials />
				</div>
			</div>
		</div>
	)
}

export default Footer
