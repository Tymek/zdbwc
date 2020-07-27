/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react'
import { register, unregister, ShowUpdateNotificationCallback } from 'service/client'
import { listenTo } from 'service/updateEvent'
import useAsyncEffect from 'utils/hooks/useAsyncEffect'
import useUpdateNotification from './Notifications/components/Update/useUpdateNotification'

const updateCheckInterval = process.env.DEBUG ? 6e3 : 30e3

const formatMessage = (version?: string | number, currentVersion?: string | number, isRecurring?: boolean) => `${
	version
		? `Wersja ${version}`
		: 'Nowa wersja'
} jest dostępna.${
	(isRecurring && currentVersion)
		?	` Korzystasz z wersji ${currentVersion}.`
		: ''
} Zaktualizować teraz?`

const createOnUpdate = (setNotification: (message?: string) => void): ShowUpdateNotificationCallback =>
	(version, currentVersion, isRecurring) => {
		if (version && currentVersion && version === currentVersion) return

		setNotification(formatMessage(version, currentVersion, isRecurring))

		listenTo('update', () => {
			setNotification()
		})
	}

const ServiceWorker: React.FC = () => {
	const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout>()
	const updateNotification = useUpdateNotification()
	const onUpdate = createOnUpdate(updateNotification)

	useAsyncEffect(async () => {
		if (process.env.NODE_ENV !== 'production') {
			void unregister()
			return
		}

		const wb = await register(onUpdate)

		// start update check interval
		if (updateInterval) clearInterval(updateInterval)
		setUpdateInterval(setInterval(() => {
			void wb.update()
		}, updateCheckInterval))
	})

	// cleanup: stop update check interval
	useEffect(() => () => {
		if (updateInterval) {
			clearInterval(updateInterval)
		}
	}, [updateInterval])

	return null
}

export default ServiceWorker
