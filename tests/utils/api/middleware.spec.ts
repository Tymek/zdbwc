import { NextApiRequest, NextApiResponse } from 'next'
import morgan from 'morgan'
import helmet from 'helmet'

import middleware, { runMiddleware, Handler } from 'utils/api/middleware'

jest.mock('morgan', () => jest.fn().mockImplementation(() =>
	(): Handler => jest.fn(() => Promise.resolve())))
jest.mock('helmet', () => jest.fn().mockImplementation(() =>
	(): Handler => jest.fn(() => Promise.resolve())))

describe('runMiddleware', () => {
	const req = {} as NextApiRequest
	const res = {} as NextApiResponse

	it('runs handler function', async () => {
		const mock = jest.fn(() => Promise.resolve())
		await runMiddleware(req, res, mock as Handler)

		expect(mock).toHaveBeenCalledTimes(1)
	})

	it('resolves callback handler', async () => {
		const mock = jest.fn(
			(rq, rs, callback: (cbArg: string) => void): void => callback('ok')
		) as unknown

		await expect(runMiddleware(req, res, mock as Handler)).resolves.toBe('ok')
	})

	it('rejects error callback handler', async () => {
		const mock = jest.fn(
			(rq, rs, callback: (cbArg: Error) => void): void => callback(new Error('error'))
		) as unknown

		await expect(runMiddleware(req, res, mock as Handler)).rejects.toThrow('error')
	})
})

describe('middleware', () => {
	it('runs morgan and helmet', async () => {
		const req = {} as NextApiRequest
		const res = {} as NextApiResponse

		await middleware(req, res)

		expect(morgan).toHaveBeenCalledTimes(1)
		expect(helmet).toHaveBeenCalledTimes(1)
	})
})
