import { setup, request, teardown, Server } from 'utils/test/server'
import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt'
import database from 'utils/test/database'

import route from 'pages/api/login'

// jest.mock('utils/api/middleware')
jest.mock('bcrypt', () => ({
	default: jest.fn(),
	compare: jest.fn(),
	hash: jest.fn(),
}))
const compare = bcryptCompare as jest.Mock
const hash = bcryptHash as jest.Mock

let server: Server
let url: Promise<string>

const defaultDatabaseUser = {
	id: 'id',
	username: 'username',
	password: 'password',
	created_at: 0,
	updated_at: 0,
}
const expected = { id: defaultDatabaseUser.id, username: defaultDatabaseUser.username }
const options = {
	method: 'POST',
	headers: { 'content-type': 'application/json', 'x-hasura-action-secret': 1 },
	body: JSON.stringify({ input: { username: 'username', password: 'password' } }),
}

beforeEach(() => {
	database.mockReset().mockReturnValue([defaultDatabaseUser])
	compare.mockReset().mockReturnValue(Promise.resolve(true))
	hash.mockReset().mockReturnValue(Promise.resolve(true))
})

beforeAll(() => { [server, url] = setup(route) })
afterAll(done => teardown(server, done))

it('returns user credentials', async () => {
	const response = await request(await url, undefined, options)
	expect(response).toHaveProperty('status', 200)
	expect(response.headers.get('content-type')).toEqual(expect.stringMatching(/^application\/json/))
	await expect(response.json()).resolves.toEqual(expected)
})

it('returns an error if user not fount', async () => {
	database.mockReset().mockReturnValueOnce([null])

	const response = await request(await url, undefined, options)
	expect(response).toHaveProperty('status', 401)
	await expect(response.json()).resolves.toHaveProperty('message')
})

it('returns an error if password compare fails', async () => {
	compare.mockReturnValueOnce(false)

	const response = await request(await url, undefined, options)
	expect(response).toHaveProperty('status', 401)
	await expect(response.json()).resolves.toHaveProperty('message')
})

it('should set cookie', async () => {
	const response = await request(await url, undefined, options)
	expect(response.headers.get('set-cookie')).toEqual(expect.stringMatching(/^TOKEN=/))
})
