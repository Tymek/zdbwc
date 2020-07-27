import { useQuery, useApolloClient } from '@apollo/client'
import { AnimatePresence } from 'framer-motion'
import { trigger } from 'service/updateEvent'
import Outdated from 'assets/icons/outdated.svg'
import Notification from '../Notification'
import resolvers, { UpdateInfo, UPDATE_INFO } from './infoAboutUpdate.resolvers'

const InfoAboutUpdate: React.FC = () => {
	const client = useApolloClient()
	client.addResolvers(resolvers)

	const { data } = useQuery<{ update_info: UpdateInfo }>(UPDATE_INFO)
	const content = data?.update_info

	return (
		<AnimatePresence>
			{
				content ? (
					<Notification key="update" id="update" title="Aktualizacja" content={content}>
						<button type="button" onClick={() => trigger('acceptUpdate')}>
							<Outdated width="1em" height="1em" />
							Zaktualizuj
						</button>
					</Notification>
				) : null
			}
		</AnimatePresence>
	)
}

export default InfoAboutUpdate
