import { FC, HTMLAttributes } from 'react'

interface IconProps extends HTMLAttributes<SVGElement> {
	width: number
	height: number
	id: string
}

const Icon: FC<IconProps> = ({
	width = 24,
	height = 24,
	id,
	...props
}) => {
	return (
		<svg {...props} width={width} height={height} aria-hidden="true">
			<use xlinkHref={id}></use>
		</svg>
	)
}

export default Icon
