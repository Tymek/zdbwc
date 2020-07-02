import {
	createPool,
} from 'slonik'

import database from '../database'

jest.mock('slonik', () => ({
	createPool: jest.fn(() => 'pool'),
}))

describe('/utils/api/database', () => {
	it('creates connection pool', () => {
		expect(database).toBeTruthy()
		expect(createPool).toHaveBeenCalledTimes(1)
	})
})
