import Document, {
	Html,
	Head,
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
				<Head>
					<title key="title">zdbwc</title>
					<link rel="icon" href="/favicon.ico" />
					{/* TODO: https://github.com/shadowwalker/next-pwa#step-3-add-head-meta-example */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
