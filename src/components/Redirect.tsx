import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

type ReplaceLocationFunction = (url: string) => string
type RedirectOptions = {
	timeout?: number,
	statusCode?: number, // http response, probably 3XX, @see https://cz3.ch/dev-http-statusCode
	props?: Record<string, unknown>,
	content?: JSX.Element
}

const defaults = {
	timeout: 3,
	props: {},
}

/**
 * NextJS redirect page generator
 *
 * @param location can be string, or function returning string, were input is current URL
 * @param {Object} options - optional
 * @param {number} options.statusCode - is provided, it generates server-side `location` header
 * you should probably use 3XX, see https://cz3.ch/dev-http-statusCode
 * @param {number} options.timeout - browser-side `httpEquiv="Refresh"` delay
 * @param {Object} options.props - other server-side props to be passed when rendering page
 * @param {Object} options.content - customized client-side component displayed on redirect page
 * @example
 * ``` ts
 * const [Component, getSSP] = redirect('/url', { ...options })
 * export const getServerSideProps = getSSP
 * export default Component
 * ```
 */
const redirect = (
	location: string | ReplaceLocationFunction,
	options?: RedirectOptions
): [React.FC, GetServerSideProps] => {
	const {
		timeout,
		statusCode,
		content,
		props,
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
					content ?? <a href={newLocation}>{newLocation}</a>
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

		return Promise.resolve({ props })
	}

	return [Component, getServerSideProps]
}

export default redirect
