import { InMemoryCache, Resolver, gql } from '@apollo/client'
import UPDATE_NOTIFICATION from './gql/updateInfo.gql'

export { default as SET_UPDATE_INFO } from './gql/setUpdateInfo.gql'
export const UPDATE_INFO = UPDATE_NOTIFICATION

export type UpdateInfo = string

export const typeDefs = gql`
  extend type query_root {
    update_info: String
  }

  extend type mutation_root {
    set_update_info(value: String): String!
  }
`

const setUpdateNotification: Resolver = (
	rootValue,
	{ value }: { value?: UpdateInfo },
	{ cache }: { cache?: InMemoryCache }
): UpdateInfo | null => {
	const data = { update_info: value || null }
	if (cache) {
		cache.writeQuery({ query: UPDATE_INFO, data })
	}

	return data.update_info
}

export default {
	Mutation: {
		set_update_info: setUpdateNotification,
	},
}
