import { useMemo, useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { Admin, Resource } from 'react-admin'
import { AdminProps, DataProvider } from 'ra-core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import moment from 'utils/moment'
import createAuthProvider from './utils/authProvider'
import theme from './utils/theme'
import StyleReset from './components/StyleReset'
import Login from './components/Login'
import i18nProvider from './utils/i18nProvider'
import { SessionList, SessionEdit, SessionCreate, SessionShow } from './components/Session'
import { TopicList, TopicEdit, TopicCreate } from './components/Topic'

const ReactAdmin = Admin as React.FC<AdminProps>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RaDataHasuraGraphql = ({ client }: { client: any }) => Promise<DataProvider>

const App = (): JSX.Element => {
	const client = useApolloClient()
	const [dataProvider, setDataProvider] = useState<DataProvider | null>(null)
	const authProvider = useMemo(() => createAuthProvider({ client }), [client])

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		(async () => {
			try {
				const createProvider = (
					await import(/* webpackChunkName: "admin-panel-provider" */ 'ra-data-hasura-graphql') as unknown
				) as RaDataHasuraGraphql
				const provider = await createProvider({ client })
				setDataProvider(() => provider)
			} catch {
				setDataProvider(null)
			}
		})()
	}, [client, setDataProvider])

	return authProvider && dataProvider ? (
		<MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="pl">
			<ReactAdmin
				theme={theme}
				loginPage={Login}
				authProvider={authProvider}
				dataProvider={dataProvider}
				i18nProvider={i18nProvider}
			>
				<Resource
					name="session"
					icon={ScheduleIcon}
					list={SessionList}
					edit={SessionEdit}
					create={SessionCreate}
					show={SessionShow}
				/>
				<Resource
					name="topic"
					icon={SpeakerNotesIcon}
					list={TopicList}
					edit={TopicEdit}
					create={TopicCreate}
				/>
			</ReactAdmin>
			<StyleReset />
		</MuiPickersUtilsProvider>
	) : <></>
}

export default App
