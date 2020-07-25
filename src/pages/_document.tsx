import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from 'next/document'
import Analytics from 'components/Analytics'

export const lang = 'pl'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render(): JSX.Element {
		return (
			<Html lang={lang}>
				<Head>
					{/* TODO: https://github.com/shadowwalker/next-pwa#step-3-add-head-meta-example */}
				</Head>
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
					<Analytics />
				</body>
			</Html>
		)
	}
}

export default MyDocument
