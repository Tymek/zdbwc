import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAsyncEffect = (func: () => Promise<void>, deps?: any | undefined): void => {
	useEffect(() => {
		try {
			void func()
		} catch (error) {
			if (process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true') {
				console.error(error) // eslint-disable-line no-console
			}
		}
	}, [func, deps])
}

export default useAsyncEffect
