import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'

const AdminPanel = dynamic(
	() => import(/* webpackChunkName: "admin-panel" */ 'components/panel'),
	{
		ssr: false,
		loading: () => <p>Wczytywanie&hellip;</p>,
	}
)

const App: React.FC = () => (
	<AdminPanel />
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
