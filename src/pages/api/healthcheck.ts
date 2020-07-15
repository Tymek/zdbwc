import connect from 'utils/api/connect'
import { NextApiResponse } from 'next'

const route = (req: never, res: NextApiResponse) => {
	res.json({
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	})
}

export default connect(undefined, {
	middleware: false,
	verify: false,
}).get(route)
