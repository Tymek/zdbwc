/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createMockPool,
	createMockQueryResult,
	DatabasePoolType,
	PrimitiveValueExpressionType,
} from 'slonik'

const query = jest.fn()

const pool = createMockPool({
	query: async (sql: string, values: PrimitiveValueExpressionType[]) => await Promise.resolve(
		createMockQueryResult(query(sql, values))
	),
}) as DatabasePoolType & { mock: jest.Mock }

pool.mock = query

export default pool
