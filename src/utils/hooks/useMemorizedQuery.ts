import { useEffect, useState } from 'react'
import { useQuery, OperationVariables, DocumentNode, QueryHookOptions, QueryResult } from '@apollo/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useMemorizedQuery<TData = any, TVariables = OperationVariables>(
	query: DocumentNode,
	options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
	const [data, setData] = useState<TData>()
	const result = useQuery<TData>(query, options)

	useEffect(() => {
		if (result.data) {
			setData(() => result.data)
		}
	}, [result.data])

	return {
		...result,
		data,
	} as QueryResult<TData, TVariables>
}

export default useMemorizedQuery
