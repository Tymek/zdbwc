import { setup, request, teardown, Server } from 'utils/test/server'

jest.mock('utils/api/middleware')

import handler from '..'

let server: Server
let url: Promise<string>

beforeAll(() => { [server, url] = setup(handler) })
afterAll(done => teardown(server, done))

describe('/api', () => {
	it('responds to requests', async () => {
		// expect.assertions(1)
		const response = await request(await url)
		expect(response).toHaveProperty('status', 200)
		expect(response.headers.get('content-type')).toEqual('application/json')
	})
})
