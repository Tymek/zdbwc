import { useQuery } from '@apollo/client'
import moment from 'utils/moment'
import TimeRange from 'utils/moment/TimeRange'
import Error from 'pages/_error'

import { Session } from 'ts/schema'
import Day from './components/Day'
import SCHEDULE from './gql/schedule.gql'

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
	const { loading, error, data } = useQuery(SCHEDULE)

	if (loading) return <div style={{ textAlign: 'center' }}>Wczytywanie&hellip;</div>
	if (error) return <Error statusCode={503} title="Nie dodano agendy 😶" />
	if (!data) return null
	const { session }: { session: Session[] } = data

	const days = getDays(session)
	// eslint-disable-next-line unicorn/no-fn-reference-in-iterator
	const getSessions = (day: string) => session.filter(filterSessionsByDay(day)).sort(sortSessions)

	return (
		<div>
			<div className="grid">
				{days.map(day => (
					<Day key={day} id={day} sessions={getSessions(day)} />
				))}
			</div>
			<style jsx>{`
				.grid {
					border-bottom: var(--border-weight) solid var(--white);
				}
			`}
			</style>
		</div>
	)
}

export default ListOfDays
