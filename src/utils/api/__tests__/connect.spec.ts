/* eslint-disable @typescript-eslint/unbound-method */
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import connect, { action, onError } from '../connect'
import middleware from '../middleware'
import ActionError from '../helpers/ActionError'

jest.mock('next-connect', () => jest.fn())

const res = {
	status: jest.fn(),
	json: jest.fn(),
}

beforeEach(() => {
	(nc as jest.Mock).mockReset().mockReturnValue({
		get: jest.fn(),
		use: jest.fn(),
	})
	res.status.mockReset()
	res.json.mockReset()
})

describe('utils/api/connect', () => {
	it('initializes and returns next-connect', () => {
		connect()

		expect(nc).toHaveBeenCalled()
	})

	it('is using middleware', () => {
		const result = connect()

		expect(result.use).toBe(nc().use)
		expect(result.use).toHaveBeenCalledWith(middleware)
	})

	it('is can add `get` handler', () => {
		const handler = jest.fn()
		const result = connect(handler)

		expect(result.get).toHaveBeenCalledWith(handler)
	})

	it('has error handler', () => {
		connect()
		const { onError: connectErrorHandler } = (nc as jest.Mock).mock.calls[0][0]
		expect(connectErrorHandler).toBe(onError)
	})

	describe('onError', () => {
		it('sets 400 status by default', () => {
			onError(new ActionError('message'), null as unknown as NextApiRequest, res as unknown as NextApiResponse)

			expect(res.status).toHaveBeenCalledWith(400)

			onError(new Error(), null as unknown as NextApiRequest, res as unknown as NextApiResponse)
			expect(res.status).toHaveBeenCalledWith(400)
		})

		it('sets status from ActionError', () => {
			res.status.mockReset()
			onError(
				new ActionError('not found', 404),
				null as unknown as NextApiRequest,
				res as unknown as NextApiResponse
			)

			expect(res.status).toHaveBeenCalledWith(404)
		})
	})

	describe('action', () => {
		it('calls handler with body input', async () => {
			const handler = jest.fn()
			const req = { body: { input: 'test' } }
			const wrappedHandler = action(handler)
			await wrappedHandler(req as unknown as NextApiRequest, res as unknown as NextApiResponse)
			expect(handler).toHaveBeenCalledWith('test', req)
		})
	})
})
