/* eslint-disable no-restricted-globals */// NOTE: self is allowed in service worker
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { NetworkOnly, CacheFirst } from 'workbox-strategies'
import { PrecacheEntry } from 'workbox-precaching/_types'
import getGraphqlEndpoint from 'utils/graphql/getEndpoint'

const scope = self as unknown as ServiceWorkerGlobalScope
const { location } = scope
const graphqlEndpoint = getGraphqlEndpoint(location.hostname)
const escapeSlashRegExp = (input: string) => new RegExp(input.replace(/\//g, '\\/'))

/**
 * Cache
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore because `self.__WB_MANIFEST` is substituted during webpack build
const manifest = self.__WB_MANIFEST as Array<PrecacheEntry> || [] // eslint-disable-line no-underscore-dangle

manifest.push({
	revision: process.env.VERSION as string, // NOTE: cache-bustin only when package.json version has been changed!
	url: '/',
},
{
	revision: process.env.VERSION as string,
	url: '/not-found',
})

precacheAndRoute(manifest, {
	directoryIndex: '/',
})

registerRoute(escapeSlashRegExp(`^${location.origin}/api(?:$|/)`), new NetworkOnly())
registerRoute(escapeSlashRegExp(`^${location.origin}/static/`), new CacheFirst(), 'GET')

const handler = createHandlerBoundToURL('/not-found')
const navigationRoute = new NavigationRoute(handler, {
	denylist: [
		/^\/panel(?:$|\/)/, // NOTE: not precached for non-managers in `next.config.js` InjectManifest
		/^\/login(?:$|\/)/,
	],
})
registerRoute(navigationRoute)

const apiStrategy = new NetworkOnly({
	fetchOptions: {
		credentials: 'include',
	},
})

registerRoute(graphqlEndpoint, apiStrategy)
registerRoute(escapeSlashRegExp('^https?://api.'), apiStrategy)
registerRoute(escapeSlashRegExp('/graphql/?$'), apiStrategy)


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
		scope.skipWaiting().then(() => event.ports[0].postMessage(true)).catch(() => event.ports[0].postMessage(false))
	}

	if (event?.data?.type === 'CLAIM') {
		scope.clients.claim().then(() => event.ports[0].postMessage(true)).catch(() => event.ports[0].postMessage(false))
	}
})
