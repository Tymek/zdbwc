/* eslint-disable @typescript-eslint/unbound-method */
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import connect, { onError } from 'utils/api/connect'
import middleware from 'utils/api/middleware'
import ActionError from 'utils/api/helpers/ActionError'

jest.mock('next-connect', () => jest.fn().mockImplementation(() => ({
	default: jest.fn(),
	use: jest.fn(),
})))

const res = {
	status: jest.fn(),
	json: jest.fn(),
}

beforeEach(() => {
	(nc as jest.Mock).mockReset().mockReturnValue({
		post: jest.fn(),
		use: jest.fn(),
	})
	res.status.mockReset()
	res.json.mockReset()
})

it('initializes and returns next-connect', () => {
	connect()

	expect(nc).toHaveBeenCalled()
})

it('is using middleware', () => {
	const result = connect()

	expect(result.use).toBe(nc().use)
	expect(result.use).toHaveBeenCalledWith(middleware)
})

it('is can add `post` handler', () => {
	const handler = jest.fn()
	const result = connect(handler)

	expect(result.post).toHaveBeenCalledWith(handler)
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
