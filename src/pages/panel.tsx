import { useMemo, useEffect, useState } from 'react'
import { GetStaticProps } from 'next/types'
import { useApolloClient } from '@apollo/client'
import { Admin, Resource, EditGuesser } from 'react-admin'
import { AdminProps, DataProvider } from 'ra-core'
import buildHasuraProvider from 'ra-data-hasura-graphql'
import ScheduleIcon from '@material-ui/icons/Schedule'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'

import createAuthProvider from 'utils/panel/authProvider'
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
		<ReactAdmin
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
	) : <></>
}

export const getStaticProps: GetStaticProps<{ defaultLayout?: boolean }> = () => Promise.resolve({
	props: {
		defaultLayout: false,
	},
})

export default (typeof window !== 'undefined') ? App : () => <></>
