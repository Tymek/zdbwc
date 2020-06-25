import {
	createPool,
} from 'slonik'
import database, { createPoolType } from '../database'

interface createPoolTypeMock extends createPoolType {
	mockResolvedValue: (value: null) => void
}

jest.mock('slonik')
const mockedCreatePool = createPool as jest.Mocked<createPoolTypeMock>

mockedCreatePool.mockResolvedValue(null)

describe('/utils/api/database', () => {

	it('creates connection pool', () => {
		expect(database).toBeTruthy()
	})
})
