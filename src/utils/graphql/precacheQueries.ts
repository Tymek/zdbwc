import { QueryOptions, OperationVariables, NormalizedCacheObject } from '@apollo/client'
import { GetStaticPropsResult } from 'next'
import gqlClient from './client'
import { pagePropsKey, PageProps } from './Provider'

type Query = QueryOptions<Record<string, OperationVariables>>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const precacheQueries = (
	query: Query | Query[],
	otherProps?: Record<string, unknown>,
	initialState?: NormalizedCacheObject
) => async (): Promise<GetStaticPropsResult<PageProps>> => {
	const client = await gqlClient(initialState)

	try {
		if (Array.isArray(query)) {
			await Promise.allSettled(query.map(q => client.query(q)))
		} else {
			await client.query(query)
		}

		return {
			props: {
				[pagePropsKey]: client.cache.extract(),
				...otherProps,
			},
			revalidate: 1, // @see https://nextjs.org/blog/next-9-4
		}
	} catch (error) {
		console.error(error) // eslint-disable-line no-console
		return { props: { ...otherProps } }
	}
}

export const extractState = (
	pageProps: GetStaticPropsResult<PageProps>
): NormalizedCacheObject | undefined => pageProps.props[pagePropsKey]

export default precacheQueries
