import {
	createPool,
} from 'slonik'

jest.mock('slonik', () => ({
	createPool: jest.fn(() => 'pool'),
}))

import database from '../database'

describe('/utils/api/database', () => {
	it('creates connection pool', () => {
		expect(database).toBeTruthy()
		expect(createPool).toHaveBeenCalledTimes(1)
	})
})
