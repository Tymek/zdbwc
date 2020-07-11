import { useMemo, useEffect, useState } from 'react'
import { GetStaticProps } from 'next/types'
import { useApolloClient } from '@apollo/client'
import { Admin, Resource } from 'react-admin'
import { AdminProps, DataProvider } from 'ra-core'
import buildHasuraProvider from 'ra-data-hasura-graphql'
import ScheduleIcon from '@material-ui/icons/Schedule'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import moment from 'utils/moment'
import createAuthProvider from 'utils/panel/authProvider'
import theme from 'utils/panel/theme'
import StyleReset from 'utils/panel/StyleReset'
import Login from 'utils/panel/Login'
import i18nProvider from 'utils/panel/i18nProvider'
import { SessionList, SessionEdit, SessionCreate, SessionShow } from 'components/panel/Session'
import { TopicList, TopicEdit, TopicCreate } from 'components/panel/Topic'

const ReactAdmin = Admin as React.FunctionComponent<AdminProps>

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

export const getStaticProps: GetStaticProps<{ defaultLayout?: boolean }> = () => Promise.resolve({
	props: {
		defaultLayout: false,
	},
})

export default (typeof window !== 'undefined') ? App : () => <></>
