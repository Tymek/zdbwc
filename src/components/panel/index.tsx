import { useMemo, useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { Admin, Resource } from 'react-admin'
import { AdminProps, DataProvider } from 'ra-core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import StyleVariables from 'components/styles/Variables'
import buildHasuraProvider from 'ra-data-hasura-graphql'

import moment from 'utils/moment'
import createAuthProvider from './utils/authProvider'
import theme from './utils/theme'
import StyleReset from './components/StyleReset'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import i18nProvider from './utils/i18nProvider'
import { SessionList, SessionEdit, SessionCreate, SessionShow } from './components/Session'
import { NotificationList, NotificationCreate, NotificationEdit } from './components/Notification'
import { TopicList, TopicEdit, TopicCreate } from './components/Topic'

const ReactAdmin = Admin as React.FC<AdminProps>

const App = (): JSX.Element => {
	const client = useApolloClient()
	const [dataProvider, setDataProvider] = useState<DataProvider | null>(null)
	const authProvider = useMemo(() => createAuthProvider({ client }), [client])

	useEffect(() => {
		buildHasuraProvider({ client })
			.then(newDataProvider => setDataProvider(
				() => newDataProvider // eslint-disable-line @typescript-eslint/no-unsafe-return
			))
			.catch(() => setDataProvider(null))
	}, [client, setDataProvider])

	return authProvider && dataProvider ? (
		<MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="pl">
			<ReactAdmin
				theme={theme}
				loginPage={Login}
				authProvider={authProvider}
				dataProvider={dataProvider}
				i18nProvider={i18nProvider}
				dashboard={Dashboard}
			>
				<Resource
					name="notification"
					icon={NotificationsIcon}
					create={NotificationCreate}
					edit={NotificationEdit}
					list={NotificationList}
				/>
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
			<StyleVariables />
			<StyleReset />
		</MuiPickersUtilsProvider>
	) : <></>
}

export default App
