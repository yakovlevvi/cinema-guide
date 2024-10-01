import { FC, ReactNode } from 'react'
import CustomButton from '../CustomButton/CustomButton'

import CloseIcon from '../../Icons/CloseIcon/CloseIcon'
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
		<div className={classes.join(' ')} onClick={() => setIsVisible(false)}>
			<div className={styles.modal__wrap} onClick={(e) => e.stopPropagation()}>
				<CustomButton
					className={styles['modal__close-btn']}
					onClick={() => setIsVisible(false)}
				>
					<CloseIcon />
				</CustomButton>
				{children}
			</div>
		</div>
	)
}

export default Modal
