import redirect from 'components/Redirect'

const [Component, getSSP] = redirect(
	url => url.replace('/panel/', '/panel#/'),
	{ statusCode: 302 }
)

export const getServerSideProps = getSSP
const Redirect: React.FC = () => <Component />

export default Redirect
