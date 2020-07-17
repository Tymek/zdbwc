import redirect from 'components/Redirect'

const [Component, getSSP] = redirect('/panel/login', { statusCode: 301 })

export const getServerSideProps = getSSP
const Login: React.FC = () => <Component />

export default Login
