import { useQuery, gql } from '@apollo/client'
import moment from 'utils/moment'
import Error from 'pages/_error'
import { Session as SessionType } from 'ts/graphql'
import TimeRange from 'utils/moment/Range'
import SessionItem from './Session'

export const QUERY = gql`
	query Schedule($start: timestamptz!, $end: timestamptz!) {
		session(
			where: {start: {_gte: $start}, end: {_lte: $end}},
			order_by: {start: asc, end: asc}
		) {
			id
			name
			speaker
			location
			start
			end
		}
	}
`

const Container: React.FunctionComponent = ({ children }) => (
	<>
		<div className="container">
			{children}
		</div>
		<style jsx>{`
			.container {
				flex-grow: 1;
			}
		`}
		</style>
	</>
)

const Schedule: React.FunctionComponent<{ day: string }> = ({ day }) => {
	const start = moment(day).startOf('day').toISOString() // TODO: refactor to function and reuse for preload
	const end = moment(start).add(1, 'day').toISOString()

	const { loading, error, data } = useQuery<{ session: SessionType[] }>(QUERY, {
		variables: {
			start,
			end,
		},
	})

	if (loading) return <Container>Wczytywanie&hellip;</Container>
	if (error || !data || !data.session?.length) return <Error statusCode={503} />
	const { session } = data
	const duration = new TimeRange(session[0].start, session[session.length - 1].end)

	return (
		<Container>
			<div className="items">
				{session.map(props => (
					<SessionItem key={props.id} {...props} />
				))}
			</div>
			{JSON.stringify(duration)}
			<style jsx>{`

			`}
			</style>
		</Container>
	)
}

export default Schedule
