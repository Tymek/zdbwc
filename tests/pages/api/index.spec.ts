import { setup, request, teardown, Server } from 'utils/test/server'
import handler from 'pages/api'

let server: Server
let url: Promise<string>

beforeAll(() => { [server, url] = setup(handler) })
afterAll(done => teardown(server, done))

it('responds to requests', async () => {
	const response = await request(await url)
	expect(response).toHaveProperty('status', 200)
	expect(response.headers.get('content-type')).toEqual(expect.stringContaining('application/json'))
})
