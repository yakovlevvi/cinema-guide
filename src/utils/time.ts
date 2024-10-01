export function getTimeString(number: number) {
	const hoursNum = Math.floor(number / 60)
	const minutesNum = number % 60

	return `${hoursNum} ч ${minutesNum} мин`
}

getTimeString(81)
