import redirect from 'components/Redirect'

const [Component, getSSP] = redirect(
	url => url.replace('/panel/', '/panel#/'),
	{
		statusCode: 302,
		props: {
			analytics: false,
		},
	}
)

export const getServerSideProps = getSSP
const Redirect: React.FC = () => <Component />

export default Redirect
