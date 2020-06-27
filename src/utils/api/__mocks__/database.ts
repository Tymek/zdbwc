/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createMockPool,
	createMockQueryResult,
} from 'slonik'

let pool: any = {}

const mock = (rows: any): void => {
	pool = createMockPool({
		query: async () => {
			return await Promise.resolve(createMockQueryResult(rows))
		},
	})

	pool.mock = mock
}

pool.mock = mock

export default pool
