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

		<footer>
			<span>&copy; 2020 <a href="//zdobywcy.org">Projekt Zdobywcy</a></span>
			<span className="version" aria-hidden>v{process.env.VERSION}</span>
			<span>crafted by <a href="https://www.tymek.cz">Tymek.Cz</a></span>
		</footer>
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
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				padding: var(--spacing) calc(var(--spacing) * 2.5);
				color: var(--gray);
			}

			footer a {
				color: inherit;
			}

			footer a:hover,
			footer a:focus,
			footer a:active {
				color: var(--primary);
			}

			.version {
				color: var(--light);
			}
		`}
		</style>
	</div>
)

export default Layout
