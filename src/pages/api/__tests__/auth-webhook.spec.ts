// const route:Handler = async (req, res) =>
// 	Promise.resolve(handleResponse(res, { 'X-Hasura-Role': 'anonymous' }))

import { setup, request, teardown, Server } from 'utils/test/server'
import handler from '../auth-webhook'

jest.mock('utils/api/middleware')

let server: Server
let url: Promise<string>

beforeAll(() => { [server, url] = setup(handler) })
afterAll(done => teardown(server, done))

describe('/api/auth-webhook', () => {
	it('responds to requests', async () => {
		const response = await request(await url)
		expect(response).toHaveProperty('status', 200)
		expect(response.headers.get('content-type')).toEqual(expect.stringMatching(/^application\/json/))
	})

	it('returns hasura-role', async () => {
		const response = await request(await url)

		await expect(response.json()).resolves.toEqual({ 'X-Hasura-Role': 'anonymous' })
	})
})
