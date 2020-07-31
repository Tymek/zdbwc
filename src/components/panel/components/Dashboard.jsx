import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Title } from 'react-admin'
import IframeResizer from 'iframe-resizer-react'
import sleep from 'utils/sleep'

const getToken = async () => {
	let attempts = 3
	let delay = 1e3
	let token = false

	const load = async () => {
		try {
			const response = await fetch('/api/stats', {
				credentials: 'include',
			})

			const json = await response.json()
			token = json?.token
		} catch (error) {
			console.error(error) // eslint-disable-line no-console
		}
	}

	do {
		attempts--

		await sleep(delay)
		await load()
	} while (!token && attempts)

	return token
}

const Dashboard = () => {
	const [token, setToken] = useState(false)

	useEffect(() => {
		getToken().then(value => setToken(value)).catch(() => setToken(null))
	}, [])

	return (
		<Card>
			<Title title="Zaplecze" />
			<CardContent style={{ marginTop: '-0.4rem' }}>
				{
					token ? (
						<IframeResizer
							src={[
								'https://analytics.scrlk.pl/index.php?module=Widgetize',
								'action=iframe',
								'moduleToWidgetize=Dashboard',
								'actionToWidgetize=index',
								`idSite=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`,
								'period=week',
								'date=today',
								`token_auth=${token}`,
							].join('&')}
							frameBorder="0"
							style={{ minWidth: '100%' }}
						/>
					) : (
						token !== null && token !== undefined ? (
							<span>Wczytywanie&hellip;</span>
						) : (
							<span>Wystąpił błąd wczytywania statystyk. Spróbuj ponownie później.</span>
						)
					)
				}
			</CardContent>
		</Card>
	)
}

export default Dashboard
