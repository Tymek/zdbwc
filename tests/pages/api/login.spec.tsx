// import { NextApiRequest, NextApiResponse } from 'next'
import database from 'utils/test/database'

import { handler } from 'pages/api/login'
import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt'
import { NextApiResponse } from 'next'

jest.mock('utils/api/middleware')
jest.mock('bcrypt', () => ({
	default: jest.fn(),
	compare: jest.fn(),
	hash: jest.fn(),
}))
const compare = bcryptCompare as jest.Mock
const hash = bcryptHash as jest.Mock
const req = {
	headers: {
		get: jest.fn(),
	},
}
const res = {
	setHeader: jest.fn(),
} as unknown as NextApiResponse

const defaultDatabaseUser = {
	id: 'id',
	username: 'username',
	password: 'password',
	created_at: 0,
	updated_at: 0,
}
const defaultMockInput = { username: 'username', password: 'password' }
const expected = { id: defaultDatabaseUser.id, username: defaultDatabaseUser.username }

beforeEach(() => {
	database.mockReset().mockReturnValue([defaultDatabaseUser])
	compare.mockReset().mockReturnValue(Promise.resolve(true))
	hash.mockReset().mockReturnValue(Promise.resolve(true))
})

it('queries the database', async () => {
	const result = await handler(defaultMockInput, undefined, res)

	expect(database).toHaveBeenCalledTimes(1)
	expect(result).toStrictEqual(expected)
})

it('throws exception if user not fount', async () => {
	database.mockReturnValueOnce([null])

	await expect(() => handler(defaultMockInput)).rejects.toThrow()
})

it('throws exception if password compare fails', async () => {
	compare.mockReturnValueOnce(Promise.resolve(false))

	await expect(() => handler(defaultMockInput)).rejects.toThrow()
})

it('returns credentials', async () => {
	// compare.mockReturnValue(true)
	const result = await handler(defaultMockInput, undefined, res)
	expect(result).toEqual(expected)
})

it('should set cookie', async () => {
	await handler(defaultMockInput, undefined, res)
	// eslint-disable-next-line @typescript-eslint/unbound-method
	expect(res.setHeader).toHaveBeenCalled()
})
