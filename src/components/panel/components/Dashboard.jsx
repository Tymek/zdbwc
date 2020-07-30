import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Title } from 'react-admin'
import IframeResizer from 'iframe-resizer-react'

const Dashboard = () => {
	const [token, setToken] = useState('')

	useEffect(() => {
		(async () => {
			const response = await fetch('/api/stats', {
				credentials: 'include',
			})

			setToken((await response.json())?.token)
		})()
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
								`idSite=${process.env.ANALYTICS_PAGEID}`,
								'period=week',
								'date=today',
								`token_auth=${token}`,
							].join('&')}
							frameBorder="0"
							style={{ minWidth: '100%' }}
						/>
					) : <span>Wczytywanie&hellip;</span>
				}
			</CardContent>
		</Card>
	)
}

export default Dashboard
