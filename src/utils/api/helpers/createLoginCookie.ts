import { serialize, CookieSerializeOptions } from 'cookie'
import { Mutation_RootLoginArgs } from 'ts/schema'
import moment from 'utils/moment'

const createLoginCookie = (data?: Mutation_RootLoginArgs, overrides?: CookieSerializeOptions): string => serialize(
	'TOKEN',
	JSON.stringify(data || ''), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production' && process.env.DEBUG !== 'true',
		expires: moment().add(14, 'days').toDate(),
		sameSite: 'none',
		path: '/',
		...overrides,
	}
)

export default createLoginCookie
