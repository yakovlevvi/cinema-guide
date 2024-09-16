import { FC, ReactNode } from 'react'
import CustomButton from '../CustomButton/CustomButton'

import CloseIcon from '../../Icons/CloseIcon/CloseIcon'
import LogoIcon from '../../Icons/LogoIcon/LogoIcon'
import styles from './Modal.module.scss'

interface ModalProps {
	children: ReactNode
	isVisible: boolean
	setIsVisible: (isVisible: boolean) => void
}

const Modal: FC<ModalProps> = ({ children, isVisible, setIsVisible }) => {
	const classes = [styles.modal]

	if (isVisible) {
		classes.push(styles['modal--active'])
	}

	return (
		<div className={classes.join(' ')}>
			<div className={styles.modal__wrap}>
				<div className={styles.modal__inner}>
					<LogoIcon className={styles['modal__logo-icon']} />
					<CustomButton
						className={styles['modal__close-btn']}
						onClick={() => setIsVisible(false)}
					>
						<CloseIcon />
					</CustomButton>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal
