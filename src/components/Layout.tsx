import Link from 'next/link'

const Layout: React.FC = ({ children }) => (
	<div className="container">
		<header>
			<Link href="/">
				<img src="/static/images/logo.svg" alt="logo" />
			</Link>
		</header>

		{ children }

		<style jsx>{`
			.container {
				display: flex;
				flex-grow: 1;
				flex-direction: column;
				margin: 0 auto;
				max-width: 60rem;
				width: 100%;
			}

			header {
				padding: calc(var(--spacing) * 3) calc(var(--spacing) * 3) calc(var(--spacing) * 2.5);
				display: flex;
			}

			header img {
				width: 5rem;
				cursor: pointer;
			}
		`}
		</style>
	</div>
)

export default Layout
