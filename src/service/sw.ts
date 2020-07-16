import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const manifest = self.__WB_MANIFEST // eslint-disable-line no-underscore-dangle, no-restricted-globals
const scope = self as unknown as ServiceWorkerGlobalScope // eslint-disable-line no-restricted-globals

precacheAndRoute(manifest)

registerRoute(/\/api\/healthcheck$/, new NetworkOnly(), 'GET')

const handler = createHandlerBoundToURL('/index.html')
const navigationRoute = new NavigationRoute(handler, {
	denylist: [/^\/_/, /\/[^/]+\.[^/]+$/],
})
registerRoute(navigationRoute)

registerRoute(
	new RegExp('^https?://api..*'),
	new StaleWhileRevalidate()
)

type SWMessageEventData = {
	type: string,
}

interface SWMessageEvent extends ExtendableMessageEvent { readonly data: SWMessageEventData }

scope.addEventListener('message', (event: SWMessageEvent) => {
	if (event?.data?.type === 'GET_VERSION') {
		event.ports[0].postMessage(process.env.VERSION)
	}

	if (event.data.type === 'SKIP_WAITING') {
		scope.skipWaiting() // eslint-disable-line @typescript-eslint/no-floating-promises
	}
})
