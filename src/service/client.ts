import { Workbox, messageSW } from 'workbox-window'
import { WorkboxLifecycleWaitingEvent } from 'workbox-window/utils/WorkboxEvent'

const swUrl = '/sw.js'
const shouldRegister = (
	typeof window !== 'undefined'
	&& process.env.NODE_ENV !== 'development'
	&& 'serviceWorker' in navigator
)

type Version = string | number

/** Async action triggering skipWaiting.
 * `onAccept` resolves when new SW is controlling the page
 */
export type OnUpdateCallback = (
	onAccept: () => Promise<string>,
	version?: Version,
	oldVersion?: Version,
	isRecurring?: boolean
) => void

const registerAfterWindowLoad = async (onUpdate?: OnUpdateCallback): Promise<Workbox> => {
	const wb = new Workbox(swUrl)
	let registration: ServiceWorkerRegistration | undefined

	const getVersions = async (): Promise<[Version | undefined, Version | undefined]> => {
		if (!registration) {
			registration = await navigator.serviceWorker.ready
		}

		const waitingVersion = registration?.waiting && await messageSW(registration.waiting, { type: 'GET_VERSION' })
		const activeVersion = registration?.active && await messageSW(registration.active, { type: 'GET_VERSION' })

		return [waitingVersion, activeVersion]
	}

	const onAccept = (): Promise<string> => new Promise((resolve, reject) => {
		wb.addEventListener('controlling', () => {
			resolve('controlling')
		})

		Promise.allSettled([
			wb.messageSW({ type: 'SKIP_WAITING' }),
			wb.messageSW({ type: 'CLAIM' }),
		]).then(async ([skipWaiting, claim]) => {
			if (!skipWaiting || !claim) {
				reject(new Error(`skipWaiting: ${skipWaiting ? '1' : '0'}, claim: ${claim ? '1' : '0'}`))
			}

			const [waitingVersion, activeVersion] = await getVersions()

			if (waitingVersion === undefined || waitingVersion === activeVersion) {
				resolve('not waiting')
			}

			return void ''
		}).catch(reject)
	})

	const update = async (event: WorkboxLifecycleWaitingEvent) => {
		const [waitingVersion, activeVersion] = await getVersions()

		if (onUpdate) {
			onUpdate(onAccept, waitingVersion, activeVersion, event?.wasWaitingBeforeRegister)
		} else {
			void onAccept()
		}
	}

	wb.addEventListener('waiting', update)
	wb.addEventListener('externalwaiting', update) // worker in other tab. @see https://cz3.ch/dev-workbox-externalwaiting
	wb.addEventListener('controlling', ({ isUpdate }) => {
		if (isUpdate) {
			setTimeout(() => {
				window.location.reload()
			}, 1250)
		}
	})

	registration = await wb.register()

	if (process.env.DEBUG === 'true') {
		console.debug('SW', await wb.messageSW({ type: 'GET_VERSION' })) // eslint-disable-line no-console
	}

	return wb
}

export const register = (onUpdate?: OnUpdateCallback): Promise<Workbox> => {
	if (!shouldRegister) return Promise.reject()

	return new Promise(resolve => {
		window.addEventListener('load', () => {
			resolve(registerAfterWindowLoad(onUpdate))
		})
	})
}

export const unregister = async (): Promise<boolean> => {
	const registration = await navigator.serviceWorker.ready
	return registration.unregister()
}
