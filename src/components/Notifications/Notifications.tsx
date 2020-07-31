import { useQuery } from '@apollo/client'
import { tail } from 'ramda'
import { AnimatePresence } from 'framer-motion'

import { Notification } from 'ts/schema'
import moment from 'utils/moment'
import SCHEDULE from './gql/notifications.gql'
import NotificationComponent from './components/Notification'
import InfoAboutUpdate from './components/Update'

const pollInterval = process.env.NODE_ENV !== 'production' || process.env.DEBUG === 'true' ? 6e3 : 15e3 // 15s
const filterCurrent = (notifications: Notification[]) => notifications.filter(
	({ published_at }) => moment(published_at).isSameOrBefore(moment())
)

type NotificationsProps = {
	head?: boolean,
}

const Notifications: React.FC<NotificationsProps> = ({ head }) => {
	const { data } = useQuery<{ notification: Notification[] }>(SCHEDULE, {
		pollInterval,
		fetchPolicy: 'cache-and-network',
	})

	if (!data || !data?.notification) return null

	const currentNotifications = filterCurrent(data.notification)
	const first = currentNotifications.length > 0 ? [currentNotifications[0]] : []
	const notifications: Notification[] = head ? first : tail(currentNotifications)

	return (
		<div className={head ? 'head' : 'tail'}>
			<AnimatePresence initial={false}>
				{
					notifications && notifications.map(notification => (
						<NotificationComponent key={notification.id} {...notification} important={head} />
					))
				}
			</AnimatePresence>
			{ head && <InfoAboutUpdate /> }
			<style jsx>{`
				.head {
					padding-bottom: var(--spacing);
				}

				.tail {
					padding-top: calc(var(--spacing) * 3);
					padding-bottom: calc(var(--spacing) * 3);
				}
			`}
			</style>
		</div>
	)
}

export default Notifications
