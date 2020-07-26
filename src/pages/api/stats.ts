import connect from 'utils/api/connect'
import { NextApiResponse } from 'next'
import getConfig from 'next/config'

const token: string | undefined = (
	getConfig() as Record<string, Record<string, string>>
)?.serverRuntimeConfig?.analyticsSecret

const route = (req: never, res: NextApiResponse) => {
	res.json({
		token,
	})
}

export default connect(undefined, {
	middleware: false,
	verify: false,
}).get(route)
