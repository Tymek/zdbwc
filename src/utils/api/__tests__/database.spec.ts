import {
	createPool,
} from 'slonik'
// import { mocked } from 'ts-jest'


// interface createPoolTypeMock extends createPoolType {
// 	mockResolvedValue: (value: null) => void
// }

jest.mock('slonik', () => ({
	createPool: jest.fn(() => 'pool'),
}))
// const mockedCreatePool = mocked(createPool)

import database from '../database'
// const mockedCreatePool = createPool as jest.Mocked<createPoolTypeMock>

// mockedCreatePool.mockResolvedValue(null)

describe('/utils/api/database', () => {
	it('creates connection pool', () => {
		expect(database).toBeTruthy()
		expect(createPool).toHaveBeenCalledTimes(1)
	})
})
