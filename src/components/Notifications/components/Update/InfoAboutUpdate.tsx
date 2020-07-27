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
		<>
			<AnimatePresence>
				{
					content ? (
						<Notification key="update" id="update" title="Aktualizacja" content={content} muted>
							<div className="action">
								<button type="button" onClick={() => trigger('acceptUpdate')}>
									<span>
										<Outdated width="1em" height="1em" />
									</span>
									Zaktualizuj
								</button>
							</div>
						</Notification>
					) : null
				}
			</AnimatePresence>
			<style jsx>{`
				.action {
					display: flex;
					padding-right: 19.5%;
				}

				button {
					background: var(--secondary);
					color: var(--white);
					padding: var(--spacing);
					display: inline-flex;
					align-items: center;
					margin: 0 auto;
				}

				button span {
					margin-bottom: calc(var(--spacing) / -3);
					margin-right: calc(var(--spacing) / 2);
				}
			`}
			</style>
		</>
	)
}

export default InfoAboutUpdate
