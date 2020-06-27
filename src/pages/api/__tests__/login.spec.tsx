/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from 'next'
import database from 'utils/api/database'

jest.mock('utils/api/middleware')
jest.mock('utils/api/database')

import loginHandler from '../login'

const mockDatabase = database as any
mockDatabase.mock([
	{
		id: 'id',
		username: 'username',
		password: 'password',
		created_at: 0,
		updated_at: 0,
	},
])

describe('pages/api/login', () => {
	it('queries database', async () => {
		expect.assertions(1)

		const req = {
			body: {input: { username: 'username', password: 'password' }},
		}

		const res = {
			end: jest.fn(),
			status: jest.fn(),
			setHeader: jest.fn(),
		}

		const result = await loginHandler(req as NextApiRequest, res as unknown as  NextApiResponse)

		expect(result).toBeTruthy()
	})
})
// await pool.connect(async (connection) => {
//   const results = await connection.query(sql`
//     SELECT ${'foo'}
//   `);
// });
