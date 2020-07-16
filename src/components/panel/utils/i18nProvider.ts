import polishMessages from '@scrlk/ra-language-polish'
import { TranslationMessages } from 'ra-core'
import polyglotI18nProvider from 'ra-i18n-polyglot'

const fields = {
	name: 'nazwa',
	subject: 'temat',
	begins_at: 'od',
	ends_at: 'do',
	speaker: 'mówca',
	session: 'sesja',
	description: 'opis',
	updated_at: 'zaktualizowano',
	created_at: 'utworzono',
	location: 'lokalizacja',
}

const messages = {
	pl: {
		...polishMessages,
		resources: {
			session: {
				name: 'Sesja |||| Sesje',
				fields,
			},
			topic: {
				name: 'Temat |||| Tematy',
				fields,
			},
		},
	},
}

export default polyglotI18nProvider(locale => (locale === 'pl' ? messages[locale] : {} as TranslationMessages), 'pl')
