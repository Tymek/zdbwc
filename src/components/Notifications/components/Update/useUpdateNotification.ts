import { useApolloClient, useMutation } from '@apollo/client'
import resolvers, { SET_UPDATE_INFO, UPDATE_INFO } from './infoAboutUpdate.resolvers'

const useUpdateNotification: () => (value?: string) => void = () => {
	const client = useApolloClient()
	client.addResolvers(resolvers)

	const [mutation] = useMutation(SET_UPDATE_INFO)

	return (value?: string) => {
		void mutation({
			variables: { value },
			refetchQueries: [{
				query: UPDATE_INFO,
			}],
		})
	}
}

export default useUpdateNotification
