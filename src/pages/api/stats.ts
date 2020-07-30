import connect, { ActionError } from 'utils/api/connect'
import { NextApiResponse } from 'next'
import getConfig from 'next/config'
import userFromCookies from 'utils/api/helpers/userFromCookies'

const token: string | undefined = (
	getConfig() as Record<string, Record<string, string>>
)?.serverRuntimeConfig?.analyticsSecret

const route = async (req: never, res: NextApiResponse) => {
	const data = await userFromCookies(req)

	if (!data) {
		throw new ActionError('Forbidden', 403)
	}

	res.json({
		token,
	})
}

export default connect(undefined, {
	middleware: false,
	verify: false,
}).get(route)
