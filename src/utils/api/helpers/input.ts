import { ActionBody } from 'ts/api'
import { NextApiRequest } from 'next'

const input = <Input>(req: NextApiRequest): Input => {
	const body = req.body as ActionBody<Input>
	return body?.input
}

export default input
