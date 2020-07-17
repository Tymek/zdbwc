import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

type ReplaceLocationFunction = (url: string) => string
type RedirectOptions = {
	timeout?: number,
	statusCode?: number,
	content?: JSX.Element
}

const defaults = {
	timeout: 3,
}

const redirect = (
	location: string | ReplaceLocationFunction,
	options?: RedirectOptions
): [React.FC, GetServerSideProps] => {
	const {
		timeout,
		statusCode,
		content,
	} = {
		...defaults,
		...options,
	}

	const Component: React.FC = () => {
		const { asPath: path } = useRouter()
		const newLocation = typeof location === 'string' ? location : location(path)

		return (
			<>
				<Head>
					<meta httpEquiv="Refresh" content={`${statusCode ? '0' : timeout || '0'}; URL=${newLocation}`} />
				</Head>
				{
					content || <a href={newLocation}>{newLocation}</a>
				}
			</>
		)
	}

	const getServerSideProps: GetServerSideProps = context => {
		if (statusCode) {
			context.res.writeHead(statusCode, {
				location: typeof location === 'string' ? location : location(context.req.url as string),
			})
			context.res.end()
		}

		return Promise.resolve({ props: {} })
	}

	return [Component, getServerSideProps]
}

export default redirect
