import { Mutation_RootLoginArgs, User } from 'ts/graphql'
import db, { sql } from 'utils/api/database'
import connect, { RequestHandler } from 'utils/api/connect'
import { compare } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { isEmpty } from 'ramda'

const user: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
	if (!req.cookies?.TOKEN) {
		return next()
	}

	const input = JSON.parse(req.cookies?.TOKEN)

	if (!input || isEmpty(input)) {
		return next()
	}

	const { username, password } = input as Mutation_RootLoginArgs

	if (!username || !password) {
		return next()
	}

	const data: User | null = await db.maybeOne(sql`
		SELECT *
		FROM public.user
		WHERE username = ${username}
	`)

	if (!data) {
		return next()
	}

	const isPasswordCorrect = await compare(data.password, password)
	if (!isPasswordCorrect) {
		return next()
	}

	return res.json({
		'X-Hasura-Role': 'manager',
		'X-Hasura-User-Id': `${data.id}`,
	})
}

const anonymous: RequestHandler<NextApiRequest, NextApiResponse> = (req, res) => {
	res.json({
		'X-Hasura-Role': 'anonymous',
	})
}

const route = connect()
route.get(user)
route.get(anonymous)

export default route
