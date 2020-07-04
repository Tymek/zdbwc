import { useQuery, gql } from '@apollo/client'
import moment from 'utils/moment'
import TimeRange from 'utils/moment/Range'
import Error from 'pages/_error'

import { Session } from 'ts/graphql'
import Link from 'next/link'

export const QUERY = gql`
  {
    session {
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
				padding: 1rem 2rem;
				background: var(--dark-background);
				color: var(--background);
			}
		`}
		</style>
	</>
)

const ListOfDays: React.FunctionComponent = () => {
	const { loading, error, data } = useQuery(QUERY)

	if (loading) return <Container>Wczytywanie&hellip;</Container>
	if (error) return <Error statusCode={503} />
	const { session }: { session: Session[] } = data

	const days = [...(
		new Set<string>(
			session.flatMap(
				({ start, end }) => (new TimeRange(start, end)).getDays()
			).sort()
		)
	)]

	return (
		<Container>
			<div className="grid">
				{days.map(day => (
					<Link key={day} href={`dzień/${moment(day).format('YYYY-MM-DD')}`}>
						<a className="day">
							<div className="day__container">
								<div className="day__name">{ moment(day).format('dddd') }</div>
								<div className="day__date">{ moment(day).format('LL') }</div>
							</div>
						</a>
					</Link>
				))}
			</div>
			<style jsx>{`
				.grid {
					display: grid;
					grid-gap: 2rem;
					grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
				}

				.day {
					position: relative;
					text-align: center;
					color: var(--foreground);
					background: var(--background);
					border-radius: var(--border-radius);
				}

				.day:hover, .day:focus, .day:active {
					color: var(--accent);
				}

				.current.day {
					color: var(--background-dark);
					background: var(--accent);
				}

				.current.day:hover, .current.day:focus, .current.day:active {
					color: var(--foreground);
				}

				.day::before {
					content: "";
					padding-bottom: 95%;
					display: inline-block;
					vertical-align: top;
				}

				.day__container {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
				}

				.day__name {
					/* font-size: 1.2rem; */
					/* font-size: 1.5rem; */
					letter-spacing: 0.1rem;
					text-transform: uppercase;
					font-weight: bold;
				}

				.day__date {
					font-size: 1em;
					padding-bottom: 0.5rem;
				}
			`}
			</style>
		</Container>
	)
}

export default ListOfDays
