import connect, { ActionError } from 'utils/api/connect'
import { NextApiResponse, NextApiRequest } from 'next'
import { UserInfo } from 'ts/schema'
import { ActionBody } from 'ts/api'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { session_variables: headers } = req.body as ActionBody<never>
	const id = headers['x-hasura-user-id']
	const username = headers['x-hasura-user-username']

	if (username === undefined || id === undefined) {
		throw new ActionError('Not logged in', 412)
	}

	const userInfo = { id, username } as UserInfo

	res.json(userInfo)
}

export default connect(handler)
