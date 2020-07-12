import ListOfDays from 'components/Schedule'

const Home:React.FC = () => (
	<>
		<main role="main">
			<ListOfDays />
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

export default Home
