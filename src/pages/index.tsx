import ListOfDays, { queries as scheduleQueries } from 'components/Schedule'
import Notifications, { queries as notificationQueries } from 'components/Notifications'
import { GetStaticProps } from 'next'
import { precacheQueries } from 'utils/graphql'

const Home:React.FC = () => (
	<>
		<main role="main">
			<Notifications head />
			<ListOfDays />
			<Notifications />
		</main>

		<style jsx>{`
			main {
				display: flex;
				flex-grow: 1;
				flex-direction: column;
			}
		`}
		</style>
	</>
)

export const getStaticProps: GetStaticProps = precacheQueries([...scheduleQueries, ...notificationQueries])

export default Home
