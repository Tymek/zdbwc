import polishMessages from 'ra-language-polish'
import polyglotI18nProvider from 'ra-i18n-polyglot'

const name = 'nazwa'
const speaker = 'mówca'
const updated_at = 'zaktualizowano'
const created_at = 'utworzono'
const location = 'lokalizacja'

const messages = {
	'pl': {
		...polishMessages,
		ra: {
			...polishMessages.ra,
			action: {
				...polishMessages.ra.action,
				unselect: 'Odznacz',
				create: 'Dodaj',
			},
		},
		resources: {
			session: {
				name: 'Sesja |||| Sesje',
				fields: {
					name,
					speaker,
					begins_at: 'od',
					ends_at: 'do',
					updated_at,
					created_at,
					location,
				},
			},
			topic: {
				name: 'Temat |||| Tematy',
				fields: {
					name,
					speaker,
					session: 'sesja',
					description: 'opis',
					location,
					updated_at,
					created_at,
				},
			},
		},
	},
}

export default polyglotI18nProvider(locale => messages[locale], 'pl')
