import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

import moment from 'utils/moment'
import { Session, Session_Insert_Input } from 'generated/schema'

const ADD = gql`
	mutation InserOneSession($session: session_insert_input!) {
		insert_session_one(object: $session) {
			created_at
		}
	}
`

const AddSession: React.FunctionComponent = () => {
	const { register, handleSubmit, errors } = useForm<Session>() // eslint-disable-line @typescript-eslint/unbound-method
	const [add, { data, error }] = useMutation(ADD, { errorPolicy: 'all' })
	const onSubmit = async (session: Session_Insert_Input): Promise<void> => {
		await add({
			variables: {
				session: {
					...session,
					start: moment(session.start).toDate(),
					end: moment(session.end).toDate(),
				},
			},
		})
	}
	const router = useRouter()
	useEffect(() => {
		if (error) {
			router.push('/login') // eslint-disable-line @typescript-eslint/no-floating-promises
		} else if (data) {
			router.push('/panel') // eslint-disable-line @typescript-eslint/no-floating-promises
		}
	}, [router, data, error])

	return (
		<div className="container">
			<header>
				<h2>Dodaj sesję</h2>
				<Link href="/panel"><a className="back">Powrót</a></Link>
				<button
					className="save"
					type="submit"
					onClick={handleSubmit(onSubmit)}
				>
					Zapisz
				</button>
			</header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="input-group">
					<input
						ref={register({ required: true })}
						name="name"
						placeholder="Nazwa"
						className={errors.name ? 'error' : ''}
					/>
				</div>
				<div className="input-group">
					<input
						ref={register({ required: true })}
						name="start"
						type="datetime-local"
						className={errors.start ? 'error' : ''}
					/>
					<span className="dash"> &ndash; </span>
					<input
						ref={register({ required: true })}
						name="end"
						type="datetime-local"
						className={errors.end ? 'error' : ''}
					/>
				</div>
				<div className="input-group">
					<input
						ref={register()}
						name="speaker"
						placeholder="Mówca (opcjonalnie)"
						className={errors.speaker ? 'error' : ''}
					/>
					<input
						ref={register()}
						name="location"
						placeholder="Lokalizacja (opcjonalnie)"
						className={errors.location ? 'error' : ''}
					/>
				</div>
				<div className="input-group">
					<textarea
						ref={register()}
						name="description"
						placeholder="Opis (opcjonalnie)"
						className={errors.description ? 'error' : ''}
					/>
				</div>
			</form>
			<style jsx>{`
				.container {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					width: 100%;
					max-width: 1020px;
					margin: 0 auto;
					padding: calc(var(--spacing) * 2);
				}

				header {
					display: flex;
					align-items: center;
				}

				.back {
					margin-left: auto;
					display: block;
					margin-right: calc(var(--spacing) * 2);
				}

				input {
					margin-bottom: var(--spacing);
				}

				.error {
					border-color: #cc4000;
					box-shadow: 0 1px 3px #cc4000;
				}

				.input-group {
					margin: 0 calc(0rem - (var(--spacing) * 2)) calc(var(--spacing) * 2);
					display: flex;
					flex-wrap: wrap;
				}

				.input-group > * {
					display: block;
					flex-grow: 1;
					margin-left: calc(var(--spacing) * 2);
					margin-right: calc(var(--spacing) * 2);
				}

				.dash {
					text-align: center;
					flex-grow: 0;
					line-height: 1.5em;
					margin-top: 0.333em;
				}
			`}
			</style>
		</div>
	)
}

export default AddSession
