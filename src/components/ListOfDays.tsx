import { useQuery, gql } from '@apollo/client'
import moment from 'utils/moment'
import Range from 'utils/moment/Range'

import { Session } from 'ts/graphql'
// import SessionItem from './Session'

export const QUERY = gql`
  {
    session {
      start
      end
    }
  }
`

const ListOfDays: React.FunctionComponent = () => {
	const { loading, error, data } = useQuery(QUERY)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>
	const { session }: { session: Session[] } = data

	const days = [...(
		new Set<string>(
			session.flatMap(
				({ start, end }) => (new Range(start, end)).getDays()
			)
		)
	)]

	return (
		<div>
			{days.map(day => (
				moment(day).format('YYYY-MM-DD')
			))}
			{/* {session.map(({
				id, name, start, end,
			}) => (
				<SessionItem key={id} name={name} start={start} end={end} />
			))} */}
			<style jsx>{`
				div {
					padding: 1rem 2rem;
				}
			`}
			</style>
		</div>
	)
}

export default ListOfDays
