import http, { RequestListener } from 'http'
import fetch from 'isomorphic-unfetch'
import listen from 'test-listen'
import { apiResolver } from 'next/dist/next-server/server/api-utils'

import { NextConnect } from 'next-connect'
import { isEmpty } from 'ramda'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setup = (handler: NextConnect<any, any>): [http.Server, Promise<string>] => {
	const requestHandler: RequestListener = (req, res) => apiResolver(req, res, undefined, handler, {
		previewModeId: '',
		previewModeEncryptionKey: '',
		previewModeSigningKey: '',
	}, false)

	const server = http.createServer(requestHandler)
	return [server, listen(server)]
}

export const request = (url: string, query = {}, options = {}): Promise<Response> => {
	const queryString = query && !isEmpty(query)
		? `?${new URLSearchParams(query).toString()}`
		: ''

	return fetch(
		`${url}${queryString}`,
		options
	)
}

type ServerCloseCallback = ((err?: Error | undefined) => void) | undefined

export const teardown = (server: http.Server, done?: jest.ProvidesCallback): void => {
	server.close(done as unknown as ServerCloseCallback)
}

export type Server = http.Server
