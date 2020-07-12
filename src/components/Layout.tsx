import Link from 'next/link'

const Layout: React.FC = ({ children }) => (
	<div className="container">
		<header>
			<Link href="/">
				<img src="/logo.svg" alt="logo" />
			</Link>
		</header>

		{ children }

		<style jsx>{`
			.container {
				display: flex;
				flex-grow: 1;
				flex-direction: column;
				margin: 0 auto;
				max-width: 1020px;
				width: 100%;
				padding: 0 calc(var(--spacing) * 2);
			}

			header {
				padding: calc(var(--spacing) * 3) 0 calc(var(--spacing) * 2.5);
				/* background: var(--dark); */
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
