import Link from 'next/link'

const Layout: React.FunctionComponent = ({ children }) => (
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
			}

			header {
				padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4) calc(var(--spacing) * 2);
				background: var(--dark);
			}

			header img {
				max-height: 3rem;
				cursor: pointer;
			}
		`}
		</style>
	</div>
)

export default Layout
