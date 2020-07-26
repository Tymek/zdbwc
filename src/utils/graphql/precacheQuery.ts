import { QueryOptions, OperationVariables } from '@apollo/client'
import { GetStaticPropsResult } from 'next'
import gqlClient from './client'
import { pagePropsKey, PageProps } from './Provider'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const precacheQuery = (
	query: QueryOptions<Record<string, OperationVariables>>
) => async (): Promise<GetStaticPropsResult<PageProps>> => {
	const client = await gqlClient()

	try {
		await client.query(query)

		return {
			props: {
				[pagePropsKey]: client.cache.extract(),
			},
			revalidate: 1, // @see https://nextjs.org/blog/next-9-4
		}
	} catch (error) {
		console.error(error) // eslint-disable-line no-console
		return { props: {} }
	}
}

export default precacheQuery
