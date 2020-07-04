import {
	createPool,
} from 'slonik'

import database from 'utils/api/database'

jest.mock('slonik', () => ({
	createPool: jest.fn(() => 'pool'),
}))

it('creates connection pool', () => {
	expect(database).toBeTruthy()
	expect(createPool).toHaveBeenCalledTimes(1)
})
