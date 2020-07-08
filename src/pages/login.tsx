import { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Mutation_RootLoginArgs, Mutation_Root } from 'generated/schema'

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
	const [login, { data, error }] = useMutation(LOGIN, { errorPolicy: 'all' })
	const onSubmit = async (variables: Mutation_RootLoginArgs): Promise<void> => {
		await login({ variables })
	}

	const router = useRouter()
	useEffect(() => {
		const userInfo = (data as Mutation_Root)?.login
		if (userInfo) {
			router.push('/panel') // eslint-disable-line @typescript-eslint/no-floating-promises
		}
	}, [data, router])

	return (
		<>
			<main role="main">
				{ (errors.username || errors.password || error) && <p>Wpisz poprawną nazwę użytkownika i hasło</p> }
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
