import http from 'http'

import { setup, request, teardown } from 'utils/test/server'

jest.mock('utils/api/middleware')

import handler from '..'

let server: http.Server
let url: Promise<string>

beforeAll(() => { [server, url] = setup(handler) })
afterAll(done => teardown(server, done))

describe('/api', () => {
	it('responds to requests', async () => {
		expect.assertions(1)
		const { status } = await request(await url)
		expect(status).toBe(200)
	})
})
