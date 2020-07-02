import handleResponse from '../handleResponse'
import { NextApiResponse } from 'next'

const res = {
	setHeader: jest.fn(),
	status: jest.fn(),
	end: jest.fn(),
}

beforeEach(() => {
	jest.resetAllMocks()
})

describe('utils/api/handleResponse', () => {
	it('sets content-type header', () => {
		handleResponse(res as unknown as NextApiResponse)

		expect(res['setHeader']).toHaveBeenCalledWith('Content-Type', 'application/json')
	})

	it('sends default status', () => {
		handleResponse(res as unknown as NextApiResponse)

		expect(res['status']).toHaveBeenCalledWith(200)
	})

	it('does nothing without `res`', () => {
		expect(handleResponse()).toBeUndefined()
	})
})
