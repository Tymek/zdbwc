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
	const statusCode: number = res?.statusCode ?? err?.statusCode ?? 404
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
			<div className="error">
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
							<p><span role="img" aria-label="sorry" style={{ fontSize: '2.5rem' }}>🥺</span></p>
							<Link href="/"><a>Strona główna</a></Link>
						</>
					) : (
						<>
							{ statusCode ? <h1>{statusCode}</h1> : null }
							<div className="desc">
								<h2>{title}</h2>
							</div>
						</>
					)}
				</div>
				<style jsx>{`
					.error {
						background: #fff;
						padding: calc(var(--spacing) * 3);
						flex-grow: 1;
						text-align: center;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}

					.desc {
						display: inline-flex;
						text-align: left;
						height: 3.1rem;
						align-items: center;
					}

					h1 {
						display: inline-block;
						border-right: 1px solid rgba(0, 0, 0,.3);
						margin: 0;
						margin-right: 20px;
						padding: 10px 23px 10px 0;
						font-size: 24px;
						font-weight: 500;
						vertical-align: top;
					}

					h2 {
						font-size: 14px;
						font-weight: 300;
						line-height: inherit;
						margin: 0;
						padding: 0;
					}
				`}
				</style>
			</div>
		)
	}
}
