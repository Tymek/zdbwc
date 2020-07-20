import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import LAST_UPDATE from 'gql/lastUpdate.gql'
import LAST_UPDATE_NOW from 'gql/lastUpdateNow.gql'

/**
 * Returns `timestamptz` of last update, or if `condition` is `true`, updates it.
 */
const useLastUpdate = (condition?: boolean): string | undefined => {
	const lastUpdate = useQuery<{ last_update: string }>(LAST_UPDATE)?.data?.last_update
	const [update] = useMutation(LAST_UPDATE_NOW, {
		refetchQueries: [{ query: LAST_UPDATE }],
	})

	useEffect(() => {
		if (condition) {
			void update()
		}
	}, [update, condition])

	return lastUpdate
}

export default useLastUpdate
