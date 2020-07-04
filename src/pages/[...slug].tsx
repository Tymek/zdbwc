import { useRouter } from 'next/router'
import ErrorPage from 'pages/_error'
import { NextPage } from 'next'
import Schedule from 'components/Schedule'

export type Props = {
	statusCode: number
}

const Container: React.FunctionComponent = ({ children }) => (
	<>
		<div className="container">
			{children}
		</div>
		<style jsx>{`
			.container {
				flex-grow: 1;
				padding: 1rem 2rem;
			}
		`}
		</style>
	</>
)

const Page: NextPage<Props> = () => {
	const { slug } = useRouter().query

	if (!slug) return <Container>Wczytywanie&hellip;</Container>
	const [id, day] = slug || []
	if (id !== 'dzień' || !day || !/^\d{4}-\d{2}-\d{2}$/.exec(day)) {
		return <ErrorPage statusCode={404} />
	}

	return (
		<Container>
			<Schedule day={day} />
		</Container>
	)
}

export default Page
