import { useCallback, useRef } from 'react'

export default function useDebounce<T, Args extends unknown[]>(
	callback: (...args: Args) => Promise<T> | void,
	delay: number
) {
	const timer = useRef<number | null>(null)

	const debouncedCallback = useCallback(
		(...args: Args) => {
			if (timer.current) {
				clearTimeout(timer.current)
			}
			return new Promise<T | void>((resolve) => {
				timer.current = setTimeout(async () => {
					const result = await callback(...args)
					resolve(result)
				}, delay)
			})
		},
		[callback, delay]
	)

	return debouncedCallback
}
