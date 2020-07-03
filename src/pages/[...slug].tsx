import { useRouter } from 'next/router'
import ErrorPage from 'pages/_error'
import { NextPageContext, NextPage } from 'next'

export type Props = {
	statusCode: number
}

const Page: NextPage<Props> = ({ statusCode }) => {
	const router = useRouter()
	console.info(router)

	return <ErrorPage statusCode={statusCode === 200 ? 404 : statusCode} />
	// return <p>{JSON.stringify(router.query)}</p>
}

Page.getInitialProps = (ctx: NextPageContext) => {
	// const res = await fetch('https://api.github.com/repos/vercel/next.js')
	// const json = await res.json()
	// return { stars: json.stargazers_count }
	const statusCode = ctx.res?.statusCode || 404
	return { statusCode }
}

export default Page
