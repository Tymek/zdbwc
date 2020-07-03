/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	ClientConfigurationInputType,
	DatabasePoolType,
	QueryResultType,
	QueryResultRowType,
} from 'slonik'

declare module 'slonik' {
	export function createMockPool(
		overrides?: {
			readonly query?: (
				sql: string,
				values: readonly Array<PrimitiveValueExpressionType>
			) => Promise<QueryResultType<QueryResultRowType>>
		},
		clientUserConfiguration?: ClientConfigurationInputType
	): DatabasePoolType

	export function createMockQueryResult(rows: readOnly <QueryResultRowType>): QueryResultType<QueryResultRowType>
}
