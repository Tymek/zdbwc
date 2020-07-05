import { useEffect, useState, useCallback } from 'react'

/**
 * @see https://usehooks.com/useMedia/
 */
function useMedia(
	queries: Array<string>,
	values: Array<string | number>,
	defaultValue: string | number
): string | number {
	const mediaQueryLists = queries.map(q => window.matchMedia(q))

	const getValue = useCallback(() => {
		const index = mediaQueryLists.findIndex(mql => mql.matches)
		return typeof values[index] !== 'undefined' ? values[index] : defaultValue
	}, [defaultValue, mediaQueryLists, values])

	const [value, setValue] = useState(getValue)

	useEffect(
		() => {
			const handler = () => setValue(getValue)
			mediaQueryLists.forEach(mql => mql.addEventListener('change', handler))
			return () => mediaQueryLists.forEach(mql => mql.removeEventListener('change', handler))
		},
		[mediaQueryLists, getValue]
	)

	return value
}

export default useMedia
