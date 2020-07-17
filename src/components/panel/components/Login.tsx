import { Login } from 'react-admin'
import { createMuiTheme } from '@material-ui/core'
// eslint-disable-next-line import/no-webpack-loader-syntax, import/extensions
import background from 'url-loader!../assets/most.jpg'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#f29146',
		},
		secondary: {
			main: '#009ed1',
		},
		success: {
			main: '#8bc751',
		},
	},
	shape: {
		borderRadius: 1,
	},
})

const MyLoginPage = (): JSX.Element => (
	<Login backgroundImage={background} theme={theme} />
)

export default MyLoginPage
