import { Workbox } from 'workbox-window'
import { WorkboxLifecycleWaitingEvent } from 'workbox-window/utils/WorkboxEvent'

const swUrl = '/sw.js'
const shouldRegister = (
	typeof window !== 'undefined'
	&& process.env.NODE_ENV !== 'development'
	&& 'serviceWorker' in navigator
)

type OnUpdateCallback = (onAccept: () => void, version: string | number, recurring?: boolean) => void

const registerServiceWorker = async (onUpdate: OnUpdateCallback): Promise<void> => {
	const wb = new Workbox(swUrl)
	wb.addEventListener('installed', event => {
		// if (!event.isUpdate) {
		// }
		console.log('installed', 'isUpdate', event.isUpdate)
	})
	wb.addEventListener('activated', event => {
		// if (!event.isUpdate) {
		// }
		console.log('activated', event)
		console.log(() => wb.update())
	})

	const update = async (event: WorkboxLifecycleWaitingEvent) => {
		const version = await wb.messageSW({ type: 'GET_VERSION' })

		wb.addEventListener('controlling', event => {
			console.log('controlling', event)
			window.location.reload()
		})

		onUpdate(
			() => { void wb.messageSW({ type: 'SKIP_WAITING' }) },
			version,
			event.wasWaitingBeforeRegister
		)
	}

	wb.addEventListener('waiting', update)
	wb.addEventListener('externalwaiting', update) // worker in other tab. @see https://cz3.ch/dev-workbox-externalwaiting

	await wb.register()
}

export const register = (onUpdate: OnUpdateCallback): void => {
	console.info('shouldRegister', shouldRegister)
	if (!shouldRegister) return

	window.addEventListener('load', () => {
		void registerServiceWorker(onUpdate)
	})
}

export const unregister = async (): Promise<void> => {
	const registration = await navigator.serviceWorker.ready
	await registration.unregister()
}
