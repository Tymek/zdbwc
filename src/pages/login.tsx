import { Mutation_RootLoginArgs } from 'ts/graphql'
import { useForm } from 'react-hook-form'
import { useMutation, gql } from '@apollo/client'

const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			username
			id
		}
	}
`

const Login:React.FunctionComponent = () => {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { register, handleSubmit, errors } = useForm<Mutation_RootLoginArgs>()
	const onSubmit = async (variables: Mutation_RootLoginArgs): Promise<void> => {
		console.info('submit', variables)
		await login({ variables })
	}
	const [login, { data }] = useMutation(LOGIN)

	console.log('errors', errors)

	return (
		<>
			<main role="main">
				{ JSON.stringify(data) }
				{ (errors.username || errors.password) && <p>Wpisz poprawną nazwę użytkownika i hasło</p> }
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="input-group">
						<input
							ref={register({ required: true })}
							name="username"
							placeholder="login"
							className={errors.username ? 'error' : ''}
						/>
					</div>
					<div className="input-group">
						<input
							ref={register({ required: true })}
							name="password"
							type="password"
							placeholder="hasło"
							className={errors.password ? 'error' : ''}
						/>
					</div>
					<div className="input-group">
						<button type="submit">Zaloguj się</button>
					</div>
				</form>
			</main>

			<style jsx>{`
				main {
					display: flex;
					flex-grow: 1;
					flex-direction: column;
					padding: var(--spacing);
					text-align: center;
					padding: 2rem 0;
				}

				input {
					-webkit-appearance: none;
					border-radius: var(--border-radius);
					border: 1px solid var(--dark);
					line-height: 1.5em;
					font-size: 1em;
					padding: 0.25em 0.5em;
					box-shadow: none;
					font-family: inherit;
				}

				button {
					-webkit-appearance: none;
					font-family: inherit;
					box-shadow: none;
					border: 1px solid var(--dark);
					border-radius: var(--border-radius);
					background: var(--dark);
					color: var(--white);
					box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.2);
					line-height: 1.5em;
					font-size: 1em;
					padding: 0.25em 0.5em;
				}

				.error {
					border-color: #cc4000;
				}

				.input-group {
					margin-bottom: var(--spacing);
				}
			`}
			</style>
		</>
	)
}

export default Login
