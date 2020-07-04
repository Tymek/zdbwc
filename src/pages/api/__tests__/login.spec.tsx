import { NextApiRequest, NextApiResponse } from 'next'
import database from 'utils/test/database'

import route, { handler } from '../login'

jest.mock('utils/api/middleware')

const defaultDatabaseUser = {
	id: 'id',
	username: 'username',
	password: 'password',
	created_at: 0,
	updated_at: 0,
}
const defaultMockInput = { username: 'username', password: 'password' }
const expected = { id: defaultDatabaseUser.id, username: defaultDatabaseUser.username }

it('queries the database', async () => {
	database.mockReturnValueOnce([defaultDatabaseUser])
	const result = await handler(defaultMockInput)

	expect(database).toHaveBeenCalledTimes(1)
	expect(result).toStrictEqual(expected)
})

// it('queries database', async () => {
// 	expect.assertions(1)

// 	const req = {
// 		body: {input: { username: 'username', password: 'password' }},
// 	}

// 	const res = {
// 		end: jest.fn(),
// 		status: jest.fn(),
// 		setHeader: jest.fn(),
// 	}

// 	await route(req as NextApiRequest, res as unknown as  NextApiResponse)

// 	expect(res.status).toHaveBeenCalledWith(200)
// })
