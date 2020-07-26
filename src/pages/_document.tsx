import Document, {
	Html,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from 'next/document'

export const lang = 'pl'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render(): JSX.Element {
		return (
			<Html lang={lang}>
				<body>
					<Main />
					<NextScript />
					<noscript>
						<p>Ta strona wymaga obsługi JavaScriptu.</p>
						<p>Alternatywnie, <span lang="en">GraphQL API introspection</span> z wiersza poleceń. 🤓</p>
						<code>
							curl -X POST https://api.zdbwc.scrlk.pl/v1/graphql
							{' -H \'Content-Type: application/json; charset=utf-8\''}
							{' --data \'{ "query": "{__type(name:\\"session\\"){fields{name}}}" }\''}
						</code>
					</noscript>
				</body>
			</Html>
		)
	}
}

export default MyDocument
