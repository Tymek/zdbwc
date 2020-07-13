import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'

const AdminPanel = dynamic(() => import('components/panel'), { ssr: false })

const App: React.FC = () => (
	<AdminPanel />
)

export const getStaticProps: GetStaticProps<{ defaultLayout?: boolean }> = () => Promise.resolve({
	props: {
		defaultLayout: false,
	},
})

export default App
