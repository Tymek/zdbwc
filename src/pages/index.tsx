import React, { FunctionComponent } from 'react'
import Head from 'next/head'
// import { useQuery } from '@apollo/react-hooks'
// import { gql } from 'apollo-boost'
// import Session from '../components/Session'

// const SESSIONS = gql`
//   {
//     session {
//       id
//       name
//       start
//       end
//     }
//   }
// `

const Home:FunctionComponent = () => {
	// const { loading, error, data } = useQuery(SESSIONS)

	// if (loading) return <p>Loading...</p>
	// if (error) return <p>Error :(</p>
	// const { session } = data

	return (
		<div className="container">
			<Head>
				<title key="title">App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main role="main">
				<h1 className="title">
					Welcome to
					{' '}
					<a href="https://nextjs.org">Next.js!</a>
				</h1>
				{/* {session.map(({
					id, name, start, end,
				}) => (
					<Session key={id} name={name} start={start} end={end} />
				))} */}
			</main>

			<style jsx>{`
				.title a {
					color: #0070f3;
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
		`}</style>
 
			<style global jsx>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	)
}

export default Home
