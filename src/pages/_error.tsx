import { Component } from 'react'
import Head from 'next/head'
import { NextPageContext } from 'next'
import Link from 'next/link'

const statusCodes: { [code: number]: string } = {
	400: 'Błędne żądanie 🧐',
	404: 'Nie znaleziono 🥺',
	405: 'Metoda zabroniona 🙄',
	500: 'Awaria serwera 😟',
}

const unknownError = 'Wystąpił niespodziewany błąd serwera 😕'

export type ErrorProps = {
	statusCode: number
	title?: string
}

function initialPropsGetter({
	res,
	err,
}: NextPageContext): Promise<ErrorProps> | ErrorProps {
	const statusCode: number = (res && res.statusCode) || (err && err.statusCode) || 404
	return { statusCode }
}

export default class Error<P = unknown> extends Component<P & ErrorProps> {
	static displayName = 'ErrorPage'

	static getInitialProps = initialPropsGetter

	static origGetInitialProps = initialPropsGetter

	render(): React.ReactElement {
		const { statusCode } = this.props
		const title = this.props.title // eslint-disable-line react/destructuring-assignment
			|| statusCodes[statusCode]
			|| unknownError

		return (
			<div style={styles.error}>
				<Head>
					<title>
						{statusCode ? `${statusCode}: ` : ''}{title}
					</title>
				</Head>
				<div>
					{ statusCode === 404 ? (
						<>
							<blockquote>
								A liczba jego:
								<strong style={{ color: 'red' }}> czterysta cztery</strong>, nie znaleziono.
							</blockquote>
							<p>Przepraszam! Nie potrafimy zlokalizować strony o którą pytasz.</p>
							<p><span role="img" aria-label="sorry" style={{ fontSize: '3rem' }}>🥺</span></p>
							<Link href="/"><a>Strona główna</a></Link>
						</>
					) : (
						<>
							{ statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null }
							<div style={styles.desc}>
								<h2 style={styles.h2}>{title}</h2>
							</div>
						</>
					)}
				</div>
			</div>
		)
	}
}

const styles: { [k: string]: React.CSSProperties } = {
	error: {
		background: '#fff',
		// height: '100vh',
		flexGrow: 1,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},

	desc: {
		display: 'inline-block',
		textAlign: 'left',
		lineHeight: '3.6rem',
		height: '3.4rem',
		verticalAlign: 'middle',
	},

	h1: {
		display: 'inline-block',
		borderRight: '1px solid rgba(0, 0, 0,.3)',
		margin: 0,
		marginRight: '20px',
		padding: '10px 23px 10px 0',
		fontSize: '24px',
		fontWeight: 500,
		verticalAlign: 'top',
	},

	h2: {
		fontSize: '14px',
		fontWeight: 'normal',
		lineHeight: 'inherit',
		margin: 0,
		padding: 0,
	},
}
