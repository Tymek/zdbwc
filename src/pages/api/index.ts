import connect from 'utils/api/connect'
import { NextApiResponse } from 'next'

const route = (req: never, res: NextApiResponse) => {
	res.json({ status: 'OK' })
}

export default connect(undefined, {
	middleware: false,
	verify: false,
}).get(route)
