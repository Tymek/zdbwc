import { NextApiRequest, NextApiResponse } from 'next'

import { UserInfo } from 'generated/schema'
import { ActionBody } from 'ts/api'
import connect, { RequestHandler, ActionError } from 'utils/api/connect'
import createLoginCookie from 'utils/api/helpers/createLoginCookie'

export const handler: RequestHandler<NextApiRequest, NextApiResponse> = (req, res) => {
	const cookie = createLoginCookie(undefined, {
		expires: new Date(0),
	})

	res.setHeader('Set-Cookie', cookie)

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
