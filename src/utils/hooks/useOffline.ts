import { useCallback, useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const defaultInterval = 5000
const defaultUrl = '/api/healthcheck'

type PingOptions = {
	url?: string,
	timeout?: number,
}

const ping = (options?: PingOptions) => new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest()
	const { url, timeout } = { url: defaultUrl, timeout: 5000, ...options }

	xhr.addEventListener('error', reject)
	xhr.ontimeout = reject
	xhr.onreadystatechange = () => {
		if (xhr.readyState === xhr.HEADERS_RECEIVED) {
			if (xhr.status) {
				resolve()
			} else {
				reject()
			}
		}
	}

	xhr.open('HEAD', url)
	xhr.timeout = timeout
	xhr.send()
})

type PollingOptions = PingOptions & { interval?: number | false } | boolean

/**
 * Returns `true` if network is unavailable
 *
 * It is using `polling` fallback by default, unless called with `{ polling: false }`.
 * If you would like to only check polling on first render, use `{ polling: { interval: false } }`
 */
const useOffline = (
	options?: { polling?: PollingOptions }
): boolean => {
	const [isOffline, setIsOffline] = useState<boolean>(false)
	const setOnline = () => setIsOffline(false)
	const setOffline = () => setIsOffline(true)
	const poll = useCallback(() => {
		const pingOptions: PingOptions = {}
		if (typeof options?.polling === 'object' && options?.polling?.url) pingOptions.url = options.polling.url
		if (typeof options?.polling === 'object' && options?.polling?.timeout) pingOptions.timeout = options.polling.timeout
		ping(pingOptions).then(setOnline).catch(setOffline)
	}, [options])

	useEffect(() => {
		if (!isBrowser) return () => {}

		window.addEventListener('online', setOnline)
		window.addEventListener('offline', setOffline)

		return () => {
			window.removeEventListener('online', setOnline)
			window.removeEventListener('offline', setOffline)
		}
	}, [])

	useEffect(() => {
		const polling = options?.polling
		if (!isBrowser || polling === false) return () => {}
		poll()

		const interval = typeof polling === 'object' ? polling.interval : undefined
		if (interval === false) return () => {}

		const intervalId = setInterval(poll, interval !== undefined ? interval : defaultInterval)

		return () => {
			clearInterval(intervalId)
		}
	}, [poll, options?.polling])

	return isBrowser && isOffline
}

export default useOffline
