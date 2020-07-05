import { useQuery, gql } from '@apollo/client'
import moment from 'utils/moment'
import Error from 'pages/_error'
import { Session as SessionType } from 'ts/graphql'
import TimeRange from 'utils/moment/Range'
import { useMedia } from 'utils/hooks'
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

	const rowSizing = useMedia(
		['(min-width: 1600px)'],
		['1fr'],
		'auto'
	)

	if (loading) return <Container>Wczytywanie&hellip;</Container>
	if (error || !data || !data.session?.length) return <Error statusCode={503} />
	const { session } = data
	const timeRange = new TimeRange(session[0].start, session[session.length - 1].end)
	const minutes = timeRange.duration().asMinutes()
	const offset = (props: SessionType): string => moment(props.start).diff(timeRange.start, 'minutes').toString()
	const duration = (props: SessionType): string => moment(props.end).diff(props.start, 'minutes').toString()
	const buckets = session.reduce((acc: SessionType[][], current: SessionType) => {
		for (let i = 0; i < acc.length; i += 1) {
			if (acc[i][0].start === current.start && acc[i][0].end === current.end) {
				acc[i].push(current)
				return acc
			}
		}

		acc.push([current])
		return acc
	}, [])

	return (
		<Container>
			<div className="items" style={{ gridTemplateRows: `repeat(${minutes}, ${rowSizing})` }}>
				{buckets.map(bucket => (
					<div
						className="bucket"
						key={bucket[0].id}
						style={{ gridRowStart: offset(bucket[0]), gridRowEnd: `span ${duration(bucket[0])}` }}
					>
						{ bucket.map(props => (
							<SessionItem key={props.id} {...props} />
						)) }
					</div>
				))}
			</div>
			<style jsx>{`
				.items {
					display: grid;
					grid-template-columns: repeat(auto-fit, 1fr);
				}

				.bucket {
					display: grid;
					margin-bottom: var(--spacing);
					grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
					grid-gap: var(--spacing);
				}
			`}
			</style>
		</Container>
	)
}

export default Schedule
