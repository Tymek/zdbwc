import ListOfSessions from 'components/ListOfSessions'

// import { useQuery } from '@apollo/react-hooks'

const Home:React.FunctionComponent = () => (
	<>
		<main role="main">
			{/* <h1 className="title">
				Welcome to
				{' '}
				<a href="https://nextjs.org">Next.js!</a>
			</h1> */}
			<ListOfSessions />

		</main>

		<style jsx>{`
			main {
				display: flex;
				flex-grow: 1;
				flex-direction: column;
			}

			.title a {
				text-decoration: none;
			}

			.title a:hover,
			.title a:focus,
			.title a:active {
				text-decoration: underline;
			}

			.title {
				margin: 0;
				line-height: 1.15;
				font-size: 4rem;
			}
		`}
		</style>
	</>
)

export default Home
