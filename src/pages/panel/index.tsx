import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import { black, white } from 'utils/theme.json' // eslint-disable-line import/extensions
import Head from 'next/head'

const AdminPanel = dynamic(
	() => import(/* webpackChunkName: "admin-panel" */ 'components/panel'),
	{
		ssr: false,
		loading: () => (
			<div
				style={{
					background: black,
					color: white,
					padding: '1.5rem',
					boxSizing: 'border-box',
					margin: '-10px -1rem',
					height: '69px',
				}}
			>
				Wczytywanie&hellip;
			</div>
		),
	}
)

const App: React.FC = () => (
	<>
		<Head>
			{/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
			<title>Zaplecze 🔧 zdbwc.scrlk.pl</title>
			<meta name="theme-color" content="#111111" />
		</Head>
		<AdminPanel />
	</>
)

export const getStaticProps: GetStaticProps<{
	defaultLayout?: boolean,
	analytics?: boolean,
}> = () => Promise.resolve({
	props: {
		defaultLayout: false,
		analytics: false,
	},
})

export default App
