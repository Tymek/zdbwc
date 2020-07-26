import redirect from 'components/Redirect'
import { GetStaticProps } from 'next'

const [Component, getSSP] = redirect(
	url => url.replace('/panel/', '/panel#/'),
	{ statusCode: 302 }
)

export const getServerSideProps = getSSP
const Redirect: React.FC = () => <Component />

export const getStaticProps: GetStaticProps<{ analytics?: boolean }> = () => Promise.resolve({
	props: {
		analytics: false,
	},
})

export default Redirect
