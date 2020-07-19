import { useEffect, useState } from 'react'
import { register, unregister, OnUpdateCallback } from 'service/client'
import useAsyncEffect from 'utils/hooks/useAsyncEffect'

const updateCheckInterval = process.env.DEBUG ? 6e3 : 30e3

const reload = (status?: string) => {
	if (process.env.DEBUG === 'true') console.debug('update:', status) // eslint-disable-line no-console

	setTimeout(() => {
		// TODO: loading state?
		window.location.reload()
	}, 250)
}

const onUpdate: OnUpdateCallback = async (accept, version, currentVersion, isRecurring) => {
	if (version && currentVersion && version === currentVersion) return

	const message = `${
		version
			? `Wersja ${version}`
			: 'Nowa wersja'
	} jest dostępna.${
		(isRecurring && currentVersion)
			?	` Korzystasz z wersji ${currentVersion}.`
			: ''
	} Zaktualizować teraz?`

	// TODO: incorporate into notifications
	// eslint-disable-next-line no-alert, no-restricted-globals
	if (confirm(message)) {
		try {
			const status = await accept()

			reload(status)
		} catch (error) {
			if (process.env.DEBUG === 'true') console.error('update:', error) // eslint-disable-line no-console
		}
	}
}

const ServiceWorker: React.FC = () => {
	const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout>()

	useAsyncEffect(async () => {
		if (process.env.NODE_ENV !== 'production') {
			void unregister()
			return
		}

		const wb = await register(onUpdate)

		// start update check interval
		if (updateInterval) clearInterval(updateInterval)
		setUpdateInterval(setInterval(() => { void wb.update() }, updateCheckInterval))
	})

	// cleanup: stop update check interval
	useEffect(() => () => updateInterval && clearInterval(updateInterval), [updateInterval])

	return null
}

export default ServiceWorker
