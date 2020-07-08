import { useQuery, gql, useMutation, MutationUpdaterFn } from '@apollo/client'
import moment from 'utils/moment'
import AddIcon from 'assets/icons/add.svg'
import TrashIcon from 'assets/icons/trash.svg'

import { Session } from 'generated/schema'
import { useRouter } from 'next/router'

export const QUERY = gql`
  query GetSessions {
    session(order_by: {start: asc, end: asc, created_at: asc}) {
			id
			name
      start
      end
			speaker
			location
    }
  }
`

export const DELETE = gql`
	mutation DeleteSession($id: uuid!) {
		delete_session(where: {id: {_eq: $id}}) {
			returning {
				id
			}
		}
	}
`

const updateCache: MutationUpdaterFn<{delete_session: { returning: Session[] } }> = (cache, mutationResult) => {
	const returning = mutationResult?.data?.delete_session.returning
	const sessions = (cache.readQuery({ query: QUERY }) as { session: Session[] })?.session
	if (returning && sessions) {
		const ids = new Set(returning.map(({ id }) => id))
		cache.writeQuery({
			query: QUERY,
			data: { session: sessions.filter(({ id }) => !ids.has(id)) },
		})
	}
}

const ListOfSessions: React.FunctionComponent = () => {
	const { loading, error, data } = useQuery(QUERY)
	const [remove, { loading: removing, error: mutationError }] = useMutation(
		DELETE,
		{ errorPolicy: 'all', update: updateCache }
	)
	const router = useRouter()

	const onRemove = (id: string, name: string) => () =>
		window.confirm(`Czy na pewno chcesz usunąć sesję? \n"${name}"`) // eslint-disable-line no-alert
		&& remove({ variables: { id } })

	if (loading) return <div>Wczytywanie&hellip; {/* TODO: loading state container */}</div>
	if (error) return <div>TODO: error empty state</div>
	if (mutationError) {
		router.push('/login') // eslint-disable-line @typescript-eslint/no-floating-promises
	}
	const { session }: { session: Session[] } = data

	return (
		<div className="container">
			<div className="list">
				{session.map(({ id, name, start, end, speaker, location }) => (
					<div key={id} className="session">
						<div className="session__column sesssion__time">
							<span>{ moment(start).format('dddd, HH:mm') }</span>&ndash;
							<span>{ moment(end).format('HH:mm') }</span>
						</div>
						<div className="session__column session__name">
							<h2>{name}</h2>{
								speaker && <>&nbsp;&ndash; <span>{speaker}</span></>
							}{
								location && <>&nbsp;&ndash; <span>{location}</span></>
							}
						</div>
						<div className="session__actions">
							<button
								className="delete"
								type="button"
								onClick={onRemove(id, name)}
								disabled={removing}
							>
								<span className="icon">
									<TrashIcon width="1em" height="1em" className="icon" />
								</span> Usuń
							</button>
						</div>
					</div>
				))}
			</div>
			<button
				className="add"
				type="button"
				onClick={() => router.push('/panel/dodaj')}
			>
				<span className="icon">
					<AddIcon width="1em" height="1em" className="icon" />
				</span> Dodaj sesję
			</button>
			<style jsx>{`
				.container {
					flex-grow: 1;
					padding: calc(var(--spacing) * 1) calc(var(--spacing) * 2);
					background: var(--light);
					color: var(--dark);
					width: 100%;
					margin: 0 auto;
					max-width: 1366px;
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.list {
					width: 100%;
					display: flex;
					flex-direction: column;
				}

				.session {
					position: relative;
					display: flex;
					flex-wrap: wrap;
					border-radius: var(--border-radius);
					box-shadow: var(--box-shadow);
					background: var(--white);
					margin: var(--spacing) 0;
				}

				.session:nth-child(even) {
					background: #f4f4f4;
				}

				.session__column {
					margin: var(--spacing) calc(var(--spacing) * 2);
					flex-grow: 0;
				}

				.sesssion__time {
					flex-grow: 2;
					max-width: 15em;
				}

				.session__name {
					flex-shrink: 2;
				}

				.session__name h2 {
					font-size: 1em;
					margin: 0;
					font-weight: 600;
					display: inline;
				}

				.session__actions {
					margin-left: auto;
					display: flex;
					align-items: stretch;
				}

				.add {
					font-size: 1.333333333em;
					padding: var(--spacing) calc(var(--spacing) * 2);
					margin-top: calc(var(--spacing) * 2);
				}

				.delete {
					padding: calc(var(--spacing) / 3) calc(var(--spacing) * 2);
					border-radius: 0 var(--border-radius) var(--border-radius) 0;
				}

				.icon {
					font-size: 0.75em;
				}

				@media only screen and (max-width: 1020px) {
					.session {
						display: block;
					}

					.delete {
						position: absolute;
						right: calc(var(--spacing) / 3 * 2);
						top: calc(var(--spacing) / 3 * 2);
						border-radius: var(--border-radius);
						padding: calc(var(--spacing) / 3) calc(var(--spacing));
					}
				}
			`}
			</style>
		</div>
	)
}

export default ListOfSessions
