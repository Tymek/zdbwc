import { useEffect, useState } from 'react'
import { useQuery, NetworkStatus } from '@apollo/client'
import moment from 'utils/moment'
import dynamic from 'next/dynamic'
import TimeRange from 'utils/moment/TimeRange'
import Error from 'pages/_error'

import { Session } from 'ts/schema'
import useLastUpdate from 'utils/hooks/useLastUpdate'
import SCHEDULE from './gql/schedule.gql'

const pollInterval = process.env.NODE_ENV !== 'production' || process.env.DEBUG === 'true' ? 6e3 : 15e3 // 15s

const Day = dynamic(() => import('./components/Day'))

const getDays = (session: Session[]): string[] => [...(
	new Set<string>(
		session.flatMap(
			({ begins_at, ends_at }: Session): string[] => {
				if (ends_at) {
					return (new TimeRange(begins_at, ends_at)).getDays()
				}

				return [moment(begins_at).format('YYYY-MM-DD')]
			}
		).sort()
	)
)]

const sortSessions = (a: Session, b: Session) => {
	if (moment(a.begins_at).isBefore(moment(b.begins_at))) {
		return -1
	}

	if (moment(a.begins_at).isSame(moment(b.begins_at))) {
		return 0
	}

	return 1
}

const filterSessionsByDay = (day: string) => ({ begins_at, ends_at }: Session) => {
	const currentDay = moment(day)
	const nextDay = moment(day).add(1, 'day')

	if (moment(begins_at).isSameOrAfter(currentDay) && moment(begins_at).isBefore(nextDay)) {
		return true
	}
	if (moment(ends_at).isSameOrAfter(currentDay) && moment(ends_at).isBefore(nextDay)) {
		return true
	}
	if (moment(begins_at).isBefore(currentDay) && moment(ends_at).isSameOrAfter(nextDay)) {
		return true
	}

	return false
}

const ListOfDays: React.FC = () => {
	const [session, setSession] = useState<Session[]>()
	const { loading, data, networkStatus } = useQuery<{ session: Session[] }>(SCHEDULE, {
		pollInterval,
		fetchPolicy: 'cache-and-network',
		notifyOnNetworkStatusChange: true,
	})

	useLastUpdate(networkStatus === NetworkStatus.ready)

	useEffect(() => {
		if (data?.session) {
			setSession(data.session)
		}
	}, [data])

	if (loading && !session) return <div style={{ textAlign: 'center' }}>Wczytywanie&hellip;</div>
	if (!session) return <Error statusCode={503} title="Błąd wczytywania agendy 😶" />

	const getSessions = (day: string) => session.filter(filterSessionsByDay(day)).sort(sortSessions)

	const days = getDays(session)
	const last = days[days.length - 1]

	return (
		<div>
			<div className="grid">
				{days.map(day => (
					<Day key={day} id={day} sessions={getSessions(day)} last={day === last} />
				))}
			</div>
			<style jsx>{`
				.grid {
					margin-bottom: calc(1rem / 16);
				}
			`}
			</style>
		</div>
	)
}

export default ListOfDays
