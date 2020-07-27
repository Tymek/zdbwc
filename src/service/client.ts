import { Workbox, messageSW } from 'workbox-window'
import { WorkboxLifecycleWaitingEvent } from 'workbox-window/utils/WorkboxEvent'
import { trigger, listenTo } from './updateEvent'

const swUrl = '/sw.js'
const shouldRegister = (
	typeof window !== 'undefined'
	&& process.env.NODE_ENV !== 'development'
	&& 'serviceWorker' in navigator
)

type Version = string | number
type ServiceWorkerState = 'installing' | 'waiting' | 'active'

export type ShowUpdateNotificationCallback = (
	version?: Version,
	oldVersion?: Version,
	isRecurring?: boolean
) => void


const registerAfterWindowLoad = async (showUpdateNotification?: ShowUpdateNotificationCallback): Promise<Workbox> => {
	const wb = new Workbox(swUrl)
	let registration: ServiceWorkerRegistration | undefined

	const getSW = async (state: ServiceWorkerState): Promise<ServiceWorker | null> => {
		if (!registration) {
			registration = await navigator.serviceWorker.ready
		}

		return registration[state]
	}

	const getVersion = async (state: ServiceWorkerState): Promise<Version | undefined> => {
		const sw = await getSW(state)

		if (!sw) return undefined // eslint-disable-line unicorn/no-useless-undefined

		return (await messageSW(sw, { type: 'GET_VERSION' })) as Version
	}

	const sendMessage = async (state: ServiceWorkerState, type: string) => {
		const sw = await getSW(state)

		if (!sw) return undefined // eslint-disable-line unicorn/no-useless-undefined

		return messageSW(sw, { type })
	}

	listenTo('update', () => {
		setTimeout(() => {
			window.location.reload()
		}, 300)
	})

	listenTo('acceptUpdate', () => {
		wb.addEventListener('controlling', () => {
			trigger('update')
		})

		Promise.allSettled([
			sendMessage('waiting', 'SKIP_WAITING'),
			sendMessage('waiting', 'CLAIM'),
		]).then(async ([skipWaiting, claim]) => {
			if (!skipWaiting || !claim) {
				throw new Error(JSON.stringify({ skipWaiting, claim }))
			}

			const waitingVersion = await getVersion('waiting')
			const activeVersion = await getVersion('active')

			if (waitingVersion === undefined || waitingVersion === activeVersion) {
				return trigger('update')
			}

			throw new Error(JSON.stringify({
				message: 'update unsuccessful',
				waitingVersion,
				activeVersion,
			}))
		}).catch(error => {
			console.error(error) // eslint-disable-line no-console
		})
	})

	const onUpdateFound = async (event: WorkboxLifecycleWaitingEvent) => {
		const activeVersion = await getVersion('active')
		const waitingVersion = await getVersion('waiting')

		if (showUpdateNotification) {
			showUpdateNotification(waitingVersion, activeVersion, event?.wasWaitingBeforeRegister)
		} else {
			trigger('update')
		}
	}

	wb.addEventListener('waiting', onUpdateFound)

	// worker in other tab. @see https://cz3.ch/dev-workbox-externalwaiting
	wb.addEventListener('externalwaiting', onUpdateFound)

	wb.addEventListener('controlling', ({ isUpdate }) => {
		if (isUpdate) {
			trigger('update')
		}
	})

	registration = await wb.register()

	if (process.env.DEBUG === 'true') {
		console.debug('SW', await wb.messageSW({ type: 'GET_VERSION' })) // eslint-disable-line no-console
	}

	return wb
}

export const register = (showUpdateNotification?: ShowUpdateNotificationCallback): Promise<Workbox> => {
	if (!shouldRegister) return Promise.reject()

	return new Promise(resolve => {
		window.addEventListener('load', () => {
			resolve(registerAfterWindowLoad(showUpdateNotification))
		})
	})
}

export const unregister = async (): Promise<boolean> => {
	const registration = await navigator.serviceWorker.ready
	return registration.unregister()
}
