import { InMemoryCache, Resolver, gql } from '@apollo/client'
import QUERY_OPENED_DAY_ID from './gql/openedDayId.gql'

export { default as OPEN_DAY } from './gql/openDay.gql'
export const OPENED_DAY_ID = QUERY_OPENED_DAY_ID

export type OpenedDayId = string

export const typeDefs = gql`
  extend type query_root {
    opened_day_id: String
  }

  extend type mutation_root {
    open_day(id: String!): String!
  }
`

const openDay: Resolver = (
	rootValue,
	{ id }: { id: string },
	{ cache }: { cache?: InMemoryCache }
): OpenedDayId | null => {
	if (cache) {
		try {
			const state = cache.readQuery<{ opened_day_id: OpenedDayId }>({ query: OPENED_DAY_ID })
			if (state?.opened_day_id === id) { // toggle
				const data = { opened_day_id: null }
				cache.writeQuery({ query: OPENED_DAY_ID, data })
				return null
			}
		} catch {} // eslint-disable-line no-empty

		const data = { opened_day_id: id }
		cache.writeQuery({ query: OPENED_DAY_ID, data })
	}
	return id
}

export default {
	Mutation: {
		open_day: openDay,
	},
}
