import connect from 'utils/api/connect'
import { NextApiResponse, NextApiRequest } from 'next'
import { UserInfo } from 'generated/schema'
import { ActionBody } from 'ts/api'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { session_variables: headers } = req.body as ActionBody<never>
	const id = headers['x-hasura-user-id']
	const username = headers['x-hasura-user-username']
	const userInfo = { id, username } as UserInfo

	res.json(userInfo)
}

export default connect().post(handler)
