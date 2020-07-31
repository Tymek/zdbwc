import Link from 'next/link'
import dynamic from 'next/dynamic'
import StyleVariables from 'components/styles/Variables'
import GlobalStyle from './components/GlobalStyle'

const OfflineInfo = dynamic(() => import('./components/OfflineInfo'), { ssr: false })

const Layout: React.FC = ({ children }) => (
	<div className="container">
		<StyleVariables />
		<GlobalStyle />
		<header>
			<Link href="/">
				<img src="/static/images/logo.svg" alt="logo" />
			</Link>
			<OfflineInfo />
		</header>

		{ children }

		<footer>
			<span className="version" aria-hidden>v{process.env.VERSION}</span>
			<span className="copyright">
				&copy; 2020 <a href="http://zdobywcy.org/konferencja-zdobywcy/">Konferencja Zdobywcy</a>
			</span>
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
				padding: 0 calc(var(--spacing) * 2.5) var(--spacing);
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
				width: 100%;
				text-align: center;
				color: var(--light);
			}

			.copyright {
				margin-right: var(--spacing);
			}
		`}
		</style>
	</div>
)

export default Layout
