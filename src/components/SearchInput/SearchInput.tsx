import { FC } from 'react'
import SearchIcon from '../Icons/SearchIcon/SearchIcon'
import CustomInput from '../UI/CustomInput/CustomInput'
import iconStyles from '../UI/CustomInput/CustomInput.module.scss'

interface SearchInputProps {
	className: string
	handleInput: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
	searchInput: string
}

const SearchInput: FC<SearchInputProps> = ({ className, handleInput, searchInput }) => {
	return (
		<CustomInput
			className={className}
			type="search"
			isDark={true}
			placeholder="Поиск"
			onInput={handleInput}
			value={searchInput}
			onClick={(e) => e.stopPropagation()} // предотвращает закрытие модального окна при клике на поле ввода
		>
			<SearchIcon className={iconStyles.customInput__icon} />
		</CustomInput>
	)
}

export default SearchInput
