import { useMemo } from 'react'
import { useApolloClient, useQuery, useMutation } from '@apollo/client'

import moment from 'utils/moment'
import { Session } from 'ts/schema'
import resolvers, { OpenedDayId, OPENED_DAY_ID, OPEN_DAY } from './day.resolvers'
import SessionComponent from './components/Session'

type DayProps = {
	id: string,
	sessions: Session[],
}

const Day: React.FC<DayProps> = ({ id, sessions }) => {
	const label = useMemo(() => moment(id).format('dddd'), [id])
	const client = useApolloClient()
	client.addResolvers(resolvers)

	const { data } = useQuery<{ opened_day_id?: OpenedDayId }>(OPENED_DAY_ID)
	const [openDay] = useMutation<{ opened_day_id?: OpenedDayId }>(OPEN_DAY)
	const openedDayId = data?.opened_day_id
	const onHeaderClick = async () => {
		await openDay({
			variables: { id },
			refetchQueries: [{ query: OPENED_DAY_ID }],
		})
	}

	return (
		<div>
			<header>
				<button type="button" onClick={onHeaderClick}>
					{label}
				</button>
			</header>
			{ openedDayId === id && sessions.map(props => (
				<SessionComponent key={props.id} {...props} />
			))}

			<style jsx>{`
				header {
					background: var(--dark);
					color: var(--light);
					font-weight: var(--font-weight-bold);
					padding: var(--spacing);
					border: 1px solid var(--white);
					margin-bottom: -1px;
				}
			`}
			</style>
		</div>
	)
}

export default Day
