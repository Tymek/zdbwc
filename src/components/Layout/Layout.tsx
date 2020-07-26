import Link from 'next/link'
import dynamic from 'next/dynamic'

const OfflineInfo = dynamic(() => import('./components/OfflineInfo'), { ssr: false })

const Layout: React.FC = ({ children }) => (
	<div className="container">
		<header>
			<Link href="/">
				<img src="/static/images/logo.svg" alt="logo" />
			</Link>
			<OfflineInfo />
		</header>

		{ children }

		<footer>crafted by <a href="//tymek.cz">Tymek.Cz</a></footer>
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
				padding: calc(var(--spacing) * 3) calc(var(--spacing) * 3) calc(var(--spacing) * 2.25);
				display: flex;
				align-items: flex-end;
			}

			header img {
				height: 3.2rem;
				cursor: pointer;
				margin-bottom: calc(var(--spacing) / 4);
			}

			footer {
				display: none; /* TODO: ask about footer */
				opacity: 0.25;
				text-align: center;
				padding: var(--spacing);
			}
		`}
		</style>
	</div>
)

export default Layout
