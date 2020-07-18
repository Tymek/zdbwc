/* eslint-disable no-restricted-globals */// NOTE: self is allowed in service worker
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { NetworkOnly, CacheFirst } from 'workbox-strategies'
import { PrecacheEntry } from 'workbox-precaching/_types'
import getGraphqlEndpoint from 'utils/graphql/getEndpoint'

const scope = self as unknown as ServiceWorkerGlobalScope
const graphqlEndpoint = getGraphqlEndpoint(scope)

/**
 * Cache
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore because `self.__WB_MANIFEST` is substituted during webpack build
const manifest = self.__WB_MANIFEST as Array<PrecacheEntry> || [] // eslint-disable-line no-underscore-dangle

// manifest.push({
// 	revision: process.env.BUILD as string,
// 	url: '/',
// })

precacheAndRoute(manifest, {
	directoryIndex: '/',
})

registerRoute(/\/api\/healthcheck$/, new NetworkOnly(), 'GET')
registerRoute(/\/_next\/static\//, new CacheFirst(), 'GET')
registerRoute(/\/static\//, new CacheFirst(), 'GET')
registerRoute('/favicon.ico', new CacheFirst(), 'GET')

// const handler = createHandlerBoundToURL('/') // TODO: 404 fallback
// const navigationRoute = new NavigationRoute(handler, {
// 	allowlist: [
// 		/^\/$/,
// 	],
// })
// registerRoute(navigationRoute)

registerRoute(graphqlEndpoint, new NetworkOnly({
	fetchOptions: {
		credentials: 'include',
	},
}))


/**
 * SW↔client communication
 */

type SWMessageEventData = {
	type: string,
}

interface SWMessageEvent extends ExtendableMessageEvent { readonly data: SWMessageEventData }

scope.addEventListener('message', (event: SWMessageEvent) => {
	if (event?.data?.type === 'GET_VERSION') {
		event.ports[0].postMessage(process.env.VERSION)
	}

	if (event?.data?.type === 'SKIP_WAITING') {
		scope.skipWaiting() // eslint-disable-line @typescript-eslint/no-floating-promises
	}
})
