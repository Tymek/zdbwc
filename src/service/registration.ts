import { Workbox } from 'workbox-window'

const swUrl = '/generated/sw.js'
const shouldRegister = (
	typeof window !== 'undefined'
	&& process.env.NODE_ENV !== 'development'
	&& 'serviceWorker' in navigator
)
const { log } = console // TODO: remove
type Callback = (onAccept: typeof updateAndReload, version: string | number) => void

const updateAndReload = async (wb: Workbox) => {
	log('updating')

	wb.addEventListener('controlling', controllingEvent => {
		log('controlling', controllingEvent)
		window.location.reload()
	})

	await wb.messageSW({ type: 'SKIP_WAITING' })
}

const registerServiceWorker = async (callback: Callback): Promise<void> => {
	const wb = new Workbox(swUrl)

	wb.addEventListener('activated', event => {
		log(event.isUpdate ? 'activated' : 'activated for the first time')
	})

	wb.addEventListener('waiting', async event => {
		const version = await wb.messageSW({ type: 'GET_VERSION' })
		log('version:', version)

		if (event.wasWaitingBeforeRegister) {
			log('previously updated, same service worker is still waiting')
			await updateAndReload(wb)
		} else {
			log('waiting for the first time')
			callback(updateAndReload, version)
		}
	})

	await wb.register()
}

export const register = (callback: Callback): void => {
	if (!shouldRegister) return

	window.addEventListener('load', () => {
		void registerServiceWorker(callback)
	})
}

export const unregister = async (): Promise<void> => {
	const registration = await navigator.serviceWorker.ready
	await registration.unregister()
}
