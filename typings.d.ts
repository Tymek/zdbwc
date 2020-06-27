/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	// createPool,
	ClientConfigurationInputType,
	DatabasePoolType,
} from 'slonik'

declare module 'slonik' {
	export function createMockPool(
    overrides: any,
    clientUserConfiguration?: ClientConfigurationInputType
	): DatabasePoolType

	export function createMockQueryResult(rows: readOnly <QueryResultRowType>): QueryResultType<QueryResultRowType>
}

// type OverridesType = {|
//   +query: (sql: string, values: $ReadOnlyArray<PrimitiveValueExpressionType>,) => Promise<QueryResultType<QueryResultRowType>>,
// |};

// export default (
//   overrides: OverridesType,
//   clientConfigurationInput?: ClientConfigurationInputType,
// ): DatabasePoolType
