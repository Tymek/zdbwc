import connect, { RequestHandler } from 'utils/api/connect'
import { NextApiRequest, NextApiResponse } from 'next'
import userFromCookies from 'utils/api/helpers/userFromCookies'

const user: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
	const data = await userFromCookies(req)

	if (!data) {
		return next()
	}

	return res.json({
		'x-hasura-role': 'manager',
		'x-hasura-user-id': `${data.id}`,
		'x-hasura-user-username': `${data.username}`,
	})
}

const anonymous: RequestHandler<NextApiRequest, NextApiResponse> = (req, res) => {
	res.json({
		'x-hasura-role': 'anonymous',
	})
}

const route = connect()
route.get(user)
route.get(anonymous)

export default route
