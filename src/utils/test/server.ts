import http, { RequestListener } from 'http'
import fetch from 'isomorphic-unfetch'
import listen from 'test-listen'
import { apiResolver } from 'next/dist/next-server/server/api-utils'

import { Handler } from '../api/middleware'

export const setup = (handler: Handler): [http.Server, Promise<string>] => {
	const requestHandler: RequestListener = (req, res) => {
		return apiResolver(req, res, undefined, handler, {
			previewModeId: '',
			previewModeEncryptionKey: '',
			previewModeSigningKey: '',
		}, false)
	}

	const server = http.createServer(requestHandler)
	return [server, listen(server)]
}

export const request = (url: string, query = {}, options = {}): Promise<Response> =>
	fetch(`${url}?${new URLSearchParams(query).toString()}`, options)

type ServerCloseCallback = ((err?: Error | undefined) => void) | undefined

export const teardown = (server: http.Server, done?: jest.ProvidesCallback): void => {
	server.close(done as unknown as ServerCloseCallback)
}
