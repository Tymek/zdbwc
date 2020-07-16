import { Login } from 'react-admin'
import { createMuiTheme } from '@material-ui/core'

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
	<Login backgroundImage="/static/panel/most.jpg" theme={theme} />
)

export default MyLoginPage
