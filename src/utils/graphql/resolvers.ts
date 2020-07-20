import { InMemoryCache, Resolver, gql } from '@apollo/client'
import moment from 'utils/moment'
import LAST_UPDATE from 'gql/lastUpdate.gql'
import type { Scalars } from 'ts/schema'

export type LastUpdate = Scalars['timestamptz']

export const typeDefs = gql`
  extend type query_root {
    last_update: timestamptz
  }

  extend type mutation_root {
    set_last_update(last_update: timestamptz): timestamptz!
  }
`

const setLastUpdated: Resolver = (
	rootValue,
	{ last_update },
	{ cache }: { cache?: InMemoryCache }
): LastUpdate | null => {
	const lastUpdate = last_update as LastUpdate || moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ')

	if (cache) {
		const data = { last_update: lastUpdate }
		cache.writeQuery({ query: LAST_UPDATE, data })
	}

	return lastUpdate
}

export default {
	Mutation: {
		last_update_now: setLastUpdated,
	},
}
