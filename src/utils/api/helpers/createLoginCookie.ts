import { serialize, CookieSerializeOptions } from 'cookie'
import { Mutation_RootLoginArgs } from 'ts/schema'
import moment from 'utils/moment'

const createLoginCookie = (data?: Mutation_RootLoginArgs, overrides?: CookieSerializeOptions): string => serialize(
	'TOKEN',
	JSON.stringify(data || ''), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		expires: moment().add(7, 'days').toDate(),
		...overrides,
	}
)

export default createLoginCookie
