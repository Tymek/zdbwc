import { useQuery, gql } from '@apollo/client'

import { Session } from 'ts/graphql'
import SessionItem from './Session'

export const QUERY = gql`
  {
    session {
			id
      start
      end
    }
  }
`

const SessionList: React.FunctionComponent = () => {
	const { loading, error, data } = useQuery(QUERY)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>
	const { session }: { session: Session[] } = data

	return (
		<div>
			{session.map(({
				id, name, start, end,
			}) => (
				<SessionItem key={id} name={name} start={start} end={end} />
			))}
			<style jsx>{`
				div {
					padding: 1rem 2rem;
				}
			`}
			</style>
		</div>
	)
}

export default SessionList
