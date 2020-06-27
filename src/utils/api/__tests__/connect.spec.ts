/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-explicit-any,
	@typescript-eslint/no-unsafe-return */

import nc from 'next-connect'

import connect from '../connect'
import middleware from '../middleware'

jest.mock('next-connect')

describe('utils/api/connect', () => {
	it('initializes and returns next-connect', () => {
		(nc as jest.Mock).mockReturnValue(({
			use: jest.fn(),
		}))
		connect()

		expect(nc).toHaveBeenCalledWith()
	})

	it('is using middleware', () => {
		(nc as jest.Mock).mockReturnValue(({
			use: jest.fn(),
		}))
		const result = connect()

		expect(result.use).toHaveBeenCalledWith(middleware)
	})

	it('is can add `get` handler', () => {
		(nc as jest.Mock).mockReturnValue(({
			use: jest.fn(),
			get: jest.fn(),
		}))

		const handler = jest.fn()
		const result = connect(handler)

		expect(result.get).toHaveBeenCalledWith(handler)
	})
})
