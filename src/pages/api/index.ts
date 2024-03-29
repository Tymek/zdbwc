import connect from 'utils/api/connect'
import { NextApiResponse } from 'next'

const route = (req: never, res: NextApiResponse) => {
	res.redirect(303, '/api/healthcheck')
}

export default connect(undefined, {
	middleware: false,
	verify: false,
}).get(route)
