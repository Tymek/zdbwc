import { QueryOptions } from '@apollo/client'

export const { Provider } = jest.requireActual('../GraphQL.tsx')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const precacheQuery = (query: QueryOptions<Record<string, any>>) => async (): Promise<any> =>
	Promise.resolve(query)
